chrome.action.onClicked.addListener(function(tab) {
   if((message.from === 'content') && (message.subject === 'getTabId')){
      chrome.pageAction.show(sender.tab.id);
      console.log("hi");
}

});
