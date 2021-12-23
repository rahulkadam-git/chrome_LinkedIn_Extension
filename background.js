// Add a listener for the browser action
chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
  let params = {
    active: true,
    currentWindow: true,
  };
  chrome.tabs.query(params, function (tab) {
    var CurrTab = tab[0];
    chrome.tabs.sendMessage(CurrTab.id, "extension_go", (data) => {
      console.log(data);
      let data1 = JSON.stringify(data);
      var blob = new Blob([data1], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      chrome.downloads.download({
        url: url,
      });
    });
  });
}
