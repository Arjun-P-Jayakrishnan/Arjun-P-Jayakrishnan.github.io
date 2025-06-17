var i=`
    precision highp float;

    

    varying vec2 vUV;
    varying vec4 vWorldPos; 

    void main(){
        vUV=uv;
        vWorldPos=modelViewMatrix*vec4(position,1.0);

        gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);
    }

`;export{i as GridVertex};//# sourceMappingURL=grid-vertex.js.map
//# sourceMappingURL=grid-vertex.js.map