const createPinnedTabs = function() {
  const url = chrome.storage.sync.get(['url'], function(result) {
    chrome.tabs.create({
      url: result.url,
      pinned: true,
      active: false,
    });
  });
}

const handleNewWindow = function() {
  createPinnedTabs();
}

chrome.windows.onCreated.addListener(handleNewWindow);
