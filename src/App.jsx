import { useEffect, useState } from 'react'
import Card from './components/card.jsx'
import data from './data.js'
import './App.css'

function App() {
  const [score,SetScore] = useState(0);
  const [highScore,SetHighScore] = useState(0);
  const [cards,SetCards] = useState(data);

  useEffect(() => {
    const fetchData = async () => {
      const [names,images] = await getPokemonData();

      SetCards((cards)=>{
        const updatedCards=cards.map((c)=>{
          return{...c};
        });

        for (let i=0;i<updatedCards.length;i++){
          updatedCards[i].name=names[i];
          updatedCards[i].img=images[i];
        }
        return updatedCards;
      });
    };

    fetchData();
    SetCards((cards)=>shuffle(cards));
  },[]);

  async function getPokemonData() {
    const pokemonsList = await fetch("https://pokeapi.co/api/v2/pokemon", {mode: 'cors'});
    const pokemonsListJSON = await pokemonsList.json();

    const pokemonNames = [];
    const pokemonImages = [];
        
    for (let i = 0; i < 10; i++) {
      pokemonNames.push(pokemonsListJSON.results[i].name);
      
      const pokemonData = await fetch(`${pokemonsListJSON.results[i].url}`, {mode:'cors'});
      const pokemonDataJSON = await pokemonData.json();
      
      pokemonImages.push(pokemonDataJSON.sprites.other.home.front_default);
    }

    return [pokemonNames, pokemonImages];
  }

  function clickHandler(card){
    const updatedCards=card.map((c)=>{
      return{...c};
    });

    if(!card.isClicked){
      for(let i=0;i<updatedCards.length;i++){
        if(updatedCards[i].id===card.id){
          updatedCards[i].isClicked=true;
          break;
        }
      }
      SetScore((score)=>score+1);
    }
    else{
      if(score>highScore){
        SetHighScore(score);
      }
      SetScore(0);
      updatedCards.forEach(card => card.isClicked=false);
    }
    SetCards(shuffle(updatedCards));

    return(
      <>
      <header>
        <hgroup>
        <h1>Memory Game</h1>
        <p>Get points by clicking on an image but don't click on it any more than once!</p>
        </hgroup>
        <div className="score">
          <p>Score: {score}</p>
          <p>High Score: {highScore}</p>
        </div>
      </header>
      <main>
        <div className="cards-container">
          {cards.map(card =>{
            return(
              <Card clickHandler={()=>clickHandler(card)} img={card.img} name={card.name} />
            )
          })}
        </div>
      </main>
      </>
    )
  }
}

export default App
