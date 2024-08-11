chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ events: [] });
  console.log("Countdown New Tab extension installed");
});
