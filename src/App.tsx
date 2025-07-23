import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import PokemonList from './pages/pokemon-list';
import PokemonDetail from './pages/pokemon-detail';
import Layout from './layout/layout';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
