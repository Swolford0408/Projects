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
function getEnv(d){
    session = sessionStorage.getItem('SessionID');
    $.get('https://simplecoop.swollenhippo.com/environment.php',{SessionID: session, days: d},function(result){
    console.log(result)
    // if(result.Outcome != false){
    //     // let strHTML = 
    //     // '<tr id="tr' + task.TaskID + '">' + 
    //     //     '<td>' +  task.TaskName + '</td>' +
    //     //     '<td>' +  task.DueDate + '</td>' +
    //     //     '<td>' +  task.Location + '</td>' +
    //     //     '<td>' +  task.Instructions + '</td>' +
    //     //     '<td>' + 
    //     //     '<div class="d-flex justify-content-end">' +  
    //     //         '<button id="btnDelete" data-search="' + task.TaskID + '"class="btn btn-danger" type="button">Delete</button>' + 
    //     //     '</div>' +
    //     //     '</td>' +
    //     // '</tr>';
    //     }

    });

}


$('#btnEnvGet').on('click',function(){
    console.log('hello')
    getEnv(48)
})



// arrTasks.forEach(function(task){
//     $('#tblTasks tbody').append(
//         '<tr id="tr' + task.TaskID + '">' + 
//             '<td><input id="checkBox' + task.TaskID + '" data-search="' + task.TaskID + '" class="form-check-input" type="checkbox" value=""' + task.Status + '></td>' +
//             '<td>' +  task.TaskName + '</td>' +
//             '<td>' +  task.DueDate + '</td>' +
//             '<td>' +  task.Location + '</td>' +
//             '<td>' +  task.Instructions + '</td>' +
//             '<td>' + 
//                 '<div class="d-flex justify-content-end">' +  
//                     '<button id="btnEdit" data-search="' + task.TaskID + '"class="btn btn-secondary me-2" type="button">Edit</button>' +  
//                     '<button id="btnDelete" data-search="' + task.TaskID + '"class="btn btn-danger" type="button">Delete</button>' + 
//                 '</div>' +
//             '</td>' +
//         '</tr>'
//     );
// })


