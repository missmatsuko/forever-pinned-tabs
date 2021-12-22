const handleNewWindow = function() {
  // Create new pinned tab(s)
  chrome.tabs.create({
    url: 'https://calendar.google.com', // TODO: use URLs set from options page
    pinned: true
  });
}

chrome.windows.onCreated.addListener(handleNewWindow);
