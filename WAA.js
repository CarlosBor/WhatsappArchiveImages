/* window.addEventListener("click", notifyExtension);

function notifyExtension(e) {
    console.log(e.target);
  browser.runtime.sendMessage("http://tencents.info/dimeback.gif");
}

*/

//Contact Nodes query
function getChatNodes(){
    return document.querySelectorAll("div#pane-side>div>div>div>div");
}



function populateDownloadObjects(nodes){
    if (localStorage.getItem("downloadedURLs") == null){
        localStorage.setItem("downloadedURLs",JSON.stringify([]));
    }

    infoForDownload = [];
    for (i=0;i<nodes.length;i++){
        //Image source query
        baseImageSource = nodes[i].querySelector("img").src;        
        if(baseImageSource.charAt(0)=="d"){
            continue;
        }

        baseImageSource = decodeURIComponent(baseImageSource);
        regexRule = new RegExp("https:\/\/pps.*");
        parsedImageSource = baseImageSource.match(regexRule)[0];


        if(JSON.parse(localStorage.getItem("downloadedURLs").indexOf(parsedImageSource)!=-1)){
            continue;
        }        
        tempArray = JSON.parse(localStorage.getItem("downloadedURLs"));
        tempArray.push(parsedImageSource);
        localStorage.setItem("downloadedURLs",JSON.stringify(tempArray));
        infoForDownload.push({});
        infoForDownload[infoForDownload.length-1].imageURL = parsedImageSource;
        //Chat name query, different for groups and single contacts
        infoForDownload[infoForDownload.length-1].chatName = nodes[i].querySelector("span[title]").title;
        
        if (infoForDownload[infoForDownload.length-1].chatName == ""){
            infoForDownload[infoForDownload.length-1].chatName = nodes[i].querySelector("span>span[title]").title;
        }
    }
    return infoForDownload;
}

window.addEventListener("focus", timetracker);

function timetracker(){
    if(localStorage.getItem("elapsedTime")==null){
        time = + new Date(); //+ triggers valueOf and gives UNIX time
        localStorage.setItem("elapsedTime", time);
    }else{
        if (localStorage.getItem("elapsedTime") - new Date() < - 86400000){ //If more than a day has elapsed
            time = + new Date(); //+ triggers valueOf and gives UNIX time
            localStorage.setItem("elapsedTime", time);
            nodes = getChatNodes();
            finalObject = populateDownloadObjects(nodes);
            console.log(finalObject);
            if(finalObject.length!=0){
                browser.runtime.sendMessage(finalObject);
            }
        }
    }
}