var vin, year, make, model, body_type, drive_type, coi, styleid, price, engine_type, fuel_type, hp, engine_size, fe_cty, fe_hwy, fuel_cap, transmission, tire_size, interior, compressed;
var vObj = new Map();

function createTable() {
    var table = document.getElementById("vinresponse");
      console.log("DM row 0.0: " + table.rows.length);
    // clearTable(table);

    var i;
    var rowNum = 0;

    // for(i = 0; i < vObj.length; i++) {

    vObj.forEach(function(value, key) {
       var row = null;

      row = table.insertRow(table.rows.length);
      // console.log("DM row 0: " + JSON.stringify(row));
      // console.log("DM row 0.1: " + table.rows.length);

      // Adding row to the table
      if (row != null) {
        // var col = 0
        row.insertCell(0).innerHTML = key;
        row.insertCell(1).innerHTML = value;

        console.log("DM row 1: " + key);
        console.log("DM row 2: " + value);
      }
    });
      // var row = null;

      // row = table.insertRow(table.rows.length);
      // console.log("DM row 0: " + JSON.stringify(row));
      // console.log("DM row 0.1: " + table.rows.length);

      // // Adding row to the table
      // if (row != null) {
      //   // var col = 0
      //   row.insertCell(0).innerHTML = JSON.stringify(table.rows[i].cells[0]);
      //   row.insertCell(1).innerHTML = vObj[i];

      //   console.log("DM row 1: " + JSON.stringify(table.rows[i].cells[0]));
      //   console.log("DM row 2: " + vObj[i]);
      // }
    // }
};

/* Clears the table, except for the first row */
function clearTable(table) {
  console.log("DM row 3: " + JSON.stringify(table));
  var rowCount = table.rows.length;
  while(rowCount && --rowCount > 0)
    table.deleteRow(rowCount);
}

async function callApi() {
   var vincode = $("#vincode").val();
   console.log("DM vin " + vincode);
   var url = "https://us-central1-autolopedia.cloudfunctions.net/getVin?vin=" + vincode;

  await $.ajax({
       url: url,
       type: 'GET',
       success: function(results) {
    //    var success_code = obj['S:Envelope']['S:Body[0]'].VehicleDescription[0].responseStatus[0].$.responseCode
    //    console.log(success_code);

            obj = JSON.parse(JSON.stringify(results));
            // console.log(obj);
            vin = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].vinDescription[0].$.vin;
            vObj.set("VIN", vin);
            // console.log(vin);
            year = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].vinDescription[0].$.modelYear;
            vObj.set("Year", year);
            // console.log(year);
            make = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].vinDescription[0].$.division;
            vObj.set("Make", make);
            // console.log(make);
            model = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].vinDescription[0].$.modelName;
            vObj.set("Model", model);
            // console.log(model);
            body_type = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].vinDescription[0].$.styleName;
            vObj.set("Body Type", body_type);
            // console.log(body_type);
            drive_type = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].vinDescription[0].$.drivingWheels;
            vObj.set("Driver Type", drive_type);
            // console.log(drive_type);
            coi = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].vinDescription[0].WorldManufacturerIdentifier[0]
            vObj.set("COI", coi);
            // console.log(coi);
            styleid = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].style[0].$.id
            vObj.set("Style ID", styleid);
            // console.log(styleid);
            price = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].style[0].basePrice[0].$.msrp
            vObj.set("Price", price);
            // console.log(price);
            engine_type = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].engine[0].engineType[0]['_']
            vObj.set("Engine Type", engine_type);
            // console.log(engine_type);
            fuel_type = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].engine[0].fuelType[0]['_']
            vObj.set("Fuel Type", fuel_type);
            // console.log(fuel_type);
            hp = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].engine[0].horsepower[0].$.value
            vObj.set("HP", hp);
            // console.log(hp);
            engine_size = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].engine[0].displacement[0].value[0]['_'] + " " + obj['S:Envelope']['S:Body'][0].VehicleDescription[0].engine[0].displacement[0].value[0].$.unit;
            vObj.set("Engine Size", engine_size);
            // console.log(engine_size);
            // fe_cty = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].engine[0].fuelEconomy[0].city[0].$.low
            // console.log(fe_cty);
            // fe_hwy = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].engine[0].fuelEconomy[0].hwy[0].$.low
            // console.log(fe_hwy);
            fuel_cap = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].engine[0].fuelCapacity[0].$.low + obj['S:Envelope']['S:Body'][0].VehicleDescription[0].engine[0].fuelCapacity[0].$.unit;
            vObj.set("Fuel Capacity", fuel_cap);
            // console.log(fuel_cap);
            transmission = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].standard[3].description[0];
            vObj.set("Transmission", transmission);
            // console.log(transmission);
            tire_size = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].standard[8].description[0];
            vObj.set("Tire Size", tire_size);
            // console.log(tire_size);
            interior = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].standard[25].description[0];
            vObj.set("interior", interior);
            // console.log(interior);

            // vObj = ADS(vin,year,make, model, body_type, drive_type, coi, styleid, price, engine_type, fuel_type, hp, engine_size, fe_cty, fe_hwy, fuel_cap, transmission, tire_size, interior);

            compressed = JSON.stringify(vObj);

            window.onload = function() {
                document.getElementById("vin").innerHTML = compressed;
            };

            ;
       }
   });

   createTable();
};


function ADS(vin, year, make, model, body_type, drive_type, coi, styleid, price, engine_type, fuel_type, hp, engine_size, fe_cty, fe_hwy, fuel_cap, transmission, tire_size, interior) {
    this.vin = vin;
    this.year = year;
    this.make = make;
    this.model = model;
    this.body_type = body_type;
    this.drive_type = drive_type;
    this.coi = coi;
    this.styleid = styleid;
    this.price = price;
    this.engine_type = engine_type;
    this.fuel_type = fuel_type;
    this.hp = hp;
    this.engine_size = engine_size;
    this.fe_cty = fe_cty;
    this.fe_hwy = fe_hwy;
    this.fuel_cap = fuel_cap;
    this.transmission = transmission;
    this.tire_size = tire_size;
    this.interior = interior;

    this.vObj = [vin, year, make, model, body_type, drive_type, coi, styleid, price, engine_type, fuel_type, hp, engine_size, fe_cty, fe_hwy, fuel_cap, transmission, tire_size, interior];

    return vObj;
}

function toggleTable() {
  var toggle = document.getElementById("vinresponse");
    if (toggle.style.display == "none") {
        toggle.style.display = "block";
        callApi();
    } else {
        toggle.style.display = "none";
    }
}
