import { Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom";


export default function Cancel(){

// const navigate = useNavigate();

    return(
        <>
        {/* <Button onClick={() => navigate("/")} variant="primary">Back to Ecommerce</Button> */}
            <h1>Sorry to see you cancelled your Stripe payment!</h1>
        </>
    )
}
