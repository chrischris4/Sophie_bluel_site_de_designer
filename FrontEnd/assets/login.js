
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
			switch(response.status) {
				case 500:
				case 503:
					alert("Erreur côté serveur");
				break;
				case 401:
				case 404:
					alert("Email ou mot de passe incorrect");
				break;
				case 200:
					console.log("Authentification réussie");
					return response.json();
				break;
				default:
					alert("Erreur inconnue");
				break;
			}
		})
		.then(function(json) {
			localStorage.setItem("userId", json.userId);
			localStorage.setItem("token", json.token);
			location.href = "index.html";
		})
		.catch((err) => {
			console.log(err);
		});
	});
});
