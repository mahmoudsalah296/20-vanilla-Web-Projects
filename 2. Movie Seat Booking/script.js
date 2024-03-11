const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
populateUI();

let ticketPrice = +movieSelect.value;
// console.log(ticketPrice);

const setMovieData = function (movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMovieprice', moviePrice);
};

const updateCountAndPrice = function () {
  // array of selected seats
  const selected = container.querySelectorAll('.row .selected');
  // console.log(selected);
  const seatIndexes = [...selected].map((seat) => [...seats].indexOf(seat));
  // console.log(seatIndexes);
  localStorage.setItem('selectedSeats', JSON.stringify(seatIndexes));

  const seatsCount = selected.length;
  // console.log(count);

  count.innerText = seatsCount;
  total.innerText = seatsCount * ticketPrice;
};

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats && selectedSeats.length > 0) {
    seats.forEach((seat, i) => {
      if (selectedSeats.indexOf(i) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = JSON.parse(
    localStorage.getItem('selectedMovieIndex'),
  );

  if (selectedMovieIndex) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
  // console.log(selectedSeats, selectedMovieIndex, selectedMovieprice);
}

container.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateCountAndPrice();
  }
});

movieSelect.addEventListener('change', function (e) {
  ticketPrice = +e.target.value;

  // index of selected item from dropdown menu
  // console.log(e.target.selectedIndex);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateCountAndPrice();
});

updateCountAndPrice();
