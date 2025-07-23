import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  image: string;
}

const PokemonCard = ({ name, image }: Props) => {
  return (
    <Link to={`/pokemon/${name}`} className="no-underline">
      <Card className="hover:shadow-lg transition-shadow">
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={name}
          className="object-contain"
        />
        <CardContent>
          <Typography variant="h6" className="capitalize">
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default PokemonCard;
