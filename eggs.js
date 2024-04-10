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

// use $('#numTotalEggs').text(someNumber); to change <p>

$.getJSON('https://simplecoop.swollenhippo.com/eggs.php', {SessionID:sessionStorage.getItem('SessionID'), days:100}, function(result) {
    console.log(result);
})

$('#btnHarvest').on('click', function() {
    let intEggHarvest = $('#numEggHarvest').val();

    if (intEggHarvest) {
        $.post('https://simplecoop.swollenhippo.com/eggs.php', {SessionID:sessionStorage.getItem('SessionID'), observationDateTime:getRandomObservationDatetime(), eggs:intEggHarvest}, function(result) {
            result = JSON.parse(result);
            console.log(result);
        })
    }
})
