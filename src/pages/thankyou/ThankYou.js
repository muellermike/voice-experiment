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
            <h1>THANK YOU very much for having concluded the Dots Experiment</h1>
            <div>
                <p>We hope you had pleasure filling it out.</p>
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Title>Completed Dots Game</Card.Title>
                                <Card.Body>
                                    <p>We hope you enjoyed the game.</p>
                                    <p>In a further step, your answers are being proceeded and analyzed.</p>
                                    <p>Based on your answers, the payment is calculated. Please note once again, that the payment bases on what you have said and not whether it was correct or not.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Title>Payment</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">based on your answers</Card.Subtitle>
                                <Card.Body>
                                    <Card.Text>
                                        The payment will be proceeded to your Uni-Park account. <br />
                                        You provided the ID: {globalState.externalUserId}. 
                                        <b>Please go back to Uni-Park with the button below and answer the concluding questions about the experiment</b>. Thank you.
                                    </Card.Text>
                                    <Button variant="primary" href={process.env.REACT_APP_UNIPARK_RET_LINK + "?return_tic=" + globalState.externalUserId}>Go back to Uni-Park</Button>
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