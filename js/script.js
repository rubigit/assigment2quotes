document.addEventListener("DOMContentLoaded", function () {
	console.log(`Ready`)

	//list of language supported
	const languages = [
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

	//get the language of the quote to generate
	const getSourceLanguge = function (event) {
		console.log(event.target.value)
		let language = event.target.value
		let lanparameter = `?language_code=${language}`
		console.log(lanparameter)


	}

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


	function displayRandomQuote(content, name) {

		document.querySelector(`#quoteText`).classList.remove(`hide`)
		document.querySelector(`#welcome`).classList.add(`hide`)
		document.querySelector(`#saveQuoteBtn`).disabled = false
		document.querySelector(`#insertQuote`).innerHTML = content
		document.querySelector(`.q-open`).innerHTML = `"`
		document.querySelector(`.q-close`).innerHTML = `"`
		document.querySelector(`.cite`).innerHTML = name

	}


	function storageQuote() {
		const contentQuote = document.querySelector(`#insertQuote`).innerHTML
		const authorName = document.querySelector(`.cite`).innerHTML
		alert(`saved`)

	}


	function quoteAPI() {
		const langQuote = document.querySelector(`#lang-quote`)
		let langparameter = `random/?language_code=${langQuote.value}`



		fetch(`https://quotes15.p.rapidapi.com/quotes/${langparameter}`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "0b168600abmsh79f9a6cdaf4fc2ep120417jsn341f4e4f7d29",
				"x-rapidapi-host": "quotes15.p.rapidapi.com"
			}
		})
			.then((response) => response.json())
			.then(response => {
				console.log(response);

				displayRandomQuote(response.content, response.originator.name)
			})
			.catch(err => {
				console.error(err);
			});
	}




	document.querySelector(`.generateBtn`).addEventListener(`click`, quoteAPI)
	document.querySelector(`#saveQuoteBtn`).addEventListener(`click`, storageQuote)



	fillLngQuote()
	fillLngHistorical()
	console.log(`done`)

})