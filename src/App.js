import {useEffect, useState} from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";
//d10d8d0c

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=d10d8d0c'

const App = () => {
    const [movies,setMovies] = useState([]);
    const [searchTerm,setSearchTerm] = useState('');
    const searchMovies = async (title) =>{
        const response = await fetch(`${API_URL}&s=${title}`)
        console.log(response);
        
        const data = await response.json();
        console.log(data);
        
        setMovies(data.Search);
    }

    useEffect(()=>{
        searchMovies('Star Wars');
    },[])

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input 
                type="text" 
                placeholder="Search for movies" 
                value={searchTerm}
                onChange={(e)=>{setSearchTerm(e.target.value); }} 
                onKeyUp={(e)=>{
                    if(e.key === "Enter")
                    searchMovies(searchTerm)
                }}
                />
                <img src={SearchIcon} 
                alt="search"
                onClick={()=>searchMovies(searchTerm)} 
                
                
                />
            </div>
            {
                movies.length>0 
                    ? (
                        <div className="container">
                            {movies.map((movie)=><MovieCard movie={movie}/>)}
                        </div>
                    ) : 
                    (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
            }
            
        </div>
    );
}

export default App;