const moviesList = [
    {movieName:"Flash", price:7},
    {movieName:"Spiderman", price:5},
    {movieName:"Batman", price:4},
];
// Use moviesList array for displaying the Name in the dropdown menu
for(let i of moviesList){
    const option = document.createElement("option");
    option.value = `${i.movieName} ${i.price}`;
    option.textContent = `${i.movieName} - ${i.price}`;
    document.querySelector("#selectMovie").appendChild(option);
}
const selectMovieEle = document.getElementById("selectMovie");
selectMovieEle.addEventListener("change", (e) =>{
    const selectedMovie = e.target.value.split(" ");
    // or const selectedText = getOption.target.options[getOption.target.selectedIndex].text;
    //const [name, price] = selectedText.split(" ");
    const [name,price] = selectedMovie;
    document.getElementById("movieName").textContent = name;
    document.getElementById("moviePrice").textContent = "$ " + price;

    // //count total seats selected and thier total price.
    // const selectedSeatsNum = document.querySelectorAll(".seat.selected").length;
    // const totalPrice = selectedSeatsNum * price;
    // document.querySelector("#totalPrice").textContent = "$ " + totalPrice;
});

//adding event listener to each unoccupide seat.
const seats = document.querySelectorAll("#seatCont .seat:not(.occupied)");
//loop through each seat and add a click event Listener
seats.forEach(seat => {
    seat.addEventListener("click", ()=>{
        seat.classList.toggle("selected");
        updateSelectedSeats();
        updateTotalPrice();
        //updateSelectedSeats();
        updateTotalSeatsSelected();
    });
});
function updateSelectedSeats(){
    const selectedSeats = document.querySelectorAll("#seatCont .seat.selected");
    const holder = document.getElementById("selectedSeatsHolder");
    holder.innerHTML = ""; // Clear previous selected seats
    if(selectedSeats.length === 0){
        const span = document.createElement("span");
        span.className = "noSelected";
        span.textContent = "No Seat Selected";
        holder.appendChild(span);
    }else{
        selectedSeats.forEach((seat,idx) => {
            const div = document.createElement("div");
            div.className = "selectedSeat";
            const seatNumber = seat.dataset.seatNumber || (idx + 1);
            div.textContent = seatNumber;
            holder.appendChild(div);
        });
    }
}
function updateTotalPrice(){
    const selectedSeats = document.querySelectorAll("#seatCont .seat.selected").length;
    const price = parseFloat(document.getElementById("moviePrice").textContent.replace("$"," ").trim());
    document.getElementById("totalPrice").textContent = "$ " + (selectedSeats * price);
}

//update the total number of seats selected.
function updateTotalSeatsSelected(){
    const selectedSeatslen = document.querySelectorAll("#seatCont .seat.selected").length;
    const numbOfSeatsSpan = document.querySelector("#numberOfSeat");
    numbOfSeatsSpan.textContent = 0; // Clear previous count
    if(selectedSeatslen === 0){
        numbOfSeatsSpan.textContent = 0;
    }else{
        numbOfSeatsSpan.textContent = selectedSeatslen;
    }
}

// Adding Event Listener to continue button
const continueBtn = document.querySelector("#proceedBtn");
continueBtn.addEventListener("click", function(){
    const selectedSeats = document.querySelectorAll("#seatCont .seat.selected");
    if(selectedSeats.length === 0){
        alert("Oops no seat Selected");
    }else{
        alert("Yayy! Your Seats have been booked successfully");
        // Reset the seats and selected seats
        selectedSeats.forEach(seat => {
            seat.classList.remove("selected");
            seat.classList.add("occupied");
        });
        // Update the price and set it to 0.
        //document.getElementById("totalPrice").textContent = "$ 0";
        updateTotalPrice();
        updateSelectedSeats();
        // const holder = document.getElementById("selectedSeatsHolder");
        // holder.innerHTML = "No Seat Selected";
        updateTotalSeatsSelected();
    }
});

//Adding eventListener to cancel btn.
const cancelBtn = document.getElementById("cancelBtn");
cancelBtn.addEventListener("click",function(){
    const selectedSeats = document.querySelectorAll("#seatCont .seat.selected");
    selectedSeats.forEach(seat => {
        seat.classList.remove("selected");
    });
    document.getElementById("totalPrice").textContent = "$ 0";
    const holder = document.getElementById("selectedSeatsHolder");
    holder.innerHTML = "No Seat Selected";
    updateTotalSeatsSelected();
});
