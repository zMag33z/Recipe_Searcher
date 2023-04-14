// Search books is now HOME
import React from 'react';
import Hero from '../components/hero/index';
import SearchGPT from '../components/forms/SearchGPT';

import '../styles/Home.css';

// homepage loading components
const Home = () => {
  return (
    <>
      <Hero />
      <SearchGPT />
    </>
  );
};

export default Home;