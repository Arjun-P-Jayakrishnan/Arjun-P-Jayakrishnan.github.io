import { PerspectiveCamera, ShaderMaterial, Vector3 } from "three";
import { GridFragment } from "./grid-fragment";
import { GridVertex } from "./grid-vertex";

export interface GridMaterialProps {
  camera: PerspectiveCamera;
  fadeNear: number;
  fadeFar: number;
}

export interface GridMaterial {
  mat: ShaderMaterial;
  update: (cameraPos: Vector3) => void;
}

export const createGridMaterial = (props: GridMaterialProps) => {
  const mat: ShaderMaterial = new ShaderMaterial({
    uniforms: {
      time: { value: 1 },
      cameraPos: { value: props.camera.position },
      fadeNear: { value: props.fadeNear },
      fadeFar: { value: props.fadeFar },
    },
    vertexShader: GridVertex,
    fragmentShader: GridFragment,
  });

  const update = (cameraPos: Vector3) => {
    mat.uniforms.cameraPos.value = cameraPos;
  };

  return {
    mat: mat,
    update: update,
  };
};
