import React, { useEffect, useState, useCallback, useRef } from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import PokemonCard from '../components/pokemon-card';

type PokemonSummary = {
  name: string;
  url: string;
};

type PokemonListResponse = {
  results: PokemonSummary[];
  next: string | null;
};

const INITIAL_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20';

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonSummary[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(INITIAL_URL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadingRef = useRef(false);

  const fetchPokemons = useCallback(async () => {
    if (!nextUrl || loadingRef.current) return;

    setLoading(true);
    loadingRef.current = true;
    setError(null);

    try {
      const res = await fetch(nextUrl);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data: PokemonListResponse = await res.json();
      setPokemons((prev) => [...prev, ...data.results]);
      setNextUrl(data.next);
    } catch (err: any) {
      setError(err.message || 'Coś poszło nie tak...');
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [nextUrl]);

  useEffect(() => {
    fetchPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
          !loadingRef.current &&
          nextUrl
        ) {
          fetchPokemons();
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchPokemons, nextUrl]);

  return (
    <>
      <Grid container spacing={3}>
        {pokemons.map(({ name, url }) => {
          const urlParts = url.split('/').filter(Boolean);
          const id = urlParts[urlParts.length - 1];
          return (
            <Grid component='div' key={name} >
              <PokemonCard
                name={name}
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              />
            </Grid>
          );
        })}

        {/* Skeleton loader */}
        {loading && pokemons.length === 0 &&
          Array.from({ length: 6 }).map((_, index) => (
            <Grid component='div' key={`skeleton-${index}`}>
              <div className="flex flex-col items-center gap-2">
                <Skeleton variant="circular" width={96} height={96} />
                <Skeleton variant="text" width={80} height={24} />
              </div>
            </Grid>
          ))}
      </Grid>

      {/* Spinner */}
      {loading && pokemons.length > 0 && (
        <div className="flex justify-center my-6">
          <CircularProgress />
        </div>
      )}

      {/* Error */}
      {error && (
        <Alert severity="error" className="mt-6">
          {error}
        </Alert>
      )}
    </>
  );
};

export default PokemonList;
