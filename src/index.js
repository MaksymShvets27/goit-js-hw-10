import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from './js/fetchCountries.js';
var _ = require('lodash');
const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector("#search-box");
const infoRef = document.querySelector(".country-info");

function renderCountryList(country) {
    let markup = {};
    if (country.length < 2) {
        markup = country.map((unit) => {
            console.log(unit);
            return `<li>
        <img src = ${unit.flags.svg} alt="" width="200px" height="100px">
          <p><b>Name</b>: ${unit.name.official}</p>
          <p><b>Capital</b>: ${unit.capital}</p>
          <p><b>Population</b>: ${unit.population}</p>
          <p><b>Languages</b>: ${Object.values(unit.languages)}</p>
        </li>`
        })
            .join(" ");
    } else {
        markup = country.map((unit) => {
            return `<li>
        <img src = ${unit.flags.svg} alt="" width="24px" height="24px">
         ${unit.name.official}
        </li>`
        })
    }
    infoRef.insertAdjacentHTML("beforeend", markup);
}

inputRef.addEventListener("input", _.debounce(((event) => {
    infoRef.textContent = "";
    // let input = event.target.value;
    (fetchCountries(`${event.target.value}`)
        .then((data) => {
            if (data.length >= 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            } else {
                return renderCountryList(data)
            }
        })
        .catch((error) => Notiflix.Notify.failure("Oops, there is no country with that name"))
    )
}), DEBOUNCE_DELAY)
)