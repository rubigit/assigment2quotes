document.addEventListener("DOMContentLoaded", function () {
    console.log(`Ready`)

    //list of language supported
    const languages = [
        { value: 'random', lan: 'Any language' },
        { value: 'en', lan: 'English' },
        { value: 'es', lan: 'Spanish' },
        { value: 'pt', lan: 'Portuguese' },
        { value: 'it', lan: 'Italian' },
        { value: 'de', lan: 'German' },
        { value: 'fr', lan: 'French' },
        { value: 'cs', lan: 'Czech' },
        { value: 'sk', lan: 'Slovak' },
        { value: 'pl', lan: 'Polish' },
        { value: 'hu', lan: 'Hungarian' },
        { value: 'ru', lan: 'Russian' }
    ]

    // list the language supported to generate a quote
    function fillLngQuote() {
        let langTable = document.querySelector(`#lang-quote`)
        languages.map(({ value, lan }) => {
            let language = document.createElement(`option`)
            language.value = value
            language.innerHTML = lan
            langTable.appendChild(language)
        })
    }

    // list the language supported to filter and display historical quotes
    function fillLngHistorical() {
        let langTable = document.querySelector(`#lang-historial`)
        languages.map(({ value, lan }) => {
            let language = document.createElement(`option`)
            language.value = value
            language.innerHTML = lan
            langTable.appendChild(language)
        })
    }

    // "https://quotes15.p.rapidapi.com/quotes/random/?language_code=en",
    // "https://quotes15.p.rapidapi.com/quotes/random/",


    function quoteAPI() {
        let language = `en`
        let lanparameter = `?language_code=${language}`
        let urlparameter = `random`
        fetch(`https://quotes15.p.rapidapi.com/quotes/${urlparameter}/${lanparameter}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "122be4bc75msh68bce673fe682f2p115239jsnae37af3f51c1",
                "x-rapidapi-host": "quotes15.p.rapidapi.com"
            }
        })
            .then((response) => response.json())
            .then(response => {
                console.log(response);
                console.log(response.content);
            })
            .catch(err => {
                console.error(err);
            });
    }


    quoteAPI()
    fillLngQuote()
    fillLngHistorical()
    console.log(`done`)

})