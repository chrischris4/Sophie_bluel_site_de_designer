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

fetch('http://localhost:5678/api/works')
.then((response) => response.json())
    .then((result) => {
        result.forEach(element => {
            console.log(element)
            console.log(element.title)
            var divElem = document.createElement('div');
            document.getElementsByClassName('gallery')[0].appendChild(divElem);

            var imgElem = document.createElement('img');
            divElem.appendChild(imgElem);
            imgElem.setAttribute("src", element.imageUrl);
            imgElem.setAttribute("crossorigin", "anonymous");

            var pElem = document.createElement('p');
            divElem.appendChild(pElem);

            pElem.textContent = element.title;            
        });
    });