// Toggle to show settings card

$('#btnSettingsToggle').on('click',function(){
    const strCard = $(this).attr('data-card');
    if(strCard === 'dashboard'){
        $('#divSettings').slideToggle(function(){
            $('#divDashboard').slideToggle();
        })
    } else {
        $('#divDashboard').slideToggle(function(){
            $('#divSettings').slideToggle();
        })
    }
})

// Used to update the fan speed
$(document).on('input', '#rangeFanSpeed', function() {
    $('#spanFanSpeed').html( `${$(this).val()} RPM` );
});

// Used to see the current light status (on / off)
$('input[name="btnLightRadio"]').change(function() {
    const activeRadioValue = $(this).val();
    console.log("Active radio button value: " + activeRadioValue);
});


$('#btnFeedChickens').on('click', function(){
    // let storedTime = '';
    // $.getJSON(strSettingsUrl, postObj, (result)=>{
    // })  
    const strSettingsUrl = 'https://simplecoop.swollenhippo.com/settings.php';

    const postObj = {
        SessionID:sessionStorage.getItem('SessionID'), 
        setting: 'TimeFed',
        value: `${Date.now()}`
    }

    console.log(postObj);

    $.post(strSettingsUrl, postObj, (result)=>{
        console.log(result);
    });
});

let intervalID = null;

$("#chickenParty").on('click', function(){
    const htmlSettingsCard = document.getElementById("divSettings");

    const danceSong = new Audio('./audio_files/chickenDance.mp3');

    if(!danceSong.paused){
        danceSong.pause();
        clearInterval(intervalID);
    }else{
        danceSong.play();
        intervalID = setInterval(()=>{
            party.confetti(htmlSettingsCard, {
                count: party.variation.range(20, 40)
            })
        }, 1000)
    }
})

// Used to quickly login to save development time
$('#btnDevLogin').on('click', function(){
    createSession("coop@example.com", "ASD123asd", "login");
})