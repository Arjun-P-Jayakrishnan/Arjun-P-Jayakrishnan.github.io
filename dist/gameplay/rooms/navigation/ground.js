import {ShaderMaterial}from'three';var d=`
    precision highp float;

    varying vec2 vUV;

    float line(vec2 uv,float lineWidth){

       
        float lineAA=fwidth(uv.x);
 
        float lineUV=1.0-abs(fract(uv.x)*2.0-1.0);

        return smoothstep(lineWidth+lineAA,lineWidth-lineAA,lineUV);
    }  

    float grid(vec2 uv,float lineWidth){

        vec2 uvDeriv=fwidth(uv);
        vec2 drawWidth=max(vec2(lineWidth),uvDeriv);
        vec2 lineAA=uvDeriv*1.5;
 
        vec2 gridUV=1.0-abs(fract(uv)*2.0-1.0);

        vec2 gridLines=smoothstep(drawWidth+lineAA,drawWidth-lineAA,gridUV);
        gridLines*=clamp(lineWidth/drawWidth,0.0,1.0);

        return mix(gridLines.x,1.0,gridLines.y);
    } 

    void main(){
        vec2 st=vUV*1500.0;
       
        gl_FragColor = vec4(vec3(grid(st,0.01)),1.0);
    }

`;var n=`
    precision highp float;

    

    varying vec2 vUV;
    varying vec4 vWorldPos; 

    void main(){
        vUV=uv;
        vWorldPos=modelViewMatrix*vec4(position,1.0);

        gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);
    }

`;var l=r=>{let e=new ShaderMaterial({uniforms:{time:{value:1},cameraPos:{value:r.camera.position},fadeNear:{value:r.fadeNear},fadeFar:{value:r.fadeFar}},vertexShader:n,fragmentShader:d});return {mat:e,update:t=>{e.uniforms.cameraPos.value=t;}}};var b=({logger:r,references:e,storage:o,camera:t})=>{let a=null,i=null;return {mount:()=>{if(a=o.getStorage("model").retrieve(e.storageId)?.groups.getObjectByName(e.id)??null,!a){console.error(`Cant get ground mesh from the id : ${e.id} ${e.storageId}`);return}i=l({camera:t,fadeNear:.1,fadeFar:1}),a.material=i.mat,r.onMount({origin:"Navigation-Ground"});},update:()=>{i?.update(t.position);},activate:()=>{},deactivate:()=>{},unmount:()=>{}}};export{b as createGround};//# sourceMappingURL=ground.js.map
//# sourceMappingURL=ground.js.map