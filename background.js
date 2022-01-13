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
    const windowHasPinnedTabs = result.tabs.some(tab => tab.pinned);

    if (windowIsNormal && !windowHasPinnedTabs) {
      createPinnedTabs();
    }
  });
}

browser.windows.onCreated.addListener(handleNewWindow);
