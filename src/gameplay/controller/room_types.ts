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

const FILE_CONSTANTS = {
  PATH_TO_MODELS: "../../../assets/Models/",
  PATH_TO_HDR: "../../../assets/HDR/",
};

export const PLAYER_ASSET:AssetMetaData={
    name: "player",
    path: FILE_CONSTANTS.PATH_TO_MODELS + "player.glb",
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