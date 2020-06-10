'use strict';

// put your own value below!
const apiKey = 'IrnLj9BsznHDe8SuSOHyUzcYU6g3gV8cGds723Pf'; 
const searchURL = 'https://developer.nps.gov/api/v1/alerts?parkCode=acad,dena';


function fetchURI(park, limit = 10) {
  fetch(`https://developer.nps.gov/api/v1/alerts?parkCode=${park}&limit=${limit - 1}&fields=addresses&api_key=${apiKey}`)
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
            <li class="name">${element.fullName}</li>
            <li> ${element.description}</li>
            <li><a href = "${element.directionsUrl}"> ${element.addresses[1].line1} ${element.addresses[1].city} ${element.addresses[1].stateCode} ${element.addresses[1].postalCode}</a></li>
            <li><a href = "${element.url}">Check out their website</a></li>
          </ul>
      </li>`;
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
    fetch(getState(), getMax());
    $(".js-search-term").val("");
  });
}

$(handleInput);
// function formatQueryParams(params) {
//   const queryItems = Object.keys(params)
//     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//   return queryItems.join('&');
// }

// function displayResults(responseJson) {
//   // if there are previous results, remove them
//   console.log(responseJson);
//   $('#results-list').empty();
//   // iterate through the items array
//   for (let i = 0; i < responseJson.items.length; i++){
//     // for each video object in the items 
//     //array, add a list item to the results 
//     //list with the video title, description,
//     //and thumbnail
//     $('#results-list').append(
//       `<li><h3>${responseJson.items[i].snippet.title}</h3>
//       <p>${responseJson.items[i].snippet.description}</p>
//       <img src='${responseJson.items[i].snippet.thumbnails.default.url}'>
//       </li>`
//     )};
//   //display the results section  
//   $('#results').removeClass('hidden');
// };

// function getYouTubeVideos(query, maxResults=10) {
//   const params = {
//     key: apiKey,
//     q: query,
//     part: 'snippet',
//     maxResults,
//     type: 'video'
//   };
//   const queryString = formatQueryParams(params)
//   const url = searchURL + '?' + queryString;

//   console.log(url);

//   fetch(url)
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error(response.statusText);
//     })
//     .then(responseJson => displayResults(responseJson))
//     .catch(err => {
//       $('#js-error-message').text(`Something went wrong: ${err.message}`);
//     });
// }

// function watchForm() {
//   $('form').submit(event => {
//     event.preventDefault();
//     const searchTerm = $('#js-search-term').val();
//     const maxResults = $('#js-max-results').val();
//     getYouTubeVideos(searchTerm, maxResults);
//   });
// }

//$(watchForm);