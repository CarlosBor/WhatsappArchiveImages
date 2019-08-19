function notify(message){
    for (i=0;i<message.length;i++){
      if(message[i].imageURL==""){
        continue;
      }
        var downloadUrl = message[i].imageURL;
        var now = new Date();
        var dayOfMonth = now.getDate();
        var monthOfYear = parseInt(now.getMonth())+1;
        var currentYear = now.getUTCFullYear();
        var downloading = browser.downloads.download({
            url : downloadUrl+"",
            filename : "WSImages/" + message[i].chatName+"/"+ dayOfMonth + "-" + monthOfYear + "-"+ currentYear+".jpg",
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