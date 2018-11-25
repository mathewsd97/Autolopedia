//var vin, year, make, model, body_type, drive_type, coi, styleid, price, engine_type, fuel_type, hp, engine_size, fe_cty, fe_hwy, fuel_cap, transmission, tire_size, interior, vObj, compressed;
var year, make, model, bodyType, driveType, styleID, price, subdivision, marketClass, vObj, compressed;
var vObj = new Map();

function createTable() {
    var table = document.getElementById("catalogresponse");
       //console.log("DM row 0.0: " + table.rows.length);
    // clearTable(table);

    var row = table.insertRow(table.rows.length);
    row.insertCell(0).innerHTML = "Year";
    row.insertCell(1).innerHTML = vObj.get("Year");
    row = table.insertRow(table.rows.length);
    row.insertCell(0).innerHTML = "Make";
    row.insertCell(1).innerHTML = vObj.get("Make");
    row = table.insertRow(table.rows.length);
    row.insertCell(0).innerHTML = "Model";
    row.insertCell(1).innerHTML = vObj.get("Model");

    table = document.getElementById("cr");
    var titles = vObj.get("Styles");
    row = table.insertRow(table.rows.length);
    var i;
    for (i = 0; i < titles.length; i++) {
      row.insertCell(i).innerHTML = titles[i];
    }
    var objs = vObj.get("Styles");
    for (i = 0; i < objs.length; i++) {
      row = table.insertRow(table.rows.length);
      var j;
      for (j = 0; j < titles.length; j++) {
        row.insertCell(j).innerHTML = objs.get(titles[j]);
      }
    }
};

function clearTable(table) {
  console.log("DM row 3: " + JSON.stringify(table));
  var rowCount = table.rows.length;
  while(rowCount && --rowCount >= 0)
    table.deleteRow(rowCount);
}

function generateCatalog() {
   var year = $("#year").val();
   var make = $("#make").val();
   var model = $("#model").val();
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
            //vObj.set("Year", year);
            //console.log(year);
            make = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].$.bestMakeName;
            //vObj.set("Make", make);
            //console.log(make);
            model = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].$.bestModelName;
            //vObj.set("Model", make);
            //console.log(model);
            var len = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].style.length;
            var table = document.getElementById("catalogresponse");
            var row = table.insertRow(table.rows.length);
            row.insertCell(0).innerHTML = "Year";
            row.insertCell(1).innerHTML = year;
            row = table.insertRow(table.rows.length);
            row.insertCell(0).innerHTML = "Make";
            row.insertCell(1).innerHTML = make;
            row = table.insertRow(table.rows.length);
            row.insertCell(0).innerHTML = "Model";
            row.insertCell(1).innerHTML = model;


            table = document.getElementById("cr");
            var titles = ['Body Type', 'Drive Type', 'Style ID', 'Price', 'Subdivision', 'Market Class'];
            row = table.insertRow(table.rows.length);
            var i;
            for (i = 0; i < titles.length; i++) {
              row.insertCell(i).innerHTML = titles[i];
            }
            var styles = [];
            console.log(len);
            var i = 0;
            console.log(i);
            while (i < len) {
              row = table.insertRow(table.rows.length);
              bodyType = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].style[i].bodyType[0]['_'];
              console.log(bodyType);
              row.insertCell(0).innerHTML = bodyType;
              driveType = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].style[i].$.drivetrain;
              console.log(driveType);
              row.insertCell(1).innerHTML = driveType;
              styleID = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].style[i].$.id;
              console.log(styleID);
              row.insertCell(2).innerHTML = styleID;
              price = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].style[i].basePrice[0].$.msrp;
              console.log(price);
              row.insertCell(3).innerHTML = price;
              subdivision = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].style[i].subdivision[0]['_'];
              console.log(subdivision);
              row.insertCell(4).innerHTML = subdivision;
              marketClass = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].style[i].marketClass[0]['_'];
              console.log(marketClass);
              row.insertCell(5).innerHTML = marketClass;
              styles.push(Style(bodyType, driveType, styleID, price, subdivision, marketClass));
              i += 1;
            }
            //vObj.set("Styles", styles);
            console.log(styles);
            //vObj = Catalog(year, make, model, styles);

            compressed = JSON.stringify(vObj);

            //return compressed;
       }
   });

   //createTable();
};

function Style(bodyType, driveType, styleID, price, subdivision, marketClass) {
  this.bodyType = bodyType;
  this.driveType = driveType;
  this.styleid = styleID;
  this.price = price;
  this.subdivision = subdivision;
  this.marketClass = marketClass;

  this.vObj = []
}

function Catalog(year, make, model, styles) {
    this.year = year;
    this.make = make;
    this.model = model;
    this.styles = styles;

    this.vObj = [year, make, model, styles];
    return vObj;
}

function toggleTable() {
  var toggle1 = document.getElementById("catalogresponse");
  var toggle2 = document.getElementById("cr");
    if (toggle1.style.display == "none") {
        toggle1.style.display = "block";
        toggle2.style.display = "block";
        generateCatalog();
    } else {
        toggle1.style.display = "none";
        toggle2.style.display = "none";
        clearTable(toggle1);
        clearTable(toggle2);
    }
}
