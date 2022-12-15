Exercise 1:

    Create a simple application that show students, requires:
    Creating an information entry form with fields: id, name,   birthday, phoneNumber
    Validating fields with rules:
    id: required
    name: required, min value length 5, max value length 15
    birthday: required, age of student must be bigger than 18 years     old
    phoneNumber: required, length is 10
    When you click the submit button, the list of students will     appear as a list table, and the data will be saved in   localStorage
    When opening the page, if there is data in localStorage, it will    show the data to the screen
    If entering a student with the same id as  student stored in    localStorage, it will update that student information with new     information.
    Reference UI:
    (Link)[https://www.figma.com/file/S3QRVExWrAXqMxNkjKDDYd/Review-  Exercises?node-id=2%3A120]

Exercise 2:

    Update Exercise 1, add login and logout functions, with requirements:
    Save the account's data in localStorage with the key as admin, data
    [
      {name: 'admin', password: 'Aa@123456'},
      {name: 'admin2', password: 'admin123admin' }
    ]
    When entering the page, it will show the login modal, the modal only turns off when the login is successful
    There is a sign out button in the corner of the screen
    When the user closes the page but has not logged out, then when the user reopens the page, there is no need to log in again.

    Reference UI:
    (Link)[https://www.figma.com/file/S3QRVExWrAXqMxNkjKDDYd/Review-Exercises?node-id=2%3A244]
