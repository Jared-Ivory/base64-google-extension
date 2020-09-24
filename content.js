const isBase64 = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(
        sender.tab
            ? 'from a content script:' + sender.tab.url
            : 'from the extension'
    );
    switch (request.event) {
        case 'getSelection':
            message = window.getSelection().toString();
            sendResponse(decodeBase64(message));
        case 'highlight':
            sendResponse(highlight(request.payload));
    }
});

function decodeBase64(message) {
    const isBad = /(?:[!"#$%&()*+,-.\/:;<=>?@[\\\]^_\`{|}~])\w+([!"#$%&()*+,-.\/:;<=>?@[\\\]^_\`{|}~])/;

    if (isBad.test(message)) {
        message = message.replace(isBad, '');
    }
    if (isBase64.test(message)) {
        return decodeBase64(atob(message));
    }
    alert(message);
    return message;
}

function highlight(text) {
    let options = {
        element: 'span',
        className: 'highlight',
    };
    var context = document.body;
    var instance = new Mark(context);
    instance.mark('Javascript', options);

    $(`.${options.className}`).each((index, value) => {
        $(value).attr('tooltip', 'Click me to convert from Base64');
        //$(value).css('background-color', 'purple');
    });
    return `highlighted ${text}`;
}
