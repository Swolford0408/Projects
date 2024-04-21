//Navbar actions
$('#liDashBoard').on('click', function(){
    // $('#divProfile').slideUp();
    $('#divSettings').slideUp();
    $('#divDashBoard').slideDown();
})

// $('#liProfile').on('click', function(){
//     $('#divProfile').slideDown();
//     $('#divSettings').slideUp();
//     $('#divDashBoard').slideUp();
// })

$('#liSettings').on('click', function(){
    // $('#divProfile').slideUp();
    $('#divSettings').slideDown();
    $('#divDashBoard').slideUp();
})

$('#liLogout').on('click',function(){
    if(deleteSession()){
        // $('#divProfile').slideUp();
        $('#divSettings').slideUp();
        $('#divDashBoard').slideUp();
        $('.navbar').slideUp();
        $('#divStart').slideDown();
        
        eggTable.clear().draw(); // gets rid of egg table if user logs out in case a different user then logs in
    }else{
        console.log("Failed to logout")
    }
})       
//login action
$('#btnLogin').on('click',function(){
    let strEmail = "coop@example.com" //$('#txtLoginUserName').val();
    let strPassword = "ASD123asd" //$('#txtLoginPassword').val();
    //if(!validateLogin()){
        // check if the email has an account first
        $.getJSON('https://simplecoop.swollenhippo.com/users.php',{Email:strEmail}, function(result){
            if(result){
                // create session
                createSession(strEmail,strPassword, "login");
            } else{
                Swal.fire({
                    icon:'error',
                    title:'Oops',
                    html: 'This email doesnt have an account'
                })
            }
        })
    //}
});

//Resgister Action
$('#btnRegister').on('click',function(){
    if(!validateRegistration()){
        let strEmail = $('#txtRegisterEmail').val();
        let strPassword = $('#txtRegisterPassword').val();
        let strFirstName = $('#txtRegisterFirstName').val();
        let strLastName = $('#txtRegisterLastName').val();
        let strAddressOne = $('#txtRegisterStreetAddress1').val();
        let strAddressTwo = $('#txtRegisterStreetAddress2').val();
        let strCity = $('#txtRegisterCity').val();
        let strState = $('#txtRegisterState').val();
        let strZip = $('#txtRegisterZIP').val();
        let strPhone = $('#txtRegisterPhone').val();
        let strCoopID = $('#txtRegisterCoopID').val();

        // check if user already exist
        $.getJSON('https://simplecoop.swollenhippo.com/users.php',{Email:strEmail}, function(result){
            if(!result){
                $.post('https://simplecoop.swollenhippo.com/users.php',{Email:strEmail,Password:strPassword,FirstName:strFirstName,LastName:strLastName,CoopID:strCoopID},function(result){
                    result=JSON.parse(result);
                    if(result.Outcome == 'New User Created'){
                        // create Session
                        createSession(strEmail, strPassword, "register");
                    }
                })
                $.post('https://simplecoop.swollenhippo.com/useraddress.php',{Email:strEmail,Street1:strAddressOne,Street2:strAddressTwo,City:strCity,State:strState,ZIP:strZip},function(result){
                    result=JSON.parse(result);
                })

            } else{
                Swal.fire({
                    icon:'error',
                    title:'Oops',
                    html: 'This email already has an account'
                })
            }
        })
    }
});

//Toggling between login registration
$('.btnToggle').on('click',function(){
    let strCard = $(this).attr('data-card');
    if(strCard == 'Login'){
        $('#divLogin').slideToggle(function(){
            $('#divRegister').slideToggle();
        })
    } else if (strCard == 'Register') {
        $('#divRegister').slideToggle(function(){
            $('#divLogin').slideToggle();
        })
    } else if (strCard == 'welcomeLogin'){
        $('#divStart').slideToggle(function(){
            $('#divLogin').slideToggle();
        })
    } else if (strCard == 'welcomeRegister'){
        $('#divStart').slideToggle(function(){
            $('#divRegister').slideToggle();
        })  
    }
})

//Generates New Coop ID
$('#btnGenerateCoopID').on('click',function(){
    $.post('https://simplecoop.swollenhippo.com/coop.php',function(objCoopID){
        objCoopID = JSON.parse(objCoopID)
        $('#txtRegisterCoopID').val(objCoopID.CoopID);
    });
})