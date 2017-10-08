function set_local_store_data(key, value) {
    return new Promise(function (resolve, reject) {
        var store_obj = {};
        store_obj[key] = value;
        console.log(store_obj);
        chrome.storage.local.set(store_obj, function () {
            resolve("data stored");
        });
    });
}

function get_local_store_data(key) {
    return new Promise(function (resolve, reject) {
        if (!key) {
            reject("Empty Key. Invalid Key");
        } else if (key == 'all') {
            chrome.storage.local.get(null, function (items) {
                var value = items;
                if (typeof value != 'undefined') {
                    resolve(value);
                }
                else {
                    reject("Invalid Key");
                }
            });
        }
        else {
            chrome.storage.local.get([key], function (items) {
                console.log(items);
                var value = items[key];
                if (typeof value != 'undefined') {
                    resolve(value);
                } else {
                    reject('Invalid Key : ' + key);
                }
            });
        }
    });
}