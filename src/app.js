"use strict";
import User from "./User";

const buttonSort = document.querySelector("#sort--name");

const buttonAge = document.querySelector("#sort--age");
// creation du container
const container = document.querySelector("main");

fetch("https://randomuser.me/api/?results=20")
  .then((res) => res.json())
  .then((data) => {
    const allData = data.results;
    // console.log(allData);
    // pour chaque contact dans allData
    allData.forEach(function (contact) {
      // afficher que les name.title
      const user = new User(
        contact.name.title,
        contact.name.first,
        contact.name.last,
        contact.dob.age,
        contact.email,
        contact.picture.large
      );
      // ces deux trucs sont pareils paragraphe du haut et du
      // const titre = allData.map((item) => item.name.title);

      // const prenom = allData.map((item) => item.name.first);

      // const nom = allData.map((item) => item.name.last);

      // const ville = allData.map((item) => item.location.city);

      // const age = allData.map((item) => item.dob.age);

      // const pays = allData.map((item) => item.location.country);

      // const img = allData.map((item) => item.picture.large);

      // const mail = allData.map((item) => item.email);

      const html = `
      <div class="user" data-present="false">

		<img src="${contact.picture.large}" alt="user picture" />
		<div class="user--info">
				<h1> ${contact.name.title} ${contact.name.first} ${contact.name.last}</h1>
         <p>${contact.dob.age}years old</p>

				<p>${contact.location.city}, ${contact.location.country}</p>
		</div>
		<a href="mailto:${contact.email}" class="user--mail">
				<span class="mail">✉️</span>
		</a>
</div>`;

      container.insertAdjacentHTML("beforeend", html);
    });
  });

// quand on click sur un carré vert ca ecrit "click " dans la console
// container.addEventListener("click", () => {
//   console.log("click");
// });

//  ## Méthode d’inversion de présence ##
container.addEventListener("click", (e) => {
  // les elements au div = user
  const user = e.target.closest(".user");
  // console.log(user);
  // si user est present
  if (user.dataset.present === "true") {
    // on le cache
    user.dataset.present = "false";
  } else {
    // sinon on le montre
    user.dataset.present = "true";
  }
});

// ## Méthode de tri par nom de famille ##
buttonSort.addEventListener("click", () => {
  // on selectionne tous les users
  const users = document.querySelectorAll(".user");
  // on les transforme en tableau
  const usersArray = Array.from(users);
  // on trie le tableau
  usersArray.sort((a, b) => {
    // on compare les noms de famille
    const nameA = a.querySelector("h1").textContent.split(" ")[2];
    const nameB = b.querySelector("h1").textContent.split(" ")[2];
    // on renvoie le resultat de la comparaison
    return nameA.localeCompare(nameB);
  });
  // on vide le container
  container.innerHTML = "";
  // on ajoute les users triés
  usersArray.forEach((user) => {
    container.appendChild(user);
  });
});

// ## Méthode de tri par age ##
buttonAge.addEventListener("click", () => {
  const users = document.querySelectorAll(".user");
  // on les transforme en tableau
  const usersArray = Array.from(users);
  // on trie le tableau
  usersArray.sort((a, b) => {
    // on compare les ages
    const ageA = a.querySelector("p").textContent.split(" ")[0];
    const ageB = b.querySelector("p").textContent.split(" ")[0];
    // on renvoie le resultat de la comparaison
    return ageA - ageB;
  });
  // on vide le container
  container.innerHTML = "";
  // on ajoute les users triés
  usersArray.forEach((user) => {
    container.appendChild(user);
  });
});

// ## COMPTEUR ##
// Sélectionnez l'élément contenant le compteur
const message = document.querySelector(".counter");

// Initialisez le compteur à 0
let presentCount = 0;

// Écoutez les clics sur le conteneur des utilisateurs
container.addEventListener("click", (e) => {
  const user = e.target.closest(".user");

  if (user.dataset.present === "true") {
    // Incrémentez le compteur et mettez à jour le contenu de l'élément .counter
    presentCount++;
    message.textContent = ` ${presentCount} / 20 people are here`;
  } else {
    // Décrémentez le compteur et mettez à jour le contenu de l'élément .counter
    presentCount--;
    message.textContent = `${presentCount} / 20 people here`;
  }
});
