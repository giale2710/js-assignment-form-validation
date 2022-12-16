let isIdAuthenticated = false;
let isPasswordAuthenticated = false;
let isPassed = false;

const form = document.getElementById('form');
const eleBtnReset = document.querySelector('.reset');
const eleInputId = document.getElementById('loginId');
const eleInputPassword = document.getElementById('password');
const inputtedData =  JSON.parse(localStorage.getItem("inputtedData")) || [];
	
	// Reset button
	function handleResetForm() {
		form.reset()
	}

	eleBtnReset.addEventListener('click', (e) => {
		e.preventDefault()
		handleResetForm()
	})

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkLogin() {
    const loginIdValue = eleInputId.value.trim();
    const passwordValue = eleInputPassword.value.trim();

    if ((loginIdValue === 'admin') || (loginIdValue === 'admin2')) {
        setSuccessFor(loginId);
        isIdAuthenticated = true
    } else if(loginIdValue === '') {
        setErrorFor(loginId, 'Login Id cannot be left blank');
        isIdAuthenticated = false;
    } else if (5 < loginIdValue.length || loginIdValue.length <= 25) {
        setErrorFor(loginId, 'Login Id should be 5-25 characters');
        isIdAuthenticated = false;
    } else if ((loginIdValue !== 'admin') && (loginIdValue !== 'admin2')) {
        setErrorFor(loginId, 'Login Id is not correct');
        isIdAuthenticated = false;
    }
    console.log('get isIdAuthenticated inside the func: ' + isIdAuthenticated)

    if ((passwordValue === 'Aa@123456') || (passwordValue === 'admin123admin')) {
        setSuccessFor(password);
        isPasswordAuthenticated = true
    } else if(passwordValue === '') {
        setErrorFor(password, 'Login password cannot be left blank');
        isPasswordAuthenticated = false;
    } else if (5 < passwordValue.length || passwordValue.length <= 25) {
        setErrorFor(password, 'Login password should be 5-25 characters');
        isPasswordAuthenticated = false;
    } else if ((passwordValue !== 'Aa@123456') && (passwordValue !=='admin123admin') ) {
        setErrorFor(password, 'Login password is not correct');
        isPasswordAuthenticated = false;
    }
    console.log('get isPasswordAuthenticated inside the func: ' + isPasswordAuthenticated)

    // if ((isPasswordAuthenticated === true && isIdAuthenticated === true)) {
    //     isPassed = true;
    // } else { isPassed === false}

    if (((loginIdValue === 'admin') && (passwordValue === 'Aa@123456')) ||
        ((loginIdValue === 'admin2') && (passwordValue === 'admin123admin'))
    ) {
        isPassed = true;
    } else {
        isPassed = false;
    }
    
    console.log('isPassed value:' + isPassed)
    return isPassed 
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputtedDataValue = {
        loginId: eleInputId.value,
        password: eleInputPassword.value,
    }
    checkLogin()
    console.log('isPassed value outside is: ' + isPassed);
    if (isPassed === true) {
        inputtedData.push(inputtedDataValue)
        localStorage.setItem('inputtedData', JSON.stringify(inputtedData))
		handleResetForm()
        window.location = ('./index.html') 
    } 
})