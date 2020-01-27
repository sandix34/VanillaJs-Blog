import "./assets/styles/styles.scss";
import "./index.scss";

const articleContainerElement = document.querySelector(".articles-container");
const categoriesContainerElement = document.querySelector(".categories");

const createArticles = articles => {  
  const articlesDOM = articles.map(article => {
    const articleDOM = document.createElement("div");
    articleDOM.classList.add("article");
    articleDOM.innerHTML = `
      <img src="${ article.img }" alt="profile">
      <h2>${ article.title }</h2>
      <p class="article-author">${ article.author } - ${ (new Date(article.createdAt)).toLocaleDateString("fr-FR", {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }) }</p>
      <p class="article-content">${ article.content }</p>
      <div class="article-actions">
        <button class="btn btn-danger" data-id=${article._id}>supprimer</button>
        <button class="btn btn-primary" data-id=${article._id}>Mofifier</button>
      </div>
    `;
    return articleDOM;
  });
  articleContainerElement.innerHTML = '';
  articleContainerElement.append(...articlesDOM);
  const deleteButtons = articleContainerElement.querySelectorAll('.btn-danger');
  const editButtons = articleContainerElement.querySelectorAll('.btn-primary');

  // addition of a listener for all buttons and redirect by passing in parameter the article id
  editButtons.forEach( button => {
    button.addEventListener('click', event => {
      const target = event.target;
      const articleId = target.dataset.id;
      location.assign(`/form.html?id=${ articleId }`);
    })
  })

  deleteButtons.forEach( button => {
    button.addEventListener('click', async event => {
      try {
        const target = event.target;
        const articleId = target.dataset.id;
        const response = await fetch(`https://restapi.fr/api/article/${ articleId }`, {
          method: "DELETE"
        });
        const body = await response.json();
        console.log(body);
        fetchArticle();
      } catch(e) {
        console.log("e:", e);
      }

    })
  })  
};

// create a list element for each category contained in the array
const displayMenuCategories = (categoriesArr) => {
  const liElements = categoriesArr.map( categoryElem => {
    const li = document.createElement('li');
    li.innerHTML = `<li>${ categoryElem[0] }<strong>(${ categoryElem[1] })</strong></li>`;
    return li;
  });
  categoriesContainerElement.innerHTML = '';
  categoriesContainerElement.append(...liElements);
}

const createMenuCategories = (articles) => {
  // transforms articles retrieved from the server into an object
  const categories = articles.reduce((acc, article) => {
    if (acc[article.category]) {
      acc[article.category]++;
    } else {
      acc[article.category] = 1;
    }
    return acc;
  }, {})

  // transform the object into an array of arrays
  const categoriesArr = Object.keys(categories).map((category) => {
    return [category, categories[category]]
  });
  displayMenuCategories(categoriesArr);
}

const fetchArticle = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/article");
    const articles = await response.json();
    console.log(articles);
    createArticles(articles);
    createMenuCategories(articles);
  } catch (e) {
    console.log("e:", e);
  }
};

fetchArticle();
