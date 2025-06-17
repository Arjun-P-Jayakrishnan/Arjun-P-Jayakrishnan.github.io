import {Vector3,Euler,Spherical,ShaderMaterial,AnimationMixer,MathUtils}from'three';var W=()=>{let t=new Map;return {register:(e,s)=>{if(t.has(e))throw new Error(`Error : Redefining the service [${e}]`);t.set(e,s);},get:e=>{let s=t.get(e);if(!s)throw new Error(`Error : Trying to obtain value of an unregistered service ${e}`);return s},has:e=>t.has(e)}},C,w=()=>(C||(C=W()),C);var h={DISTANCE:3,HEIGHT_OFFSET:2,PITCH_MIN:0,PITH_MAX:Math.PI/2,SMOOTHING:.1},T=new Vector3(0,0,0),S=new Vector3(0,0,0),I=new Vector3(0,0,0);function k(t,n){return {yaw:MathUtils.euclideanModulo(t,Math.PI*2),pitch:MathUtils.clamp(n,h.PITCH_MIN,h.PITH_MAX)}}function U(t){return S.set(0,0,0),S.setFromSpherical(t),S.y+=h.HEIGHT_OFFSET,S}function H(t,n,r){return t.lerp(n,r)}var E=({camera:t})=>{let r={mode:"thirdPerson",rotation:{pitch:Math.PI/2,yaw:0},spherical:new Spherical(h.DISTANCE,Math.PI/2,0)},a=i=>{r.mode=i;},e=()=>{},s=()=>{t.position.set(1,2,3);},c=i=>{r.rotation.yaw+=i.yaw,r.rotation.pitch+=i.pitch;let M=k(r.rotation.yaw,r.rotation.pitch);r.rotation.yaw=M.yaw,r.rotation.pitch=M.pitch;},g=i=>{r.spherical.theta=r.rotation.yaw,r.spherical.phi=r.rotation.pitch,S.copy(U(r.spherical)),T.copy(i.playerPosition).add(S),t.position.copy(H(t.position,T,h.SMOOTHING)),I.copy(i.playerPosition),I.y+=h.HEIGHT_OFFSET,t.lookAt(I);},o=i=>{t.position.copy(i),t.rotation.set(r.rotation.pitch,r.rotation.yaw,0);};return {setMode:a,update:i=>(c(i.rotationDelta),r.mode==="thirdPerson"?g(i):o(i.playerPosition),{rotation:t.rotation}),mount:e,activate:s,deactivate:()=>{},unmount:()=>{}}};var N=`
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

`;var G=`
    precision highp float;

    

    varying vec2 vUV;
    varying vec4 vWorldPos; 

    void main(){
        vUV=uv;
        vWorldPos=modelViewMatrix*vec4(position,1.0);

        gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);
    }

`;var V=t=>{let n=new ShaderMaterial({uniforms:{time:{value:1},cameraPos:{value:t.camera.position},fadeNear:{value:t.fadeNear},fadeFar:{value:t.fadeFar}},vertexShader:G,fragmentShader:N});return {mat:n,update:a=>{n.uniforms.cameraPos.value=a;}}};var R=({logger:t,references:n,storage:r,camera:a})=>{let e=null,s=null;return {mount:()=>{if(e=r.getStorage("model").retrieve(n.storageId)?.groups.getObjectByName(n.id)??null,!e){console.error(`Cant get ground mesh from the id : ${n.id} ${n.storageId}`);return}s=V({camera:a,fadeNear:.1,fadeFar:1}),e.material=s.mat,t.onMount({origin:"Navigation-Ground"});},update:()=>{s?.update(a.position);},activate:()=>{},deactivate:()=>{},unmount:()=>{}}};var D=({mixer:t,actions:n,crossFadeDuration:r=.3})=>{let a=null,s=null;return {play:(d,f=0)=>{if(a===d)return;let i=n[d];i&&(i.reset(),i.play(),s?.crossFadeTo(i,r,false),s=i,a=d);},getCurrentAnimation:()=>a,stop:()=>{},update:d=>{d!==void 0&&t.update(d);}}};var $=t=>({enter:e=>{console.log("enter idle"),t.animationController.play(t.animationId);},execute:e=>{e.isMoving()&&(e.isShiftPressed()?e.changeState("Run"):e.changeState("Walk"));},exit:e=>{console.log("exit idle");}}),X=t=>({enter:e=>{console.log("enter walk"),t.animationController.play(t.animationId);},execute:e=>{e.isMoving()?e.isShiftPressed()&&e.changeState("Run"):e.changeState("Idle");},exit:e=>{console.log("exit walk");}}),Y=t=>({enter:e=>{console.log("enter run"),t.animationController.play(t.animationId);},execute:e=>{e.isMoving()?e.isShiftPressed()||e.changeState("Walk"):e.changeState("Idle");},exit:e=>{console.log("exit run");}}),O=({inputs:t,animationController:n})=>{let {keyboard:a}={mouse:t.getController("mouse"),keyboard:t.getController("keyboard")},{idle:s,walk:c,run:g}={idle:$({animationController:n,animationId:"Idle"}),walk:X({animationController:n,animationId:"Walk"}),run:Y({animationController:n,animationId:"Run"})},o=s,p="Idle",d=u=>{o.execute(v),n.update(u);},f=()=>!!(a?.isKeyPressed("w")||a?.isKeyPressed("a")||a?.isKeyPressed("s")||a?.isKeyPressed("d")),i=()=>a?.isKeyPressed("shift")??false,M=u=>{switch(u){case "Idle":return s;case "Walk":return c;case "Run":return g;default:return s}},x=u=>{p!==u&&(p=u,o.exit(v),o=M(u),o.enter(v));},l=()=>{o.enter(v);},v={changeState:x,isMoving:f,isShiftPressed:i};return {mount:l,update:d,unmount:()=>{}}};var K={MOVEMENT_ACCELERATION:.05,MAX_VELOCITY:.05},L=({reference:t,storage:n,InputManager:r})=>{let a,e={direction:new Vector3(0,0,-1),velocity:new Vector3(0,0,0),rotationApplied:{pitch:0,yaw:0}},s={inputDirection:new Vector3(0,0,0)},c={player:null},g=()=>{try{let l=n.getStorage("model").retrieve(t.storageId);if(!l)throw new Error(`player doesn't exist for the id ${t.storageId}`);let v=l?.groups,y=l?.animations,u=new AnimationMixer(v),m=D({mixer:u,actions:{Idle:u.clipAction(y[0]),Walk:u.clipAction(y[3]),Run:u.clipAction(y[1])},crossFadeDuration:.3}),P=O({animationController:m,inputs:r});P.mount(),c={player:v},a={input:{mouse:r.getController("mouse"),keyboard:r.getController("keyboard")},animation:m,fsm:P};}catch(l){console.error(`Player mesh cant be obtained :${l}`);}},o=l=>{!l||!c.player||(e.rotationApplied=l.getRotation(),c.player.rotation.y+=e.rotationApplied.yaw);},p=(l,v)=>{if(!l||!c.player)return;let u=.001,{inputDirection:m}=s;if(m.set(0,0,0),l.isKeyPressed("w")&&(m.z-=1),l.isKeyPressed("s")&&(m.z+=1),l.isKeyPressed("a")&&(m.x-=1),l.isKeyPressed("d")&&(m.x+=1),m.length()>0)m.applyQuaternion(c.player.quaternion),m.normalize(),e.velocity.add(m.multiplyScalar(K.MOVEMENT_ACCELERATION*v)),e.velocity.clampLength(0,K.MAX_VELOCITY);else if(m.length()==0&&e.velocity.length()>0){let P=Math.exp(-5*v);e.velocity.multiplyScalar(P),e.velocity.lengthSq()<u*u&&e.velocity.set(0,0,0);}c.player.position.add(e.velocity);},d=l=>{o(a.input.mouse),p(a.input.keyboard,l);};return {mount:g,activate:()=>{},deactivate:()=>{},update:l=>(d(l),a.fsm.update(l),{position:c.player?.position??new Vector3(0,0,0),rotation:c.player?.rotation??new Euler(0,0,0,"XYZ"),rotationDelta:e.rotationApplied}),unmount:()=>{}}};var Ne=({player:t,ground:n})=>{let r=w(),[a,e,s,c,g]=[r.get("Logger"),r.get("GlobalStorageManager"),r.get("EventBusManager"),r.get("InputManager"),r.get("ThreeJSContextManager")],o={camera:E({camera:g.get("camera")}),player:L({reference:t,InputManager:c,storage:e}),ground:R({camera:g.get("camera"),logger:a,references:n,storage:e})},p=null,f=null,i=false;return {mount:()=>{i||!o||(a.onMount({origin:"Navigation Room"}),p={player:{position:new Vector3(0,0,0),rotation:new Euler(0,0,0),rotationDelta:{yaw:0,pitch:0}}},f=e.getStorage("model").retrieve(n.storageId)??null,o.player.mount(),o.ground.mount(),o.camera.mount(),i=true);},update:u=>{!i||!o||!p||(g.get("orbit").update(),p.player=o.player.update(u),o.camera.update({playerPosition:p.player.position,rotationDelta:p.player.rotationDelta}));},unmount:()=>{!i||!o||(a.onUnmount({origin:"Navigation Room"}),o.player.unmount(),o.ground.unmount(),o=null,f=null);},setActive:()=>{!f||!o||(f.groups.visible=true,g.get("orbit").enabled=false,o.camera.activate(),o.ground.activate(),o.player.activate());},setDeactive:()=>{!f||!o||(f.groups.visible=false,o.camera.deactivate(),o.ground.deactivate(),o.player.deactivate());},isLoaded:false}};export{Ne as createNavigationRoom};//# sourceMappingURL=room.js.map
//# sourceMappingURL=room.js.map