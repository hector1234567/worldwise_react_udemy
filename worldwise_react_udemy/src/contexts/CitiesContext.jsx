import { createContext, useContext, useEffect, useReducer } from "react"

const BASE_URL = 'http://localhost:9000';

var CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ''
}

function reducer(state, action) {
  switch(action.type) {
    case 'isLoading': {
      return {...state, isLoading: true }
    }
    case 'cities/loaded': {
      return {...state, cities: action.payload, isLoading: false, error: '' }
    }
    case 'city/created': {
      return {...state, cities: [...state.cities, action.payload], isLoading: false, error: '' }
    }
    case 'city/loaded': {
      return {...state, currentCity: action.payload, isLoading: false, error: '' }
    }
    case 'city/deleted': {
      return {...state, cities: state.cities.filter(city => city.id !== action.payload), isLoading: false, currentCity: {}, error: '' }
    }
    case 'rejected': {
      return {...state, isLoading: false, error: action.payload}
    }
    default: {
      throw new Error('Action does not exist!')
    }
  }
}

function CitiesProvider({children}) {

    const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState);
  
    useEffect(function() {
      async function fetchCities() {
        try {
          dispatch({type: 'isLoading'});
          const res = await fetch(`${BASE_URL}/cities`);
          const data = await res.json();
          dispatch({type: 'cities/loaded', payload: data});
        } catch(e) {
          dispatch({type: 'rejected', payload: "Can't load the city list!"})
        }
      }
      fetchCities();
    }, []);

    
    async function getCity(id) {
      try {
        dispatch({type: 'isLoading'});
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({type: 'city/loaded', payload: data});
      } catch(e) {
        dispatch({type: 'rejected', payload: "Can't load the city!"})
      }
    }

    async function postNewCity(newCity) {
      try {
        dispatch({type: 'isLoading'});
        const res = await fetch(`${BASE_URL}/cities`, {
          method: 'POST',
          body: JSON.stringify(newCity),
          headers: {
            'Content-Type': 'application/json',
            'charset': 'UTF-8'
          }
        });
        const data = await res.json();
        dispatch({type: 'city/created', payload: data});
      } catch(e) {
        dispatch({type: 'rejected', payload: "Can't create the city!"})
      }
    }

    async function deleteCity(cityId) {
      try {
        dispatch({type: 'isLoading'});
        await fetch(`${BASE_URL}/cities/${cityId}`, {
          method: 'DELETE'
        });
        dispatch({type: 'city/deleted', payload: cityId});
      } catch(e) {
        dispatch({type: 'rejected', payload: "Can't delete the city!"})
      }
    }

    return (
        <CitiesContext.Provider
        value={{
            cities,
            isLoading,
            currentCity,
            error,
            getCity,
            postNewCity,
            deleteCity
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