module.exports = {
	hello: 'world'
};

// ------------------ PROMISES

function insertUsers(results) {
	// console.log(results);
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


// ------------------ ITERABLES

// ITERABLES (not for objects)
let names = ["stefan", "zbychu", "mietek"];

for (let name of names){
	console.log(name);
}

// for of nie zadziala na obiektach
let cats = {
	name1: "kot stefan",
	name2: "kot zbychu",
	name3: "kot mietek"
};

// [] i ... wrzuca zawartość do arraya
let values = [...cats.name1];
console.log(values);



// ------------------ forms i ajax


$(function() {
	$('#test-form').submit(function(event) {
		event.preventDefault(); // Prevent the form from submitting via the browser
		var form = $(this);
		var formData = {};

		
		// console.log(form);

		$.ajax({
			type: 'GET',
			// url: form.attr('action'), // gdzie wysylamy
			dataType: 'json',
			data: form
			// data: form
		}).done(function(data) {
			console.log(data);
		}).fail(function(data) {
		// Optionally alert the user of an error here...
		});
	});
});