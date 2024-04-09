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

const danceSong = new Audio('./audio_files/chickenDance.mp3');
const images = [];
$("#chickenParty").on('click', function(){
    const htmlSettingsCard = document.getElementById("divSettings");

    if(images.length > 0){
        images.forEach((img)=>{
            img.remove();
        })
    }
    if(!danceSong.paused){
        danceSong.pause();
        clearInterval(intervalID);
    }else{
        danceSong.play();
        
        const numImages = 10;
        
        // Loop to create and position images
        for (let i = 0; i < numImages; i++) {
            // Create new image element
            const img = new Image();
            img.src = "./images/chicken.png"; // Set image source
    
            // Get random position
            const pos = getRandomPosition();

            // Set image position
            img.style.width = '200px'
            img.style.height = '200px'
            img.style.left = pos[0] + 'px';
            img.style.top = pos[1] + 'px';
            img.style.position = 'absolute';
            img.style.transform = `rotate(${Math.random() * 360} deg)`;
    
            // Append image to the body
            document.body.appendChild(img);
            images.push(img);
        }

        intervalID = setInterval(()=>{
            party.confetti(htmlSettingsCard, {
                count: party.variation.range(20, 40)
            })

            for(let i = 0; i < images.length; i++){
                const pos = getRandomPosition();
                images[i].style.left = pos[0] + 'px';
                images[i].style.top = pos[1] + 'px';

            }
            
        }, 1000)
    }
})

function getRandomPosition() {
    var x = Math.floor(Math.random() * window.innerWidth);
    var y = Math.floor(Math.random() * window.innerHeight);
    return [x, y];
}


// Used to quickly login to save development time
$('#btnDevLogin').on('click', function(){
    createSession("coop@example.com", "ASD123asd", "login");
})