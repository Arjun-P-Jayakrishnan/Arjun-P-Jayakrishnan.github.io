import { Nullable } from "gameplay/lifecycle";
import { createLoader, Loader } from "core/loader/loader";
import { getGlobalContext } from "@managers/globalContext";
import { getThreeJsContext } from "core/game_engine/game_context";
import { createAboutRoom } from "gameplay/about/room";
import { ABOUT_ROOM_ASSETS, NAVIGATION_ROOM_ASSETS, PLAYER_ASSET, Room, RoomAsset } from "./room_types";
import { ABOUT_ROOM_OPTIONS, NAVIGATION_ROOM_OPTIONS } from "gameplay/configs";
import { processPipelineDebugger } from "debug/debugger";
import { createNavigationRoom } from "gameplay/navigation/room";

export interface RoomController{
    mount:()=>Promise<void>;
    switchRoom:Record<RoomKey,()=>void>;
    update:(deltaTime:number)=>void;
    unmount:()=>void;
}

type RoomKey="navigation"|"about";

type RoomMap = {
    [key in RoomKey]: Nullable<Room>;
};

type RoomAssetsMap={
    [key in RoomKey]:RoomAsset
}

export const createRoomController=():RoomController=>{
    const { globalState,eventBusManager } = getGlobalContext();
    const context=getThreeJsContext();

    let loader: Nullable<Loader> = null;
    let rooms:RoomMap={
        navigation:null,
        about:null,
    }
    let roomAssets:RoomAssetsMap={
        navigation:NAVIGATION_ROOM_ASSETS,
        about:ABOUT_ROOM_ASSETS
    }
    let activeRoom:Nullable<Room>=null;
    let activeRoomKey:RoomKey="navigation";

    const initializeLoader=():void=>{
        try{
            loader = createLoader(
                {
                globalState: globalState,
                loaderEventBus: eventBusManager.loadingBus,
                renderer: context.get('renderer'),
                scene: context.get('scene'),
                }
            );
            loader?.configure();
        }
        catch(err){
            throw new Error(`[Gameplay] Couldnt create and initailize the loader due to ${err}`)
        }
    }

    const instantiateRoom=(key:RoomKey):Room=>{
        switch(key){
            case 'navigation':
                rooms[key]=createNavigationRoom(NAVIGATION_ROOM_OPTIONS);
                return rooms[key];
            case 'about':
                rooms[key]=createAboutRoom(ABOUT_ROOM_OPTIONS);
                return rooms[key];
            default:
                throw new Error(`Unknown Room key ${key}`)
        }
    }

    const loadRoom= async (key: RoomKey)=>{
        if(!loader) return;

        const assets=roomAssets[key];
        if(!assets) throw new Error('[Room Controller] sufficient asset meta data is not given.')
        
        console.log('assets',assets)

        if(!rooms[key]){
           
            const room:Room=instantiateRoom(key);
            
            //Load only once
            await loader.load({
                meshesMetaData:roomAssets[key].meshes,
                hdrMetaData:roomAssets[key].hdr
            });

            if(room){
                room.mount();
                room.isLoaded=true
                activeRoom=room;
            }
        }
    }

    const switchRoom= async(key:RoomKey):Promise<void>=>{
        if(activeRoomKey===key) return;

        if(rooms[activeRoomKey]){
            rooms[activeRoomKey]!.setDeactive();
        }

        await loadRoom(key);

        rooms[key]?.setActive();
        activeRoomKey=key;
    }

    const mount= async ():Promise<void>=>{
        processPipelineDebugger.onMount('room-controller')
        initializeLoader();
        await loader?.load({meshesMetaData:[PLAYER_ASSET]});
        await loadRoom('about');
        await switchRoom('about');
    }

   

    const update=(deltaTime:number)=>{
        activeRoom?.update(deltaTime);
    }

    const unmount=():void=>{
        loader?.dispose();

        Object.values(rooms).forEach((room)=>{
            room?.unmount();
        })
        
        processPipelineDebugger.onUnmount('room-controller')
    }

    return {
        mount:mount,
        switchRoom:{
            navigation:()=>switchRoom('navigation'),
            about:()=>switchRoom('about')
        },
        update:update,
        unmount:unmount
    }
}