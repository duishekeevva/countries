const row = document.querySelector('.row')
const all = document.querySelector('#all')
const search = document.querySelector('#search')
const searchBox = document.querySelector('.search-wrapper')
const submit = document.querySelector('#submit')
const searchInput = document.querySelector('#searchInput')
const name = document.querySelector('#name')
const image = document.querySelector('#image-search')
const language = document.querySelector('#languages')
const currency = document.querySelector('#currency')
const capital = document.querySelector('#capital')
const map = document.querySelector('#map')
const country = document.querySelector('#country')
const city = document.querySelector('#city')
const date = document.querySelector('#date')
const temp = document.querySelector('#temp')
const tempText = document.querySelector('#temp-text')
const result = document.querySelector('.result')


const handleGetCountries = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(result => result.json())
        .then(data => {
            data.forEach(country => {
                row.innerHTML += `
            <div class="col-4">
                <div class="card">
                    <img src="${country.flags.png}" class="card-img-top" alt=""/>
                    <div class="card-body">
                    <h5 class="card-title">${country.translations.rus.official}</h5>
                    <p class="card-text">${country.capital}</p>
                    </div>
                </div>
            </div>
            `
            })
        })
}
handleGetCountries()

all.addEventListener('change', () => {
    if (all.checked) {
        row.classList.remove('hidden')
        searchBox.classList.add('hidden')
    }
})

search.addEventListener('change', () => {
    if (search.checked) {
        searchBox.classList.remove('hidden')
        row.classList.add('hidden')
    }
})

const handleSearch = () => {
    let value = searchInput.value;
    result.classList.remove('hidden')
    fetch(`https://restcountries.com/v3.1/name/${value}`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            name.innerHTML = json[0].name.common
            image.src = json[0].flags.png
            language.innerHTML = 'Язык: ' + Object.values(json[0].languages)
            currency.innerHTML = 'Валюта: '+Object.values(json[0].currencies).map(el => el.symbol)
            capital.innerHTML = 'Столица: '+json[0].capital
            map.href = json[0].maps.googleMaps
            fetch(`http://api.weatherapi.com/v1/current.json?key=6a07b5bcc8604fbca4260852230811&lang=ru&q=${json[0].capital}`)
                .then(res => res.json())
                .then(json => {
                    searchInput.value = ''
                    console.log(json)
                    city.innerHTML = 'Город: ' + json.location.region
                    date.innerHTML ='Дата: ' +  json.location.localtime
                    temp.innerHTML = 'Температура: ' + json.current.temp_c
                    tempText.innerHTML = json.current.condition.text
                })

        })

}

submit.addEventListener('click', () => handleSearch())

searchInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSearch()
    }
})



