const row = document.querySelector('.row')
const all = document.querySelector('#all')
const search = document.querySelector('#search')
const searchBox = document.querySelector('.search-wrapper')
const submit = document.querySelector('#submit')
const searchInput = document.querySelector('#searchInput')
const name=document.querySelector('#name')
const image=document.querySelector('#image')
const language=document.querySelector('#languages')
const currency=document.querySelector('#currency')
const capital=document.querySelector('#capital')
const map=document.querySelector('#map')
const result=document.querySelector('.result')


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

submit.addEventListener('click', () => {
    let value = searchInput.value;
    result.classList.remove('hidden')
    fetch(`https://restcountries.com/v3.1/name/${value}`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            name.innerHTML = json[0].name.common
            image.src=json[0].flags.png
            language.innerHTML='Язык: '+Object.values(json[0].languages)
            currency.innerHTML=Object.values(json[0].currencies).map(el=>el.symbol)
            capital.innerHTML=json[0].capital
            map.href=json[0].maps.googleMaps
        })

})

