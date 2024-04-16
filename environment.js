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


//make a table for the entries

function getRandomObservationDatetime() {
    // Get the current date
    var currentDate = new Date();
    // Generate a random number of days between 0 and 100
    var randomDays = Math.floor(Math.random() * 101);
    // Calculate the random date within the specified range
    var randomDate = new Date(currentDate);
    randomDate.setDate(currentDate.getDate() - randomDays);
    // Format the date in ISO string format
    var observationDatetime = randomDate.toISOString();
        return observationDatetime;
    }

function getRandomTemperature() {
    // Generate a random temperature between 42 and 90
    return Math.random() * (90 - 42) + 42;
}

function getRandomHumidity() {
    // Generate a random humidity between 30 and 98
    return Math.random() * (98 - 30) + 30;

}

$('#btnEnvAdd').on('click',function(){
    console.log('hello add edition')


        // Loop to execute the code block 100 times
    for (var i = 0; i < 100; i++) {
        // The SessionID and additional data with random temperature, humidity, and observationdatetime
        var requestData = {
            SessionID: sessionStorage.getItem('SessionID'),
            temperature: getRandomTemperature(),
            observationDateTime: getRandomObservationDatetime(),
            humidity: getRandomHumidity()
        };

        // Making the AJAX request using POST
        $.post('https://simplecoop.swollenhippo.com/environment.php',requestData, function(result) {
            console.log(result);
        });
    }

})

// pulls all logs and turns them into a data table
function getEnv(d){
    session = sessionStorage.getItem('SessionID');
    $.getJSON('https://simplecoop.swollenhippo.com/environment.php',{SessionID: session, days: d},function(result){
        console.log(result)
        if(result.Outcome != false){
            // loops through all logs and puts them into a table 
            result.forEach(element => {
                let strHTML = 
                '<tr data-id="' + element.LogID + '" class="table-success">' + 
                    '<td>' +  element.ObservationDateTime +

                    ' </td>' +
                    '<td>' +
                        '<div class="progress">' +
                            '<div class="progress-bar bg-danger" role="progressbar" style="width: '+ element.Temperature + '% " aria-valuenow="'+ element.Temperature + '" aria-valuemin="0" aria-valuemax="100">'+ element.Temperature + '&deg' +'</div>' +
                        '</div>' + 
                    '</td>' +
                    '<td>' + 
                        '<div class="progress">' +
                            '<div class="progress-bar" role="progressbar" style="width: '+ element.Humidity + '% " aria-valuenow="'+ element.Humidity + '" aria-valuemin="0" aria-valuemax="100">'+ element.Humidity + '%' +'</div>' +
                        '</div>' +
                    '</td>' +
                    '<td>' + 
                        '<button id="btnDeleteEnv" class="btn btn-danger bi-trash" type="button"></button>' +
                    '</td>' +
                    
                '</tr>';
                $('#tblEnv tbody').append(strHTML)
            });
            // turns table into a data table to get the pages/search/# of results 
            $(document).ready(function(){
                $('#tblEnv').dataTable();
            });  
            

                  
        }else {
            Swal.fire({
                icon:'error',
                title:'Oops',
                html: 'Error requesting Data'
            })
        }
        return true;
    });
    return true;
}

$('#btnDeleteEnv').on('click',function(){
    console.log('delete clicked')
    session = sessionStorage.getItem('SessionID');
    id = $(this).data('id')
    $.ajax({
        url:'https://simplecoop.swollenhippo.com/environment.php',
        data: {SessionID:session, LogID:id },
        type: 'DELETE',
        success: function(result){
            console.log(result.Outcome);
            $(this).parent().delete();
            $("#tblEnv").ajax.reload();
        },
        error: function(result){
            Swal.fire({
                icon:'error',
                title:'Oops',
                html: 'Error Deleting Data' + result.Outcome
            })
        }
    })
});

// creates table and displays it 
getEnv(100)

// $('#btnEnvGet').on('click',function(){
//     $('#tblEnv tbody').empty()
//     getEnv(100)
// })
