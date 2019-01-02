function get(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function () {
        if (request.status === 200 && request.responseText) {
            try {
                callback(JSON.parse(request.responseText));
            }
            catch(ex){
                console.groupCollapsed(ex);
                console.warn("Couldn't parse")
                console.log(request.responseText)
                console.groupEnd()
            }
        }
    }
    request.send();
}

function post(url,data, callback){
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('Content-type', 'application/json');

    request.onreadystatechange = function () {
        if (request.status === 200 && request.responseText) {
            try {
                callback(JSON.parse(request.responseText));
            }
            catch(ex){
                console.groupCollapsed(ex);
                console.warn("Couldn't parse")
                console.log(request.responseText)
                console.groupEnd()
            }
        }
    }
    request.send(data);
}