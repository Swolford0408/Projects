      $('#btnLogin').on('click',function(){
            let strEmail = $('#txtLoginUserName').val();
            let strPassword = $('#txtLoginPassword').val();
            if(!validateLogin()){
                $.post('https://simplecoop.swollenhippo.com/sessions.php',{Email:strEmail,Password:strPassword},function(result){
                    result=JSON.parse(result);
                    if(result.Outcome != "false" && result.SessionID != "undefine"){
                        console.log(result);
                        sessionStorage.setItem("SessionID",result.SessionID)
                        $('#divLogin').slideToggle(function(){
                            $('#divDashboard').slideToggle();
                        })
                    }else{
                        console.log(result);
                        Swal.fire({
                            icon:'error',
                            title:'Invalid Credentials',
                            html:'Your password or username is invalid.'
                        })
                    }
                })
            }
        });
        
        $('#btnRegister').on('click',function(){
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
            $.post('https://simplecoop.swollenhippo.com/coop.php',function(objCoopID){
                objCoopID = JSON.parse(objCoopID)
                console.log(objCoopID);
                let strCoopID = objCoopID.CoopID;
            })
            if(!validateRegistration()){
                // create user
                $.post('https://simplecoop.swollenhippo.com/users.php',{Email:strEmail,Password:strPassword,FirstName:strFirstName,LastName:strLastName,CoopID:strCoopID},function(result){
                    result=JSON.parse(result);
                    if(!result.error){
                        console.log(result);
                        // create Session
                        $.post('https://simplecoop.swollenhippo.com/sessions.php',{Email:strEmail,Password:strPassword},function(result){
                            result=JSON.parse(result);
                            if(!result.error){
                                console.log(result);
                                sessionStorage.setItem("SessionID",result.SessionID)
                                $('#divRegister').slideToggle(function(){
                                    $('#divDashboard').slideToggle();
                                });
                            }else{
                                console.log(result.error)
                            }
                        })
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