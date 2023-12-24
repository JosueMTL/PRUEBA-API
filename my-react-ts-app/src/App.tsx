// components/HoroscopeComponent.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Horoscope {
  name: string;
  text: string;
  image: string;
  catFact?: string;
}

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

function generateHoroscope(name: string, description: string, image: string): Horoscope {
  return {
    name,
    text: description,
    image,
  };
}

function HoroscopeComponent() {
  const [horoscopeData, setHoroscopeData] = useState<Horoscope[]>([]);
  const [cocktailData, setCocktailData] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatFact = async () => {
      try {
        const response = await axios.get('https://catfact.ninja/fact');
        return response.data.fact;
      } catch (error) {
        console.error('Error al obtener el hecho sobre gatos:', error);
        return 'No hay hecho sobre gatos disponible en este momento.';
      }
    };

    const fetchCocktails = async () => {
      try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
        return response.data.drinks;
      } catch (error) {
        console.error('Error al obtener datos de cócteles:', error);
        return [];
      }
    };

    setTimeout(async () => {
      const horoscopes = [
        generateHoroscope(
          "Aries",
          "Las personas nacidas bajo el signo de Aries son conocidas por su energía y determinación. Este mes, encontrarás nuevas oportunidades para canalizar esa energía en proyectos emocionantes.",
          "aries.png"
        ),
        generateHoroscope(
          "Tauro",
          "La paciencia y la determinación son las características clave de Tauro. Este mes, aprovecha esas cualidades para superar desafíos y alcanzar tus metas a largo plazo.",
          "taurus.png"
        ),
        generateHoroscope(
          "Géminis",
          "La versatilidad y la curiosidad definen a Géminis. Mantén tu mente abierta este mes, ya que nuevas ideas y oportunidades pueden surgir de lugares inesperados.",
          "image 19.png"
        ),
        generateHoroscope(
          "Aquarius",
          "La versatilidad y la curiosidad definen a Géminis. Mantén tu mente abierta este mes, ya que nuevas ideas y oportunidades pueden surgir de lugares inesperados.",
          "aquarius.png"
        ),
        generateHoroscope(
          "Cancer",
          "La versatilidad y la curiosidad definen a Géminis. Mantén tu mente abierta este mes, ya que nuevas ideas y oportunidades pueden surgir de lugares inesperados.",
          "cancer.png"
        ),
        generateHoroscope(
          "Caprocornio",
          "La versatilidad y la curiosidad definen a Géminis. Mantén tu mente abierta este mes, ya que nuevas ideas y oportunidades pueden surgir de lugares inesperados.",
          "capricorn.png"
        ),
        generateHoroscope(
          "Leo",
          "La versatilidad y la curiosidad definen a Géminis. Mantén tu mente abierta este mes, ya que nuevas ideas y oportunidades pueden surgir de lugares inesperados.",
          "leo.png"
        ),
        generateHoroscope(
          "Libra",
          "La versatilidad y la curiosidad definen a Géminis. Mantén tu mente abierta este mes, ya que nuevas ideas y oportunidades pueden surgir de lugares inesperados.",
          "libra.png"
        ),
        generateHoroscope(
          "Piscis",
          "La versatilidad y la curiosidad definen a Géminis. Mantén tu mente abierta este mes, ya que nuevas ideas y oportunidades pueden surgir de lugares inesperados.",
          "piscis.png"
        ),
        generateHoroscope(
          "Sagiratio",
          "La versatilidad y la curiosidad definen a Géminis. Mantén tu mente abierta este mes, ya que nuevas ideas y oportunidades pueden surgir de lugares inesperados.",
          "sagitarius.png"
        ),
        generateHoroscope(
          "Scorpion",
          "La versatilidad y la curiosidad definen a Géminis. Mantén tu mente abierta este mes, ya que nuevas ideas y oportunidades pueden surgir de lugares inesperados.",
          "scorpio.png"
        ),
        generateHoroscope(
          "Virgo",
          "La versatilidad y la curiosidad definen a Géminis. Mantén tu mente abierta este mes, ya que nuevas ideas y oportunidades pueden surgir de lugares inesperados.",
          "virgo.png"
        ),
      ];

      const cocktails = await fetchCocktails();

      const horoscopeDataWithFacts = await Promise.all(
        horoscopes.map(async (horoscope) => {
          const catFact = await fetchCatFact();
          return { ...horoscope, catFact };
        })
      );

      setHoroscopeData(horoscopeDataWithFacts);
      setCocktailData(cocktails);
      setLoading(false);
    }, 1000); // Simula un retardo de 1 segundo (puedes eliminar esto en tu implementación real)
  }, []);

  return (
    <div className="horoscope-container">
      <h1>Horóscopo</h1>
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <ul>
          {horoscopeData.map((horoscope, index) => (
            <li key={index} className="horoscope-item">
              <strong>Nombre: {horoscope.name}</strong>
              {/* No se muestra la descripción del horóscopo */}
              <p>Curiosidad de gato: {horoscope.catFact}</p>
              <img
                src={`src/img/${horoscope.image}`}
                alt={`Imagen de ${horoscope.name}`}
                className="horoscope-image"
              />
            </li>
          ))}
          {/* Mostrar información de cócteles */}
          {cocktailData.map((cocktail) => (
            <li key={cocktail.idDrink} className="cocktail-item">
              <strong>Nombre del cóctel: {cocktail.strDrink}</strong>
              <img
                src={cocktail.strDrinkThumb}
                alt={`Imagen de ${cocktail.strDrink}`}
                className="cocktail-image"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HoroscopeComponent;
