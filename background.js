// TODO: set urls value in options
const urls = ['https://drive.google.com', 'https://calendar.google.com', 'https://keep.google.com'];

const createPinnedTabs = function() {
  for (const url of urls) {
    browser.tabs.create({
      url: url,
      pinned: true,
      active: false,
    });
  }
}

const handleNewWindow = function(window) {
  browser.windows.get(
    window.id,
    {
      populate: true, // Include tab property
    }
  )
  .then(result => {
    const windowIsNormal = result.type === "normal";
    // TODO: check if pinned tabs are in URL list and only create missing ones
    const windowHasPinnedTabs = result.tabs.some(tab => tab.pinned);

    if (windowIsNormal && !windowHasPinnedTabs) {
      createPinnedTabs();
    }
  });  
}

// TODO: Handle first new window (doesn't trigger windows.onCreated)
// runtime.onStartUp and runtime.onConnect don't work
// What is the order of events anyway?
// browser.runtime.onStartUp.addListener(handleNewWindow);

// Handle all other new windows
browser.windows.onCreated.addListener(handleNewWindow);
