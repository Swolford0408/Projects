// 1. Email
// 2. Password
// 3. First Name
// 4. Last Name
// 5. Street Address 1
// 6. Street Address 2
// 7. City
// 8. State
// 9. ZIP
// 10. Phone
// 11. Coop Registration ID

// Will validate form data, and return an error string
const validateRegistration = ()=>{
    // HTML Values
    const txtEmail = $('').val();
    const txtPassword = $('').val();
    const txtFirstName = $('').val();
    const txtLastName = $('').val();
    const txtAddressOne = $('').val();
    const txtAddressTwo = $('').val();
    const txtCity = $('').val();
    const txtState = $('').val();
    const txtZip = $('').val();
    const txtPhone = $('').val();
    
    // Return value
    let resultStr = '';

    // REGEX      const emailRegEx = new RegExp('/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/');    const passwordRegEx = new RegExp("/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/");
//////////////////////////

        // CHECKS
//////////////////////////        ////////////////////////////////////////////////////
    if(!emailRegEx.test(txtEmail)){        resultStr += '<p>Invalid Email</p>';l    }
:
    if(!passwordRegEx.test(txtPassword)){

          resultStr += '<p>Invalid Password</p>';  }
   
 return resultStr
}
;RegEx.test(txtEmail)){


    }
};

const validateLogin = ()=>{

};