document.getElementById('save').addEventListener('click', function() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username && password) {
    chrome.storage.sync.set({ username, password }, function() {
      alert('Credentials saved successfully.');
    });
  } else {
    alert('Please enter both username and password.');
  }
});

document.getElementById('fill').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.storage.sync.get(['username', 'password'], function(data) {
      if (data.username && data.password) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {
            code: `
              document.querySelector('input[type="text"]').value = '${data.username}';
              document.querySelector('input[type="password"]').value = '${data.password}';
            `
          }
        );
      } else {
        alert('No credentials found. Please save your credentials first.');
      }
    });
  });
});
