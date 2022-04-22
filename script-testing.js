let favorites =JSON.parse(localStorage.getItem('favorites'))
const $form = document.getElementById('form')
const key = 'U4egscHKRqa7NZb33sEKWAN6Occ6Pfy8ARwr0DK3'
const $recent = document.getElementById('recent')
const $favorites = document.getElementById('favorites')
const $overlay = document.getElementById('overlay')

// add submit event
// get input value
$form.addEventListener('submit',(e)=>{
  e.preventDefault()
  const pickDate = document.getElementById('date').value
  fetchData(pickDate)
})

// fetch
async function fetchData(date) {
  const response = await fetch('https://api.nasa.gov/planetary/apod/?api_key='+key+'&date='+date+'&concept_tags=True')
  const json = await response.json()
  renderContent(json)
}

// Render Content
function renderContent(json) {
  $recent.innerHTML = `
  <div class="list-group-item d-flex align-items-center p-3 mb-3">
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
  $saveToFavorites.addEventListener('click',()=>{
    let temp = []
    if(local === null) {
      temp.push(json)
    }else {
      temp = local
      temp.push(json)
    }
    localStorage.setItem('favorites', JSON.stringify(temp))
    renderFavorites()
  })

}

function renderFavorites() {
  let localFavorites = []
  let html = []
  localFavorites = JSON.parse(localStorage.getItem('favorites'))
  if (localFavorites !== null) {
    let i = 0
    //console.log(typeof(localFavorites))
    localFavorites.forEach(fav => {
      html.push( `
      <div class="list-group-item d-flex align-items-center p-3 m-3">
        <img src="${fav.url}" alt="url" class="img-thumbnail me-3">
        <div class="me-auto">
          <h2>${fav.title}</h2>
          <p><em>${fav.date}</em></p>
          <button class="btn btn-danger delete" date-${i}>Delete</button>
        </div>
      </div>
      `)
    });
    i++
  }
  $favorites.innerHTML = html.join('')
}

function clickEvent() {
  $favorites.addEventListener('click',(e)=>{
    const index = e.target.dataset.index
    if (e.target.classList.contains('delete')) {
        favorites.splice(index, 1)
        localStorage.setItem('favorites', JSON.stringify(favorites))
        renderFavorites()
    }
    if(e.target.classList.contains('img-thumbnail')){
        $overlay.innerHTML=`    
        <div id="overlay" class="overlay show">
          <img src="${favorites.hdurl}" alt="hdurl">
          <button class="btn btn-close"></button>
        </div>`
    }
  })
}

function closePic(){
    $overlay.addEventListener('click',function(e){
        if(e.target.classList.contains('btn-close')){
            $overlay.innerHTML=`        
            <div id="overlay" class="overlay">
            <img src="${favorites.hdurl}" alt="hdurl">
            <button class="btn btn-close"></button>
          </div>`
        }

    })
}

renderFavorites()

if (favorites) {
  clickEvent()
}