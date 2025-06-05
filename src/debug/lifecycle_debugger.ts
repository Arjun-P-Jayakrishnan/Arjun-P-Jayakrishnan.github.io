export interface LifeCycleDebugger{
    mount:(componentName:string,name:string)=>void;
    activate:(componentName:string,name:string)=>void;
    deactivate:(componentName:string,name:string)=>void;
    unmount:(componentName:string,name:string)=>void;
}



export const createLifeCycleDebugger=():LifeCycleDebugger=>{

    const onMount=(componentName:string,name:string)=>{
        console.log(` [${name}]'s ${componentName} is mounted....`)
    }


    const onActivate=(componentName:string,name:string)=>{
        console.log(` [${name}]'s ${componentName} is activated `)
    }

    const onDeactivate=(componentName:string,name:string)=>{
        console.log(` [${name}]'s ${componentName} is deactiavted`)
    }

    const onUnmount=(componentName:string,name:string)=>{
        console.log(` [${name}]'s ${componentName} is unmounted`)
    }

    return {
        mount:onMount,
        activate:onActivate,
        deactivate:onDeactivate,
        unmount:onUnmount
    }
}

export let lifecycleDebugger=createLifeCycleDebugger();