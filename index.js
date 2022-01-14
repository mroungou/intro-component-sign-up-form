function validate() {
const fName = document.forms['signUp']['firstName'].value;
if (fName='') {
    alert ('First Name cannot be empty');
    return false;
}
}