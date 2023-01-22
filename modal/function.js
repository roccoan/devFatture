const DOMstrings = {
  stepsBtnClass: 'multisteps-form__progress-btn',
  stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
  stepsBar: document.querySelector('.multisteps-form__progress'),
  stepsForm: document.querySelector('.multisteps-form__form'),
  stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
  stepFormPanelClass: 'multisteps-form__panel',
  stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
  stepPrevBtnClass: 'js-btn-prev',
  stepNextBtnClass: 'js-btn-next' };


const removeClasses = (elemSet, className) => {

  elemSet.forEach(elem => {

    elem.classList.remove(className);

  });

};

const findParent = (elem, parentClass) => {

  let currentNode = elem;

  while (!currentNode.classList.contains(parentClass)) {
    currentNode = currentNode.parentNode;
  }

  return currentNode;

};

const getActiveStep = elem => {
  return Array.from(DOMstrings.stepsBtns).indexOf(elem);
};

const setActiveStep = activeStepNum => {

  removeClasses(DOMstrings.stepsBtns, 'js-active');

  DOMstrings.stepsBtns.forEach((elem, index) => {

    if (index <= activeStepNum) {
      elem.classList.add('js-active');
    }

  });
};

const getActivePanel = () => {

  let activePanel;

  DOMstrings.stepFormPanels.forEach(elem => {

    if (elem.classList.contains('js-active')) {

      activePanel = elem;

    }

  });

  return activePanel;

};

const setActivePanel = activePanelNum => {

  removeClasses(DOMstrings.stepFormPanels, 'js-active');

  DOMstrings.stepFormPanels.forEach((elem, index) => {
    if (index === activePanelNum) {

      elem.classList.add('js-active');

      setFormHeight(elem);

    }
  });

};

const formHeight = activePanel => {

  const activePanelHeight = activePanel.offsetHeight;

  DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;

};

const setFormHeight = () => {
  const activePanel = getActivePanel();

  formHeight(activePanel);
};

DOMstrings.stepsBar.addEventListener('click', e => {

  const eventTarget = e.target;

  if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
    return;
  }

  const activeStep = getActiveStep(eventTarget);

  setActiveStep(activeStep);

  setActivePanel(activeStep);

  
});


window.addEventListener('load', setFormHeight, false);

window.addEventListener('resize', setFormHeight, false);


const setAnimationType = newType => {
  DOMstrings.stepFormPanels.forEach(elem => {
    elem.dataset.animation = newType;
  });
};

  //Previous Step1
  var Prev1 = document.getElementById('prevStep1')
  Prev1.addEventListener("click", previousStep1)

  function previousStep1() {
    setActiveStep(0); 
    setActivePanel(0);
  }

  //Previous Step2
  var Prev2 = document.getElementById('prevStep2')
  Prev2.addEventListener("click", previousStep2)

  function previousStep2() {
    setActiveStep(1); 
    setActivePanel(1);
  }

  //Previous Step3
  var Prev3 = document.getElementById('prevStep3')
  Prev3.addEventListener("click", previousStep3)

  function previousStep3() {
    setActiveStep(2); 
    setActivePanel(2);
  }

  //Validation 1st Page
  var Next1 = document.getElementById('step1')
  Next1.addEventListener("click", validateForm1)
  
  function validateForm1() {
  let Cognome = document.forms["yourData"]["Cognome"].value;
  let Nome = document.forms["yourData"]["Nome"].value;
  let Indirizzo = document.forms["yourData"]["Indirizzo"].value;
  let PIVA = document.forms["yourData"]["P.IVA"].value;
  let yourData = [Cognome, Nome, Indirizzo, PIVA]
  let activePanel = getActivePanel();
  let activeStep = getActiveStep();

  if (yourData.includes("")) {
      alert("Controlla che tutti i campi siano compilati");
      setActiveStep(0); 
      setActivePanel(0);
    } else if (PIVA.length != 11) {
      alert("Controlla la Partita IVA abbia 11 cifre");
      setActiveStep(0); 
      setActivePanel(0);
    } else {
      setActiveStep(1); 
      setActivePanel(1);
    }
  };

  //Validation 2nd Page
  var Next2 = document.getElementById('step2')
  Next2.addEventListener("click", validateForm2)

  function validateForm2() {
  let Name = document.forms["yourData"]["name"].value;
  let Taxcode = document.forms["yourData"]["taxcode"].value;
  let Address = document.forms["yourData"]["address"].value;
  let patientData = [Name, Taxcode, Address]
  let activePanel = getActivePanel();
  let activeStep = getActiveStep();

  if (yourData.includes("")) {
      alert("Controlla che tutti i campi siano compilati");
      setActiveStep(1); 
      setActivePanel(1);
    } else {
      setActiveStep(2); 
      setActivePanel(2);
    }
  };

  //Validation 3rd Page
  var Next3 = document.getElementById('step3')
  Next3.addEventListener("click", validateForm3)

  function validateForm3() {
  let Name = document.forms["yourData"]["name"].value;
  let Taxcode = document.forms["yourData"]["taxcode"].value;
  let Address = document.forms["yourData"]["address"].value;
  let patientData = [Name, Taxcode, Address]
  let activePanel = getActivePanel();
  let activeStep = getActiveStep();

  if (yourData.includes("")) {
      alert("Controlla che tutti i campi siano compilati");
      setActiveStep(1); 
      setActivePanel(1);
    } else {
      setActiveStep(2); 
      setActivePanel(2);
    }
  };