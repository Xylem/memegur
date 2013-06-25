function onMessage(request, sender, sendResponse) {
    switch (request.type) {
        case "showIcon":
            chrome.pageAction.show(sender.tab.id);
            break;
    }
}

function rehostImage(tab) {
    var clientId = "e3afa33c1e77fad";

    function uploadImage(response) {
        var url = response.url;
        
        if (!url) {
            return;
        }
        
        $.ajax({
            dataType: "json",
            type: "POST",
            url: "https://api.imgur.com/3/image?image=" + url,
            headers: {
                Authorization: "Client-ID " + clientId
            },
            success: function (data) {
                if (data.success && !!data.data.id) {
                    chrome.tabs.update(tab.id, { url : "http://imgur.com/" + data.data.id } );
                }
            }
        });
    }

    chrome.tabs.sendMessage(tab.id, { type: "findUrl" }, uploadImage);
}

chrome.runtime.onMessage.addListener(onMessage);
chrome.pageAction.onClicked.addListener(rehostImage);