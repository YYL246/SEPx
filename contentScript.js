console.log("extension go");

//暂时只能detect Tom,2002这种格式（,必须是bib里的作者顺序
//允许：不是第一作者，允许出了这个entry外有比的entry提到但不是第一作者（？）

bibLength = bibliography.getElementsByTagName('li').length
console.log(bibliography.getElementsByTagName('li').item(0).innerText);
console.log(bibLength);

window.addEventListener('mousedown',mouseposition);
function mouseposition(e){
  let mx=e.clientX;
  let my=e.clientY;
}


//comparing selectedText & bibEntry
window.addEventListener('mouseup',mousedUpped);
function mousedUpped(e){
  let mx=e.clientX;
  let my=e.clientY;
  let selectedText = window.getSelection().toString();
  console.log(selectedText);
  let selectedAuthor = selectedText.replace(/\s+[0-9()]*/g, '');
  selectedAuthor = selectedAuthor.replace(/[(]/g,'')
  selectedAuthor = selectedAuthor.replace(/[)]/g,'')
  selectedAuthor = selectedAuthor.replace(/[a-z]$/g,'')
  console.log(selectedAuthor);
  let selectedDate = selectedText.replace(/^[(A-Za-z]+\s/g,'');
  selectedDate = selectedDate.replace(/[(]/g,'')
  selectedDate = selectedDate.replace(/[)]/g,'')
  console.log(selectedDate);
  if (selectedText.match(/[A-Za-z]\s[(][0-9]/)||selectedText.match(/[A-Za-z]\s[0-9]/)){ //regex:a letter, a space and a number)\
    console.log("selectedText matches authordate regEx, start comparison");
    //up until now we're fine
    loop1:
    for (i=0;i<bibLength;i++){
      if (i==bibLength) {
        console.log("sesarched through whole bib, no entry matches author name");
      }
      else {
        let bibEntry = bibliography.getElementsByTagName('li').item(i).innerText;
        //console.log(bibEntry);
        let bibAuthResult = bibEntry.search(selectedAuthor);
        //console.log(bibAuthResult);
        if (bibAuthResult!=-1){//found author
          console.log("found author");//test
          let bibDateResult = bibEntry.search(selectedDate);
          //console.log(bibDateResult);
          if (bibDateResult != -1){ //found authordate(right entry)
            console.log("found!");//test
            console.log(bibEntry);
            let message = {
              text1:bibEntry,
              text2:mx,
              text3:my
            }
            chrome.runtime.sendMessage(message);
            break loop1;
          }
          else{
            loop2://right author wrong date
            for(j=0;j<1000;j++){
              i++;//go to next bibEntry
              bibEntry = bibliography.getElementsByTagName('li').item(i).innerText;
              if (i-1 == bibLength || j-1 == bibLength) {
                console.log("search finished but no date match was found.");
              }
              else if (bibEntry.match(/^–––/)) {//check if next bibEntry starts with–––
                bibDateResult = bibEntry.search(selectedDate);
                if (bibDateResult != -1) {//next bib date correct
                  console.log("found!");//test
                  console.log(bibEntry);
                  let message = {
                    text1:bibEntry,
                    text2:mx,
                    text3:my
                  }
                  chrome.runtime.sendMessage(message);
                  break loop1;
                }
                else {
                  continue loop2;
                }
              }
              else {//next bibEntry doesn't start with ---
                console.log(bibEntry);
                console.log("found author, but the date doesn't match,nor is there a ---. Continue searching.");
                continue loop1;
              }
            }
          }
        }
      }

    }
  }
  else {
    console.log("invalid authordate");
  }
}




/*
//send bibliography
window.addEventListener('onCreated',windowCreated);

function windowCreated(){
  let bibliography = {
    text:bibliography_collection
  };
  chrome.runtime.sendMessage(bibliography);
}
console.log(bibliography);

//send selected text


function mousedUpped(){
  let selectedText = window.getSelection().toString();
  if (selectedText.length>0){
    let message = {
      text:selectedText
    };
    chrome.runtime.sendMessage(message);
  }
}
*/
