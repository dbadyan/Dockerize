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
        console.log("hi");
        var data = {
            image: $("#chosen").val()
        }
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/generate/',
            contentType: 'application/json',
            data: JSON.stringify(data)
        }).done(function(data) {
                revealBorder(data);
                console.log(data['dockerFile']);

        })
    });
});

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

function revealBorder(data) {
    var dockerBorder = document.getElementById("dockerFileBorder");
        dockerBorder.style.visibility = "visible";
        document.getElementById("dockerFileContent").innerHTML = "FROM " +  data['dockerFile'];
}