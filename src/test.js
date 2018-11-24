function callApi() {
   var vincode = $("#vincode").val();
   var url = "https://us-central1-autolopedia.cloudfunctions.net/getVin?vin=" + vincode;

   $.ajax({
       url: url,
       type: 'GET',
       success: function(results){
           console.log(results);
       }
   });

  
};