let moviesList = new Map();

async function getByName(title) {
  var res = await fetch(`http://www.omdbapi.com/?apikey=c11281bc&t=${title}`);
  return res.json();
}

function movieCard(movie)
{
  let movieSearchCard = `<li>
  <div class="movie-search-card" data-movieid=${movie.imdbID}  onclick="aboutMovie(event,this)">
      <div class="movie-search-card-img"> <img src=${movie.Poster} />  </div>
      <div class="movie-search-card-details">
      <p><b> ${movie.Title} </b> </p>
      <p><span> Year : </span>${movie.Year}</p>
      <p> <b> Actors : </b> <span>  ${movie.Actors}  <span> </p>
      <p class="rating"><span><b> IMBD-</b><small>Rating</small> : </span> <b> ${movie.imdbRating} </b> <span><i class="fa-solid fa-star"></i></span></p>
      <i id=liked-${movie.imdbID} class="fa-solid fa-heart"></i>
  </div>
 </li>`;
 return movieSearchCard;
}

async function SearchMovie(e) {
  let title = document.getElementById("search-input").value;
  console.log(title); 
  if (title.length == 0) {
    document.getElementById("search-list").innerHTML = "";
    moviesList.clear();
  } else if (e.key != "Backspace") {
    let movie = await getByName(title); // handling promise
     
    //if movie is in search list
    let exist = moviesList.has(movie.imdbID);
    if (exist) return;
    moviesList.set(movie.imdbID, movie);
    if (movie.Title) {
      let movieSearchCard = movieCard(movie);      
      document
        .getElementById("search-list")
        .insertAdjacentHTML("afterbegin", movieSearchCard);
    }

    //marking all liked movies insearch list
    if (localStorage.getItem("likedMovies"))
    {
      let ids = JSON.parse(localStorage.likedMovies);
      ids.forEach(element => {
        let ele = document.getElementById(`liked-${element}`);
        if(ele) ele.classList.add("liked-heart");
      });
    }

  }


}

function toogleLike(id)
{
  let ele = document.getElementById(id);
  if(ele) ele.classList.toggle("liked-heart");
}

//json.stringfy() wont work on object of object must be arrya of object and object of arrays inside
function aboutMovie(e, t) 
{
  //event delegation
  if (e.target.tagName == "I") {
    toogleLike(e.target.id);
    let id = t.dataset.movieid;

    //if liked list already exist
    let ids = [];
    if (localStorage.getItem("likedMovies"))
      ids = JSON.parse(localStorage.likedMovies);

    if (ids.includes(id)) ids = ids.filter((val) => val != id);
    else ids.push(id);

    localStorage.likedMovies = JSON.stringify(ids);
  } else {
    let movie = t.dataset.movieid;
    localStorage.Movie = movie;
    window.location = "/pages/movieBrief.html";
  }
}
