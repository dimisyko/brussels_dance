import splitWord from "../libs/splitTxt.js"

export default class contact extends splitWord {
    constructor() {
        super({
            el: app.querySelector('.contact__title'),
            classNameParent: "split-js-parent hide",
            classNameChild: "split-js-child"
        })
        this.form = app.querySelector('.contact__form')
        this.formChild = {
            nbrIndex: this.form.querySelector('.form-index'),
            nbrLength: this.form.querySelector('.form-length'),
            containerInput: this.form.querySelectorAll('.center-input'),
            inputs: this.form.querySelectorAll('.input'),
            btn: this.form.querySelectorAll('[data-btn]'),
            btnPrev: this.form.querySelector('.contact__btn-previous')
        }
        this.index = 0
        this.event()
        this.init()
    }
    init() {
        this.formChild.containerInput[0].classList.add('active')
        this.formChild.nbrIndex.textContent = "0" + (this.index + 1) + "/"
        this.formChild.nbrLength.textContent = "0" + this.formChild.containerInput.length
    }
    message(err, color) {
        const parent = this.formChild.inputs[this.index].parentElement
        const findMessage = parent.querySelector('.form__error')
        findMessage.style.color = color
        findMessage.textContent = err
    }
    succes() {
        this.message("")
        this.nextInput()
    }
    checkRegex(value) {
        const regex = /^(([^<>()[\]\\.,;:#$&!\s@"]+(\.[^<>()[\]\\.,;:#$&!\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(value);
    }
    incrementation(incre, index) {
        incre, this.formChild.nbrIndex.textContent = "0" + (index + 1) + "/"
    }
    prevInput() {
        this.formChild.containerInput[this.index].classList.remove('active')
        if (this.index > 0) {
            this.incrementation(this.index--, this.index)
            if (this.index == 0) {
                this.formChild.btnPrev.classList.remove('btn-prev')
            }
        }
        this.formChild.containerInput[this.index].classList.add('active')
    }
    nextInput() {
        this.formChild.containerInput[this.index].classList.remove('active')
        if (this.index < this.formChild.containerInput.length - 1) {
            this.incrementation(this.index++, this.index)
            this.formChild.btnPrev.classList.add('btn-prev')
        }
        this.formChild.containerInput[this.index].classList.add('active')
    }
    checkInputValue() {
        if (this.formChild.inputs[this.index].value.trim() == "") {
            this.message("Le champ est vide", "red")
        } else if (this.formChild.inputs[this.index].value.trim().length < 5) {
            this.message("Le texte est trop court", "red")
        } else if (this.formChild.inputs[this.index].parentElement.classList.contains("form__email")) {
            !this.checkRegex(email.value) ? this.message("Ecrivez correctement votre adresse email", "red") : this.succes()
        } else {
            this.succes()
        }
    }
    submitForm(e) {
        e.preventDefault()
        if (this.index == this.formChild.inputs.length - 1 && this.formChild.inputs[this.index].value.trim().length >= 5) {
            this.message(`Merci ${first_name.value.charAt(0).toUpperCase() + first_name.value.substring(1)} pour votre message !`, "#ff7f01")
            this.form.style.opacity = 0
            setTimeout(() => this.form.remove(), 1500)
        } else {
            this.checkInputValue()
        }
    }
    event() {
        this.formChild.btn.forEach((el) => el.addEventListener('click', () => el.dataset.btn == "next" ? this.checkInputValue() : this.prevInput()))
        this.form.addEventListener('submit', this.submitForm.bind(this))
    }
}