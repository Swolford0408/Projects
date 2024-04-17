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

function deleteEggs(){
    let successDelete = false;
    $.ajax({
        url:'https://simplecoop.swollenhippo.com/eggs.php',
        data:{SessionID:sessionStorage.getItem('SessionID')},
        type: 'DELETE',
        success: function(result){
            console.log(result);
            successDelete = true;
        }
    })
    return successDelete;
}

function getEggCount() {
    let intEggCount = 0;

    $.getJSON('https://simplecoop.swollenhippo.com/eggs.php', {SessionID:sessionStorage.getItem('SessionID'), days:100}, function(result) {
        console.log(result);

        result.forEach(function(eggRecord, index) {
            intEggCount += eggRecord.Harvested;
        })
    })

    console.log(intEggCount);

    return intEggCount;
}

function getEggTable() {
    $.getJSON('https://simplecoop.swollenhippo.com/eggs.php', {SessionID:sessionStorage.getItem('SessionID'), days:100}, function(result) {
        result.forEach(function(eggRecord) {
            $('#tblEgg tbody').append('<tr><td>' + eggRecord.LogDateTime + '</td><td>' + eggRecord.Harvested + '</td><td><button class="btn btn-danger col-12 btnDeleteEgg" type="button" data-search="' + eggRecord.LogID + '">Delete</button></td></tr>');
        })
    })

    $(document).ready(function(){
        $('#tblEnv').dataTable();
    });
}

$.getJSON('https://simplecoop.swollenhippo.com/eggs.php', {SessionID:sessionStorage.getItem('SessionID'), days:100}, function(result) {
    let intEggCount = 0;

    result.forEach(function(eggRecord, index) {
        intEggCount += eggRecord.Harvested;
    })

    $('#numTotalEggs').text(intEggCount);
})

$('#btnHarvest').on('click', function() {
    let intEggHarvest = $('#numEggHarvest').val();

    if (intEggHarvest) {
        $.post('https://simplecoop.swollenhippo.com/eggs.php', {SessionID:sessionStorage.getItem('SessionID'), observationDateTime:getRandomObservationDatetime(), eggs:intEggHarvest}, function(result) {
            result = JSON.parse(result);
            console.log(result);
        })
    }

    $.getJSON('https://simplecoop.swollenhippo.com/eggs.php', {SessionID:sessionStorage.getItem('SessionID'), days:100}, function(result) {
        console.log(result);
        let intEggCount = 0;

        result.forEach(function(eggRecord, index) {
            intEggCount += eggRecord.Harvested;
        })

        $('#numTotalEggs').text(intEggCount);
    })
})

$('#btnRefreshEgg').on('click', function() {
    $.getJSON('https://simplecoop.swollenhippo.com/eggs.php', {SessionID:sessionStorage.getItem('SessionID'), days:100}, function(result) {
        console.log(result);
        let intEggCount = 0;

        result.forEach(function(eggRecord, index) {
            intEggCount += eggRecord.Harvested;
        })

        $('#numTotalEggs').text(intEggCount);
    })

    $('#tblEgg tbody tr').remove();
    getEggTable();
})

$(document).on('click', '.btnDeleteEgg', function() {
    let strLogID = $(this).attr('data-search');

    $.ajax({
        url:'https://simplecoop.swollenhippo.com/eggs.php',
        data:{SessionID:sessionStorage.getItem('SessionID'), logID:strLogID},
        type:'DELETE',
        success:function(result) {
            console.log(result);

            $('#tblEgg tbody tr').remove();
            getEggTable();
        }
    })
})
