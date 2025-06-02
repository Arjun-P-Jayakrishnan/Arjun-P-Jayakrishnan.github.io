import { Nullable } from "gameplay/lifecycle";
import { createLoader, Loader } from "core/loader/loader";
import { getGlobalContext } from "@managers/globalContext";
import { getThreeJsContext } from "core/game_engine/game_context";
import { createNavigationRoom } from "gameplay/room/room";
import { createAboutRoom } from "gameplay/about/about";
import { ABOUT_ROOM_ASSETS, NAVIGATION_ROOM_ASSETS, Room, RoomAsset } from "./room_types";
import { ROOM_OPTIONS } from "gameplay/configs";
import { processPipelineDebugger } from "debug/debugger";

export interface RoomController{
    mount:()=>Promise<void>;
    switchRoom:Record<RoomKey,()=>void>;
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
    let activeRoom:RoomKey="about";

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
                rooms[key]=createNavigationRoom(ROOM_OPTIONS);
                return rooms[key];
            case 'about':
                rooms[key]=createAboutRoom({});
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
            }
        }
    }

    const mount= async ():Promise<void>=>{
        processPipelineDebugger.onMount('room-controller')
        initializeLoader();
        await loadRoom('about');
    }

    const switchRoom= async(key:RoomKey):Promise<void>=>{
        if(activeRoom===key) return;

        if(rooms[activeRoom]){
            rooms[activeRoom]!.setDeactive();
        }

        await loadRoom(key);

        rooms[key]?.setActive();
        activeRoom=key;
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
        unmount:unmount
    }
}