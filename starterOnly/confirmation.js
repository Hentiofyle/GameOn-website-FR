


 //vérification des différents champs relatifs aux inputs

inputs.forEach((inputs) => {
  inputs.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "first":
        firstChecker(e.target.value);
        break;
      case "last":
        lastChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "date":
        dateChecker(e.target.value);
        break;
      case "quantity":
        quantityChecker(e.target.value);
        break;
      default:
        null;
    }


  });
});




// Événement lors du click sur le bouton "Submit" du formulaire

//affichage d'un message de validation ou d'erreur

// On click sur le submit form on verifie les données ! Si tout les checker sont true on envoi le message de confirmation if not alerte browser erreur 
form.addEventListener("submit", (e) => {
  e.preventDefault();
  radioChecker();
  checkboxChecker();
  //firstChecker()
  //lastChecker()
  //dateChecker()
  //emailChecker()
  //quantityChecker()

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
    //console.log(data);
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