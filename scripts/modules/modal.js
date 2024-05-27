const modalShow = status => {
  const modalWrap = document.createElement('div');
  modalWrap.style = `
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      background-color: rgba(000, 000, 000, 0.5);
    `;

  const modal = document.createElement('div');
  modal.style = `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: 800px;
      height: 300px;
      background-color: #fff;
    `;
  modalWrap.append(modal);

  const modalTitle = document.createElement('h2');
  const modalText = document.createElement('p');
  const modalButton = document.createElement('button');
  if (status === 'ok') {
    modalTitle.textContent = 'Ваша заявка успешно отправлена';
    modalText.textContent = `Наши менеджеры свяжутся с вами в течение
        3-х рабочих дней`;
    modalButton.style = `
        outline: none;
        border: none;
        width: 100px;
        height: 100px;
        background: url("../img/reservation/ok.svg") center/contain no-repeat;
      `;
  } else {
    modalTitle.textContent = 'Упс... Что-то пошло не так';
    modalText.textContent = `Не удалось отправить заявку.
        Пожалуйста, повторите отправку еще раз`;
    modalButton.classList.add('reservation__button', 'button');
    modalButton.textContent = 'Забронировать';
  }

  modal.append(modalTitle, modalText, modalButton);

  document.body.append(modalWrap);

  modalButton.addEventListener('click', () => {
    modalWrap.remove();
  });
};

export default modalShow;
