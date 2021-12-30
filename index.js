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

const onInPut = async event => {
   
   const movies = await fetchData(event.target.value);

   for (let movie of movies) {
       const div = document.createElement('div');

       div.innerHTML = `
        <img src ="${movie.Poster}"/img>
        <h1> ${movie.Title}</h1>

       `;
       document.querySelector('#target').appendChild(div);       
   }
 

};
 
input.addEventListener('input',debounce(onInPut,500));