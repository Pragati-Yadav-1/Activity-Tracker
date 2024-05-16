chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
      trackActivity(tab);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
      trackActivity(tab);
  }
});

function trackActivity(tab) {
  const url = new URL(tab.url);
  const domain = url.hostname;

  chrome.storage.local.get('activityData', data => {
      const activityData = data.activityData || {};

      const currentTime = Date.now();

      if (!activityData[domain]) {
          activityData[domain] = { timeSpent: 0, lastVisit: currentTime };
      } else {
          const timeSpent = currentTime - activityData[domain].lastVisit;
          activityData[domain].timeSpent += timeSpent;
          activityData[domain].lastVisit = currentTime;
      }

      chrome.storage.local.set({ activityData }, () => {
          console.log("Activity data saved:", activityData);
      });
  });
}

// let activityData = {};

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === 'complete') {
//     handleRestrictions(tab);
//     trackActivity(tab);
//   }
// });

// chrome.tabs.onActivated.addListener(activeInfo => {
//   chrome.tabs.get(activeInfo.tabId, tab => {
//     handleRestrictions(tab);
//     trackActivity(tab);
//   });
// });

// function trackActivity(tab) {
//   const url = new URL(tab.url);
//   const domain = url.hostname;

//   if (!activityData[domain]) {
//     activityData[domain] = { timeSpent: 0, lastVisit: Date.now() };
//   } else {
//     const timeSpent = Date.now() - activityData[domain].lastVisit;
//     activityData[domain].timeSpent += timeSpent;
//     activityData[domain].lastVisit = Date.now();
//   }

//   chrome.storage.local.set({ activityData });
//   enforceTimeLimit(domain, tab.id);
// }

// function handleRestrictions(tab) {
//   chrome.storage.local.get(['restrictedWebsites'], (data) => {
//     const restrictedWebsites = data.restrictedWebsites || [];
//     const url = new URL(tab.url);

//     if (restrictedWebsites.includes(url.hostname)) {
//       chrome.tabs.remove(tab.id);
//       alert('This website is restricted.');
//     }
//   });
// }

// function enforceTimeLimit(domain, tabId) {
//   chrome.storage.local.get(['timeLimit'], (data) => {
//     const timeLimit = data.timeLimit;
//     if (timeLimit && activityData[domain] && activityData[domain].timeSpent > timeLimit) {
//       chrome.tabs.remove(tabId);
//       alert(`Time limit exceeded for ${domain}`);
//     }
//   });
// }



