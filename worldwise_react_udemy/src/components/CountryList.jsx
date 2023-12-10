import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css"
import Spinner from "./Spinner";

function CountryList({ cities, isLoading }) {

    if(isLoading) return <Spinner />

    const countries = cities.reduce((arr, city) => {
        if(arr.map(city=>city.country).includes(city.country)) {
            return arr;
        } else {
            return [... arr, {country: city.country, emoji: city.emoji}]
        }
    }, [])

    return ( 
        <ul className={styles.countryList}>
        {countries.map(country => <CountryItem country={country} key={country.country}/>)}
        </ul>
    )
}

export default CountryList;