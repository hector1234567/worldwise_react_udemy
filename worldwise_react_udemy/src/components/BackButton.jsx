import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
    const navigate = useNavigate();
    
    function handleOnClickBack(e) {
      e.preventDefault();
      navigate(-1);
    }

    return <Button type='back' handleOnClick={handleOnClickBack}>&larr; Back</Button>
}

export default BackButton;