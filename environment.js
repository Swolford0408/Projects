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

// Uses Chart.js to show the last 60 entries in the environment DB table

$.getJSON('https://simplecoop.swollenhippo.com/environment.php',{SessionID: sessionStorage.getItem('SessionID'), days: 100},function(result){
    result.sort((a,b)=>{
        return new Date(a.ObservationDateTime) - new Date(b.ObservationDateTime);
    })

    const lastSixty = result.reverse().slice(0, 60).reverse();

    const dates = lastSixty.map(obj => new Date(obj.ObservationDateTime).toLocaleString('default', { month: 'long', day: 'numeric' }));
    const temps = lastSixty.map(obj => obj.Temperature);
    const humidities = lastSixty.map(obj => obj.Humidity);

    const mixedChart = new Chart($('#canvEnv'), {
        data: {
            datasets: [{
                type: 'line',
                label: 'Temperature',
                data: temps
            }, {
                type: 'line',
                label: 'Humidity',
                data: humidities
            }],
            labels: dates
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
        }
    });
});


// DELETE SYNTAX IF NEEDED

// $.ajax({
//     url:'https://simplecoop.swollenhippo.com/environment.php',
//     data: {SessionID:session, LogID:id },
//     type: 'DELETE',
//     success: function(result){

//     }
// });