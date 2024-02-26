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