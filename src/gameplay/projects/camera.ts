import { getGlobalContext } from "@managers/globalContext";
import {  CatmullRomCurve3, PerspectiveCamera, Scene, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export interface CameraProps {
  camera: PerspectiveCamera;
  scene: Scene;
  orbit:OrbitControls
}

export interface CameraManager {
  mount:()=>void
  activate:()=>void;
  update:(deltaTime:number)=>void;
  deactivate:()=>void;
  unmount:()=>void
}



export const createCameraManager = (props: CameraProps): CameraManager => {
  const { camera, scene ,orbit} = props;
  const {eventBusManager}=getGlobalContext();

  const points:Vector3[]=[
    new Vector3(0,2,10),
    new Vector3(0,2,5),
    new Vector3(0,2,3),
    new Vector3(0,2,2),
    new Vector3(0,2,1),
    new Vector3(0,2,0),
    new Vector3(0,2,-1),
    new Vector3(0,1,-1),
    new Vector3(0,1,-1.5),
    new Vector3(0,1,-2),
  ];

  const camPath=new CatmullRomCurve3(points);
  let t=0;
  let isComplete:boolean=false;

  const mount=()=>{
    t=0;
  }

  const activate=()=>{
    orbit.enabled=false;
    camera.position.set(0,2.5,10);
    camera.near=0.001;
    camera.far=1000;
  }

  const update=(deltaTime:number)=>{
    

    if(!isComplete&&t>1) {
      isComplete=true; 
      orbit.enabled=true;
      eventBusManager.displayBus.emit({
        type:"project-screen:show",
        elementId:"project-screen"
      })
    }

    if(!isComplete){
      t+=deltaTime*0.1;

      const position=camPath.getPointAt(t);
      const lookAt=camPath.getPointAt(t+0.1);
      lookAt.z-=0.1;
     
      camera.position.copy(position)
      camera.lookAt(lookAt)
    }
  }

  const deactivate=()=>{}

  const unmount=()=>{}

  return {
    mount:mount,
    activate:activate,
    update:update,
    deactivate:deactivate,
    unmount:unmount
  };
};
