const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com',
    {
        params: {
            apikey: 'ccfc0141',
            s: searchTerm
        }
    });
    if(response.data.Error) {
        return [];
    }
    return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b> Search for a Movie</b> </label>
    <input class="input"/>
    <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results "></div> 
    </div>
  </div>
`;


const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInPut = async event => {
   
const movies = await fetchData(event.target.value);
if(!movies.length) {
    dropdown.classList.remove('is-active')
}

resultsWrapper.innerHTML = '';
dropdown.classList.add('is-active');
   for (let movie of movies) {
       const movSelection = document.createElement('a');
       const imgSrc = movie.Poster === 'N/A' ?  '' : movie.Poster;

       
       movSelection.classList.add('dropdown-item')
       movSelection.innerHTML = `
        <img src ="${imgSrc}"/img>
        ${movie.Title}  
       `; 
       movSelection.addEventListener('click',() => {
          dropdown.classList.remove('is-active') 
          input.value = movie.Title;
          onMovieSelect(movie);
       }) 
       resultsWrapper.appendChild(movSelection);       
   }


};

input.addEventListener('input',debounce(onInPut,500));

document.addEventListener('click', event => {
   if(!root.contains(event.target)) {
    dropdown.classList.remove('is-active');
   }   
});

const onMovieSelect = async movie =>  {
    const response = await axios.get('http://www.omdbapi.com',
    {
         params: {
            apikey: 'ccfc0141',
            i: movie.imdbID
        }
    });
    document.querySelector('#summery').innerHTML = movieTemplate(response.data);
    
};

const movieTemplate = (movieDetail) => {
    return `
    <article class="media">
    <figure class="media-left">
      <p class="image">
      <img src = "${movieDetail.Poster}"/>
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
      <h1>${movieDetail.Title}</h1>
      <h4>${movieDetail.Genre}</h4>
      <p>${movieDetail.Plot}</p>
    </div>
  </div>
  </article>
  <article class = "notification is-primary">
  <p class = "title">${movieDetail.Awards}</p>
  <p class = "subtitle">Awards</p>
  </article>
  </article>
  <article class = "notification is-primary">
  <p class = "title">${movieDetail.BoxOffice}</p>
  <p class = "subtitle">Box Office</p>
  </article>
  </article>
  <article class = "notification is-primary">
  <p class = "title">${movieDetail.Metascore}</p>
  <p class = "subtitle">Metascore</p>
  </article>
  </article>
  <article class = "notification is-primary">
  <p class = "title">${movieDetail.imdbRating}</p>
  <p class = "subtitle">IMDB Rating</p>
  </article>
  </article>
  <article class = "notification is-primary">
  <p class = "title">${movieDetail.imdbVotes}</p>
  <p class = "subtitle">IMDB Votes</p>
  </article>
  
    `;
};