import  { useState } from 'react';
import {  Container, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { search } from './services/anime';
import { AnimeCard } from './components/AnimeCard/AnimeCard';
import { TAnimeSimplified } from './types/anime.type';

function App() {
  const [inputAnime, setInputAnime] = useState('');
  const [animes, setAnimes] = useState<TAnimeSimplified[] | null >(null)

  const handleSearch = async (e: any) => {
    e.preventDefault();
    const animes_ = await search(inputAnime);
    setAnimes(animes_);
  }

  return (
    <Container>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center',  margin: '0 auto', mt: 5 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Animes"
          inputProps={{ 'aria-label': 'search anime' }}
          value={inputAnime}
          onChange={(e) => setInputAnime(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search"  onClick={(e) => handleSearch(e)}>
          <SearchIcon />
        </IconButton>
      </Paper>

      {animes && animes.map( (anime: TAnimeSimplified) => <AnimeCard key={anime.anime_id} anime={anime} />) }

    </Container>
  );
}

export default App;
