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
        minimumInputLength: 2,
        templateResult: formatState
    });
});

$(document).ready(function() {
    $("#generate").click(function(e) {
        var data = {};
        data['image'] = $("#chosen").val()
        if (!document.getElementById('aptGet').disabled){
            data['aptGet'] = $("#aptGet").val();
        }
         if (!document.getElementById('instalNginx').disabled){
            data['instalNginx'] = $("#instalNginx").val();
        }
         if (!document.getElementById('expose').disabled){
            data['expose'] = $("#expose").val();
        }
         if (!document.getElementById('start').disabled){
            data['start'] = $("#start").val();
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
        download(document.getElementById("dockerFileContent").innerText,'Dockerfile','')
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
    var instructionsElement = document.getElementById("instructions");
    instructionsElement.style.visibility = "visible";
    document.getElementById("dockerFileContent").innerHTML = data['dockerFile'];
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
$(document).ready(function() {
    var btn = document.getElementById('copy-button');
    var clipboard = new ClipboardJS(btn);
});
$('#chosen').on("select2:selecting", function(e) {
   document.getElementById('generate').disabled = false;
});