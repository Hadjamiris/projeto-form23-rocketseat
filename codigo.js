let currentStep = 0;
const formSteps = document.querySelectorAll(".form-step")
const form = document.querySelector('form')


/*steps*/
form.addEventListener('click', (e) => {
  console.log('clicou')
  if (!e.target.matches('[data-action]')) {
    return;
  }

  const actions = {
    next(){
      if (!isValidInputs()) {
        return
      }
      currentStep++
    },

    prev(){
      currentStep--
    }
  }

  const action = e.target.dataset.action
  actions[action]()
  console.log(currentStep)
  updateActiveStep()
  updateProgressStep()
})

/* envio de formulario*/
form.addEventListener('submit', () => {
  const X = new FormData(form)
  alert(`Obrigada ${X.get('name')}!`)
})

/* udpate steps*/
function updateActiveStep() {
  formSteps.forEach(step => step.classList.remove('active'))
  console.log(currentStep)
  formSteps[currentStep].classList.add('active')
}

const progressStep = document.querySelectorAll('.step-progress [data-step]')
function updateProgressStep() {
  console.log(progressStep)
  progressStep.forEach((step, idx) => {
    step.classList.remove('active')
    step.classList.remove('done')

    if (idx < currentStep + 1) {
      step.classList.add("active")
    }
    if (idx < currentStep) {
      step.classList.add("done")
    }
  })
}

/*validação*/
function isValidInputs() {
  const currentFormStep = formSteps[currentStep]
  const formFields = [...currentFormStep.querySelectorAll('input'), ...currentFormStep.querySelectorAll('textarea')]
  return formFields.every((input) => input.reportValidity())
}


/*animação*/
formSteps.forEach(formStep => {
  function addHide() {
    formStep.classList.add('hide')
  }

  formStep.addEventListener('animationend', e => {
    addHide()
    formSteps[currentStep].classList.remove('hide')
  })

})


