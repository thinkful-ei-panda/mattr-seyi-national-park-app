'use strict';

const apiKey = 'IrnLj9BsznHDe8SuSOHyUzcYU6g3gV8cGds723Pf'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function fetchURI(park, limit = 10) {
  fetch(`https://developer.nps.gov/api/v1/alerts?parkCode=${park}&limit=${limit}&fields=addresses&api_key=${apiKey}`)
    .then(response => response.json())
    .then((json) => display(generate(json.data)));
}

//generate the html doc from list of sites
function generate(list) {
  let result = "";
  
//each element has a fullName, description, and url
  list.forEach(element => {
    result +=
      `<li>
          <ul>
            <li class="name">${element.name}</li>
            <li> ${element.description}</li>
            <li><a href = "${element.url}">Check out their website</a></li>
          </ul>
      </li>`;
    $("#results").removeClass("hidden");
  });
  return result;
}

function getMax() {
  const max = $(".js-max-results").val();
  return max;
}

//get the state that the user puts in
function getState() {
  let ans = $(".js-search-term").val();
  return ans.replace(/\s/g, "");
}

function display(string) {
  $('result-list').html(string);
}

function handleInput() {
  $(".js-form").on("submit", event => {
    event.preventDefault();
    fetchURI(getState(), getMax());
    $(".js-search-term").val("");
  });
}

$(handleInput);
