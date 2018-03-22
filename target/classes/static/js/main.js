$('#get-btn').click(function() {
    var key=$('#key').val();
    var url="api/get/" + key;
    console.log("Calling: " + url);
    $('.response-body').html('Calling REST endpoint');
    if ( key == "" ) {
        $('.response-body').html('Please enter a key.');
    } else {
        $.ajax({
            type: 'GET',
            url: url,
            success: function(result){
                var ret = "<table><tr><th>Key</th><th>Value</th></tr>"
                for (i in result) {
                    ret += "<tr><td>"+i+"</td><td>"+result[i]+"</td></tr>";
                }
                ret += "</table>"
                $('.response-body').html(ret);
            },
            error: function(xhr, status, error) {
                $('.response-body').html(
                    "status: " + status + "<br>" +
                    "error: " + error + "<br>" +
                    "xhr: " + "<pre>" + syntaxHighlight(xhr) + "</pre>"
                );
            },
            dataType: 'json'
        });
    }
});

$('#getAllKeyValues-btn').click(function() {
    var url="api/get/*";
    console.log("Calling: " + url);
    $('.response-body').html('Calling REST endpoint');
    $.ajax({
        type: 'GET',
        url: url,
        success: function(result){
            var ret = "<table><tr><th>Key</th><th>Value</th></tr>"
            for (i in result) {
                ret += "<tr><td>"+i+"</td><td>"+result[i]+"</td></tr>";
            }
            ret += "</table>"
            $('.response-body').html(ret);
        },
        error: function(xhr, status, error) {
            $('.response-body').html(
                "status: " + status + "<br>" +
                "error: " + error + "<br>" +
                "xhr: " + "<pre>" + syntaxHighlight(xhr) + "</pre>"
            );
        },
        dataType: 'json'
    });
});

$('#VCAP_SERVICES-btn').click(function() {
    var url="api/info";
    console.log("Calling: " + url);
    $('.response-body').html('Calling REST endpoint');
    $.ajax({
        type: 'GET',
        url: url,
        success: function(result){
            $('.response-body').html('<div class="prettyjson"><pre>' + syntaxHighlight(result) + "</pre>");
        },
        error: function(xhr, status, error) {
            $('.response-body').html(
                "status: " + status + "<br>" +
                "error: " + error + "<br>" +
                "xhr: " + "<pre>" + syntaxHighlight(xhr) + "</pre>"
            );
        },
        dataType: 'json'
    });
});

$('#set-btn').click(function() {
    var key=$('#key').val();
    var value=$('#value').val();
    var url="api/set/" + key +"/" + value;
    console.log("Calling: " + url);
    $('.response-body').html('Calling REST endpoint');
    if ( key == "" ) {
        $('.response-body').html('Please enter a key.');
    } else if ( value == "" ) {
        $('.response-body').html('Please enter a value.');
    } else {
        $.ajax({
            type: 'PUT',
            url: url,
            success: function(){
                $('.response-body').html("ok");
            },
            error: function(xhr, status, error) {
                $('.response-body').html(
                    "status: " + status + "<br>" +
                    "error: " + error + "<br>" +
                    "xhr: " + "<pre>" + syntaxHighlight(xhr) + "</pre>"
                );
            }
        });
    }
});

$('#setRandom-btn').click(function() {
    var count = 10;
    var url="api/set/random/" + count;
    $('.response-body').html('Calling REST endpoint');
    $.ajax({
        type: 'PUT',
        url: url,
        success: function(){
            $('.response-body').html("ok");
        },
        error: function(xhr, status, error) {
        $('.response-body').html(
            "status: " + status + "<br>" +
            "error: " + error + "<br>" +
            "xhr: " + "<pre>" + syntaxHighlight(xhr) + "</pre>"
            );
        }
    });
});

$('#del-btn').click(function() {
    var key=$('#key').val();
    var url="api/del/" + key;
    console.log("Calling: " + url);
    $('.response-body').html('Calling REST endpoint');
    if ( key == "" ) {
        $('.response-body').html('Please enter a key.');
    } else {
        $.ajax({
            type: 'DELETE',
            url: url,
            success: function(){
                $('.response-body').html("ok");
            },
            error: function(xhr, status, error) {
            $('.response-body').html(
                "status: " + status + "<br>" +
                "error: " + error + "br" +
                "xhr: " + "<pre>" + syntaxHighlight(xhr) + "</pre>"
                );
            }
        });
    }
});

$('#flushAll-btn').click(function() {
    var url="/api/del/*";
    console.log("Calling: " + url);
    $('.response-body').html('Calling REST endpoint');
    $.ajax({
        type: 'DELETE',
        url: url,
        success: function(){
            $('.response-body').html("ok");
        },
        error: function(xhr, status, error) {
            $('.response-body').html(
                "status: " + status + "<br>" +
                "error: " + error + "<br>" +
                "xhr: " + "<pre>" + syntaxHighlight(xhr) + "</pre>"
            );
        }
    });
});
//https://stackoverflow.com/a/7220510
function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}