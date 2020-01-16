import "../assets/styles/styles.scss"
import "./form.scss";

// create a reference for the form
const form = document.querySelector('form');

const errorElement = document.querySelector("#errors");
let errors = [];

// add a listener to the submit event of the form
form.addEventListener('submit', async event => {
  // prevents reloading the page
  event.preventDefault();
  // use the FormData object to parse all form fields
  const formData = new FormData(form);
  // returns an iterable of key / value pairs
  const entries = formData.entries();
  // Object.fromEntries transforms an iterable pair of key / value pairs into a javascript object
  const article = Object.fromEntries(entries);
  if (formIsValid(article)) {
    try {
      const json = JSON.stringify(article);
      const response = await fetch("https://restapi.fr/api/article", {
        method: "POST",
        body: json,
        headers: {
          "Content-Type": "application/json"
        }
      });
      const body = await response.json();
      console.log(body);
    } catch (e) {
      console.error("e : ", e);
    }
  }
})

// check that all fields are filled
const formIsValid = article => {
  if (
    !article.author ||
    !article.category ||
    !article.content ||
    !article.img ||
    !article.title
  ) {
    errors.push("Vous devez renseigner tous les champs");
  } else {
    errors = [];
  }
  if (errors.length) {
    let errorHTML = "";
    errors.forEach(e => {
      errorHTML += `<li>${e}</li>`;
    });
    errorElement.innerHTML = errorHTML;
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
};