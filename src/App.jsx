import { useEffect, useState } from 'react'
import data from './data.js'
import './App.css'

function App() {
  const [score,SetScore] = useState(0);
  const [highScore,SetHighScore] = useState(0);
  const [cards,SetCards] = useState(data);

  useEffect(() => {
    const fetchData = async () => {
      const [names,images] = await getPokemonData();

      
}

export default App
