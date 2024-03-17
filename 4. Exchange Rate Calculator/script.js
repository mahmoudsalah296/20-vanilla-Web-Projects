const currency1El = document.getElementById('currency-one');
const currency2El = document.getElementById('currency-two');
const amount1El = document.getElementById('amount-one');
const amount2El = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const btnSwap = document.getElementById('swap');

const calculate = function () {
  const currency1 = currency1El.value;
  const currency2 = currency2El.value;
  // console.log(currency1, currency2);

  fetch(
    `https://v6.exchangerate-api.com/v6/bd24e91bdb5d2dac1a40a847/latest/${currency1}`,
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.conversion_rates[currency2]);
      const rate = data.conversion_rates[currency2];
      if (amount1El.value < 0) amount1El.value = 0;
      amount2El.value = +(rate * amount1El.value).toFixed(2);
      rateEl.innerText = `1 ${currency1} = ${rate} ${currency2}`;
    });
};

currency1El.addEventListener('change', calculate);
currency2El.addEventListener('change', calculate);
amount1El.addEventListener('input', calculate);
amount2El.addEventListener('input', calculate);
btnSwap.addEventListener('click', () => {
  const temp = currency1El.value;
  currency1El.value = currency2El.value;
  currency2El.value = temp;
  calculate();
});

calculate();
