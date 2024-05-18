const choiceData = () => {
  const dateSelects = document.querySelectorAll('select[name="dates"]');
  const peopleSelects = document.querySelectorAll('select[name="people"]');
  const reservationData = document.querySelector('.reservation__data');
  const reservationPrice = document.querySelector('.reservation__price');
  let price = 0;
  //   const data = [];

  // Тут получали данные один раз.

  const fetchData = async () => {
    const result = await fetch('db.json');
    const data = await result.json();
    console.log('data: ', data);
    return data;
  };

  let data = fetchData();
  console.log('data: ', data);

  const totalPrice = () => {
    // console.log('totalPrice');
    reservationData.textContent = `${dateSelects[1].value},
        ${peopleSelects[1].value}`;
    reservationPrice.textContent = `$${+peopleSelects[1].value * price}`;
  };

  const renderDateOptions = async (selector, data) => {
    console.log('data: ', data);

    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.date;
      option.textContent = option.value;
      selector.append(option);
      price = item.price;
      totalPrice();
    });
  };

  //Рендер кол-во человек в зависимости от даты
  const renderPeopleOptions = async (selector, index, data) => {
    // console.log('data: ', data);
    // selector.innerHTML = 'Выбрать дату';
    // const data = await fetchData();
    data.forEach(item => {
      if (dateSelects[index].value === item.date) {
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

  dateSelects.forEach((item, idx, data) => {
    renderDateOptions(item, data);
  });

  peopleSelects.forEach((item, id, data) => {
    renderPeopleOptions(item, id, data);
  });

  dateSelects.forEach((item, index) => [
    item.addEventListener('input', () => {
      totalPrice();
      renderPeopleOptions(peopleSelects[index], index);
    }),
  ]);

  peopleSelects[1].addEventListener('input', () => {
    totalPrice();
  });

  //   renderDateOptions();
  //   renderPeopleOptions();
};

export default choiceData;
