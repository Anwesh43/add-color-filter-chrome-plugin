var k = 0
var funcCode = 'function applyFilter(img) {if(!img.getAttribute("done")){var image = new Image();image.crossOrigin = "Anonymous";image.src = img.src;console.log("coming here");image.onload = ()=>{var canvas = document.createElement("canvas");const imw = image.width,imh = image.height;canvas.width = image.width;canvas.height = image.height;var context = canvas.getContext("2d");context.drawImage(image,0,0);context.globalAlpha = 0.5;context.fillStyle = "orange";context.fillRect(0,0,imw,imh);try {img.src = canvas.toDataURL();img.setAttribute("done",true);}catch(exception){}}}}'

var code = 'var imgs = document.querySelectorAll("img");for(var i=0;i<imgs.length;i++){applyFilter(imgs[i])}'
chrome.tabs.getCurrent((tab)=>{
    console.log("getting current tab")
})
chrome.tabs.query({active:true},(tab)=>{
    console.log(tab)
    chrome.tabs.executeScript(tab.id,{code:`${funcCode}${code}`})
})
