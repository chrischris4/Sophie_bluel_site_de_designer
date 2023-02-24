
document.addEventListener("DOMContentLoaded", function(event) {

	// Opening modal
	document.querySelector('.modal-open').addEventListener('click', function(event) {
		document.querySelector('.modal').removeAttribute('aria-hidden')
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


  		dltElem.onclick = function() {
// Supprimer l'élément parent du bouton (c'est-à-dire l'élément que l'utilisateur veut supprimer)
    	this.parentNode.remove();

  		};
//   		childElements[i].appendChild(deleteButton);
// 		}
			});
	})
	})

	// fetch('http://localhost:5678/api-docs/#/default/delete_works__id_, {
	// 	method: 'DELETE'
	//   })
	//   .then(response => {
	// 	if (!response.ok) {
	// 	  throw new Error('Erreur lors de la suppression du travail');
	// 	}
	// 	console.log('Le travail a été supprimé avec succès');
	//   })
	//   .catch(error => {
	// 	console.error('Une erreur est survenue:', error);
	//   });



		// change modal with "ajouter une photo"
	// document.querySelector('.modal-photo-btn').addEventListener('click', function(event) {
	// 	document.querySelector('.modal').setAttribute('aria-hidden', 'true')
	// 	document.querySelector('.modal').classList.remove('open')
	// 	document.querySelector('.modal-form').removeAttribute('aria-hidden')
	// 	document.querySelector('.modal-form').classList.add('open')
	// 	document.querySelector('.modal-form').style.display = "block"
	// })

	// Closing modal when clicking on X
	document.querySelector('.modal-close').addEventListener('click', function(event) {
		document.querySelector('.modal').setAttribute('aria-hidden', 'true')
		document.querySelector('.modal').classList.remove('open')
	})

	// Closing modal when clicking on overlay
	document.querySelector('.modal').addEventListener('click', function(event) {
		document.querySelector('.modal').setAttribute('aria-hidden', 'true')
		document.querySelector('.modal').classList.remove('open')
	})

	// Avoiding modal to close when clicking on modal content
	document.querySelector('.modal-content').addEventListener('click', function(event) {
		event.stopPropagation()
	})
})