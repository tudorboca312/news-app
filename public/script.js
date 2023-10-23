// Elements
const btnGeneral = document.querySelector(`#general`);
const btnBusiness = document.querySelector(`#business`);
const btnSport = document.querySelector(`#sports`);
const btnTechnology = document.querySelector(`#technology`);
const btnEntertainment = document.querySelector(`#entertainment`);
const btnSearch = document.querySelector(`#btnSearch`);
const row = document.querySelector(`.row`);
pageHeadline = document.createElement(`div`);
pageHeadline.className = (`col-12`, `headline`);

// search topic
let topic = document.querySelector(`#input`);

let newsArticles = [];

// Opening browser
window.onload = function () {
  fetchGeneralNews();
  pageHeadline.textContent = `General News`;
};

// Event
btnSearch.addEventListener("click", function (e) {
  e.preventDefault();
  fetchSearchNews();
  pageHeadline.textContent = topic.value + ` news`;
  topic.value = "";
});
btnGeneral.addEventListener(`click`, function () {
  fetchGeneralNews();
  pageHeadline.textContent = `General News`;
});

btnBusiness.addEventListener(`click`, function () {
  fetchBusinessNews();
  pageHeadline.textContent = `Business News`;
});
btnSport.addEventListener(`click`, function () {
  fetchSportsNews();
  pageHeadline.textContent = `Sports News`;
});
btnTechnology.addEventListener(`click`, function () {
  fetchTechnologyNews();
  pageHeadline.textContent = `Technology News`;
});
btnEntertainment.addEventListener(`click`, function () {
  fetchEntertainmentNews();
  pageHeadline.textContent = `Etnertainment News`;
});

const fetchSearchNews = async () => {
  if (!topic.value) {
    return;
  }

  try {
    const response = await fetch(
      `/searchNews?q=${encodeURIComponent(topic.value)}`
    );
    newsArticles = [];

    if (response.status >= 200 && response.status < 300) {
      const data = await response.json();
      newsArticles = data.articles;
      displayNews();
    } else {
      console.log(response.status, response.statusText);
      pageHeadline.textContent = `No information found.`;
    }
  } catch (error) {
    console.error("Error fetching the news for search:", error);
    pageHeadline.textContent = `Error fetching news.`;
  }
};

const fetchGeneralNews = async () => {
  try {
    const response = await fetch("/getGeneralNews");
    newsArticles = [];

    if (response.status >= 200 && response.status < 300) {
      const data = await response.json();
      newsArticles = data.articles;
      displayNews();
    } else {
      console.log(response.status, response.statusText);
      pageHeadline.textContent = `No information found.`;
    }
  } catch (error) {
    console.error("Error fetching the news:", error);
    pageHeadline.textContent = `Error fetching news.`;
  }
};

const fetchBusinessNews = async () => {
  try {
    const response = await fetch("/getBusinessNews");
    newsArticles = [];

    if (response.status >= 200 && response.status < 300) {
      const data = await response.json();
      newsArticles = data.articles;
      displayNews();
    } else {
      console.log(response.status, response.statusText);
      pageHeadline.textContent = `No information found.`;
    }
  } catch (error) {
    console.error("Error fetching the news:", error);
    pageHeadline.textContent = `Error fetching news.`;
  }
};

const fetchSportsNews = async () => {
  try {
    const response = await fetch("/getSportNews");
    newsArticles = [];

    if (response.status >= 200 && response.status < 300) {
      const data = await response.json();
      newsArticles = data.articles;
      displayNews();
    } else {
      console.log(response.status, response.statusText);
      pageHeadline.textContent = `No information found.`;
    }
  } catch (error) {
    console.error("Error fetching the news:", error);
    pageHeadline.textContent = `Error fetching news.`;
  }
};

const fetchTechnologyNews = async () => {
  try {
    const response = await fetch("/getTechnologyNews");
    newsArticles = [];

    if (response.status >= 200 && response.status < 300) {
      const data = await response.json();
      newsArticles = data.articles;
      displayNews();
    } else {
      console.log(response.status, response.statusText);
      pageHeadline.textContent = `No information found.`;
    }
  } catch (error) {
    console.error("Error fetching the news:", error);
    pageHeadline.textContent = `Error fetching news.`;
  }
};
const fetchEntertainmentNews = async () => {
  try {
    const response = await fetch("/getEntertainmentNews");
    newsArticles = [];

    if (response.status >= 200 && response.status < 300) {
      const data = await response.json();
      newsArticles = data.articles;
      displayNews();
    } else {
      console.log(response.status, response.statusText);
      pageHeadline.textContent = `No information found.`;
    }
  } catch (error) {
    console.error("Error fetching the news:", error);
    pageHeadline.textContent = `Error fetching news.`;
  }
};

function displayNews() {
  newsArticles = newsArticles.filter(
    (article) => article.title !== "[Removed]"
  );

  row.innerHTML = "";
  row.appendChild(pageHeadline);

  newsArticles.forEach((article) => {
    let col = document.createElement(`div`);
    let card = document.createElement(`div`);
    let cardBody = document.createElement(`div`);
    let date = document.createElement(`h6`);
    let title = document.createElement(`h2`);
    let shortTitle = document.createElement(`h2`);
    let text = document.createElement(`p`);
    let shortText = document.createElement(`p`);
    let img = document.createElement(`img`);
    let a = document.createElement(`a`);

    col.className = `col-lg-3 col-md-4 col-sm-6 col-12`;
    card.className = `card`;
    cardBody.className = `card-body`;
    date.className = `card-subtitle text-primary`;
    shortTitle.className = `card-title`;
    shortText.className = `card-text`;
    img.className = `card-img-top`;
    a.className = `btn btn-primary btn-dark `;
    a.setAttribute(`href`, article.url);
    a.setAttribute(`target`, `_blank`);

    // Put the input here
    date.textContent = article.publishedAt.split("T")[0];
    title = article.title;
    shortTitle.textContent = title.split(" ").slice(0, 10).join(" ");
    text = article.description;
    if (text == null) {
      shortText.textContent = text;
    } else {
      shortText.textContent = text.split(" ").slice(0, 25).join(" ") + ` ...`;
    }
    a.textContent = `View full article`;
    if (article.urlToImage == null) {
      img.src = `notAvailable.png`;
    } else {
      img.src = article.urlToImage;
    }
    // append here
    row.appendChild(col);
    col.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(img);
    cardBody.appendChild(date);
    cardBody.appendChild(shortTitle);
    cardBody.appendChild(shortText);
    cardBody.appendChild(a);
  });
}
