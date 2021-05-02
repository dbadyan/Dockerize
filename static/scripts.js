    $(document).ready(function() {
    $('.js-data-example-ajax').select2({
  ajax: {
    url: 'https://hub.docker.com/api/content/v1/products/search',
    dataType: 'json',
    delay: 250,

    data: function (params) {
        var query = {
            q: params.term,
            page_size: '25',
            type: 'image',
            image_filter: 'official'
        }
        return query;
    },
    processResults: function (data) {
            var data_array = [];
            data.summaries.forEach(function(value,key){
                data_array.push({id:value.name,text:value.name});
            });

            return {
                results: data_array
            }
        }
  },
  //templateResult: formatState
});
function formatState (data){
console.log("state:" + JSON.stringify(data))
 if (data.loading) {
    return data.text;
  }
  var $container = $("<div class='select2-result-repository__avatar'><img src='" + data.summaries.logo_url.large + "' /></div>")
  return $container;
}
});
    function revealBorder(){
        var dockerBorderStatus = document.getElementById("dockerFileBorder");
        console.log(dockerBorderStatus);
        if(dockerBorderStatus.style.visibility == "visible"){
           dockerBorderStatus.style.visibility = "hidden";
           console.log("to hidden");
           }
        else{
           dockerBorderStatus.style.visibility = "visible";
           console.log("to visible");
        }

    }