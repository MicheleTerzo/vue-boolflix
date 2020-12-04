Vue.config.devtools = true;

const boolfix = new Vue({
    el: '#app',
    data: {
        imgDefaultPath : "https://image.tmdb.org/t/p/w500",
        searchInput : "",
        films : [],
        hover : null

    },
    computed : {
        filteredFilms() {
            return this.films.filter(film => {
                return film.poster_path != null
            })
        }
    },
    methods : {
        search () {
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params : {
                    'api_key': 'e83d8207f377861ab2838f2cb4c6a570',
                    query: this.searchInput,
                    language : 'it',
                    region : 'it'
                }
            }).then(response => {
                this.films = response.data.results
            })
            axios.get('https://api.themoviedb.org/3/search/tv', {
                params : {
                    'api_key': 'e83d8207f377861ab2838f2cb4c6a570',
                    query: this.searchInput,
                    language: 'it'
                }
            }).then(risposta => {
                this.films = this.films.concat(risposta.data.results)
            });    
        },
        img404 (film) {
            let path = film.poster_path;
            let img = "";
            if(!path){
                img = "img/not-found.png";
            }else{
                img =  this.imgDefaultPath + path;
            }
            return img;
        },
        titleCheck (film) {
            let titlePath = "";
            if(!film.title){
                return titlePath = film.name;
            }else{
                return titlePath = film.title;
            };
            return titlePath;
        },
        rating (film) {
            let rating = Math.floor(film.vote_average / 2);
            return rating
        }
    }
})

