import { useSearchParams } from "react-router-dom"
import styles from "./Map.module.css"

function Map() {
    const [searchParams, setSearchParams] = useSearchParams()
    return (
        <div className={styles.mapContainer}>
            Map
            <h1>Lat: {searchParams.get('lat')}</h1>
            <h1>Lng: {searchParams.get('lng')}</h1>
            <button onClick={() => setSearchParams({lat: 10, lng: 29})}>Set Position</button>
        </div>
    )
}

export default Map