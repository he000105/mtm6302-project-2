// retrieve HTML elements
const $form = document.getElementById('form')
const $date = document.getElementById('date')
const $recent = document.getElementById('recent')


let apods = []

// build recent 
// build out recent search
function buildRecent() {
  const html = []

  for (let i = 0; i < apods.length; i++) {
    const apod = apods[i]
    html.push(`
      <div class="list-group-item d-flex align-items-center p-3 mb-3">
      <img class="square" src="${apod.url}"></img>
      <div class="me-auto">
        <h2>${apod.title}</h2>
        <p>
          <em>${apod.date}</em>
        </p>
        <p>${apod.explanation}</p>
        <button class="btn btn-primary" data-index="${i}">Save to Favorites</button>
      </div>
    </div>`)
  }
  $recent.innerHTML = html.join('')
}

$form.addEventListener('submit',
  async function (e) {
    const response = await fetch('https://apod.nasa.gov' + $date.value)
    const json = await response.json()
    console.log(json)
    apods.push(json)

//local
    localStorage.setItem('apods', JSON.stringify(apods))

    buildRecent()
  })

$recent.addEventListener('click',
  function (e) {
    //save to favorites
    if(e.target.classList.contains('save')){
      e.preventDefault()
      

    }
    // check if close button was clicked
    if (e.target.classList.contains('delete')) {
      // get index from custom data attribute
      const index = e.target.dataset.index
      apods.splice(index, 1)
      localStorage.setItem('apods', JSON.stringify(apods))
      buildRecent()
    }
  })

const ls = localStorage.getItem('apods')

if (ls) {
  apods = JSON.parse(ls)
}

buildRecent()