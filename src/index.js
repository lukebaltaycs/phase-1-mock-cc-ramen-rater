// write your code here


fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(data => renderRamens(data));

function renderRamens(data) {
    Array.from(data).forEach(ramen => renderRamen(ramen));
}

function renderRamen(ramen) {
    img = document.createElement('img');
    img.src = ramen.image;
    img.classList.add('ramen-image')
    img.setAttribute("data-id", ramen.id);
    document.querySelector('#ramen-menu').appendChild(img);
}

document.querySelector('#ramen-menu').addEventListener('click', event => {
    if (event.target.matches('img.ramen-image')) {
        fetch(`http://localhost:3000/ramens/${event.target.dataset.id}`)
            .then(response => response.json())
            .then(data => renderDetails(data));
    }
});

function renderDetails(ramen) {
    const ramenDetails = document.querySelector('#ramen-detail');
    ramenDetails.querySelector('img').src = ramen.image;
    ramenDetails.querySelector('h2').innerHTML = ramen.name;
    ramenDetails.querySelector('h3').innerHTML = ramen.restaurant;
    document.querySelector('span#rating-display').innerHTML = ramen.rating;
    document.querySelector('p#comment-display').innerHTML = ramen.comment;
}

const newRamenForm = document.querySelector('#new-ramen');
newRamenForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = newRamenForm.name.value;
    const restaurant = newRamenForm.restaurant.value;
    const image = newRamenForm.image.value;
    const rating = newRamenForm.rating.value;
    const comment = newRamenForm.querySelector('#new-comment').value;
    const newRamenObj = { name, restaurant, image, rating, comment };
    const newConfigObj = {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            "Accept:": 'application/json'
        },
        body: newRamenObj
    };
    // fetch(`http://localhost:3000/ramens/${event.target.dataset.id}`, newConfigObj)
    //     .then(response => response.json())
    //     .then(data => renderRamen(data));
    renderRamen(newRamenObj);
});


