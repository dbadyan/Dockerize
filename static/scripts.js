$(document).ready(function() {
    $('.js-data-example-ajax').select2({
        ajax: {
            url: 'https://hub.docker.com/api/content/v1/products/search',
            dataType: 'json',
            delay: 250,


            data: function(params) {
                var query = {
                    q: params.term,
                    page_size: '25',
                    type: 'image',
                    image_filter: 'official'
                }
                return query;
            },
            processResults: function(data) {
                var data_array = [];
                data.summaries.forEach(function(value, key) {
                    data_array.push({
                        id: value.name,
                        text: value.name,
                        image: value.logo_url && (value.logo_url.small || value.logo_url.large)
                    });
                });

                return {
                    results: data_array
                }
            }
        },
        placeholder: 'Search for a repository',
        //minimumInputLength: 2,
        templateResult: formatState
    });
});

$(document).ready(function() {
    $("#generate").click(function(e) {
        var data = {
            image: $("#chosen").val(),
            aptGet: $("#aptGet").val(),
            instalNginx: $("#instalNginx").val(),
            expose: $("#expose").val(),
            start: $("#start").val()
        }
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/generate/',
            contentType: 'application/json',
            data: JSON.stringify(data)
        }).done(function(data) {
                generateFile(data);
        })
    });
});

$(document).ready(function() {
    $("#download-button").click(function(e) {
    $.ajax({
            type: 'POST',
            url: '/save/'
        }).done(function(resp) {
                console.log('done');
                console.log(resp['dockerFile']);
                resp = resp['dockerFile'].replaceAll('</br>', '\r\n')
                download(resp,'dockerfile','')

        })
    })
})

function formatState(data) {
    console.log("state:" + JSON.stringify(data))
    if (data.loading) {
        return data.text;
    }
    var $container = $("<div class='imagebox'><img src='" + data.image + "' style='width: 50px; height: 50px' />" +
    "<span>" + data.text + "</span>" +
    "</div>")
    return $container;
}

function generateFile(data) {
    var dockerBorder = document.getElementById("dockerFileBorder");
        dockerBorder.style.visibility = "visible";
        for (const [key, value] of Object.entries(data)) {
            console.log(key, value);
            document.getElementById("dockerFileContent").innerHTML += "</br>" + value
            }
//        sendAdditionalCommands();

}

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}