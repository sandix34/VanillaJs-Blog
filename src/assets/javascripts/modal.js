const body = document.querySelector('body');
let calc;
let modal;
let cancel;
let confirm;

const createCalc = () => {
  calc = document.createElement('div');
  calc.classList.add('calc');
}

const createModal = (question) => {
  modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <p>${ question }</p>
  `;
  cancel = document.createElement('button');
  cancel.innerText = 'Annuler';
  cancel.classList.add('btn', 'btn-secondary');
  confirm = document.createElement('button');
  confirm.innerText = 'Confirmer';
  confirm.classList.add('btn', 'btn-primary');
  modal.addEventListener('click', event => {
    event.stopPropagation();
  })
  modal.append(cancel, confirm);
}

export function openModal(question) {
  createCalc();
  createModal(question);
  calc.append(modal);
  body.append(calc);
  return new Promise((resolve, reject) => {
    calc.addEventListener('click', () => {
      resolve(false);
      calc.remove();
    });
    cancel.addEventListener('click', () => {
      resolve(false);
      calc.remove();
    });
    confirm.addEventListener('click', () => {
      resolve(true);
    })
  })
}