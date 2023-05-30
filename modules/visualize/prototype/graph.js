import { html, Oid, OidUI, Bus} from '/lib/oidlib-dev.js'

function createGraphClass(specializedDraw){
    let new_class =  class extends OidUI{
        //handlers
        handleGetData(topic, message){}
        
        handleSetData(topic, message){}

        handleGetOptions(topic,message){}

        handleSetOptions(topic,message){
            console.log(message)
            let objOptions = JSON.parse(this.options)
            for(const key in message){
                objOptions[key] = message[key]
            }
            this.options = JSON.stringify(objOptions)
        }

        handleRender(topic, message){
            const canvas = document.createElement('canvas');
            canvas.style ="max-height:400px;max-width:400px";
            this.draw(canvas.getContext("2d"));
            
            const body = document.getElementsByTagName('body')[0];
            body.appendChild(canvas);
        }

        //chart specific functions
        draw=specializedDraw
    }

    return new_class
}

export function graphComponent(element, drawFunction, iconPath){
    Oid.component({
        id: '--', //TODO
        element: element,
        properties:{
            data: {default: null},
            options: {default: null}
        },
        receive: ['render','getData','setData', 'getOptions', 'setOptions'],
        template: html`<div style='width:20px;height:20px;'><img src='${iconPath}'/></div>`,
        implementation: createGraphClass(drawFunction)
    })
}