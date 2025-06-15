type Actions="mount" | "unmount" | "fetch"

export interface Debugger {
  onInit: (name: String) => void;
  onSuccess: (name: String, action:Actions ) => void;
  onError: (name: String, action: Actions) => void;
  onMount:(name:string)=>void;
  onLoad:(name:string)=>void;
  onUnmount:(name:string)=>void
  onCallback:(name:string)=>void
}


export const createDebugger=():Debugger=>{

    const onInit=(name:String)=>{
        console.log(`📍 Process ${name} has started`)
    }
    
    const onCallback=(name:string)=>{
        console.log(`📟 [${name}] is called`)
    }

    const onMount=(name:string)=>{
        console.log(`➕ [${name}] is mounting.....`)
    }

    const onLoad=(name:string)=>{
        console.log(`💫 [${name}] is loading data ....`)
    }

    const onUnmount=(name:string)=>{
        console.log(`➖ [${name}] is unmounting....`)
    }


    const onSuccess=(name:String,action:Actions)=>{
        console.log(`✅ Process ${name} is successfully completed ${action}ing `);
    }

    const onError=(name:String,action:Actions)=>{
        console.log(`❌ Process ${name} is failed to complete ${action}`);
    }

    return {
        onInit:onInit,
        onSuccess,
        onError,
        onMount,
        onLoad,
        onUnmount,
        onCallback
    }
}


export let processPipelineDebugger:Debugger=createDebugger();

