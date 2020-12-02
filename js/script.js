Vue.config.devtools = true;

const boolfix = new Vue({
    el: '#app',
    data: {
        imgDefaultPath : "https://image.tmdb.org/t/p/w500",
        searchInput : "fight",
        films : [],

    },
    methods : {
        search () {
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    'api_key': 'e83d8207f377861ab2838f2cb4c6a570',
                    query: this.searchInput,
                    language : 'it',
                    region : 'it'
                }
            }).then(response => {
                this.films = response.data.results
            })
        },
        img404 (film) {
            let path = film.poster_path;
            let img = "";
            if(!path){
                img = "img/not-found.png"
            }else{
                img =  this.imgDefaultPath + path
            }
            return img
        }
    }
})