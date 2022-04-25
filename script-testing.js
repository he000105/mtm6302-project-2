let favorites = JSON.parse(localStorage.getItem('favorites'))
const $form = document.getElementById('form')
const key = 'U4egscHKRqa7NZb33sEKWAN6Occ6Pfy8ARwr0DK3'
const $recent = document.getElementById('recent')
const $favorites = document.getElementById('favorites')
const $overlay = document.getElementById('overlay')

// add submit event
// get input value
$form.addEventListener('submit', (e) => {
  e.preventDefault()
  const pickDate = document.getElementById('date').value
  fetchData(pickDate)
})

// fetch
async function fetchData(date) {
  const response = await fetch('https://api.nasa.gov/planetary/apod/?api_key=' + key + '&date=' + date + '&concept_tags=True')
  const json = await response.json()
  renderContent(json)
}

// Render Content
function renderContent(json) {
  $recent.innerHTML = `
  <div class="list-group-item align-items-center p-3 mb-3">
    <img class="square" src="${json.url}" alt="url">
    <div class="me-auto">
      <h2>${json.title}</h2>
      <p>
        <em>${json.date}</em>
      </p>
      <p>${json.explanation}</p>
      <button id='save' class="btn btn-primary save">Save to Favorites</button>
    </div>
  </div>
  `
  saveToFavorites(json)
}

function saveToFavorites(json) {
  const $saveToFavorites = document.getElementById('save')
  const local = JSON.parse(localStorage.getItem('favorites'))
  $saveToFavorites.addEventListener('click', function(){
    let temp = []
    if (local === null) {
      temp.push(json)
    } else {
      temp = local
      temp.push(json)
    }
    localStorage.setItem('favorites', JSON.stringify(temp))
    renderFavorites()
  })

}
/** 
function renderFavorites(){
  for(i=0;i<favorites.length;i++){
    $favorites.innerHTML=`
    <div class="list-group-item d-flex align-items-center p-3 m-3">
        <img src="${favorite.url}" alt="url" class="img-thumbnail me-3">
        <div class="me-auto">
          <h2>${favorite.title}</h2>
          <p><em>${favorite.date}</em></p>
          <button class="btn btn-danger delete" date-${i}>Delete</button>
        </div>
      </div>
    `
  }
}*/


function renderFavorites() {
  let localFavorites = []
  const html = []
  localFavorites = JSON.parse(localStorage.getItem('favorites'))
  if (localFavorites !== null) {
    let index = 0
 //   console.log(typeof(localFavorites))
    localFavorites.forEach(fav => {
      html.push( `
      <div class="list-group-item d-flex align-items-center p-3 m-3">
        <img src="${fav.url}" alt="url" class="img-thumbnail">
        <div class="me-auto">
          <h2>${fav.title}</h2>
          <p><em>${fav.date}</em></p>
          <button class="btn btn-danger delete" date-${index}>Delete</button>
        </div>
      </div>
      `)
    })
    index++
    $favorites.innerHTML=html.join('')
  }
}

  function clickEvent() {
    localFavs = JSON.parse(localStorage.getItem('favorites'))
    $favorites.addEventListener('click', function (e) {
      const index = e.target.dataset.index
      if (e.target.classList.contains('delete')) {
        localFavs.splice(index, 1)
        renderFavorites()
      }
      if (e.target.classList.contains('img-thumbnail')) {
        const $overlay = document.getElementById('overlay').className = "show"
        closePic()
      }
    })
  }

  function closePic() {
    $overlay.addEventListener('click', function (e) {
      if (e.target.classList.contains('btn-close')) {
        const $overlay = document.getElementById('overlay').className = "overlay"
      }

    })
  }

  //check local storage of favorites list
  renderFavorites()

  if (favorites) {
    clickEvent()
  }