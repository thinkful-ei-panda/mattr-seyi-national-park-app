const apiKey = 'IrnLj9BsznHDe8SuSOHyUzcYU6g3gV8cGds723Pf';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

//watch for the form submission
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(apiKey, searchTerm, maxResults);
    
  });
}

$(watchForm);

function getParks(apiKey, query, maxResults = 10) {

  const params = {
    apiKey,
    q: query,
    limit: maxResults
  };
  //create a string with the original URL and the new parameters
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString + apiKey;

  console.log(url);
 


  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      console.log(response);
      throw new Error(response.status);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message} error!`);
    });
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0;i < responseJson.data.length ; i++) {
    $('#results-list').append(`<li>
      <h3>${responseJson.data[i].fullname}</h3>
      <p>${responseJson.data[i].description}</p>
      <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
      </li>`);
    $('#results').removeClass('hidden');
  }
};