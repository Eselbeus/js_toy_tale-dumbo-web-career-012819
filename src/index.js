const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

function createToyDiv(toy){
  let toyDiv = `<div data-id="${toy.id}" class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p data-likes="${toy.likes}"> ${toy.likes} likes </p>
      <button class="like-btn">Like <3</button>
      <button class="delete-btn">Delete</button>
  </div>`;
  const toyCollection = document.getElementById('toy-collection')
  toyCollection.innerHTML += toyDiv;
}

document.addEventListener('DOMContentLoaded', () => {
  let toyObjs = fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(json => {
      for (let toyObj of json){
        createToyDiv(toyObj);
      }
    })

});

const newToyForm = document.querySelector('form')

newToyForm.addEventListener("submit", function(event) {
  let newToyName = event.target.name.value;
  let newToyImage = event.target.image.value;
  let configObj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: newToyName,
      image: newToyImage,
      likes: 0
    })
  }

  fetch('http://localhost:3000/toys', configObj)
    .then(response => response.json())
    .then(json => {
      createToyDiv(json)
    });
});

const toyCollection = document.getElementById('toy-collection')

toyCollection.addEventListener('click', function(event){
  if (event.target.className === "like-btn"){
    let toyId = event.target.parentElement.dataset.id;
    let likes = Number(event.target.parentElement.querySelector('p').dataset.likes)
    likes++
    let configObj = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        likes: likes
      })
    }
    fetch(`http://localhost:3000/toys/${toyId}`, configObj)
      .then(response => response.json())
      .then(json => {
        event.target.parentElement.querySelector('p').dataset.likes = json.likes
        event.target.parentElement.querySelector('p').innerText = `${json.likes} likes`
        // debugger
      });
  }
  else if(event.target.className === 'delete-btn'){
    let toyId = event.target.parentElement.dataset.id;
    let configObj = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    fetch(`http://localhost:3000/toys/${toyId}`, configObj);
    event.target.parentElement.remove();
  }

});
