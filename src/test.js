function callApi() {
    var vincode = $("#vincode").val();
    var url = "https://us-central1-autolopedia.cloudfunctions.net/getVin?    symbol=" + vincode;
 
    $.ajax({
        url: url,
        dataType: 'getVin',
        success: function(results){
            var status = results.Status;
            var company = results.Name;
            $('#results').append(status + '. Company is: ' + company);
        }
    });

    $.ajax(settings).done(function (response) {
        $('body').append(response);
    });
 };