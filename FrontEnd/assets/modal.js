
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

				dltElem.addEventListener('click', function(event) {
					const workId = dltElem.parentElement.getAttribute('data-id');
					fetch(`http://localhost:5678/api/works/${workId}`, {
						method: 'DELETE',
						headers: {
							Authorization: `Basic ${localStorage.getItem('token')}`,
						},
					})
					.then(response => {
						console.log(response);
						if(!response.ok) {
							throw new Error('Network response was not ok');
						}
						console.log(`Element ${workId} deleted successfully`);
						document.querySelector(`#work-item-thumbnail-${workId}`).remove();
						document.querySelector(`#work-item-${workId}`).remove();
					})
					.catch(error => {
						console.error(`There was a problem deleting element ${workId}:`, error);
					});
				});

				// ...

			});
		})
	})

	// afficher cross au survol ////////////////////////////////////
	// document.querySelectorAll('.work-item-thumbnail').addEventListener('mouseover', function(event) {
	// 	document.querySelectorAll('.fa-arrows-up-down-left-right').style.display = "flex"
	// 	document.querySelectorAll('.move-element-btn').style.display = "flex"
	// })

	// previualiser l'image
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
			document.getElementById('preview').style.display = "flex"
			document.querySelector('.pAddPic').style.display = "none"
			document.querySelector('#imageValue').style.display = "none"
			document.querySelector('.addPicBtn').style.display = "none"
			document.querySelector('#addPic').style.justifyContent = "center"
	})
			reader.readAsDataURL(file);
			return;
	});


	// ajouter un work
	let imageNewWork = document.getElementById("imageValue").value;
	let titleNewWork = document.getElementById("titleValue").value;
	let categoryNewWork = document.getElementById("categoryValue").value;

	let addElem = document.querySelector(".valider-btn");

	addElem.addEventListener('click', function(event) {
		const newWork = { image: imageNewWork, title: titleNewWork, category:categoryNewWork };
		fetch(`http://localhost:5678/api/works`, {
			method: 'POST',
			headers: {
				Authorization: `Basic ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newWork)
		})
		.then(response => {
			console.log(response);
			if(!response.ok) {
				throw new Error('Network response was not ok');
			}
			console.log(`Element added successfully`);
		})
		.catch(error => {
			console.error('There was a problem adding element', error);
		});
	});

	// change modal with "ajouter une photo"
	document.querySelector('.modal-photo-btn').addEventListener('click', function(event) {
		document.querySelector('#modal-gallery').style.display = "none"
		document.querySelector('#modal-form').style.display = "flex"
	})

	// go back to first modal with arrow
	document.querySelector('.modal-back').addEventListener('click', function(event) {
		document.querySelector('.pAddPic').style.display = "flex"
		document.getElementById('preview').style.display = "none"
		document.getElementById('preview').innerHTML = ""
		document.querySelector('#imageValue').style.display = "flex"
		document.querySelector('.addPicBtn').style.display = "flex"
		document.querySelector('#modal-form').style.display = "none"
		document.querySelector('#modal-gallery').style.display = "flex"
	})

	// Closing modal when clicking on X
	document.querySelectorAll('.modal-close').forEach(modalClose => {
		modalClose.addEventListener('click', function(event) {
			document.querySelectorAll('.modal-content').forEach(modalContent => {
				modalContent.style.display = "none"
			})
			document.querySelector('.pAddPic').style.display = "flex"
			document.getElementById('preview').style.display = "none"
			document.getElementById('preview').innerHTML = ""
			document.getElementById('modal-photo').innerHTML = ""
			document.querySelector('#imageValue').style.display = "flex"
			document.querySelector('.addPicBtn').style.display = "flex"
			document.querySelector('.modal').classList.remove('open')
		})
	})

	// Closing modal when clicking on overlay
	document.querySelector('.modal').addEventListener('click', function(event) {
		document.querySelectorAll('.modal-content').forEach(modalContent => {
			modalContent.style.display = "none"
		})
		document.querySelector('.pAddPic').style.display = "flex"
		document.getElementById('preview').style.display = "none"
		document.getElementById('preview').innerHTML = ""
		document.querySelector('#imageValue').style.display = "flex"
		document.querySelector('.addPicBtn').style.display = "flex"
		document.getElementById('modal-photo').innerHTML = ""
		document.querySelector('.modal').classList.remove('open')
	})

	// Avoiding modal to close when clicking on modal content
	document.querySelectorAll('.modal-content').forEach(modalContent => {
		modalContent.addEventListener('click', function(event) {
			event.stopPropagation()
		})
	})


})