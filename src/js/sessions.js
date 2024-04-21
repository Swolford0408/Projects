// auto login if Session ID still exist
$.getJSON('https://simplecoop.swollenhippo.com/sessions.php',{SessionID:sessionStorage.getItem('SessionID')},function(session){
    console.log(session);
    if(session != null){
        $('#divStart').slideUp(function(){
            $('#divDashBoard').slideDown();
            $('.navbar').slideDown();
        })
    }
})

// email, password, caller
function createSession(strEmail,strPassword,type){
    $.post('https://simplecoop.swollenhippo.com/sessions.php',{Email:strEmail,Password:strPassword},function(result){
        result=JSON.parse(result);
        if(result.Outcome != "false" && result.SessionID != "undefine"){
            console.log(result);
            sessionStorage.setItem("SessionID",result.SessionID);
            if (type == "login"){
                $('#divLogin').slideToggle(function(){
                    $('#divDashBoard').slideToggle()
                    $('.navbar').slideDown();
                })
            }else{
                $('#divRegister').slideToggle(function(){
                    $('#divDashBoard').slideToggle()
                    $('.navbar').slideDown();
                })
            }
            getEggTable(); // when a new session is added, the egg table will be poulated accordingly
        }else{
            console.log(result);
            Swal.fire({
                icon:'error',
                title:'Invalid Credentials',
                html:'Your password or username is invalid.'
            })

            return result;
        }
    })
}

// remove session
function deleteSession(){
    $.ajax({
        url:'https://simplecoop.swollenhippo.com/sessions.php',
        data:{SessionID:sessionStorage.getItem('SessionID')},
        type: 'DELETE',
        success: function(result){
            console.log(result);
            sessionStorage.removeItem('SessionID');
        }
    })
    return true;
}