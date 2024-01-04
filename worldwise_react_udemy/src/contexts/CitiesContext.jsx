import { createContext, useContext, useEffect, useState } from "react"

const BASE_URL = 'http://localhost:9000';

var CitiesContext = createContext();

function CitiesProvider({children}) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});
  
    useEffect(function() {
      async function fetchCities() {
        try {
          setIsLoading(true);
          const res = await fetch(`${BASE_URL}/cities`);
          const data = await res.json();
          setCities(data);
        } catch(e) {
          console.error('Error: ' + e)
        } finally {
          setIsLoading(false);
        }
      }
      fetchCities();
    }, []);

    
    async function getCity(id) {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data);
      } catch(e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }

    async function postNewCity(newCity) {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`, {
          method: 'POST',
          body: JSON.stringify(newCity),
          headers: {
            'Content-Type': 'application/json',
            'charset': 'UTF-8'
          }
        });
        const data = await res.json();
        setCities([...cities, data])
      } catch(e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }

    return (
        <CitiesContext.Provider
        value={{
            cities,
            isLoading,
            currentCity,
            getCity,
            postNewCity
        }}>
            {children}
        </CitiesContext.Provider>
    )
}

function useCities() {
    var context = useContext(CitiesContext);
    if(context === undefined) throw new Error('Error CitiesContext')
    return context
}

export {CitiesProvider, useCities};