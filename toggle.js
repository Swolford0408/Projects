// Changes the card from login to DashBoard and validates input

$('#btnLogin').on('click',function(){
    // validation function called for Login
    if(!validateLogin()){
      $('#divLogin').slideToggle(function(){
          $('#divDashboard').slideToggle();
      })
    }
});

// Changes the card from Registration to Dashboard and validates input
$('#btnRegister').on('click',function(){
    // validation function called for Registration
    if(!validateRegistration()){
      $('#divRegister').slideToggle(function(){
              $('#divDashboard').slideToggle();
      });
    }
});

// Changes between Login and Registration
$('.btnToggle').on('click',function(){
    // gets the card the user is currently on
    let strCard = $(this).attr('data-card');
    // checks which card the user is on and switches to the other card
    if(strCard == 'Login'){
        $('#divLogin').slideToggle(function(){
            $('#divRegister').slideToggle();
        })
    } else {
        $('#divRegister').slideToggle(function(){
            $('#divLogin').slideToggle();
        })
    }
})