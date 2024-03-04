$('.btnLogin').on('click',function(){
    let strCard = $(this).attr('data-card')
    if(strCard == "login"){
        $('#divLogin').slideToggle(function(){
            $('#divDashboard').slideToggle();
        });
    }
});

$('.btnRegister').on('click',function(){
    let strCard = $(this).attr('data-card')
    if(strCard == "register"){
        $('#divRegister').slideToggle(function(){
            $('#divDashboard').slideToggle();
        });
    }
});

$('.btnToRegister').on('click',function(){
    let strCard = $(this).attr('data-card')
    if(strCard == "register"){
        $('#divLogin').slideToggle(function(){
            $('#divRegister').slideToggle();
        });
    };
});

$('.btnBackLogin').on('click',function(){
    let strCard = $(this).attr('data-card')
    if(strCard == "login"){
        $('#divRegister').slideToggle(function(){
            $('#divLogin').slideToggle();
        });
    };
});