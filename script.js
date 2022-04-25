// retrieve HTML elements
const $form = document.getElementById('form')
const $date = document.getElementById('date')
const $recent = document.getElementById('recent')
const $favorites = document.getElementById('favorites')
const $overlay = document.getElementById('overlay')

const key= U4egscHKRqa7NZb33sEKWAN6Occ6Pfy8ARwr0DK3
const html = []
//let apods = []

/***************test apods */
const apods = [{
  "date": "2022-03-27",
  "explanation": "Why would the surface of Titan light up with a blinding flash? The reason: a sunglint from liquid seas.  Saturn's moon Titan has numerous smooth lakes of methane that, when the angle is right, reflect sunlight as if they were mirrors.  Pictured here in false-color, the robotic Cassini spacecraft that orbited Saturn from 2004 to 2017 imaged the cloud-covered Titan in 2014 in different bands of cloud-piercing infrared light.  This specular reflection was so bright it saturated one of Cassini's infrared cameras. Although the sunglint was annoying -- it was also useful.  The reflecting regions confirm that northern Titan houses a wide and complex array of seas with a geometry that indicates periods of significant evaporation.  During its numerous passes of our Solar System's most mysterious moon, Cassini has revealed Titan to be a world with active weather -- including times when it rains a liquefied version of natural gas.",
  "hdurl": "https://apod.nasa.gov/apod/image/2203/TitanGlint_cassini_2002.jpg",
  "media_type": "image",
  "service_version": "v1",
  "title": "Titan Seas Reflect Sunlight",
  "url": "https://apod.nasa.gov/apod/image/2203/TitanGlint_cassini_960.jpg"
}]

// build out recent search
function buildRecent() {
  e.preventDefault()
  for (let i = 0; i < apods.length; i++) {
    const apod = apods[i]
    html.push(`
      <div class="list-group-item align-items-center p-3 mb-3">
      <img class="square" src="${json.url}" alt="url">
      <div class="me-auto">
        <h2>${json.title}</h2>
        <p>
          <em>${json.date}</em>
        </p>
        <p>${json.explanation}</p>
        <button class="btn btn-primary" id="save">Save to Favorites</button>
      </div>
    </div>`)
  }
  $recent.innerHTML = html.join('')
}

function addFav() {
  for(let i=0;i<favorites.length;i++){
    html.push(
      `<div id="favorites" class="list-group">
         <div class="list-group-item d-flex align-items-center p-3 m-3">
           <img src="${apod.url}" alt="url" class="img-thumbnail">
           <div class="me-auto">
             <h2>${apod.title}</h2>
             <p><em>${date}</em></p>
           </div>
         </div>
       </div>`)
  }
     $favorites.innerHTML=html.join('')
}

$form.addEventListener('submit',
  async function (e) {
    //const response = await fetch('https://api.nasa.gov/planetary/apod/?api_key=' + key + '&date=' + date + '&concept_tags=True')
    //const json = await response.json()
    //apods.push(json)
    buildRecent()
  })

$recent.addEventListener('click',
  function (e) {
    //save to favorites
    if (e.target.classList.contains('save')) {
      e.preventDefault()
      //local
      //localStorage.setItem('apods', JSON.stringify(apods))
      const index = e.target.dataset.index
      localStorage.setItem('favorites', JSON.stringify(favorites))
      addFav()
    }
  })

$favorites.addEventListener('click', function (e) {
  e.preventDefault()
  const index = e.target.dataset.index
  //delete favorites
  if (e.target.classList.contains('delete')) {
    favorites.splice(index, 1)
    localStorage.setItem('favorites', JSON.stringify(favorites))
    addFav()
  }
  if(e.target.classList.contains('img-thumbnail')){
    //show HD image
    html.push(`<div id="overlay" class="show"><img src="${apod.hdurl}" alt="hdurl"></div>`)
  }
})

$overlay.addEventListener('click',function(e){
  if(e.target.classList.contains('btn-close')){
    html.push(`<div id="overlay" class="overlay"><img src="${apod.hdurl}" alt="hdurl"></div>`)
  }
})

const ls = localStorage.getItem('favorites')

if (ls) {
  favorites = JSON.parse(ls)
}
addFav()

