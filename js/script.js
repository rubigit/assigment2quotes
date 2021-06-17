
const quotes = [

]

const formCreateQuote = document.querySelector(`#form-CreateQuote`)
const result = document.querySelector(`#result`)

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



	function createNewQuote() {

		const yourtext = document.querySelector(`.yourtext`)
		const yourname = document.querySelector(`.yourname`)
		if (yourtext.value && yourname.value) {
			console.log(yourtext.value)
			console.log(yourname.value)
		} else {
			console.log(`empty`)

		}
	}



	function displayRandomQuote(content, name) {

		document.querySelector(`#quoteText`).classList.remove(`hide`)
		document.querySelector(`#welcome`).classList.add(`hide`)
		document.querySelector(`#insertQuote`).innerHTML = content
		document.querySelector(`.q-open`).innerHTML = `"`
		document.querySelector(`.q-close`).innerHTML = `"`
		document.querySelector(`.cite`).innerHTML = name

	}


	function saveQuote() {


		let contentQuote = ""
		let authorName = ""

		if (formCreateQuote.classList.contains(`hide`)) {
			contentQuote = document.querySelector(`#insertQuote`).innerHTML
			authorName = document.querySelector(`.cite`).innerHTML
		} else {
			contentQuote = document.querySelector(`.yourtext`).value
			authorName = document.querySelector(`.yourname`).value
		}

		if (contentQuote != "" && authorName != "") {
			let _data = {
				author: authorName,
				quote: contentQuote,
			}


			fetch('https://reqres.in/api/users', {
				method: "POST",
				body: JSON.stringify(_data),
				headers: { "Content-type": "application/json; charset=UTF-8" }
			})
				.then(response => response.json())
				.then(response => {
					console.log(`------------`);
					console.log(response);
					quotes.push({
						id: response.id,
						author: response.author,
						quote: response.quote,
					})
					console.log(`saved`)
					LoadListQuote()

				})
				.catch(err => console.log(err));
		}
	}

	function deleQuote(id) {
		let index = quotes.findIndex(function (o) {
			return o.id === id;
		})
		console.log(index)
		quotes.splice(index, 1)
		LoadListQuote()
		console.log(`quote to delete`, id)
	}

	function LoadListQuote() {

		let sort = document.querySelector(`#orderBy`).value

		quotes.sort(function (a, b) {
			let valueA
			let valueB

			if (sort == "id") {
				valueA = a.id
				valueB = b.id
			}
			else {
				valueA = a.author
				valueB = b.author
			}

			if (valueA > valueB) {
				return 1
			}
			if (valueA < valueB) {
				return -1
			}

			return 0

		})

		const quoteTable = document.querySelector(`.historicalResult`)
		quoteTable.innerHTML = ``
		quotes.map(({ id, author, quote }) => {
			let content = ``
			console.log(id, author, quote)
			const quoteItem = document.createElement(`div`)
			quoteItem.classList.add(`histo-item`)

			quoteItem.innerHTML = `
				<div class="quoteRow">
				<p class="quoteID">${id}</p>
				<p class="quoteRowTxt">${quote.substring(0, 60)} ...</p>
				<p class="quoteRowAuthor">${author}</p>
				</div>
				`

			const deleteQuoteBtn = document.createElement(`button`)
			deleteQuoteBtn.classList.add(`deleteRowQuote`)
			deleteQuoteBtn.id = `deleteRowQuote`
			// deleteQuoteBtn.innerHTML = `Delete`
			deleteQuoteBtn.addEventListener(`click`, function () { deleQuote(`${id}`) })
			quoteTable.appendChild(quoteItem)
			quoteItem.appendChild(deleteQuoteBtn)
		})

		console.log(`loaded`)
	}






	function createQuote() {

		document.querySelector(`#saveQuoteBtn`).disabled = false

		document.querySelector(`#insertQuote`).innerHTML = ``
		document.querySelector(`.q-open`).innerHTML = ``
		document.querySelector(`.q-close`).innerHTML = ``
		document.querySelector(`.cite`).innerHTML = ``

		formCreateQuote.classList.remove(`hide`)
		formCreateQuote.classList.add(`form-CreateQuote`)
		result.classList.add(`hide`)
		result.classList.remove(`result`)

		console.log(`create`)
	}



	function quoteAPI() {

		document.querySelector(`#saveQuoteBtn`).disabled = false

		formCreateQuote.classList.add(`hide`)
		formCreateQuote.classList.remove(`form-CreateQuote`)
		result.classList.remove(`hide`)
		result.classList.add(`result`)

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
	document.querySelector(`#saveQuoteBtn`).addEventListener(`click`, saveQuote)
	document.querySelector(`.createyoursBtn`).addEventListener(`click`, createQuote)
	document.querySelector(`#orderBy`).addEventListener(`change`, LoadListQuote)




	fillLngQuote()
	console.log(`done`)
})