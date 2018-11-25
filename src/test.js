var vin, year, make, model, body_type, drive_type, coi, styleid, price, engine_type, fuel_type, hp, engine_size, fe_cty, fe_hwy, fuel_cap, transmission, tire_size, interior, vObj, compressed;



function callApi() {
   var vincode = $("#vincode").val();
   var url = "https://us-central1-autolopedia.cloudfunctions.net/getVin?vin=" + vincode;

   $.ajax({
       url: url,
       type: 'GET',
       success: function(results) {
    //    var success_code = obj['S:Envelope']['S:Body[0]'].VehicleDescription[0].responseStatus[0].$.responseCode
    //    console.log(success_code);

            obj = JSON.parse(JSON.stringify(results));
            console.log(obj);
            vin = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].vinDescription[0].$.vin;
            console.log(vin);
            year = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].vinDescription[0].$.modelYear;
            console.log(year);
            make = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].vinDescription[0].$.division;
            console.log(make);
            model = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].vinDescription[0].$.modelName;
            console.log(model);
            body_type = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].vinDescription[0].$.styleName;
            console.log(body_type);
            drive_type = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].vinDescription[0].$.drivingWheels;
            console.log(drive_type);
            coi = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].vinDescription[0].WorldManufacturerIdentifier[0]
            console.log(coi);
            styleid = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].style[0].$.id
            console.log(styleid);
            price = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].style[0].basePrice[0].$.msrp
            console.log(price);
            engine_type = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].engine[0].engineType[0]['_']
            console.log(engine_type);
            fuel_type = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].engine[0].fuelType[0]['_']
            console.log(fuel_type);
            hp = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].engine[0].horsepower[0].$.value
            console.log(hp);
            engine_size = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].engine[0].displacement[0].value[0]['_'] + " " + obj['S:Envelope']['S:Body'][0].VehicleDescription[0].engine[0].displacement[0].value[0].$.unit;
            console.log(engine_size);
            fe_cty = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].engine[0].fuelEconomy[0].city[0].$.low
            console.log(fe_cty);
            fe_hwy = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].engine[0].fuelEconomy[0].hwy[0].$.low
            console.log(fe_hwy);
            fuel_cap = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].engine[0].fuelCapacity[0].$.low + obj['S:Envelope']['S:Body'][0].VehicleDescription[0].engine[0].fuelCapacity[0].$.unit;
            console.log(fuel_cap);
            transmission = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].standard[3].description[0];
            console.log(transmission);
            tire_size = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].standard[8].description[0];
            console.log(tire_size);
            interior = obj['S:Envelope']['S:Body'][0].VehicleDescription[0].standard[25].description[0];
            console.log(interior);

            vObj = ADS(vin,year,make, model, body_type, drive_type, coi, styleid, price, engine_type, fuel_type, hp, engine_size, fe_cty, fe_hwy, fuel_cap, transmission, tire_size, interior);
            
            compressed = JSON.stringify(vObj);



       }
   });

  
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
}