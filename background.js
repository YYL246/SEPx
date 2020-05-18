chrome.runtime.onInstalled.addListener(function(){
  console.log("Thank you for using SEPx.");
})
/*
//PageStateMatcher:SEP addRules
  var sepRule = {
    conditions:[
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl:{hostEquals:'plato.stanford.edu'},
      })
    ],
    actions:[
      new chrome.declarativeContent.ShowPageAction(),
    ]
  }

  //PageStateMatcher:SEP
  chrome.declarativeContent.onPageChanged.removeRules(undefined,function(){
    chrome.declarativeContent.onPageChanged.addRules([sepRule])
  })
*/
  //Create menuItem in contextMenus


//get authordate from contentScript
window.bibliography=" ";
let mousex=" ";
let mousey=" ";

chrome.runtime.onMessage.addListener(receiver);
function receiver(request,sender,sendResponse){
  console.log(request);
  window.bibliography = request.text1;
  window.mousex=request.text2;
  window.mousey=request.text3;
  window.open(
    "popup.html",
    "extension_popup",
    `width=300,height=200,scrollbars=yes,resizable=yes,left=${parseInt(window.mousex)+50},top=${parseInt(window.mousey)+150}`
    )
}
