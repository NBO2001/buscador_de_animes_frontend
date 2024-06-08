import { Box, Card, CardActionArea, CardActions, CardMedia, IconButton, Typography, useMediaQuery } from "@mui/material";
import { TAnimeSimplified } from "../../types/anime.type";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { generSplit } from "../../utils/genreSplit";

export interface IAnimeCard {
  anime: TAnimeSimplified;
};

export const AnimeCard = ({ anime }: IAnimeCard) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  if (isMobile) {
    return (
      <Card sx={{ m: 1 }}>
        <CardActionArea sx={{ display: 'flex', justifyContent: "start", alignItems: "center" }}>
          <CardMedia
            sx={{ width: "100px", height: "100px" }}
            component="img"
            image={anime.main_pic}
            alt={anime.title}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', m: 2, maxWidth: "60vw" }}>
            <Typography variant="h6" component="div">
              {anime.title}
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
    );
  }

  return (
    <Card sx={{ m: 1 }}>
      <CardActionArea sx={{ display: 'flex', justifyContent: "start", alignItems: "center" }}>
        <CardMedia
          sx={{ width: "225px", height: "320px" }}
          component="img"
          image={anime.main_pic}
          alt={anime.title}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', m: 2, maxWidth: "60vw" }}>
          <Typography gutterBottom variant="h5" component="div">
            {anime.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {anime.synopsis}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {generSplit(anime.genres)}
          </Typography>
        </Box>
      </CardActionArea>
      <CardActions>
        <IconButton>
          <FavoriteIcon fontSize="large" color="primary" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
