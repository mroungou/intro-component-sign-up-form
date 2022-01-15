const validationMessage = {
    'empty': ':attribute cannot be empty',
    'email': 'Looks like this is not an email',
    'password': ''
}

function capitalize(string) {
    return string.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}

function isEmail(email) {
    return email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)
}


function isValid(form) {
    let inputFields = form.getElementsByTagName('input')
    // Loop all input elements, check if empty and validate by type
    // console.log(inputFields)
    // look for all has-error elements and remove them

    for (let index = 0; index < inputFields.length; index++) {
        const input = {
            name: capitalize((inputFields[index].name).split('_').join(' ')),
            type: inputFields[index].getAttribute('type'),
            value: inputFields[index].value,
            validation: {
                isValid: true,
                message: null
            },
            parent: inputFields[index].parentElement
        } 

        input.parent.classList.remove('has-error')

        // Check if input is empty
        if(input.value === '' || input.value === null) {
            input.validation.isValid = false
            input.validation.message = validationMessage.empty.replace(':attribute', input.name)
        }

        // Check if input is valid email when type is email
        if(input.type === 'email' && !isEmail(input.value)) {
            input.validation.isValid = false
            input.validation.message = validationMessage.email
        }

        // type password
        // if(input.type === 'password') {
        //     input.isValid = false
        // }

        if(!input.validation.isValid) {
            const errorText = document.createElement("div")
            errorText.classList.add('error-text')
            errorText.innerText = input.validation.message

            input.parent.classList.add('has-error')
            input.parent.append(errorText)
        }
    }

    return false;
}

window.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signUp')
    
    form.addEventListener('submit', function(event) {

        if (isValid(form)) {
            form.classList.add('success')
        }
    
        event.preventDefault()
    })
})