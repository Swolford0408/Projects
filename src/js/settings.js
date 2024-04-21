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
});

// Used to quickly login to save development time
$('#btnDevLogin').on('click', function(){
    createSession("coop@example.com", "ASD123asd", "login");
   $('#divDashBoard').slideToggle();
   $('.navbar').slideToggle();
})

// Erik Bowling
// Smart Coop

// GLOBAL VARIABLES
const strSettingsUrl = 'https://simplecoop.swollenhippo.com/settings.php';
var intLastTimeChickensFed = null;

/////////////////////////////////////////////
// FEEDING and TIMER
/////////////////////////////////////////////

$.getJSON(strSettingsUrl, {SessionID: sessionStorage.getItem('SessionID'), setting: 'TimeFed'}, (result)=>{
    intLastTimeChickensFed = Number(result.Value);
    const intTimeLeft = intLastTimeChickensFed + 600000 - Date.now();

    // If it has been less than 10 minutes, start the timer.

    if(intTimeLeft > 0){
        $('#btnFeedChickens').hide();
        $('#paraFeedTime').show();
        createTimer(intTimeLeft);
    }else{
        $('#btnFeedChickens').show();
        $('#paraFeedTime').hide();
    }
});

// Used to create the setInterval to count down when you can feed chickens again.
const createTimer = (numTimeinMiliSec)=>{

    const timeLeftObj = {
        sec: Math.floor((numTimeinMiliSec % 60000) / 1000),
        min: Math.floor(numTimeinMiliSec / 60000)
    }

    // Timer with clock like behavior
    const timer = setInterval(()=>{
        timeLeftObj.sec--;

        if(timeLeftObj.sec < 0){
            timeLeftObj.sec = 59;
            timeLeftObj.min--;
        }

        if(timeLeftObj.min < 0){
            $('#btnFeedChickens').show();
            $('#paraFeedTime').hide();
            clearInterval(timer);
        }else{
            $('#paraFeedTime').html(`${timeLeftObj.min < 10 ? '0'+timeLeftObj.min : timeLeftObj.min }:${timeLeftObj.sec < 10 ? '0'+timeLeftObj.sec : timeLeftObj.sec}`)
        }
    }, 1000);

    return timer;
}

$('#btnFeedChickens').on('click', function(){
    $('#btnFeedChickens').slideToggle(function(){
        $('#paraFeedTime').slideToggle();
    })

    $('#paraFeedTime').html('10:00');

    createTimer(600000);
    
    const objPutParams = {
        SessionID: sessionStorage.getItem('SessionID'), 
        setting: 'TimeFed', 
        value: Date.now()
    }

    $.ajax({
        url: strSettingsUrl,
        type: 'PUT',
        data: objPutParams,
        success: function(result){
            console.log(result)
        }
    });
});

/////////////////////////////////////////////
// FAN SPEED
/////////////////////////////////////////////

$(document).on('input', '#rangeFanSpeed', function() {
    $('#spanFanSpeed').html( `${$(this).val()} RPM` );
});

/////////////////////////////////////////////
// LIGHTS ON OR OFF
/////////////////////////////////////////////

// Turn the lights back to the way you last left them
$.getJSON(strSettingsUrl, {SessionID: sessionStorage.getItem('SessionID'), setting: 'LightsOnOff'}, (result)=>{
    const strLightStatus = result.Value;

    if(strLightStatus == "Off"){
        $('#btnToggleLightsOff').attr('checked', true)
    }else{
        $('#btnToggleLightsOn').attr('checked', true)
    }
});

// Click of the radio on or off.
$('input[name="btnLightRadio"]').change(function() {
    const activeRadioValue = $(this).val();

    const objPutParams = {
        SessionID: sessionStorage.getItem('SessionID'), 
        setting: 'LightsOnOff', 
        value: activeRadioValue
    }

    $.ajax({
        url: strSettingsUrl,
        type: 'PUT',
        data: objPutParams,
        success: function(result){
            console.log(result)
        }
    });

});