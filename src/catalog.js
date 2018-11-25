//var vin, year, make, model, body_type, drive_type, coi, styleid, price, engine_type, fuel_type, hp, engine_size, fe_cty, fe_hwy, fuel_cap, transmission, tire_size, interior, vObj, compressed;
var year, make, model, bodyType, driveType, styleID, price, subdivision, marketClass, vObj, compressed;



function generateCatalog() {
   var year = 2018//$("#year").val();
   var make = "Toyota"//$("#make").val();
   var model = "Sienna"//$("#model").val();
   var url = "https://us-central1-autolopedia.cloudfunctions.net/getCatalog/?year="+year+"&make="+make+"&model="+model;

   $.ajax({
       url: url,
       type: 'GET',
       success: function(results) {
    //    var success_code = obj['S:Envelope']['S:Body[0]'].VehicleDescription[0].responseStatus[0].$.responseCode
    //    console.log(success_code);

            obj = JSON.parse(JSON.stringify(results));
            console.log(obj);
            //vin = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].vinDescription[0].$.vin;
            //console.log(vin);
            year = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].$.modelYear;
            console.log(year);
            make = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].$.bestMakeName;
            console.log(make);
            model = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].$.bestModelName;
            console.log(model);
            var len = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].style.length;
            var styles = [];
            console.log(len);
            var i = 0;
            console.log(i);
            while (i < len) {
              bodyType = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].style[i].bodyType[0]['_'];
              console.log(bodyType);
              driveType = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].style[i].$.drivetrain;
              console.log(driveType);
              styleID = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].style[i].$.id;
              console.log(styleID);
              price = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].style[i].basePrice[0].$.msrp;
              console.log(price);
              subdivision = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].style[i].subdivision[0]['_'];
              console.log(subdivision);
              marketClass = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].style[i].marketClass[0]['_'];
              console.log(marketClass);
              styles.push(Style(bodyType, driveType, styleID, price, subdivision, marketClass));
              i += 1;
            }

            vObj = Catalog(year, make, model, styles);

            compressed = JSON.stringify(vObj);

            //return compressed;
       }
   });


};

function Style(bodyType, driveType, styleID, price, subdivision, marketClass) {
  this.bodyType = bodyType;
  this.driveType = driveType;
  this.styleid = styleID;
  this.price = price;
  this.subdivision = subdivision;
  this.marketClass = marketClass;
}

function Catalog(year, make, model, styles) {
    this.year = year;
    this.make = make;
    this.model = model;
    this.styles = styles;
}
