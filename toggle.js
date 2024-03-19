        $('#btnLogin').on('click',function(){
            let strEmail = $('#txtLoginUserName').val();
            let strPassword = $('#txtLoginPassword').val();
            if(!validateLogin()){
                createSession(strEmail,strPassword, "login");
            }
        });
        
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
                // create user
                $.post('https://simplecoop.swollenhippo.com/users.php',{Email:strEmail,Password:strPassword,FirstName:strFirstName,LastName:strLastName,CoopID:strCoopID},function(result){
                    result=JSON.parse(result);
                    if(!result.error){
                        console.log(result);
                        // create Session
                        createSession(strEmail, strPassword, "register");
                    }
                })
            }
        });
        
        $('.btnToggle').on('click',function(){
            let strCard = $(this).attr('data-card');
            if(strCard == 'Login'){
                $('#divLogin').slideToggle(function(){
                    $('#divRegister').slideToggle();
                })
                if($(window).width() < 720){
                    $('#divMain').removeClass('vh-100');
                }
            } else {
                $('#divRegister').slideToggle(function(){
                    $('#divLogin').slideToggle();
                })
                $('#divMain').addClass('vh-100');
            }
        })

        $('#btnLogOut').on('click',function(){
            if(deleteSession()){
                $('#divDashboard').slideToggle(function(){
                    $('#divLogin').slideToggle();
                })
            }else{
                console.log("Failed to logout")
            }
        })