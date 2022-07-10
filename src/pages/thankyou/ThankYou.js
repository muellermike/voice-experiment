import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import "./ThankYou.css";

function ThankYou() {
    const globalState = useSelector(state => state.userInfoState);

    // send endtime to API
    useEffect(() => {

        const requestOptions = {
            mode: 'cors',
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'X-API-KEY': process.env.REACT_APP_API_KEY_VALUE },
            body: JSON.stringify({ user: globalState.userId, end: new Date().toISOString()})
        };

        // update experiment to set end date
        fetch(process.env.REACT_APP_API_BASE_URL + '/experiments/' + globalState.experimentId, requestOptions)
        .then(response => {
            return response.json();
        })
        .catch(function(err) {
        });
    }, [globalState.userId, globalState.experimentId]);
    
    /*
    *   Show thank you text and redirection to Uni-Park with the ID.
    */
    return (
        <div>
            <h1>All rounds played</h1>
            <div>
                <p>We hope you had pleasure playing the game.</p>
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Title>Concluding questions</Card.Title>
                                <Card.Body>
                                    <p>To finish the experiment, <b>you have to answer some concluding questions.</b></p>
                                    <p>To do so, <b>click the button below.</b></p>
                                    <Button variant="primary" href={process.env.REACT_APP_UNIPARK_RET_LINK + "?return_tic=" + globalState.externalUserId}>Go to concluding questions</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default ThankYou;