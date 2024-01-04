// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [startDate, setStartDate] = useState(new Date());

  const {mapLat, mapLng} = useUrlPosition();

  const [isLoadingCityData, setIsLoadingCityData] = useState(false);

  const {postNewCity, isLoading} = useCities();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!mapLat && !mapLng) return;
    async function fetchCityData() {
      try {
        setIsLoadingCityData(true);
        setErrorMsg('');
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${mapLat}&longitude=${mapLng}`);
        const data = await res.json();
        if(!data.countryCode) throw new Error('Unknown Country');
        setCityName(data.city || data.locality || '');
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch(e) {
        setErrorMsg(e.message);
      } finally {
        setIsLoadingCityData(false);
      }
    }
    fetchCityData();
  }, [mapLat, mapLng])

  async function handleSubmit(ev) {
    ev.preventDefault();

    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: {
        lat: mapLat, 
        lng: mapLng
      }
    }

    await postNewCity(newCity);
    navigate('/app/cities')
  } 

  if(isLoadingCityData) return <Spinner />
  if(errorMsg) return <Message message={<><span role="img">❌</span>{errorMsg} <span role="img">🤷‍♂️</span></>}></Message>
  if(!mapLat && !mapLng) return <Message message="Start by clicking somewhere on the map."></Message>;

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker id="date" selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary' handleOnClick={handleSubmit}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
