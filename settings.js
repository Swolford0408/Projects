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

// GLOBAL VARIABLES
const strSettingsUrl = 'https://simplecoop.swollenhippo.com/settings.php';
let intLastTimeChickensFed = null;

// SETUP Variables
$.getJSON(strSettingsUrl, {SessionID: sessionStorage.getItem('SessionID'), setting: 'TimeFed'}, (result)=>{
    intLastTimeChickensFed = Number(result.Value);
})

// If it has been at least ten minutes since last time.
if(Number(intLastTimeChickensFed) + 600000 < Date.now()){
    $('#btnFeedChickens').removeClass('d-none');
}else{
    
}

const createTimer = (numTimeinMiliSec)=>{

    const timeLeftObj = {
        sec: Math.floor((numTimeinMiliSec % 60000) / 1000),
        min: Math.floor(numTimeinMiliSec / 60000)
    }

    const timer = setInterval(()=>{
        timeLeftObj.sec--;

        if(timeLeftObj.sec < 0){
            timeLeftObj.sec = 59;
            timeLeftObj.min--;
        }

        if(timeLeftObj.min < 0){
            $()
            clearInterval(timer);
        }else{
            $('#paraFeedTime').html(`${timeLeftObj.min < 10 ? '0'+timeLeftObj.min : timeLeftObj.min }:${timeLeftObj.sec < 10 ? '0'+timeLeftObj.sec : timeLeftObj.sec}`)
        }
    }, 1000)

    return timer
}

const feedChickens = ()=>{
    const timer = createTimer(60000);

    console.log(timer);
}

// Used to update the fan speed
$(document).on('input', '#rangeFanSpeed', function() {
    $('#spanFanSpeed').html( `${$(this).val()} RPM` );
});

// Used to see the current light status (on / off)
$('input[name="btnLightRadio"]').change(function() {
    const activeRadioValue = $(this).val();
    console.log("Active radio button value: " + activeRadioValue);
});

$('#btnFeedChickens').on('click', feedChickens)

$("#chickenParty").on('click', function(){
    
    
})


// Used to quickly login to save development time
$('#btnDevLogin').on('click', function(){
    createSession("coop@example.com", "ASD123asd", "login");
})