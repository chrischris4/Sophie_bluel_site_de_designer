
document.addEventListener("DOMContentLoaded", function(event) {

	// Opening modal
	document.querySelector('.modal-open').addEventListener('click', function(event) {
		document.querySelector('#modal-form').style.display = "none"
		document.querySelector('#modal-gallery').style.display = "flex"
		// document.querySelector('.modal').removeAttribute('aria-hidden')
		document.querySelector('.modal').classList.add('open')

		// add works to modal

		fetch('http://localhost:5678/api/works')
		.then((response) => response.json())
		.then((results) => {
			console.log(results);
			results.forEach((element, index) => {
				categories.push(element.category);

				let figureElem = document.createElement('figure');
				figureElem.classList.add(`work-item`);
				figureElem.classList.add(`category-id-0`);
				figureElem.classList.add(`category-id-${element.categoryId}`);
				document.getElementById('modal-photo').appendChild(figureElem);

				let imgElem = document.createElement('img');
				figureElem.appendChild(imgElem);
				imgElem.setAttribute("src", element.imageUrl);
				imgElem.setAttribute("crossorigin", "anonymous");
				imgElem.style.width = "78px"
				imgElem.style.height = "104px"

				let dltElem = document.createElement('button');
				figureElem.appendChild(dltElem);
				dltElem.classList.add('dlt-element-btn');
				




//   		dltElem.onclick = function() {
// // Supprimer l'élément parent du bouton (c'est-à-dire l'élément que l'utilisateur veut supprimer)
//     	this.parentNode.remove();

//   		};
		});
	})
	})


		// change modal with "ajouter une photo"
	document.querySelector('.modal-photo-btn').addEventListener('click', function(event) {
		document.querySelector('#modal-gallery').style.display = "none"
		document.querySelector('#modal-form').style.display = "flex"
	})


		// go back to first modal with arrow
	document.querySelector('.modal-back').addEventListener('click', function(event) {
		document.querySelector('#modal-form').style.display = "none"
		document.querySelector('#modal-gallery').style.display = "flex"
	})

	// Closing modal when clicking on X
	document.querySelector('.modal-close').addEventListener('click', function(event) {
		console.log("yooo")
		document.querySelector('#modal-form').style.display = "none"
		document.querySelector('#modal-gallery').style.display = "none"
		document.getElementById('modal-photo').innerHTML = "";
		document.querySelector('.modal').classList.remove('open')
	})


	document.querySelector('.modal-close2').addEventListener('click', function(event) {
		console.log("yooo")
		document.querySelector('#modal-form').style.display = "none"
		document.querySelector('#modal-gallery').style.display = "none"
		document.getElementById('modal-photo').innerHTML = "";
		document.querySelector('.modal').classList.remove('open')
	})

	// Closing modal when clicking on overlay
	document.querySelector('.modal').addEventListener('click', function(event) {
		document.querySelector('#modal-form').style.display = "none"
		document.querySelector('#modal-gallery').style.display = "none"
		document.getElementById('modal-photo').innerHTML = "";
		document.querySelector('.modal').classList.remove('open')
	})

	// Avoiding modal to close when clicking on modal content
	document.querySelector('.modal-content').addEventListener('click', function(event) {
		event.stopPropagation()
	})

	document.querySelector('#modal-form').addEventListener('click', function(event) {
		event.stopPropagation()
	})


	const dltElem = document.querySelectorAll('.dlt-element-btn');
dltElem.forEach(button => {
	button.addEventListener('click', () => {
		const elementId = button.parentElement.id;
		fetch(`http://localhost:5678/api-docs/#/default/delete_works__id_/${elementId}`, {
		method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(`Element ${elementId} deleted successfully`);
      button.parentElement.remove();
    })
    .catch(error => {
      console.error(`There was a problem deleting element ${elementId}:`, error);
    });
  });
});
})