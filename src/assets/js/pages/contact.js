import splitWord from "../libs/splitTxt.js"

export default class contact extends splitWord {
    constructor() {
        super({
            el: document.querySelector('.contact__title'),
            classNameParent: "split-js-parent hide",
            classNameChild: "split-js-child"
        })
        this.form = document.querySelector('.contact__form')
        this.formChild = {
            nbrIndex: this.form.querySelector('.form-index'),
            nbrLength: this.form.querySelector('.form-length'),
            containerInput: this.form.querySelectorAll('.center-input'),
            inputs: this.form.querySelectorAll('.input'),
            btnNext: this.form.querySelectorAll('.contact__btn-next'),
            btnPrev: this.form.querySelector('.contact__btn-previous'),
            btnSubmit: this.form.querySelector('.contact__btn-submit'),
            message : this.form.querySelector('.form__message-succes')
        }
        this.formChild.containerInput[0].classList.add('active')
        this.index = 0
        this.formChild.nbrIndex.textContent = "0" + (this.index + 1) + "/"
        this.formChild.nbrLength.textContent = "0" + this.formChild.containerInput.length
        this.event()

    }
    prevInput() {
        this.formChild.containerInput[this.index].classList.remove('active')
        if (this.index > 0) {
            this.index--
            this.formChild.nbrIndex.textContent = "0" + (this.index + 1) + "/"
        }
        if (this.index == 0) {
            this.formChild.btnPrev.classList.remove('btn-prev')
        }
        this.formChild.containerInput[this.index].classList.add('active')
    }
    nextInput() {
        this.formChild.containerInput[this.index].classList.remove('active')
        if (this.index < this.formChild.containerInput.length - 1) {
            this.index++
            this.formChild.btnPrev.classList.add('btn-prev')
            this.formChild.nbrIndex.textContent = "0" + (this.index + 1) + "/"

        } else {
            this.formChild.btnSubmit.classList.add('btn-send')
            this.formChild.btnNext[this.index].classList.add('btn-next-hide')
        }
        this.formChild.containerInput[this.index].classList.add('active')
    }
    succes() {
        this.formChild.message.textContent = ""
        this.nextInput()
    }
    checkInputValue() {
        if (this.formChild.inputs[this.index].value.trim() == "") {
            this.formChild.message.textContent = "Champ vide"
        } else if (this.formChild.inputs[this.index].parentElement.classList.contains("form__email")) {
            !this.checkRegex(email.value) ? this.formChild.message.textContent = "La syntaxe n'est pas correct" : this.succes()
        } else {
            this.succes()
        }
    }
    checkRegex(value) {
        const regex = /^(([^<>()[\]\\.,;:#$&!\s@"]+(\.[^<>()[\]\\.,;:#$&!\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(value);
    }
    submitForm(e) {
        e.preventDefault()
            if (this.checkRegex(email.value) && this.formChild.inputs[this.index].value.trim() != "" && this.index == this.formChild.inputs.length - 1) {
                this.formChild.message.textContent = `Merci ${firstName.value.charAt(0).toUpperCase() + firstName.value.substring(1)} pour votre message !`
                this.form.classList.add('active-form')
                setTimeout(() => {
                    this.form.remove()
                }, 1700)
            } else {
                this.checkInputValue()
            }
    }
    event() {
        this.formChild.btnNext.forEach((el) => el.addEventListener('click', this.checkInputValue.bind(this)))
        this.formChild.btnPrev.addEventListener('click', this.prevInput.bind(this))
        this.form.addEventListener('submit', this.submitForm.bind(this))
}
}