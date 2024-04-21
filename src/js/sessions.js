// auto login if Session ID still exist
$.getJSON('https://simplecoop.swollenhippo.com/sessions.php',{SessionID:sessionStorage.getItem('SessionID')},function(session){
    console.log(session);
    if(session != null && validateSession(session)){
        $('#divLogin').slideUp(function(){
            $('#divDashboard').slideDown();
        })
    }else{
        $('#btnLogOut').click();
    }
})

function validateSession(session){
    // set current datetime
    let currentDate = new Date();
    
    // set start datetime
    let sessionStartParts = session.StartDateTime.split(/[- :]/)
    let sessionStartDate = new Date(sessionStartParts[0], sessionStartParts[1] - 1, sessionStartParts[2], sessionStartParts[3], sessionStartParts[4], sessionStartParts[5]);
    
    // check if the date is the same and if it has been 12 hours since they logged in
    if ((currentDate.getTime() - sessionStartDate.getTime())/ (1000 * 60 * 60) <= 12){
        // set active datetime
        let sessionUsedParts = session.LastUsedDateTime.split(/[- :]/)
        let sessionUsedDate = new Date(sessionUsedParts[0], sessionUsedParts[1] - 1, sessionUsedParts[2], sessionUsedParts[3], sessionUsedParts[4], sessionUsedParts[5]);
        
        // if it has not been 15 min update date time
        if((currentDate.getTime() - sessionUsedDate.getTime())/ (1000 * 60) >= 15){
            updateSession();
            return true;
        }
    }
    // return false if it is expired
    return false;
    
}
function updateSession(){
    $.ajax({
        url:'https://simplecoop.swollenhippo.com/sessions.php',
        data:{SessionID:sessionStorage.getItem('SessionID')},
        type: 'PUT',
        success: function(result){
            console.log(result);
        }
    })
}


// email, password, caller
function createSession(strEmail,strPassword,type){
    $.post('https://simplecoop.swollenhippo.com/sessions.php',{Email:strEmail,Password:strPassword},function(result){
        result=JSON.parse(result);
        if(result.Outcome != "false" && result.SessionID != "undefine"){
            console.log(result);
            sessionStorage.setItem("SessionID",result.SessionID);
            if (type == "login"){
                $('#divLogin').slideToggle(function(){
                    $('#divDashboard').slideToggle()
                })
            }else{
                $('#divRegister').slideToggle(function(){
                    $('#divDashboard').slideToggle()
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