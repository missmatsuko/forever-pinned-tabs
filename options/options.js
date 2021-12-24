const formEl = document.getElementById('form');
const urlFieldset = document.getElementById('url-fieldset');

const insertUrlField = function(num, val = null) {
  urlFieldset.insertAdjacentHTML('beforeend', `
    <div class="form__field">
      <input
        type="url"
        name="url[]"
        aria-label="URL ${ num }"
        class="form__input"
        value="${ val ?? '' }"
      />
    </div>
  `);
}

const handleFormSubmit = function(e) {
  e.preventDefault();

  const formData = new FormData(formEl);

  const urls = formData.getAll('url[]');

  chrome.storage.sync.set({urls})
}

// Attach submit listener
formEl.addEventListener('submit', handleFormSubmit);

// Set up starting fields
chrome.storage.sync.get(['urls'], (result) => {
  const urls = result['urls'];

  urls.map((val, key) => {
    console.log(key, val);
    insertUrlField(key, val)
  });

  // Insert a blank field
  insertUrlField(urls.length)
});
