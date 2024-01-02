import { createContext, useContext, useEffect, useState } from "react"

const BASE_URL = 'http://localhost:9000';

var CitiesContext = createContext();

function CitiesProvider({children}) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
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

    return (
        <CitiesContext.Provider
        value={{
            cities,
            isLoading
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