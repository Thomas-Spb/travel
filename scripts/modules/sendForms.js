import modalShow from './modal.js';

const sendForms = () => {
  const reservationForm = document.querySelector('.reservation__form');
  const footerForm = document.querySelector('.footer__form');
  const footerFormTitle = footerForm.querySelector('.footer__form-title');
  const footerFormText = footerForm.querySelector('.footer__text');
  const footerFormInput = footerForm.querySelector('.footer__input-wrap');

  const URL = 'https://jsonplaceholder.typicode.com/posts';

  const httpRequest = (url, { method = 'GET', callback, body = {}, headers }) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          xhr.setRequestHeader(key, value);
        }
      }

      xhr.addEventListener('load', () => {
        if (xhr.status < 200 || xhr.status >= 300) {
          callback(new Error(xhr.status), xhr.response);
          return;
        }
        const data = JSON.parse(xhr.response);
        if (callback) callback(null, data);
      });

      xhr.addEventListener('error', () => {
        callback(new Error(xhr.status), xhr.response);
      });

      xhr.send(JSON.stringify(body));
    } catch (err) {
      callback(new Error(err));
    }
  };

  reservationForm.addEventListener('submit', e => {
    e.preventDefault();
    httpRequest(URL, {
      method: 'POST',
      body: {
        name: reservationForm.reservation__name.value,
        phone: reservationForm.reservation__phone.value,
      },
      callback(err, data) {
        if (err) {
          console.warn(err, data);
          modalShow();
        } else {
          modalShow('ok');
        }
      },
    });
    reservationForm.reset();
  });

  footerForm.addEventListener('submit', e => {
    e.preventDefault();
    footerForm.footer__email;
    console.log('footerForm.footer__emai: ', footerForm.footer__emai);

    httpRequest('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: {
        // email: footerForm.footer__email.value,
        email: footerForm.footer__email.value,
      },
      callback(err, data) {
        if (err) {
          console.warn(err, data);
          footerFormTitle.textContent = 'Упс... Что-то пошло не так';
          footerFormText.textContent = `Не удалось отправить заявку.
          Пожалуйста, повторите отправку еще раз`;
          footerForm.reset();
        } else {
          footerFormTitle.textContent = 'Ваша заявка успешно отправлена';
          footerFormText.textContent = `Наши менеджеры свяжутся с вами в течение
          3-х рабочих дней`;
          footerFormInput.remove();
        }
      },
    });
  });
};

export default sendForms;
