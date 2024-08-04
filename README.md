  #	Web Component Based Portfolio

## Introduction
The basic essence of a web page as portfolio at least as a developer is to create and showcase your skill set. It involves expressing all that you have learnt in a web development to make something that's well thought out and appealing. Now this is can be done in three ways

 - Basic HTML and CSS only
 - Web Components
 - Full Stacks 
Though its a pretty usual notion nowadays to use **Stacks** for almost any design as there is much flexibility and much more easier to write compared to *a single file* **HTML** and **CSS** .It does make it more modular and you have plenty libraries that you can use. 

I am all for those but kind of like trying something else that's in between those two which is **Web Components**. It not only provides the abstraction as in Stacks but also is more like as static web page. A perfect balance in between.
(~~i also wanted to learn it and that's the main reason~~)

##	Things i Learnt

### Getting Started with Project.js
```js:
    class TemplateName extends HTMLElement{
		shadowRoot;
		div;
		constructor(){
			super();
			
			shadowRoot=this.atttachShadow({mode:'closed'});
			
			div=document.createElement('div');
			div.textContent=' text ';
			
			shadowRoot.append(div)
		}
    }
    customElements.define('template-name',TemplateName);
```
 

 - **Shadow Root** - reference to Shadow DOM and it defines two modes
	 - **open** - allows parent element to access the element
	 - **closed** - does not allows parent element to access the custom element so that it does not affect outside elements.
- **div**  - created a simple html element
-  **shadowRoot.append(div)** - add the element 
- **customElements.define ('name with - ',Class)** - the name of component must have hyphen and just pass in the component.

###	Use Inner Contents (<> innerContents </>)

Now the inner contents even if defined are not going to appear as it is not using the **slots** for web components and to use that we need to use the component called **template**. 
```html:
       const template=document.createElement('template')
        template.innerHTML='
        <div>
    	    <h1>Template Title</h1>
    	    <slot name="title">Default Text</slot>
        </div>
    	';
```
 
### Styles

Its common that base class stylings will be used by the component class and if we do not want that then we have these options
```html:

    template.innerHTMl='
    <style>
	    div{
		    font-size:1em;
	    }
	</style>
	'

```

```css:
div{

}
/*
	ths allows all components to have the styling
	without display as being block it will not be applied
	as it is inline by default
*/
:host{
	display:block;
}
/*
	this allows the styling to be applied
	to only the specified component
	
*/
:host(<component name>){
	display:block;
}
/*
	this allows to apply styling to 
	any custom component having the 
	passed element as parent e.g main
*/
::host-context(parent-element){
	display:block;
}
/*
	this allows slots to have their own style
	Note all slotted styling are applied when it is being built
	so any styling after that can override and hence to avoid it we 
	need to add !important 
*/
::slotted(* or h2 or ...){

}
/*
	it exposes style to outside
	it helps to target and stylize
*/
::part(){

}
```
*in template Element*
```html:

    <div part="<name>">
    
	</div>

```

*in outside .css file* overrides the styling

```css:

    ::part(topper){
	   color:red;
	}
	
	::part(topper) span{
		/* doesnt work */
	}

```
###	Properties and Attributes   

#### Define Properties
```js:
	

    /*
    define allowed attributes
    it allows you to define your cutom properties for that 
    particular Element
    */
    static get observedAttributes(){
    
	    return [`colors`,`character`];
	}

```
#### Get and Set Properties
```js:
	

    /*
	    sync attributes with properties
		get is called when element.property is invoked
		set is called when element.property= is invoked
	*/
	get character(){
		return this.getAttribute('character')
	}
	set character(value){
		this.setAttribute('character',value);
	}
	
	get color(){
		return this.getAttribute('color');
	}
	set color(value){
		this setAttribute('color',value);
	}
	
```
####	Changes

```js:
	

    attributeChangedCallback(attrName,oldVal,newVal){
	    if(attrName.toLowerCase()==='character'){
			const div=this.root.querySelector('.root');
			let paragraph= div.querySelector('p')?div.querySelector('p'):document.createElement('p');
			p.className'character';
			p.textContent=newVal;
			div.append(p);
		}
	}

```

### Continuation 
