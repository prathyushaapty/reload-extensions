chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.purpose == "execute_refresh_function") {
        refresh_all();
    }
});

function refresh_all() {
    reload_dev_extensions();
}

function refresh_current_page() {
    location.reload();
}

function reload_dev_extensions() {
    chrome.runtime.sendMessage({
        "source": "scripts",
        "purpose": "openExtensionPage"
    });
}

console.log("#####script loaded###");