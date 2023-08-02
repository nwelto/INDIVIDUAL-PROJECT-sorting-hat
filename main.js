//this is the information that i use for almost all of the code here.  it will help identify what i can sort by using the keys listed.
const sorting = [
  {
    id: 1,
    name: "Harry",
    house: "Gryffindor",
    imageUrl: "https://images.ctfassets.net/usf1vwtuqyxm/3SQ3X2km8wkQIsQWa02yOY/8801d7055a3e99dae8e60f54bb4b1db8/HarryPotter_WB_F4_HarryPotterMidshot_Promo_080615_Port.jpg?w=914&q=70&fm=jpg"
  },
  {
    id: 2,
    name: "Newt",
    house: "Hufflepuff",
    imageUrl: "https://www.michigandaily.com/wp-content/uploads/2022/04/fantastic-beasts-copy.jpg",
  },
  {
    id: 3,
    name: "Terry",
    house: "Ravenclaw",
    imageUrl: "https://topicimages.mrowl.com/large/lauren/harry_potter/enter_the_wizarding_world/dd_organizations_/dumbledores_army/terry_boot_1.jpg",
  },
  {
    id: 4,
    name: "Draco",
    house: "Slytherin",
    imageUrl: "https://cdn.europosters.eu/image/750/wall-murals/harry-potter-draco-malfoy-i114410.jpg",
  },
  {
    id: 5,
    name: "Ron",
    house: "Gryffindor",
    imageUrl: "https://images.ctfassets.net/usf1vwtuqyxm/1u3RmbxLrGMysu0Smacesu/43b7405e95859ba08ea646dc16fa722e/WB_F3_Scabbers_RonClutchesScabbersOnGround_C608-13_UP_HPE3.jpg?fm=jpg&q=70&w=2560",
  }
];

//this line allows me to select the "cards" element in my index.html.  it also sets up sortHat to store the reference to the HTML element "cards".  I can now use sortHat to manipulate access to "cards" like with my cardsOnDom and innerHTML.
const sortHat = document.querySelector("#cards");

//this line uses filterSorting as a function that filters the "sorting" array to find objects with a specific "house" property.  then uses the cardsOnDom function to display cards filtered on the web page by the specific house.
const filterSorting = (house) => {
  const filteredSorting = sorting.filter((sort) => sort.house === house)
  cardsOnDom(filteredSorting);
};

//this line uses the querySelector to target "filter-container" in the HTML index and listens for a "click" on the page.  once there is a click the filterContainer event listener will use the function to sort based on the targeted id. 
const filterContainer = document.querySelector("#filter-container");
filterContainer.addEventListener("click", (e) => {
  if (e.target.id === "gBtn") {
    filterSorting("Gryffindor");
  } else if (e.target.id === "hBtn") {
    filterSorting("Hufflepuff");
  } else if (e.target.id === "rBtn") {
    filterSorting("Ravenclaw");
  } else if (e.target.id === "sBtn") {
    filterSorting("Slytherin");
  } else {
    cardsOnDom(sorting);
  }
});

//cardsOndom function is generating HTML dynamically using the data from the javascript array "filtered" and creates cards based on that data.  name, house, imgUrl.
const cardsOnDom = (filtered) => {

  let domString = "";
  for (const sorting of filtered) {

    domString += `
    <div class="col">
     <div class="card text-center h-100">
      <h5 class="card-header">${sorting.name}</h5>
      <div class="card-img-container">
        <img src=${sorting.imageUrl} class="card-img-top" alt=${sorting.name}>
          <p class="card-text">
            ${sorting.house} 
          </p>
      </div>
      <div class="card-footer ${sorting.house} footer-style"></div>
      <button type="button" id="expel-btn--${sorting.id}" class= "btn btn-sm btn-danger expel-button" style="width: 70px; height: 30px;">Expel</button>
     </div>
    </div>`;
  };

  sortHat.innerHTML = domString;

};
//on this one i used the arrow function syntax to create "showAllCards" that uses the data from the "sorting" array.  then i used cardsOnDom to pass the "sorting" array as an argument. 
const showAllCards = () => {
  cardsOnDom(sorting);
};
//this line just does exactly what it says, calls all the cards when not being filtered. 
showAllCards();


// this function resets the form after it is submitted
const resetForm = () => {
  const nameInput = document.querySelector("#name");
  const houseInput = document.querySelector("#house");
  const imageUrlInput = document.querySelector("#imageUrl");
  nameInput.value = "";
  houseInput.value = "";
  imageUrlInput.value = "";
};

// this function takes the name,house, and imgurl from the form and adds a new card with tha tinformation to the DOM.
const addStudent = (e) => {
  e.preventDefault();
  const nameInput = document.querySelector("#name");
  const houseInput = document.querySelector("#house");
  const imageUrlInput = document.querySelector("#imageUrl");

  const nameValue = nameInput.value.trim();
  const houseValue = houseInput.value.trim();
  const imageUrlValue = imageUrlInput.value.trim();

  if (nameValue === "" || houseValue === "" || imageUrlValue === "") {
    alert("Please fill out all fields before submitting.");
    return;
  }

  const sortObj = {
    id: sorting.length + 1,
    name: nameValue,
    house: houseValue,
    imageUrl: imageUrlValue,
  };

  sorting.push(sortObj);
  cardsOnDom(sorting);

  resetForm();

  const modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
  modal.hide();
  alert("Student Added!");
};

const expelStudent = (e) => {
  if (e.target.id.startsWith("expel-btn")) {
    const id = parseInt(e.target.id.split("--")[1]);
    const studentIndex = sorting.findIndex((student) => student.id === id);
    if (studentIndex !== -1){
      sorting.splice(studentIndex, 1);
      cardsOnDom(sorting);
    }
  }
};

sortHat.addEventListener("click", expelStudent);


//this section actually submits the form with all of the information filled out and adds a new student to the sorting array and updates the dom.  it also gives you a message if you try to submit before filling out the fields it also gives you an alert when the student is added!
const submitButton = document.querySelector("#submit-btn");
submitButton.addEventListener("click", addStudent);

const showFormButton = document.getElementById("add-student-button");
showFormButton.addEventListener("click", () => {
  console.log("add student button clicked");
  const formContainer = document.querySelector(".modal-body");
  let domString = "";
  domString += `
    <form id="sort-form">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" aria-describedby="nameHelp" />
      </div>
      <div class="mb-3">
        <label for="house" class="form-label">House</label>
        <input type="text" class="form-control" id="house" aria-describedby="houseHelp" />
      </div>
      <div class="mb-3">
        <label for="imageUrl" class="form-label">Image URL</label>
        <input type="text" class="form-control" id="imageUrl" aria-describedby="imageUrlHelp" />
      </div>
    </form>`;
  formContainer.innerHTML = domString;

  const closeButton = document.querySelector("#close-btn");
  closeButton.addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
    modal.hide();
    resetForm();
    
  });

  const submitButton = document.querySelector("#submit-form-btn");
  submitButton.addEventListener("click", addStudent);
});
