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