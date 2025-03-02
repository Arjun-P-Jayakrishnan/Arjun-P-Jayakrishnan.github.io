import {ShaderMaterial, Vector2} from "three";
export const Shader=()=>{

    /**@type {ShaderMaterial} */
    let material = ShaderMaterial({
        uniforms:{
            time:{value:1.0},
            resolution:{
                value:new Vector2()
            }
        },
        vertexShader:document.getElementById("vertexShader").textContent,
        fragmentShader:document.getElementById("fragmentShader").textContent

    });


}