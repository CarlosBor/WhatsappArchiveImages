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

    infoForDownload = [];
    for (i=0;i<nodes.length;i++){
        infoForDownload.push({});
        //Image source query
        
        baseImageSource = nodes[i].querySelector("img").src;
        console.log(baseImageSource);
        if(baseImageSource.charAt(0)=="d"){
            baseImageSource = "https://web.whatsapp.com/pp?e=https%3A%2F%2Fpps.whatsapp.net%2Fv%2Ft61.11540-24%2F55424372_779205565788090_6920167975806828544_n.jpg%3Foe%3D5CB34F85%26oh%3Daea3bdd893b435c478562a626b315d7a&t=s&u=34685786192-1369241819%40g.us&i=1553270922"
        }
        baseImageSource = decodeURIComponent(baseImageSource);
        regexRule = new RegExp("https:\/\/pps.*");
        parsedImageSource = baseImageSource.match(regexRule)[0];
        infoForDownload[i].imageURL = parsedImageSource;
        
        //Chat name query, different for groups and single contacts
        infoForDownload[i].chatName = nodes[i].querySelector("span[title]").title;
        if (infoForDownload[i].chatName == ""){
            infoForDownload[i].chatName = nodes[i].querySelector("span>span[title]").title;
        }
    }
    console.log(infoForDownload[0].imageURL);
    return infoForDownload;
}

window.addEventListener("focus", timetracker);

function timetracker(){
    if(localStorage.getItem("elapsedTime")==null){
        time = + new Date(); //+ triggers valueOf and gives UNIX time
        localStorage.setItem("elapsedTime", time);
    }else{
        if (localStorage.getItem("elapsedTime") - new Date() < - 800){ //If more than a day has elapsed
            time = + new Date(); //+ triggers valueOf and gives UNIX time
            localStorage.setItem("elapsedTime", time);
            nodes = getChatNodes();
            finalObject = populateDownloadObjects(nodes);
            browser.runtime.sendMessage(populateDownloadObjects(getChatNodes()));
            
        }
    }
}