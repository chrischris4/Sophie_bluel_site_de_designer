// mon essai :


// document.addEventListener("DOMContentLoaded", function() {
//     const email = document.getElementsById('email', userId);
//     const password = document.getElementsById('mdp', token);

//     if (email.value == "")
//     {
//         alert("Mettez votre mail"); 
//         email.focus(); 
//         return false; 
//     } 

//     if (password.value == "")
//     {
//         alert("Mettez votre mdp"); 
//         password.focus(); 
//         return false; 
//     }
//     return true;
// });

// localStorage.getItem('user' , "json");

// const data = { username: 'userId' };
// const pwd = { passeword: 'token'};

// fetch('http://localhost:5678/api/users/login', {
//     method: 'POST', // or 'PUT'
//     headers: {
//     'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
// })
// .then((response) => response.json())
// .then((data) => {
//     console.log('Success:', data);
// })
// .catch((error) => {
//     console.error('Error:', error);
// });;

document.addEventListener("DOMContentLoaded", function(event) {

	const form = document.querySelector('form');
	form.addEventListener('submit', function(event) {
		event.preventDefault();
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		const data = { email, password };

		fetch('http://localhost:5678/api/users/login', {
			method: 'POST',	
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)															// Convert a JS object into a string
		})
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			if(json.userId != undefined && json.token != undefined) {
				localStorage.setItem("userId", json.userId);				
				localStorage.setItem("token", json.token);				
				location.href = "index.html";
			}
			else {
				alert("Erreur dans l’identifiant ou le mot de passe");
			}
		})
		.catch((err) => {
			console.log(err);
		});
	});
});

console.log('yoooo');