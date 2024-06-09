import { useState } from 'react';
import { Box, Container, IconButton, InputBase, Pagination, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { IResposeAnimeRead, search } from './services/anime';
import { AnimeCard } from './components/AnimeCard/AnimeCard';
import { TAnimeSimplified } from './types/anime.type';

function App() {
  const [inputAnime, setInputAnime] = useState('');
  const [animes, setAnimes] = useState<TAnimeSimplified[] | null>(null);
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSearch = async (page: number = 1) => {
    const from = (page - 1) * 10;
    const animes_: IResposeAnimeRead = await search({ query: inputAnime, from });
    setAnimes(animes_.animes);
    setPages(Math.ceil(animes_.total / 10) < 10 ? Math.ceil(animes_.total / 10): 10);
    setCurrentPage(page);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleSearch();
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    handleSearch(page);
  };

  return (
    <Container>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', margin: '0 auto', mt: 5 }}
        onSubmit={handleSubmit}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Animes"
          inputProps={{ 'aria-label': 'search anime' }}
          value={inputAnime}
          onChange={(e) => setInputAnime(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

 
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', pt: 2 }}>

        {animes && animes.map((anime: TAnimeSimplified) => (
          <AnimeCard key={anime.anime_id} anime={anime} />
        ))}

        {animes && (
          <Box sx={{ mt: 1, mb: 2 }}>
            <Pagination
              count={pages}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
              size="medium"
            />
          </Box>
        )}

      </Box>
      

    </Container>
  );
}

export default App;
