const choiceData = async () => {
  const dateSelects = document.querySelectorAll('select[name="dates"]');
  const peopleSelects = document.querySelectorAll('select[name="people"]');
  const reservationData = document.querySelector('.reservation__data');
  const reservationPrice = document.querySelector('.reservation__price');
  reservationData.textContent = '';
  reservationPrice.textContent = '';
  let price = 0;
  //   const data = [];

  // Тут получали данные один раз.

  const fetchData = async () => {
    const result = await fetch('db.json');
    const data = await result.json();
    return data;
  };

  let data = await fetchData();

  const totalPrice = (date, count) => {
    reservationPrice.textContent = `${+peopleSelects[1].value * price} ₽`;
  };

  const renderDateOptions = async selector => {
    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.date;
      option.textContent = option.value;
      selector.append(option);
      price = item.price;
    });
  };

  //Рендер кол-во человек в зависимости от даты
  const renderPeopleOptions = async (selector, index) => {
    // selector.innerHTML = 'Выбрать дату';
    // const data = await fetchData();
    data.forEach(item => {
      if (dateSelects[index].value === item.date) {
        peopleSelects[index].textContent = '';
        for (let i = item['min-people']; i <= item['max-people']; i++) {
          const option = document.createElement('option');
          option.value = i;
          option.textContent = option.value;

          peopleSelects[index].append(option);
          price = item.price;
        }
      }
    });
  };

  dateSelects.forEach(item => {
    renderDateOptions(item);
  });

  peopleSelects.forEach((item, id) => {
    renderPeopleOptions(item, id);
  });

  dateSelects.forEach((item, index) => [
    item.addEventListener('input', () => {
      //   totalPrice();
      renderPeopleOptions(peopleSelects[index], index);
      reservationData.textContent = `${dateSelects[1].value}`;
    }),
  ]);

  peopleSelects[1].addEventListener('input', () => {
    reservationData.textContent = `${dateSelects[1].value},
        ${peopleSelects[1].value} человек`;
    totalPrice();
  });

  //   renderDateOptions();
  //   renderPeopleOptions();
};

export default choiceData;
