async function getById(id) {
  var res = await fetch(`https://www.omdbapi.com/?apikey=c11281bc&i=${id}`);
  return res.json();
}

(async () => {
  let list = document.getElementById("liked-movies");
  if (localStorage.likedMovies) {
    let likedIds = JSON.parse(localStorage.likedMovies);
    if (likedIds.length == 0)
      list.innerHTML =
        "<h3 style=' color:red; text-align:center'>No Liked Movies</h3>";
    else {
      for (let id of likedIds) {
        let movie = await getById(id);
        let card = likedCard(movie);
        list.insertAdjacentHTML("afterbegin", card);
      }
    }
  } else {
    list.innerHTML =
      "<h3 style=' color:red; text-align:center'>No Liked Movies</h3>";
  }
})();

function likedCard(movie) {
  let movieCard = `
  <div class="movie-card" id=${movie.imdbID}>

  <div class="movie-card-img">
  <img src=${movie.Poster} >
  </div>

  <div class="movie-card-details">
    <h2>${movie.Title} </h2> 
    <i class="fa-solid fa-heart" onclick="removeLiked(${movie.imdbID})"></i>
    <p><b> Year : </b>${movie.Year}</p>
    <p><b> Actors : </b> ${movie.Actors}</p>
    <p class="rating"><i> IMBD-Rating : </i> ${movie.imdbRating}<span><i class="fa-solid fa-star"></i></span></p>
    <i>${movie.Plot}</i>
  </div>

  </div>`;

  return movieCard;
}

//no idea how getting whole div
function removeLiked(container) {
  let key = container.id;

  if (localStorage.getItem("likedMovies")) {
    let ids = JSON.parse(localStorage.likedMovies);
    ids = ids.filter((val) => val != key);
    localStorage.likedMovies = JSON.stringify(ids);
  }

  console.log(key);
  container.remove();
}
