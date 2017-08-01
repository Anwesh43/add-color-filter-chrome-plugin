var funcCode = 'function applyFilter(img) {console.log("loaded");var image = new Image();image.src = img.src;image.crossOrigin="Anonymous";console.log("coming here");var canvas = document.createElement("canvas");const imw = image.width,imh = image.height;canvas.width = image.width;canvas.height = image.height;var context = canvas.getContext("2d");context.drawImage(image,0,0);context.globalAlpha = 0.4;context.fillStyle = "orange";context.fillRect(0,0,imw,imh);console.log(canvas);try {img.src = canvas.toDataURL();console.log(canvas.toDataURL())}catch(exception){}}'

var code = 'var imgs = document.querySelectorAll("img");console.log(imgs);for(var i=0;i<imgs.length;i++){applyFilter(imgs[i])}'
chrome.tabs.getCurrent((tab)=>{
    console.log("getting current tab")
})
chrome.tabs.query({active:true},(tab)=>{
    console.log(tab)
    chrome.tabs.executeScript(tab.id,{code:`${funcCode}${code}`})
})
