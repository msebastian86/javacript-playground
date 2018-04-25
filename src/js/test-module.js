module.exports = {
	hello: 'world'
};


function insertUsers(results) {
	console.log(results);
	let resultData = results.data;
    resultData.forEach(result => {
        console.log(`${result.first_name}`);
        console.log(`${result.avatar}`);

        var main = document.getElementById('main');

        main.insertAdjacentHTML('afterend', `<p>${result.first_name}</p><img src="${result.avatar}" class="rounded-circle ml-1 mr-1 mb-2"/>`);


    })
}

function getPollResultsFromServer(pollName){
	return new Promise(function(resolve, reject){
		// let url = `https://api.bbm.pl/wp-json/wp/v2/relacje`;
		let url = `https://reqres.in/api/users`;
		let request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				resolve(JSON.parse(request.response));
			} else {
				reject('Błąd w ściąganiu danych');
			}
		};
		request.send();
	});
};

getPollResultsFromServer("somthing").then(function(results){
	insertUsers(results);

}).catch(function(err){

	alert(` ${err} dfsfsd`);

});