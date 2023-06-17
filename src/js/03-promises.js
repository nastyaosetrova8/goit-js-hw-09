import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', handlerSabmitForm);

function handlerSabmitForm(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.target.elements;

  let nextDelay = Number(delay.value);
  for (let i = 1; i < amount.value; i += 1) {
    createPromise(i, nextDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    nextDelay += Number(step.value);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
