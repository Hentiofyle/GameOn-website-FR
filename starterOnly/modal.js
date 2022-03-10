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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
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

///////// l'error contient le tag le message et un bolean valid ou non + il est add dans le span //////

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

  let prohibited = "!@#$%^&*()+=;:`~\|'?/.><, \"";

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
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
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


//Fonction permettant de vérifier le champ 'Date'
const dateChecker = (value) => {
  // parses is a date string that returns the time +  pouvoir stocker les différentes dates des utilisateurs dans le même format
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


//Fonction permettant de vérifier le Nombre de tournois////////

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


//Fonction permettant de vérifier Ville sélectionnée ///////

const radioChecker = () => {
  for (const radioButton of radio) {
    if (radioButton.checked) {
      locations = radioButton.value;
      break;
    }
  }
  if (locations == null) {
    errorDisplay("location", "Vous devez sélectionner un tournoi");
    locations = null;
  }
};

// Fonction permettant de vérifier le champ si les checkbox "Condition d'utilisation"
// ainsi que "Prochains tournois" sont coché ou non

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


