/*
 function notify(message){   
        var downloadUrl = "https://pps.whatsapp.net/v/t61.11540-24/53412031_2154637407959055_6408127712854016000_n.jpg?oe=5CB3469A&oh=c39d66ef9ff90cf2c661c81aee3e230a";
        var downloading = browser.downloads.download({
            url : downloadUrl,
            filename : "testing.jpg",
            conflictAction : 'uniquify'
          });
      downloading.then(onStartedDownload, onFailed);
 } */

function notify(message){
  
    for (i=0;i<message.length;i++){
      if(message[i].imageURL==""){
        continue;
      }
      console.log(message[i].imageURL+"");
      console.log(message[i].chatName);
        var downloadUrl = message[i].imageURL;
        var downloading = browser.downloads.download({
            url : downloadUrl+"",
            filename : "WSImages/" + message[i].chatName+".jpg",
            conflictAction : 'uniquify'
          });          
    }

      downloading.then(onStartedDownload, onFailed);
}

browser.runtime.onMessage.addListener(notify);

function onStartedDownload(id) {
    console.log(`Started downloading: ${id}`);
  }
  
  function onFailed(error) {
    console.log(`Download failed: ${error}`);
  }