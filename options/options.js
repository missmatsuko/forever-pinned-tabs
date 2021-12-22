// TODO: Support multiple URLs (including UI to add/remove)
const formEl = document.getElementById('form');

const handleFormSubmit = function(e) {
  e.preventDefault();

  const formData = new FormData(formEl);
  const newUrl = formData.get('url');

  chrome.storage.sync.set({url: newUrl});
}

formEl.addEventListener('submit', handleFormSubmit);
