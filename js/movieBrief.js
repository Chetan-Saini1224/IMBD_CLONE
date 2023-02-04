async function getById(id) {
    var res = await fetch(`http://www.omdbapi.com/?apikey=c11281bc&i=${id}`);
    return res.json();
  }


 (async () =>{
    if(localStorage.Movie)
    {
    let movie = await  getById(localStorage.Movie);
    console.log(movie);
    document.getElementById("Movie").innerHTML = MovieCard(movie);
    }
 })();



 function MovieCard(movie) {
    let movieCard = `
    <div class="movie-card">
    
    <div class="movie-card-img">
    <img src=${movie.Poster} >
    </div>
  
    <div class="movie-card-details">
      <h2>${movie.Title} </h2> 
      <p><b> Year : </b><i>${movie.Year}</i></p>
      <p><b> Awards : </b>${movie.Awards}</p>
      <p><b> Language : </b> <i> ${movie.Language} </i></p>
      <p><b> Actors : </b> ${movie.Actors}</p>
    </div>
    
    <div class="movie-card-additional-details">
    <p><b> Genre : </b><i> ${movie.Genre}</i></p>
    <p><b> IMBD Votes : </b><i> ${movie.imbdVotes}</i></p>
    <p><b> Type : </b><i> ${movie.Type}</i></p>
    <p class="rating"><i> IMBD-Rating : </i> ${movie.imdbRating}<span><i class="fa-solid fa-star"></i></span></p>
    <i>${movie.Plot}</i>
    </div>

    </div>`;
  
    return movieCard;
  }