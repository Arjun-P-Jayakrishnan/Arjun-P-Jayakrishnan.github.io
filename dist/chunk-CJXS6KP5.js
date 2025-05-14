var i=`
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
        vec2 st=vUV*100.0;
       
        gl_FragColor = vec4(vec3(grid(st,0.01)),1.0);
    }

`;export{i as a};
//# sourceMappingURL=chunk-CJXS6KP5.js.map