var handledPages = {
    livememe: {
        pattern: /^(?:https?:\/\/)?(?:www\.)?livememe.com\/[a-z0-9]*$/g,
        url: function () { return $("#memeImage").attr("src"); }
    },
    quickmeme: {
        pattern: /^(?:https?:\/\/)?(?:www\.)?quickmeme.com\/meme\/[a-z0-9]*\/$/g,
        url: function() { return $("#img").attr("src"); }
    }
};

var currentPage;

for (var page in handledPages) {
    if (handledPages.hasOwnProperty(page) && handledPages[page].pattern.test(window.location.href)) {
        chrome.runtime.sendMessage({ type: "showIcon" });
        currentPage = page;
        break;
    }
}

function onMessage(request, sender, sendResponse) {
    if (request.type === "findUrl") {
        sendResponse({ url: handledPages[currentPage].url() });
    }
}

chrome.runtime.onMessage.addListener(onMessage);