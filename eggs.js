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

// populate table of eggs
function getEggTable() {
    $.getJSON('https://simplecoop.swollenhippo.com/eggs.php', {SessionID:sessionStorage.getItem('SessionID'), days:100}, function(result) {
        console.log(result);
        result.sort((a,b)=>{
            return new Date(a.LogDateTime) - new Date(b.LogDateTime);
        })
        
        const dates = result.map(obj => new Date(obj.LogDateTime).toLocaleString('default', { month: 'long', day: 'numeric' }));
        const harvests = result.map(obj => obj.Harvested);
        const mixedChart = new Chart($('#canvEggs'), {
            data: {
                datasets: [
                    {
                        type: 'line',
                        label: 'Harvests',
                        data: harvests
                    }
                ],
                labels: dates
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
            }
        });

        result.forEach(function(eggRecord) {
            eggTable.row.add([eggRecord.LogDateTime.slice(0, 10), eggRecord.Harvested, '<button class="btn btn-danger btnDeleteEgg bi-trash" type="button" data-search="' + eggRecord.LogID + '"></button>']).draw();
        });
    })
}

// DataTable object of eggs
var eggTable = new DataTable('#tblEgg', {pageLength:5});

// user enters number of eggs harvested on a random date
$('#btnHarvest').on('click', function() {
    let intEggHarvest = $('#numEggHarvest').val();
    let randObs = getRandomObservationDatetime();

    if (intEggHarvest) {
        $.post('https://simplecoop.swollenhippo.com/eggs.php', {SessionID:sessionStorage.getItem('SessionID'), observationDateTime:randObs, eggs:intEggHarvest}, function(result) {
            result = JSON.parse(result);
            eggTable.row.add([randObs.slice(0, 10), intEggHarvest, '<button class="btn btn-danger btnDeleteEgg bi-trash" type="button" data-search="' + result.LogID + '"></button>']).draw();
        })
    }
})

// user clicks delete button in row and it gets rid of egg count for that day
$(document).on('click', '.btnDeleteEgg', function() {
    let strLogID = $(this).attr('data-search');

    $.ajax({
        url:'https://simplecoop.swollenhippo.com/eggs.php',
        data:{SessionID:sessionStorage.getItem('SessionID'), logID:strLogID},
        type:'DELETE',
        success:function() {
            eggTable.clear().draw();
            getEggTable();
        }
    })
})

// auto loads egg table if there is already a sesssion id
if (sessionStorage.getItem('SessionID')) {
    getEggTable();
}


