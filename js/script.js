const quotes = [

]

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


	const formCreateQuote = document.querySelector(`#form-CreateQuote`)
	const result = document.querySelector(`#result`)
	const generateBtn = document.querySelector(`.generateBtn`)
	const createyoursBtn = document.querySelector(`.createyoursBtn`)


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
		document.querySelector(`.getInspiredTooltip`).style.opacity = 0;

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
					document.querySelector(`#alert`).style.display = "flex";

					displayAlert()

				})
				.catch(err => console.log(err));

			hideEmpty()
		}
	}

	function deleQuote(id) {
		notifyEmpy()
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
				<p class="quoteID">ID: ${id}</p>
				<p class="quoteRowTxt">${quote.substring(0, 60)} ...</p>
				<p class="quoteRowAuthor"><i>- ${author}</i></p>
				</div>
				`
			quoteItem.addEventListener(`click`, function () { showHistoItem(id, quote, author) })


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

	function hideEmpty() {
		const emptyNotification = document.querySelector(`#itsEmpty`)
		emptyNotification.classList.add(`hide`)
		emptyNotification.classList.remove(`itsEmpty`)
	}

	function notifyEmpy() {
		const emptyNotification = document.querySelector(`#itsEmpty`)

		if (quotes.length == 1) {
			emptyNotification.classList.remove(`hide`)
			emptyNotification.classList.add(`itsEmpty`)
		}
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

	function openHisto() {
		console.log(`opened`)
		const labelHisto = document.querySelector(`#histolabel`)
		labelHisto.classList.add(`hide`)
		labelHisto.classList.remove(`histolabel`)

		const openHistoBtn = document.querySelector(`#openHistoBtn`)
		openHistoBtn.classList.add(`hide`)
		openHistoBtn.classList.remove(`openHistoBtn`)

		const quoteStion = document.querySelector(`#quote-stion`)
		quoteStion.classList.add(`hide`)
		quoteStion.classList.remove(`dispGrid`)

		const histoStion = document.querySelector(`#histo-stion`)
		histoStion.classList.remove(`hide`)
		histoStion.classList.add(`dispGrid`)
	}

	function displayAlert() {
		setTimeout(function () {
			document.querySelector(`#alert`).style.display = "none";
			document.querySelector(`.getInspiredTooltip`).style.opacity = 1;
		}, 700);
	}

	function closeHisto() {
		console.log(`close histo`)
		const labelHisto = document.querySelector(`#histolabel`)
		labelHisto.classList.remove(`hide`)
		labelHisto.classList.add(`histolabel`)

		const openHistoBtn = document.querySelector(`#openHistoBtn`)
		openHistoBtn.classList.remove(`hide`)
		openHistoBtn.classList.add(`openHistoBtn`)

		const quoteStion = document.querySelector(`#quote-stion`)
		quoteStion.classList.remove(`hide`)
		quoteStion.classList.add(`dispGrid`)

		const histoStion = document.querySelector(`#histo-stion`)
		histoStion.classList.add(`hide`)
		histoStion.classList.remove(`dispGrid`)
	}

	function setBGbutton(buttonA, buttonB) {
		console.log(buttonA, buttonB)
		buttonA.classList.add(`btnActive`)
		buttonA.classList.remove(`btnInactive`)
		buttonB.classList.add(`btnInactive`)
		buttonB.classList.remove(`btnActive`)
	}

	function showHistoItem(id, quote, author) {
		console.log(id, quote.substring(0, 20), author)
	}



	generateBtn.addEventListener(`click`, quoteAPI)
	createyoursBtn.addEventListener(`click`, createQuote)
	generateBtn.addEventListener(`click`, function () { setBGbutton(generateBtn, createyoursBtn) })
	createyoursBtn.addEventListener(`click`, function () { setBGbutton(createyoursBtn, generateBtn) })

	document.querySelector(`#saveQuoteBtn`).addEventListener(`click`, saveQuote)
	document.querySelector(`#orderBy`).addEventListener(`change`, LoadListQuote)
	document.querySelector(`#openHistoBtn`).addEventListener(`click`, openHisto)
	document.querySelector(`#closeHistoBtn`).addEventListener(`click`, closeHisto)

	fillLngQuote()
	console.log(`done`)
})