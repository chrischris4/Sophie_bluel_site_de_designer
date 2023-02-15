console.log('hello');



// fetch('http://localhost:5678/api/works')
// .then(function(response) {
//     if(response.ok) {
//         response = response.json()
//         console.log(response)
//         response.forEach((value, index) => {
//            console.log(value)
//            console.log(index)
//         });
//     }
// })


const categories = [];
categories.push({id: 0, name: 'Tous'});

fetch('http://localhost:5678/api/works')
.then((response) => response.json())
.then((results) => {
		console.log(results);
    results.forEach((element, index) => {
    		// Collecting categories
    	categories.push(element.category);

    		// Creating <figure>
        let figureElem = document.createElement('figure');
        figureElem.classList.add(`work-item`);
        figureElem.classList.add(`category-id-0`);
        figureElem.classList.add(`category-id-${element.categoryId}`);
        document.getElementsByClassName('gallery')[0].appendChild(figureElem);
        //document.querySelector('.gallery').appendChild(figureElem);

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

		console.log(categories);
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


				// Adding event listener
				btn.addEventListener('click', function(event) {
					console.log("clicked");
					console.log(event.target.getAttribute('data-filter'));
				});

				// add filter for all categories
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
