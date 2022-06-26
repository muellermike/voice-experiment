import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from 'react-redux';
import "./ThankYou.css";

function ThankYou() {
    const globalState = useSelector(state => state.userInfoState);
    
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
                                    <Button variant="primary" href={"https://google.ch/search?q=" + globalState.externalUserId}>Go back to Uni-Park</Button>
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