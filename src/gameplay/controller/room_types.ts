import { AssetMetaData } from "core/loader/loaderPlugins";

export interface Room {
    /**Load and assign assets */
    mount:()=>void;

    /** Update  */
    update:(deltaTime:number)=>void;

    /**Release all assets and objects */
    unmount:()=>void;

    /**Activate */
    setActive:()=>void;

    /**Decativate */
    setDeactive:()=>void

    isLoaded:boolean;
}


export interface RoomAsset{
    meshes:AssetMetaData[],
    hdr?:AssetMetaData
}

export type PlayerAnimationKey="typing"|"player_typing";

const FILE_CONSTANTS = {
  PATH_TO_MODELS: "../../../assets/Models/",
  PATH_TO_HDR: "../../../assets/HDR/",
  PATH_TO_ANIMATIONS: "../../../assets/Animations/",
};

export const PLAYER_ASSET:AssetMetaData={
    name: "player",
    path: FILE_CONSTANTS.PATH_TO_MODELS + "player.glb",
}

export const PLAYER_ANIMATIONS:Record<PlayerAnimationKey,AssetMetaData>={
    typing:{
        name:"typing",
        path:FILE_CONSTANTS.PATH_TO_ANIMATIONS+"Typing.fbx"
    },
    player_typing:{
          name:"typing_player",
        path:FILE_CONSTANTS.PATH_TO_ANIMATIONS+""
    }
}


export const NAVIGATION_ROOM_ASSETS:RoomAsset={
    meshes:[
        {
            name: "room",
            path: FILE_CONSTANTS.PATH_TO_MODELS + "room.glb",
        }
    ],
    hdr:{
        name: "environment_hdr",
        path: FILE_CONSTANTS.PATH_TO_HDR + "environment.hdr",
    }
}

export const ABOUT_ROOM_ASSETS:RoomAsset={
    meshes:[
        {
            name: "about",
            path: FILE_CONSTANTS.PATH_TO_MODELS + "about.glb",
        }
    ],
    hdr:{
        name: "environment_hdr",
        path: FILE_CONSTANTS.PATH_TO_HDR + "environment.hdr",
    }
}

export const PROJECTS_ROOM_ASSETS:RoomAsset={
    meshes:[
        {
            name: "projects",
            path: FILE_CONSTANTS.PATH_TO_MODELS + "projects.glb",
        }
    ],
    hdr:{
        name: "environment_hdr",
        path: FILE_CONSTANTS.PATH_TO_HDR + "environment.hdr",
    }
}