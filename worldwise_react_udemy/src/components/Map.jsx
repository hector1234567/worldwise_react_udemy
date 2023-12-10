import { useNavigate, useSearchParams } from "react-router-dom"
import styles from "./Map.module.css"

function Map() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    return (
        <div className={styles.mapContainer} onClick={() => navigate('form')}>
            Map
            <h1>Lat: {searchParams.get('lat')}</h1>
            <h1>Lng: {searchParams.get('lng')}</h1>
        </div>
    )
}

export default Map
