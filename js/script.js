document.addEventListener("DOMContentLoaded", function () {
    console.log(`Ready`)

    function quoteAPI() {
        fetch("https://quotes15.p.rapidapi.com/quotes/random/?language_code=en", {
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
    console.log(`done`)

})