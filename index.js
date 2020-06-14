const apiKey = `IrnLj9BsznHDe8SuSOHyUzcYU6g3gV8cGds723Pf`; 

function formatQueryParams(park, limit) {
  return `https://developer.nps.gov/api/v1/parks?statecode=${park}&limit=${limit}&api_key=${apiKey}`;
}

const fetchURI = function (park, limit) {

  const url = formatQueryParams(park, limit);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } throw new Error(response.statusText);
    })
    .then(responseJson => generate(responseJson))
    .catch(err => {
      alert(err.message);
    });
    
};


//generate the html doc from list of sites
function generate(list) {
  $('.results-list').empty();
  
//each element has a fullName, description, and url
  list.data.forEach(element => {
    $('.results-list').append(
       ` <li class="name">${element.fullName}
        <p> ${element.description}</p>
        <a href = "${element.url}">Check out their website</a>
        </li>`);
  });

  $('#results').removeClass('hidden');

}

function getMax() {
  const max = $(".js-max-results").val();
  return max;
}

function getPark() {
  let ans = $(".js-search-term").val();
  return ans;
}

function handleInput() {
  $(".js-form").on("submit", event => {
    event.preventDefault();
    fetchURI(getPark(), getMax());
    $(".js-search-term").val("");
  });
}

$(handleInput);
