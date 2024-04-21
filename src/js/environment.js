// environment.php
// This endpoint can be used to create, delete, and view temperature and humidity observations.
// This is useful if you wish to create a graph that shows the observations or if you want to add an
// element to your UI that displays the last observed temperature and humidity

// Method: POST
// Required Parameters: SessionID, observationDateTime, temperature, humidity
// Expected Returns: A JSON Object with a key of Outcome

// Method: DELETE
// Required Parameters: SessionID, logID
// Expected Returns: A JSON Object with a key of Outcome

// Method: GET
// Required Parameters: SessionID, days
// Expected Returns: An array of JSON objects with all environment record details

// Uses Chart.js to show the last 30 entries in the environment DB table

$.getJSON('https://simplecoop.swollenhippo.com/environment.php',{SessionID: sessionStorage.getItem('SessionID'), days: 100},function(result){
    // Sort results by date
    result.sort((a,b)=>{
        return new Date(a.ObservationDateTime) - new Date(b.ObservationDateTime);
    })

    // Grab the first 30 entries and create arrays
    const arrSubset = result.reverse().slice(0, 30).reverse();
    const arrDates = arrSubset.map(obj => new Date(obj.ObservationDateTime).toLocaleString('default', { month: 'long', day: 'numeric' }));
    const arrTemps = arrSubset.map(obj => obj.Temperature);
    const arrHumidities = arrSubset.map(obj => obj.Humidity);

    const mixedChart = new Chart($('#canvEnv'), {
        data: {
            datasets: [{
                type: 'line',
                label: 'Temperature',
                data: arrTemps
            }, {
                type: 'line',
                label: 'Humidity',
                data: arrHumidities
            }],
            labels: arrDates
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
        }
    });
});

$('#btnEnvAdd').on('click', ()=>{

    let numHumidity = $('#inpEnvAddHumidity').val();
    let numTemperature = $('#inpEnvAddTemperature').val();
    let errStr = "";

    // Check if user entered anything
    if(numHumidity === "" || numTemperature === "") errStr += "<p>Both fields need to be filled.</p>";

    // Try converting inputs to numbers
    try{ numHumidity = Number(numHumidity); }
    catch(err){
        console.log(err);
        errStr += "<p>Humidity must be a number</p>"; 
    }

    try{ numTemperature = Number(numTemperature); }
    catch(err){
        console.log(err);
        errStr += "<p>Temperature must be a number</p>"; 
    }

    // Check if valid range for humidity
    if(numHumidity < 0 || numHumidity > 100){
        errStr += "<p>Humidity can only be a number between 0 and 100</p>";
    }

    // If any error occurred above, fire swal and exit function
    if(errStr){
        Swal.fire({
            icon:'error',
            title:'Oops',
            html: errStr 
        });

        return;
    }

    // Else, continue with request
    const requestData = {
        SessionID: sessionStorage.getItem('SessionID'),
        temperature: numTemperature,
        observationDateTime: new Date(),
        humidity: numHumidity
    };

    $.post('https://simplecoop.swollenhippo.com/environment.php', requestData, function(result) {
        result = JSON.parse(result);
        Swal.fire({
            icon:'success',
            title:'Successfully Added',
            html: `<p>${result.Outcome}</p>`
        });
    });
})

// DELETE SYNTAX IF NEEDED

// $.ajax({
//     url:'https://simplecoop.swollenhippo.com/environment.php',
//     data: {SessionID:session, LogID:id },
//     type: 'DELETE',
//     success: function(result){

//     }
// });