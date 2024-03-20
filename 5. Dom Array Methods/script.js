const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairsBtn = document.getElementById('show-millionairs');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// application data containg people objects
const usersData = [];

// fetch random users
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  console.log(data);

  const result = data.results[0];
  const user = {
    name: `${result.name.first} ${result.name.last}`,
    wealth: Math.floor(Math.random() * 1_000_000),
  };
  addData(user);
  updateDom();
}

const addData = function (user) {
  usersData.push(user);
};

const updateDom = function (providedData = usersData) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `
      <strong>${item.name}</strong> ${formatMoney(item.wealth)}
    `;
    main.insertAdjacentElement('beforeend', element);
  });
};

const formatMoney = function (num) {
  return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

const doubleMoney = function () {
  usersData.map(user => (user.wealth *= 2));
  updateDom();
};

const sortMoney = function () {
  usersData.sort((a, b) => b.wealth - a.wealth);
  updateDom();
};

const showMillionairs = function () {
  const millionairs = usersData.filter(user => user.wealth >= 1_000_000);
  updateDom(millionairs);
};

const calculateWealth = function () {
  const total = usersData.reduce((acc, user) => {
    return acc + user.wealth;
  }, 0);

  main.insertAdjacentHTML(
    'beforeend',
    `
    <h3><strong>Total</strong>${formatMoney(total)}</h3>
  `,
  );
};

// Event Listners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortMoney);
showMillionairsBtn.addEventListener('click', showMillionairs);
calculateWealthBtn.addEventListener('click', calculateWealth);

getRandomUser();
getRandomUser();
getRandomUser();
