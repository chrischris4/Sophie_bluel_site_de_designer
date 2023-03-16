
document.addEventListener("DOMContentLoaded", function(event) {

	// Opening modal
	document.querySelector('.modal-open').addEventListener('click', function(event) {
		document.querySelector('#modal-form').style.display = "none"
		document.querySelector('#modal-gallery').style.display = "flex"
		document.querySelector('.modal').classList.add('open');

		// add works to modal
		fetch('http://localhost:5678/api/works')
		.then((response) => response.json())
		.then((results) => {
			results.forEach((element, index) => {
				categories.push(element.category);

				let figureElem = document.createElement('figure');
				figureElem.setAttribute('id', `work-item-thumbnail-${element.id}`);
				figureElem.setAttribute('data-id', element.id);
				figureElem.classList.add(`work-item-thumbnail`);
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

				let trashIcon = document.createElement('i');
				trashIcon.classList.add('fa-solid');
				trashIcon.classList.add('fa-trash-can');
				dltElem.appendChild(trashIcon);

				let moveElem = document.createElement('button');
				figureElem.appendChild(moveElem);
				moveElem.classList.add('move-element-btn');

				let crossIcon = document.createElement('i');
				crossIcon.classList.add('fa-solid');
				crossIcon.classList.add('fa-arrows-up-down-left-right');
				moveElem.appendChild(crossIcon);

				// delete element################################################
				dltElem.addEventListener('click', function(event) {
					if(confirm("Êtes vous sur(e) de vouloir supprimer ?")) {
						const workId = dltElem.parentElement.getAttribute('data-id');
						fetch(`http://localhost:5678/api/works/${workId}`, {
							method: 'DELETE',
							headers: {
								Authorization: `Basic ${localStorage.getItem('token')}`,
							},
						})
						.then(response => {
							if(!response.ok) {
								throw new Error('Network response was not ok');
							}
							console.log(`Element ${workId} deleted successfully`);
							document.querySelector(`#work-item-thumbnail-${workId}`).remove();
							document.querySelector(`#work-item-${workId}`).remove();
						})
						.then(function(response) {
							switch(response.status) {
								case 500:
									alert("Erreur côté serveur");
								break;
								case 401:
									alert("Accès non autorisé");
								break;
								case 200:
									console.log("Suppression réussie");
									return response.json();
								break;
								default:
									alert("Erreur inconnue");
								break;
							}
						})
						.catch(error => {
							console.error(`There was a problem deleting element ${workId}:`, error);
						});
					}
				});
			});
		})
		.catch(error => {
			console.error('There was a problem adding element', error);
		});
	})

	// Previsualiser l'image ####################################################
	const inputFile = document.getElementById('imageValue');
	const preview = document.getElementById('preview');

	inputFile.addEventListener('change', function() {
		const file = inputFile.files[0];
		const reader = new FileReader();
		reader.addEventListener('load', function() {
			const image = new Image();
			image.src = reader.result;
			
			preview.appendChild(image);
			image.style.width = "129px"
			image.style.height = "200px"
			image.style.objectFit = "cover"
			document.querySelector('.fa-image').style.display = "none"
			document.getElementById('preview').style.display = "flex"
			document.querySelector('.pAddPic').style.display = "none"
			document.querySelector('#imageValue').style.display = "none"
			document.querySelector('.addPicBtn').style.display = "none"
			document.querySelector('#addPic').style.justifyContent = "center"
		})
			reader.readAsDataURL(file);
			return;
	});

	// Add a new work #################################################
	let addElem = document.querySelector(".valider-btn");
	addElem.addEventListener('click', function(event) {
		event.preventDefault();
		const formData = new FormData();
		formData.append('image', document.getElementById("imageValue").files[0]);
		formData.append('title', document.getElementById("titleValue").value);
		formData.append('category', Number(document.getElementById("categoryValue").value));
		fetch(`http://localhost:5678/api/works`, {
			method: 'POST',
			headers: {
				Authorization: `Basic ${localStorage.getItem('token')}`,
			},
			body: formData
		})
		.then(function(response) {
			switch(response.status) {
				case 500:
					alert("Erreur côté serveur");
				break;
				case 400:
					alert("Données incomplètes");
				break;
				case 401:
					alert("Accès non autorisé");
				break;
				case 201:
					console.log("Ajout réussie");
					return response.json();
				break;
				default:
					alert("Erreur inconnue");
				break;
			}
		})
		.then((response) => {
			console.log(response);

			// Adding work in the page content
			let newFigureElem = document.createElement('figure')
			newFigureElem.setAttribute('id', response.id)
			newFigureElem.classList.add(`work-item`);
			newFigureElem.classList.add(`category-id-0`);
			newFigureElem.classList.add(`category-id-${response.categoryId}`);
			document.getElementsByClassName('gallery')[0].appendChild(newFigureElem);

			let newImgElem = document.createElement('img');
			newFigureElem.appendChild(newImgElem);
			newImgElem.setAttribute("src", response.imageUrl);
			newImgElem.setAttribute("crossorigin", "anonymous");

			let newFigCaptionElement = document.createElement('figcaption');
			newFigureElem.appendChild(newFigCaptionElement);
			newFigCaptionElement.textContent = response.title;

			// Closing the popup
			resetModal();

		})
		.catch(error => {
			console.error('There was a problem adding element', error);
		});
	});

	// change modal with "ajouter une photo"
	document.querySelector('.modal-photo-btn').addEventListener('click', function(event) {
		document.querySelector('#modal-gallery').style.display = "none"
		document.querySelector('#modal-form').style.display = "flex"
		// Loading categories
		fetch('http://localhost:5678/api/categories')
		.then((response) => response.json())
		.then((categories) => {
			categories.forEach((category, index) => {
				const myOption = document.createElement('option')
				myOption.setAttribute('value', category.id)
				myOption.textContent = category.name
				document.getElementById('categoryValue').appendChild(myOption)
			})
		})
		.catch(error => {
			console.error('There was a problem adding element', error)
		});
	})

	// go back to first modal with arrow
	document.querySelector('.modal-back').addEventListener('click', function(event) {
		document.getElementById('imageValue').value = ""
		document.getElementById('categoryValue').innerHTML = ""
		document.getElementById('titleValue').value = ""
		document.querySelector('.fa-image').style.display = "flex"
		document.querySelector('.pAddPic').style.display = "flex"
		document.getElementById('preview').style.display = "none"
		document.getElementById('preview').innerHTML = ""
		document.querySelector('#imageValue').style.display = "flex"
		document.querySelector('.addPicBtn').style.display = "flex"
		document.querySelector('#modal-form').style.display = "none"
		document.querySelector('#modal-gallery').style.display = "flex"
	})


	// function close modal###########################################################
	
	function resetModal() {
		document.querySelectorAll('.modal-content').forEach(modalContent => {
			modalContent.style.display = "none!important"
		});
		document.getElementById('imageValue').value = "";
		document.getElementById('categoryValue').innerHTML = "";
		document.getElementById('titleValue').value = "";
		document.querySelector('.fa-image').style.display = "flex";
		document.querySelector('.pAddPic').style.display = "flex";
		document.getElementById('preview').style.display = "none";
		document.getElementById('preview').innerHTML = "";
		document.querySelector('#imageValue').style.display = "flex";
		document.querySelector('.addPicBtn').style.display = "flex";
		document.getElementById('modal-photo').innerHTML = "";
		document.querySelector('.modal').classList.remove('open');
	}

	document.querySelectorAll('.modal-close').forEach(modalClose => {
		modalClose.addEventListener('click', function(event) {
			resetModal();
		});
	})

	document.querySelectorAll('.modal').forEach(modalContent => {
		modalContent.addEventListener('click', function(event) {
			resetModal();
		});
	})

	// #############################################################################
	// Avoiding modal to close when clicking on modal content
	document.querySelectorAll('.modal-content').forEach(modalContent => {
		modalContent.addEventListener('click', function(event) {
			event.stopPropagation()
		})
	})
})