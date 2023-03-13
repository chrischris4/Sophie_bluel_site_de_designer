const categories = [];
categories.push({id: 0, name: 'Tous'});

fetch('http://localhost:5678/api/works')
.then((response) => response.json())
.then((results) => {
	results.forEach((element, index) => {
		// Collecting categories
		categories.push(element.category);

		// Creating <figure>
		let figureElem = document.createElement('figure');
		figureElem.setAttribute('id', `work-item-${element.id}`);
		figureElem.classList.add(`work-item`);
		figureElem.classList.add(`category-id-0`);
		figureElem.classList.add(`category-id-${element.categoryId}`);
		document.getElementsByClassName('gallery')[0].appendChild(figureElem);

		// Creating <img>
		let imgElem = document.createElement('img');
		figureElem.appendChild(imgElem);
		imgElem.setAttribute("src", element.imageUrl);
		imgElem.setAttribute("alt", element.title);
		imgElem.setAttribute("crossorigin", "anonymous");

		// Creating <figcaption>
		let figCaptionElement = document.createElement('figcaption');
		figureElem.appendChild(figCaptionElement);
		figCaptionElement.textContent = element.title;
	});

	let alreadyDisplayedCategoriesIds = [];
	categories.forEach((category, index) => {
		if(alreadyDisplayedCategoriesIds.includes(category.id) === false) {

			// Adding category ID to the categories already displayed
			alreadyDisplayedCategoriesIds.push(category.id);

			// Creating category filter button
			let btn = document.createElement("button");
			btn.textContent = category.name;
			btn.setAttribute("class", "work-filter");
			btn.setAttribute("data-filter", `category-id-${category.id}`);
			document.body.appendChild(btn);
			document.getElementsByClassName('filter')[0].appendChild(btn);

			// Adding filter for all categories
			document.querySelectorAll('.work-filter').forEach(filterButton => {
				filterButton.addEventListener('click', function(event) {
					let filterValue = this.getAttribute('data-filter');
					document.querySelectorAll('.work-item').forEach(workItem => {
						if(!workItem.classList.contains(filterValue)) {
							workItem.style.display = 'none';
						} else {
							workItem.style.display = '';
						}
					});
				});
			});
		}
	});
})
.catch(function(err) {
	console.log(err);
});

document.addEventListener("DOMContentLoaded", function(event) {
	// Handling logout
	document.getElementById('nav-logout').addEventListener('click', function(event) {
		localStorage.removeItem('userId');
		localStorage.removeItem('token');
		location.href = "index.html";
	});
	// Checking if user is connected
	if(localStorage.getItem("userId") !== null && localStorage.getItem("token") !== null) {
		document.querySelector('body').classList.add(`connected`);
	}
});
