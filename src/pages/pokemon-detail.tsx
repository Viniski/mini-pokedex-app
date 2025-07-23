import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, CircularProgress, Alert } from "@mui/material";

type PokemonType = {
  type: { name: string };
};

type PokemonAbility = {
  ability: { name: string };
};

type PokemonStat = {
  stat: { name: string };
  base_stat: number;
};

type Pokemon = {
  name: string;
  sprites: { front_default: string };
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
};

const PokemonDetail = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: Pokemon = await res.json();
        setPokemon(data);
      } catch (err) {
        setError("Could not fetch Pokémon details.");
      } finally {
        setLoading(false);
      }
    }
    if (name) {
      fetchDetail();
    }
  }, [name]);

  if (loading) return <div className="flex justify-center"><CircularProgress /></div>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!pokemon) return null;

  return (
    <div>
      <Typography variant="h4" className="capitalize mb-4">
        {pokemon.name}
      </Typography>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto" />

      <Typography variant="h6" className="mt-4">Types:</Typography>
      <ul className="list-disc list-inside">
        {pokemon.types.map((t) => (
          <li key={t.type.name}>{t.type.name}</li>
        ))}
      </ul>

      <Typography variant="h6" className="mt-4">Abilities:</Typography>
      <ul className="list-disc list-inside">
        {pokemon.abilities.map((a) => (
          <li key={a.ability.name}>{a.ability.name}</li>
        ))}
      </ul>

      <Typography variant="h6" className="mt-4">Stats:</Typography>
      <ul className="list-disc list-inside">
        {pokemon.stats.map((s) => (
          <li key={s.stat.name}>{s.stat.name}: {s.base_stat}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonDetail;
