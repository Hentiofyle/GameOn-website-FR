function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelectorAll("#close-btn")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//close modal event 

closeModalBtn.forEach(btn => btn.addEventListener("click", closeModal))


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal form 

function closeModal(){
  modalbg.style.display="none";
}


//////////////////////Form  //////////////////////////////////////////////////////////////////////////////////////////////

// fetch html element from the DOM, fetch all the imputs, the radio btn, the form and the elements that we need to verify
const inputs = document.querySelectorAll(
  "input[type=text], input[type=number], input[type=email], input[type=date]"
);
const radio = document.querySelectorAll("input[type=radio]");
const form = document.getElementById("form");
const modal = document.querySelector(".modal-body");
let first, last, email, date, quantity, locations, termOfUse, nextEvenement;


//// Fonction permettant d'afficher les messages d'erreurs lorsqu'un champ du formulaire est mal renseigné  

/////////  the error contain a tag, the message and a bolean + its add as textcontent in the span //////

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector(".formData-" + tag);
  const span = document.querySelector(".formData-" + tag + " > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};


//first we need to check the first name, it has to have minimum 2 caractère and not include special caractere
// if the input is less than 2 letters + include special caractere then its not valid and we render the error message if not its valid and no message apear


const firstChecker = (value) => {

  

  if (value.length < 2 ){
    errorDisplay(
      "first",
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    ); 
    first = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "first",
      "Le prénom ne doit pas contenir de caractère spéciaux"
    );
    first = null;}

     else {
    errorDisplay("first", "", true);
    first = value;
  }
};




// lets check the last name with the two same conditions

const lastChecker = (value) => {
  if (value.length < 2) {
    errorDisplay(
      "last",
      "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    );
    last = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "last",
      "Le nom  ne doit pas contenir de caractère spéciaux"
    );
    last = null;}

    else {
    errorDisplay("last", "", true);
    last = value;
  }
};


// Email checker /////
const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};


//function that allow me to tcheck the  'Date'
const dateChecker = (value) => {
  // parses is a date string that returns the time +   allows me to stock diff dates of users in the same format 
  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return newDate;
  };

  if (
    !value.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/) ||
    value == "" ||
    value == "jj/mm/aaaa") {
    errorDisplay("date", "Veuillez renseigner votre date de naissance");
    date = null;
  } else {
    let parseDate = dateParser(value);
    date = parseDate;
    errorDisplay("date", "", true);
  }
};


// function that allows me to check nb of tournement////////

const quantityChecker = (value) => {
  if (value == "" || isNaN(value)) {
    errorDisplay(
      "quantity",
      "Vous devez renseigner le nombre de concours auquel vous avez participé "
    );
    quantity = null;
  } else {
    errorDisplay("quantity", "", true);
    quantity = value;
  }
};


//function that allows me to check the town ///////

const radioChecker = () => {
  for (const radioButton of radio) {
    if (radioButton.checked) {
      locations = radioButton.value;
    }
  }
  if (locations == null) {
    errorDisplay("location", "Vous devez sélectionner un tournoi");
    locations = null;
  }
};

// function that allows me to check if the conditions checkbox is checked  
// 

const checkboxChecker = () => {
  if (!checkbox1.checked) {
    errorDisplay(
      "checkbox",
      "Vous devez accepter les conditions d'utilisation"
    );
    termOfUse = null;
  } else {
    errorDisplay("checkbox", "", true);
    termOfUse = true;
  }
  if (!checkbox2.checked) {
    nextEvenement = false;
  } else {
    nextEvenement = true;
  }
};


// CONFIRMATION PART 




 // verification of diff inputs 

inputs.forEach((inputs) => {
  inputs.addEventListener("input", (i) => {
    switch (i.target.id) {
      case "first":
        firstChecker(i.target.value);
        break;
      case "last":
        lastChecker(i.target.value);
        break;
      case "email":
        emailChecker(i.target.value);
        break;
      case "date":
        dateChecker(i.target.value);
        break;
      case "quantity":
        quantityChecker(i.target.value);
        break;
      default:
        null;
    }


    
  });
});




//  Event triggerd on the submit btn of the form 

// display the error message when needed 

// On click  on the submit btn , the form check data. if all inputs are true we send the confirmation message on a modal.
// If not there is an error alert

form.addEventListener("submit", (e) => {
  e.preventDefault();
  radioChecker();
  checkboxChecker();


  if (first && last && email && date && quantity && locations && termOfUse) {
    const data = {
      first,
      last,
      email,
      date,
      quantity,
      locations,
      nextEvenement,
    };

    inputs.forEach((input) => (input.value = ""));
    for (const radioButton of radio) {
      radioButton.checked = false;
    }
    first = null;
    last = null;
    email = null;
    date = null;
    quantity = null;
    locations = null;
    nextEvenement = null;
    modal.innerHTML = "<h3>Merci ! Votre réservation a été reçue.</h3>"
  } else {
    alert("Erreur d'inscription");
  }
});
