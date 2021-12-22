const handleNewWindow = function() {
  console.log('handle new window');

  // Create new pinned tab(s)
  const url = chrome.storage.sync.get(['url'], function(result) {
    chrome.tabs.create({
      url: result.url,
      pinned: true
    });
  });
}

chrome.windows.onCreated.addListener(handleNewWindow);
