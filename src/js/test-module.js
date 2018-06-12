module.exports = {
	hello: 'world'
};


var dataTekst = [];
var dataKolor = [];
var dataLiczba = [];

var wykresData = document.querySelectorAll('#wykres-data>li');

for (var i = 0; i < wykresData.length; i++) {
    dataTekst.push(wykresData[i].getAttribute("data-tekst"));
    dataKolor.push(wykresData[i].getAttribute("data-kolor"));
    dataLiczba.push(wykresData[i].getAttribute("data-liczba"));

}

console.log('all:' + wykresData);

var dataTekstQuoted = "'" + dataTekst.join("','") + "'";
var dataKolorQuoted = "'" + dataKolor.join("','") + "'";
var dataLiczbaQuoted = "'" + dataLiczba.join("','") + "'";


console.log('sss ' + dataTekstQuoted);
console.log('sss ' + dataKolorQuoted);
console.log('sss ' + dataLiczbaQuoted);


// ------------------ PROMISES

function insertUsers(results) {
	// console.log(results);
	let resultData = results.data;
    resultData.forEach(result => {
        console.log(`${result.first_name}`);
        console.log(`${result.avatar}`);

        var main = $('#main');

        main.append(`<div class="col-sm-4 text-center">${result.first_name}<br/><img src="${result.avatar}" class="rounded-circle ml-1 mr-1 mb-2"/></div>`);

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
	// console.log(name);
}

// for of nie zadziala na obiektach
let cats = {
	name1: "kot stefan",
	name2: "kot zbychu",
	name3: "kot mietek"
};

// [] i ... wrzuca zawartość do arraya
let values = [...cats.name1];
// console.log(values);



// ------------------ forms i ajax


$('#test-form').submit(function(event) {
	event.preventDefault(); // Prevent the form from submitting via the browser
	var form = $(this);
	var formSerialize = form.serializeArray();

	var formData = {};

	$(formSerialize).each(function(index, obj){
	    formData[obj.name] = obj.value;
	});

	$.ajax({
		type: 'GET',
		beforeSend: function() {
			$("#load-stuff").html(`<div class="load-box"><p>loading stuff</p><p>this definietly need some styling ;)</p></div>`);
		}

	}).done(function(data) {

		setTimeout(function(){
			$('#load-stuff').find('.load-box').html(`Hello mister ${formData.name}, ur email: ${formData.email}, and ur phone: ${formData.phone} `);
		}, 1000);

	}).fail(function(data) {

	});
});

let kontenerTextu = document.querySelector('body');
let text = document.querySelector('.text-moving')
let walk = 100; //px

function shadow(e){
	const { offsetWidth: width, offsetHeight: height } = kontenerTextu;
	// same as upper
	// const width = kontenerTextu.offserWidth;
	// const height = kontenerTextu.offserWidth;

	let { offsetX: x, offsetY: y} = e;

	if (this !== e.target) {
		x = x + e.target.offsetLeft;
		y = y + e.target.offsetTop;
	}

	let xWalk = Math.round((x / width * walk) - (walk / 2));
	let yWalk = Math.round((y / height * walk) - (walk / 2));

	text.style.textShadow = `
		${xWalk}px ${yWalk}px 3px rgba(0,0,0,0.2)
	`;
	text.style.transition = `all 50ms ease`;

	console.log(xWalk, yWalk);

}

kontenerTextu.addEventListener('mousemove', shadow);