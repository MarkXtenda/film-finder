const movieSearch = document.querySelector("#search")
let state 
//let url = `http://www.omdbapi.com/?apikey=63512929&s=${movieName}&page=1`
let moviesList = document.querySelector("section#movie-list")
const navigation = document.querySelector("#nav")
const previous = document.querySelector("#previous")
const next = document.querySelector("#next")
let page = 1
let maxpages = 100
id = ""
let movieName = ""
let modal = document.querySelector('div#modal')
let movieModal = ""

function url(id, movieName, page) {
    let url = `http://www.omdbapi.com/?apikey=63512929&i=${id}&s=${movieName}&page=${page}`
    return url
}
  
moviesList.addEventListener('click', (event) => {
    const trigger = event.target
    console.log(trigger)

    if (trigger.className === "movie-card" || trigger.parentNode.className === "movie-card" && modal.style.display != "block") {
        modal.style.display = "block";
        // console.log(trigger.id)
        // movieModal = trigger.id
        // modal.innerHTML = renderModal(url(movieModal, "", ""))
        modal.innerHTML 
    }
    else {
        modal.style.display = "none";
    }
})


movieSearch.addEventListener("submit", (event)=>{ 
    event.preventDefault()
    console.log(moviename.value)
    movieName = moviename.value
    fetchTenMovies(url(id, movieName, page))
})



navigation.addEventListener("click", (event) => {
    const trigger = event.target
    console.log(trigger)
    if (trigger.id === "next") {
        page++
        fetchTenMovies(url(id, movieName, page))
        console.log(`next page: ${page}`)
        console.log(fetchTenMovies(url(id, movieName, page)))
    }
    if (trigger.id === "previous" && page != 1) {
        page--
        fetchTenMovies(url(id, movieName, page))
        console.log(`next page: ${page}`)
        console.log(fetchTenMovies(url(id, movieName, page)))
        console.log("prev")
    }

})

console.log(url(id, movieName, page))
async function fetchTenMovies(url) {
    try {

    const response = await fetch(url)
    const data = await response.json()

    toggleNavigation()
    updateTenMovies(data)
    state = data
    maxpages = await state.totalResults
    return console.log(state)
    } 
    catch (error) {
            console.error("error")
    }
}

async function updateTenMovies(results) {
        let html = ""

        console.log(results.Search)
        results.Search.forEach(async movie => {
        
        html += renderTenMovies(movie)
        moviesList.innerHTML = html
    })
    }


function renderTenMovies(movie) {
    if (movie.Poster === "N/A") movie.Poster = "./images/NA.png"
    return `<div class="movie-card"
    id="${movie.imdbID}">
    <img id="${movie.imdbID}" src="${movie.Poster}" alt="" ">
    <h2 id="${movie.imdbID}">${movie.Title}</h2>
    <p id="${movie.imdbID}">Year: ${movie.Year}</p>
    <p id="${movie.imdbID}">Movie Year: ${movie.Year}</p>
    </div>`
    }


function toggleNavigation() {
    if (page === 1) previous.disabled = true
    else previous.disabled = false

    // if (page*10 > maxPages && state != null) next.disabled = true
    // else next.disabled = false
}


async function renderModal(url) {
    try {

    const movieDataResponse = await fetch(url)
    const movieData = await movieDataResponse.json()

    //if (movieData.Poster === "N/A") movieData.Poster = "./images/NA.png"
        return movieData
    }
    catch (error) {
        console.error("could not load renderModal")
}
}