const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json',
    cities = [],
	searchInput = document.getElementById('arch'),
	suggestions = document.querySelector('.suggestions');

    //run a fetch on endpoint and store it in array of cities
 let response = fetch(endpoint);
 response.then(res => res.json()).then(data => cities.push(...data));


//function to find word match
function find(word, cities) {
    return cities.filter(place => {
        const reg = new RegExp(word, 'gi');

        return place.city.match(reg) || place.state.match(reg);
    })

}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayWords() {
	const matchArray = find(this.value, cities);
	const suggestionsListHtml = matchArray.map(place => {
		const regex = new RegExp(this.value, 'gi'),
		    cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`),
		    stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);

		return `
			<li>
			 	<span class="name">${cityName}, ${stateName}</span>
			 	<span class="population">${numberWithCommas(place.population)}</span>
			</li>
		`;
	}).join('');

	suggestions.innerHTML = suggestionsListHtml;

    if(this.value.length == 0) {
       return suggestions.innerHTML = '';
    }

}


// listen for two types of events on one element
['keyup', 'change'].forEach(event => searchInput.addEventListener(event, displayWords));
