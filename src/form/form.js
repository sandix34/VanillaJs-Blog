import "../assets/styles/styles.scss"
import "./form.scss";

// create a reference for the form
const form = document.querySelector('form');

const errorElement = document.querySelector("#errors");
let errors = [];
const btnCancel = document.querySelector('.btn-secondary');
let articleId;

// fill in all fields by creating references and using information retrieved from the server
const fillForm = article => {
  const author = document.querySelector('input[name="author"]');
  const img = document.querySelector('input[name="img"]');
  const category = document.querySelector('input[name="category"]');
  const title = document.querySelector('input[name="title"]');
  const content = document.querySelector("textarea");
  author.value = article.author || "";
  img.value = article.img || "";
  category.value = article.category || "";
  title.value = article.title || "";
  content.value = article.content || "";
};

// parse the url and check if we have an if parameter
// if we have an id, we get the corresponding article
const initForm = async () => {
  const params = new URL(location.href);
  articleId = params.searchParams.get('id');
  console.log(articleId);
  
  if (articleId) {
    const response = await fetch(`https://restapi.fr/api/article/${ articleId }`)
    if (response.status < 300) {
      const article = await response.json();
      console.log(article);
      fillForm(article);
    }    
  }
}

initForm();


// returns to the home page if the user cancels the creation of an article
btnCancel.addEventListener('click', () => {
  window.location.assign('/index.html');
})

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
      let response;
      if (articleId) {
        // edit article
        response = await fetch(`https://restapi.fr/api/article/${ articleId }`, {
          method: "PATCH",
          body: json,
          headers: {
            "Content-Type": "application/json"
          }
        });
      } else {
        // create article
        response = await fetch("https://restapi.fr/api/article", {
          method: "POST",
          body: json,
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
      // if the response status is less than 300, there are no errors, we redirect
      if (response.status < 299) {
        window.location.assign('/index.html');
      }
    } catch (e) {
      console.error("e : ", e);
    }
  }
})

// check that all fields are filled
const formIsValid = article => {
  errors = [];
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