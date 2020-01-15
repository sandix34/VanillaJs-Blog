import "../assets/styles/styles.scss"
import "./form.scss";

// create a reference for the form
const form = document.querySelector('form');

// add a listener to the submit event of the form
form.addEventListener('submit', event => {
  // prevents reloading the page
  event.preventDefault();
  // use the FormData object to parse all form fields
  const formData = new FormData(form);
  // returns an iterable of key / value pairs
  const entries = formData.entries();
  // Object.fromEntries transforms an iterable pair of key / value pairs into a javascript object
  const article = Object.fromEntries(entries);
  // convert javascript object to json 
  const json = JSON.stringify(article);
  
})
