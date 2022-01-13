const urls = ['https://drive.google.com', 'https://calendar.google.com', 'https://keep.google.com'];

const createPinnedTabs = function(windowId) {
  for (const url of urls) {
    browser.tabs.create({
      url: url,
      pinned: true,
      active: false,
      windowId: windowId,
    });
  }
}

const handleNewWindow = function(window) {
  const windowId = window.id;

  browser.windows.get(
    windowId,
    {
      populate: true, // Include tab property
    }
  )
  .then(result => {
    const windowIsNormal = result.type === "normal";
    const windowHasPinnedTabs = result.tabs.some(tab => tab.pinned);

    if (windowIsNormal && !windowHasPinnedTabs) {
      createPinnedTabs(windowId);
    }
  });
}

browser.windows.onCreated.addListener(handleNewWindow);
