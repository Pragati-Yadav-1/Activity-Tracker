document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('save-options');
  
    saveButton.addEventListener('click', () => {
      const restrictedWebsites = document.getElementById('restricted-websites').value;
      const timeLimit = document.getElementById('time-limit').value;
  
      chrome.storage.local.set({
        restrictedWebsites: restrictedWebsites.split(',').map(site => site.trim()),
        timeLimit: parseInt(timeLimit, 10) * 60000 // Convert minutes to milliseconds
      }, () => {
        alert('Options saved');
      });
    });
  
    // Load options
    chrome.storage.local.get(['restrictedWebsites', 'timeLimit'], (data) => {
      if (data.restrictedWebsites) {
        document.getElementById('restricted-websites').value = data.restrictedWebsites.join(', ');
      }
      if (data.timeLimit) {
        document.getElementById('time-limit').value = data.timeLimit / 60000; // Convert milliseconds to minutes
      }
    });
  });
  