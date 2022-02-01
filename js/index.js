const form = document.querySelector('.registration_form')
const formInputs = document.querySelectorAll('.form-inputs')
const name = document.querySelector('.form-name')
const tel = document.querySelector('.form-tel')
const mail = document.querySelector('.form-mail')
const errorEl = document.getElementById('error')

const validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

function validatePhone(phone) {
    let reg = /^[0-9\s]*$/;
    return reg.test(String(phone));
}

function validateName(name) {
    var reg = /^[a-zA-Z]+ [a-zA-Z]+$/;
    return reg.test(String(name));
}

const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};
form.addEventListener('submit', postData)

async function postData(e) {
    e.preventDefault();
    let error = formValidate()

    if (error === 0) {
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.appendChild(statusMessage);
    
        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        const formData = new FormData(form);

        const object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        const json = JSON.stringify(object);

        request.send(json);

        request.addEventListener('load', () => {
            if (request.status === 200) {
                console.log(request.response);
                console.log(request);
                statusMessage.textContent = message.success;
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            } else {
                statusMessage.textContent = message.failure;
            }
        });
    } else {
        return
    }

}

function formValidate() {
    let messages = []
    let error = 0
    let nameValue = name.value
    let telValue = tel.value
    let mailValue = mail.value

    formInputs.forEach(input => {
        if (input.value === "") {
            input.classList.add('error')
            error++
            return false
        } else {
            input.classList.remove('error')
        }
    })
    if (!validateEmail(mailValue)) {
        mail.classList.add('error')
        messages.push('Неправильная почта')
        error++
    } else {
        mail.classList.remove('error')
    }

    if (!validatePhone(telValue)) {
        tel.classList.add('error')
        messages.push('Неправильный телефон')
        error++
    } else {
        tel.classList.remove('error')
    }

    if (!validateName(nameValue)) {
        name.classList.add('error')
        messages.push('Неправильное имя')
        error++
    } else {
        name.classList.remove('error')
    }
    if (messages.length > 0) {
        errorEl.innerText = messages.join(', ')
        return false
    } else {
        messages = []
        errorEl.innerText = messages.join(', ')
        error = 0
    }
    return error
}

const hamburger = document.querySelector('.hamburger')
const hamburgerClose = document.querySelector('.header__hamburger-close')

const nav = document.querySelector('.header__hamburger')
hamburger.addEventListener('click', () => {
    nav.classList.add('hamburger-show')
})
hamburgerClose.addEventListener('click', () => {
    nav.classList.remove('hamburger-show')
})
