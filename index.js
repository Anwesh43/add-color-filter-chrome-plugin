var k = 0,r = 0,g = 0,b = 0,color = 'green'
const dw = 100
var currTab = null
var code = 'var imgs = document.querySelectorAll("img");for(var i=0;i<imgs.length;i++){applyFilter(imgs[i])}'
chrome.tabs.getCurrent((tab)=>{
    console.log("getting current tab")
})
chrome.tabs.query({active:true},(tab)=>{
    console.log(tab)
    currTab = tab
})
class ColorCardComponent extends HTMLElement {
    constructor() {
        super()
        this.color = this.getAttribute('color') || color
        this.div = document.createElement('div')
        this.div.style.background = this.color
        this.div.style.width = dw
        this.div.style.height = dw
    }
    connectedCallback() {
        this.div.onmousedown = (event) => {
            console.log(this.color)
            color = this.color
            if(currTab != null) {
                var funcCode = `function applyFilter(img) {if(!img.getAttribute("done")){var image = new Image();image.crossOrigin = "Anonymous";image.src = img.src;image.onload = ()=>{var canvas = document.createElement("canvas");const imw = image.width,imh = image.height;canvas.width = image.width;canvas.height = image.height;var context = canvas.getContext("2d");context.drawImage(image,0,0);context.globalAlpha = 0.5;context.fillStyle = "${color}";context.fillRect(0,0,imw,imh);try {img.src = canvas.toDataURL();img.setAttribute("done",true);}catch(exception){}}}}`
                chrome.tabs.executeScript(currTab.id,{code:`${funcCode}${code}`})
            }
        }
    }
}
class ColorCardGroupComponent extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({mode:'open'})
        this.addColors(shadow)
    }
    addColors(shadow) {
        for(var i=0;i<this.children.length;i++) {
            const child = this.children[i]
            shadow.appendChild(child.div)
        }
    }
}
customElements.define('color-card-comp',ColorCardComponent)
customElements.define('color-card-group-comp',ColorCardGroupComponent)
