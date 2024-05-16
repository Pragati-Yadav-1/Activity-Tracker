
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['activityData'], result => {
        console.log("Retrieved activity data:", result.activityData);
        
        const summaryDiv = document.getElementById('activity-summary');
        const activityData = result.activityData || {};

        summaryDiv.innerHTML = '<h2>Time Spent on Websites:</h2>';
        for (const [domain, data] of Object.entries(activityData)) {
            const minutesSpent = Math.round(data.timeSpent / 60000); // Convert milliseconds to minutes
            summaryDiv.innerHTML += `<p>${domain}: ${minutesSpent} minutes</p>`;
        }
    });
});