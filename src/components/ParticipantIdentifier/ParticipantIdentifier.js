import { useState, React, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { storeExternalUserId, storeImageTime } from '../../actions';

function ParticipantIdentifier() {

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    
    const [validated, setValidated] = useState(false);
    const [extUserId, setExtUserId] = useState("");
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let query = useQuery();

    useEffect(() => {
        if (query.get("id_user")) {
            setExtUserId(query.get("id_user"))
        }
    }, [query])

    const handleSumbit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            dispatch(storeExternalUserId(extUserId));
            if (query.get("img_tm")) {
                console.log("img_tm: " + query.get("img_tm"));
                dispatch(storeImageTime(query.get("img_tm") * 1000));
            }
            navigate("/participant");
        }

        setValidated(true);
    }

    /*
    *   Form for the identification of a participant
    */
    return (
        <div>
            <Card>
                <Card.Title>Participate in the experiment</Card.Title>
                <Card.Body>
                <p>This is the user interface in which the described experiment takes place. Please take your time to perform the experiment.</p>
                    <p>To participate in the experiment, please choose next.</p>
                    <Form noValidate validated={validated} onSubmit={handleSumbit}>
                        <Button variant="primary" style={{ margin: "25px"}} type="submit">Next</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ParticipantIdentifier;