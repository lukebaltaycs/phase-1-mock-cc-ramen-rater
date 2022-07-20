// write your code here


fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(data => renderRamens(data));

function renderRamens(data) {
    Array.from(data).forEach(ramen => renderRamen(ramen));
    renderDetails(Array.from(data)[0]);
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
            .then(data => {
                renderDetails(data)
                document.querySelector('.update-form').style.display = "none";
            });
    }
});

const ramenDetails = document.querySelector('#ramen-detail');
function renderDetails(ramen) {
    ramenDetails.querySelector('img').src = ramen.image;
    ramenDetails.querySelector('h2').innerHTML = ramen.name;
    ramenDetails.querySelector('h3').innerHTML = ramen.restaurant;
    ramenDetails.setAttribute("data-id", ramen.id);
    document.querySelector('span#rating-display').innerHTML = ramen.rating;
    document.querySelector('p#comment-display').innerHTML = ramen.comment;
}

ramenDetails.addEventListener('click', event => {
    if (ramenDetails.dataset.id) {
        fetch(`http://localhost:3000/ramens/${ramenDetails.dataset.id}`)
            .then(response => response.json())
            .then(data => {
                const updateForm  = document.querySelector('div.update-form');
                updateForm.style.display = updateForm.style.display == 'none' ? 'block':'none';
                if (updateForm.style.display == 'block'){
                    renderUpdateDetails(data);
                }
            });
        
    }
});

let updateForm  = document.querySelector('#edit-ramen');
function renderUpdateDetails(ramen) {
    updateForm.rating.value = ramen.rating;
    updateForm.querySelector('#new-comment').value = ramen.comment;
}

updateForm.addEventListener('submit', event => {
    event.preventDefault();
    const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        body: JSON.stringify({rating: updateForm.rating.value, comment: updateForm.querySelector('#new-comment').value})
    }
    fetch(`http://localhost:3000/ramens/${ramenDetails.dataset.id}`, configObj)
        .then(response => response.json())
        .then(data => {
            renderDetails(data);
        });
});



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
            "Accept": 'application/json'
        },
        body: JSON.stringify(newRamenObj)
    };
    fetch(`http://localhost:3000/ramens`, newConfigObj)
        .then(response => response.json())
        .then(data => renderRamen(data));
    // renderRamen(newRamenObj);
});

const deleteButton = document.querySelector('button.delete-ramen');
deleteButton.addEventListener('click', event => {
    fetch (`http://localhost:3000/ramens/${ramenDetails.dataset.id}`, {method: "DELETE"})
        .then(response => response.json())
        .then(e => {
            document.querySelector(`#ramen-menu img[data-id="${ramenDetails.dataset.id}"]`).remove();
            fetch('http://localhost:3000/ramens')
                .then(response => response.json())
                .then(data => {
                    renderDetails(Array.from(data)[0]);
            });
        });
});

