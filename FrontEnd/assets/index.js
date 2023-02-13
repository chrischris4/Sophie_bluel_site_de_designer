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


const monSet = new Set();

fetch('http://localhost:5678/api/works')
.then((response) => response.json())
    .then((result) => {
        result.forEach(element => {
            var divElem = document.createElement('div');
            document.getElementsByClassName('gallery')[0].appendChild(divElem);

            var imgElem = document.createElement('img');
            divElem.appendChild(imgElem);
            imgElem.setAttribute("src", element.imageUrl);
            imgElem.setAttribute("crossorigin", "anonymous");

            var pElem = document.createElement('p');
            divElem.appendChild(pElem);
            pElem.textContent = element.title;
        })


        // const objetsSet = new Set();
        // Set.objetsSet.add(object)



        var btn = document.createElement("BUTTON");
        var t = document.createTextNode("Tous");     
        btn.appendChild(t);
        btn.setAttribute("class", "work-filter");
        // btn.setAttribute("data-filter", "category'id'0");
        document.body.appendChild(btn);


        var btn = document.createElement("BUTTON");
        var o = document.createTextNode("Object");     
        btn.appendChild(o);
        btn.setAttribute("class", "work-filter");
        // btn.setAttribute("data-filter", "category'id'1");
        document.body.appendChild(btn); 

        var btn = document.createElement("BUTTON");
        var a = document.createTextNode("Appartements");     
        btn.appendChild(a);         
        btn.setAttribute("class", "work-filter");
        document.body.appendChild(btn); 

        var btn = document.createElement("BUTTON");
        var h = document.createTextNode("Hotels et restaurants");     
        btn.appendChild(h);         
        btn.setAttribute("class", "work-filter");
        document.body.appendChild(btn); 

        document.getElementsByClassName('work-filter')[0].addEventListener('click', function(event) {
            console.log("clicked");
            });
        });



