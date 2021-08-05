const container = document.querySelector(".theater");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const priceMovie = document.getElementById("movie");
const count = document.getElementById("count");
const total = document.getElementById("total");

populateUI();
let ticketPrice = +priceMovie.value;

// update seat selected count
function updatSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedCounts = selectedSeats.length;

  count.innerText = selectedCounts;
  total.innerText = ticketPrice * selectedCounts;

  const indexSeats = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  //save data index seat
  localStorage.setItem("indexSeats", JSON.stringify(indexSeats));
}

//Save Data Movie
function saveDataMovie(movieIndex, moviePrice) {
  localStorage.setItem("movieIndex", movieIndex);
  localStorage.setItem("moviePrice", moviePrice);
}

//function change movie
priceMovie.addEventListener("change", (e) => {
  ticketPrice = e.target.value;
  saveDataMovie(e.target.selectedIndex, e.target.value);
  updatSelectedCount();
});

//Populate UI
function populateUI() {
  let selectedSeats = JSON.parse(localStorage.getItem("indexSeats"));
  let movieIndex = localStorage.getItem("movieIndex");

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  if (movieIndex !== null) {
    priceMovie.selectedIndex = movieIndex;
  }
}

//select seat
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }

  updatSelectedCount();
});

updatSelectedCount();
