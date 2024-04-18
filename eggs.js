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

function getEggTable() {
    $.getJSON('https://simplecoop.swollenhippo.com/eggs.php', {SessionID:sessionStorage.getItem('SessionID'), days:100}, function(result) {
        result.forEach(function(eggRecord) {
            eggTable.row.add([eggRecord.LogDateTime, eggRecord.Harvested, '<button class="btn btn-danger btnDeleteEgg bi-trash" type="button" data-search="' + eggRecord.LogID + '"></button>']).draw();
        })
    })
}

var eggTable = new DataTable('#tblEgg');

$('#btnHarvest').on('click', function() {
    let intEggHarvest = $('#numEggHarvest').val();
    let randObs = getRandomObservationDatetime();

    if (intEggHarvest) {
        $.post('https://simplecoop.swollenhippo.com/eggs.php', {SessionID:sessionStorage.getItem('SessionID'), observationDateTime:randObs, eggs:intEggHarvest}, function(result) {
            result = JSON.parse(result);
            console.log(result);
            eggTable.row.add([randObs, intEggHarvest, '<button class="btn btn-danger btnDeleteEgg bi-trash" type="button" data-search="' + result.LogID + '"></button>']).draw();
        })
    }
})

$(document).on('click', '.btnDeleteEgg', function() {
    let strLogID = $(this).attr('data-search');

    $.ajax({
        url:'https://simplecoop.swollenhippo.com/eggs.php',
        data:{SessionID:sessionStorage.getItem('SessionID'), logID:strLogID},
        type:'DELETE',
        success:function(result) {
            console.log(result);

            eggTable.rows().remove();
            getEggTable();
        }
    })
})

getEggTable();
