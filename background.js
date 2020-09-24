const MENU_ITEMS = {
    base64: {
        title: 'Base64 Decode',
        id: '0',
        contexts: ['selection'],
    },
    highlight: {
        title: 'Highlight',
        id: '1',
    },
};

chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: 'popup.html' });
});

chrome.runtime.onInstalled.addListener(() => {
    init();
});

function init() {
    //
    for (let menuitem in MENU_ITEMS) {
        chrome.contextMenus.create(MENU_ITEMS[menuitem]);
    }
}

chrome.contextMenus.onClicked.addListener((itemID) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        switch (itemID.menuItemId) {
            case '0':
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    { event: 'getSelection' },
                    (response) => {
                        console.log(response);
                    }
                );
            case '1':
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    { event: 'highlight', payload: 'javascript' }
                    // ,
                    // (response) => {
                    //     console.log(response);
                    // }
                );
        }
    });
});
