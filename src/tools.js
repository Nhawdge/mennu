function get(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send();
    //if (request.status === 200) {
        callback(request.responseText);
    //}
}