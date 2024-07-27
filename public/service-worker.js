// This will run when a bookmark is created.
// 如果manifest json中的action设置了default_popup，那么onClicked是不会触发的
chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});

console.log(
  "This prints to the console of the service worker (background script)"
);

// Importing and using functionality from external files is also possible.
// importScripts("service-worker-utils.js");

// If you want to import a file that is deeper in the file hierarchy of your
// extension, simply do `importScripts('path/to/file.js')`.
// The path should be relative to the file `manifest.json`.
