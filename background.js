console.log("background script reloaded");

get_local_store_data('tab_ids').then(function (value) {
    chrome.tabs.reload(value);
    // console.log(values);
    // $.each(values, function (domain, tab_id) {
    //     chrome.tabs.reload(tab_id);
    // });
}).catch(function (error) {
    console.log(error);
});

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.sendMessage(tab.id, {
        "source": "background",
        "purpose": "execute_refresh_function"
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.purpose == "openExtensionPage") {
        is_extension_tab_opened().then(function (tab_data) {
            console.log(tab_data);
            if (tab_data.tab_present) {
                console.log("tab present");
                set_local_store_data("tab_ids", sender.tab.id);
                chrome.tabs.reload(tab_data.tab_id, function () {
                    // reload_tab(sender.tab.id);
                });
            } else {
                chrome.tabs.create({ url: "chrome://extensions/", active: false }, function (tab) {
                    chrome.tabs.reload(tab.id);
                    setTimeout(function () {
                        set_local_store_data("tab_ids", sender.tab.id);
                        // reload_tab(sender.tab.id);
                    }, 2000);
                });
            }
        });
    }
});

function is_extension_tab_opened() {
    return new Promise(function (resolve, reject) {
        var tab_present = false;
        var tab_id = null;
        chrome.tabs.query({}, function (tabs) {
            $.each(tabs, function (ind, data) {
                if (data.url.indexOf("chrome://extensions") != -1) {
                    tab_present = true;
                    tab_id = data.id;
                    return false; // to break $.each
                }
            });
            resolve({ "tab_present": tab_present, "tab_id": tab_id });
        });
    });
}

function reload_tab(tab_id) {
    chrome.tabs.reload(tab_id);
}