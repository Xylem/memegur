(function() {
    var jq = $.noConflict();
    
    var handledPages = {
        livememe: {
            pattern: /^(?:https?:\/\/)?(?:www\.)?livememe.com\/[a-z0-9]+$/,
            url: function () { return jq("#memeImage").attr("src"); }
        },
        quickmeme: {
            pattern: /^(?:https?:\/\/)?(?:www\.)?quickmeme.com\/meme\/[a-z0-9]+\/$/,
            url: function() { return jq("#img").attr("src"); }
        },
        memecaptain: {
            pattern: /^(?:https?:\/\/)?(?:www\.)?memecaptain.com\/gend_image_pages\/[a-zA-Z0-9]+\/?$/,
            url: function() { return jq("div.container-fluid p a img").attr("src"); }
        },
        memegen: {
            pattern: /^(?:https?:\/\/)?(?:www\.)?memegen.com\/meme\/[a-z0-9]+$/,
            url: function() { return jq("div.memeview img").attr("src"); }
        },
        memesnap: {
            pattern: /^(?:https?:\/\/)?(?:www\.)?memesnap.com\/meme\/view\/[a-z-]+\/[a-zA-Z0-9]+\/?$/,
            url: function() { return jq("div.row div.span7 img.thumbnail").attr("src"); }
        },
        memedad: {
            pattern: /^(?:https?:\/\/)?(?:www\.)?memedad.com\/meme\/[0-9]+$/,
            url: function() { return jq("#meme").attr("src"); }
        },
        memegenerator: {
            pattern: /^(?:https?:\/\/)?(?:www\.)?memegenerator.net\/instance\/[0-9]+$/,
            url: function() { return jq("div.instance div.left > img").attr("src"); }
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
})();