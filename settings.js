$('.btnSettingsToggle').on('click',function(){
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

$('#btnDevLogin').on('click', function(){
    createSession("coop@example.com", "ASD123asd", "login");
})