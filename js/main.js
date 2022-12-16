function main()	{
	let isValid = true //isValid will be used for renderDataTable() after the succession of checkInputs() func
	let isEditFlag = {
		flag: false,
		indexEdit: -1,
	  }

	//variable declaratives
	const form = document.getElementById('form');
	const topnavForm = document.querySelector('.topnav-form')
	const eleBtnReset = document.querySelector('.reset');
	const eleInputIdNo = document.getElementById('idNo');
	const eleInputName = document.getElementById('name');
	const eleInputBirthdate = document.getElementById('birthdate');
	const eleBirthYear = new Date(document.getElementById('birthdate'));
	const eleInputPhoneNumber = document.getElementById('phoneNumber');
	const eleContentTable = document.querySelector('.js-content-table')
	const listData = JSON.parse(localStorage.getItem("listData")) || [];
	

	// Reset button
	function handleResetForm() {
		form.reset()
	}

	eleBtnReset.addEventListener('click', (e) => {
		e.preventDefault()
		handleResetForm()
		setResetFor()
	})

	///Check form inputs
	function checkInputs() {
		// trim to remove the whitespaces
		const idNoValue = eleInputIdNo.value.trim();
		const nameValue = eleInputName.value.trim();
		const birthdateValue = eleInputBirthdate.value.trim();
		const phoneNumberValue = eleInputPhoneNumber.value.trim();

		let Cnow = new Date();//current Date
		let computedAge = Cnow.getFullYear()-eleBirthYear.getFullYear();

		console.log('Current year is ' + Cnow.getFullYear() + ', and the age value is ' + eleBirthYear);
		
		if(idNoValue === '') {
			setErrorFor(eleInputIdNo, 'ID Number cannot be left blank');
			isValid = false;
		} else {
			setSuccessFor(eleInputIdNo);
			isValid = true;
		}
		
		if(nameValue === '') {
			setErrorFor(eleInputName, 'Name cannot be blank');
			isValid = false;
		} else if(nameValue.length < 5) {
			setErrorFor(eleInputName, 'Please input a name with more than 5 characters');
			isValid = false;
		} else if(nameValue.length > 15) {
			setErrorFor(eleInputName, 'Please input a name with less than 15 characters');
			isValid = false;
		} else {
			setSuccessFor(eleInputName);
			isValid = true
		}
	
		if(birthdateValue === '') {
			setErrorFor(eleInputBirthdate, 'Birthdate cannot be blank');
			isValid = false;
		} else if (computedAge < 18 ) {
			setErrorFor(eleInputBirthdate, 'Student must be at least 18yrs old');
			isValid = false;
		} else {
			setSuccessFor(eleInputBirthdate);
			isValid = true;
		}
		
		if(phoneNumberValue === '') {
			setErrorFor(eleInputPhoneNumber, 'Phone Number cannot be blank');
			isValid = false;
		} else if(phoneNumberValue.length !== 10) {
			setErrorFor(eleInputPhoneNumber, 'Phone Number must be exactly 10 characters long');
			isValid = false;
		} else{
			setSuccessFor(eleInputPhoneNumber);
			isValid = true;
		}
		console.log('get isValid inside func === ' + isValid)
		return isValid
	}

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

	function setResetFor() {
		const formControl = document.querySelector('.form-control.error');
		const small = document.querySelector('small');
		formControl.className = 'form-control reset';
		small.innerText = '';
	}
	//Push edit data to form
	function handleUpdateFormData(formData) {
		eleInputIdNo.value = formData?.idNo
		eleInputName.value = formData?.name
		eleInputBirthdate.value = formData?.birthdate
		eleInputPhoneNumber.value = formData?.phoneNumber
		
		form.style.display = 'none';
		form.style.display = 'block';
	  }

	// Function to render Input data into the table
	function renderDataTable() {
		let result = '' 

		listData.forEach((data, index) => {
		result += `
			<tr>
			<td>${data?.idNo}</td>
			<td>${data?.name}</td>
			<td>${data?.birthdate}</td>
			<td>${data?.phoneNumber}</td>
			<td>
				<button data-index-edit="${index}">Edit<button>
				<button data-index-delete="${index}">Delete<button>
			</td>
			</tr>
		`
		})
		eleContentTable.innerHTML = result

		document.querySelectorAll(`[data-index-edit]`).forEach((eleBtn) => {
			eleBtn.addEventListener('click', () => {
			  const dataIndex = eleBtn.getAttribute("data-index-edit")
			  isEditFlag = {
				flag: true,
				indexEdit: dataIndex
			  }
			  const currentDataEdit = listData[Number(dataIndex)]
			  handleUpdateFormData(currentDataEdit)
			  console.log('edit', currentDataEdit);
			})
		  })

		document.querySelectorAll(`[data-index-delete]`).forEach((eleBtn) => {
			eleBtn.addEventListener('click', () => {
				const dataIndex = eleBtn.getAttribute("data-index-delete")
				listData.splice(Number(dataIndex), 1)
				localStorage.setItem('listData', JSON.stringify(listData))
				renderDataTable()
				console.log('delete');
			})
		})
	}

	// Function when pressing Submit button
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const formValue = {
			idNo: eleInputIdNo.value,
			name: eleInputName.value,
			birthdate: eleInputBirthdate.value,
			phoneNumber: eleInputPhoneNumber.value,
		}

		checkInputs();
		console.log('get isValid outside the func  === ' + isValid)
		if (isValid === true) {
			if (isEditFlag.flag) {
				// Handle edit
				listData[isEditFlag.indexEdit] = formValue
				isEditFlag = {
				  flag: false,
				  indexEdit: -1,
				}
			  } else {
				listData.push(formValue)
			  }
			localStorage.setItem('listData', JSON.stringify(listData))
			
			handleResetForm();
			renderDataTable();
		}
	});

	topnavForm.addEventListener('submit', (e) => {
		e.preventDefault();
		handleResetForm()
        window.location = ('./login.html') 
})

	if (listData.length > 0) {
		renderDataTable()
	}
}

main ()

// existing: Current bugs
// still log an additional but unnessary button beside delete button
// cannot validate age from data of birthdate value