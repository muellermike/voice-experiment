import { Card, Col, Container, Row } from "react-bootstrap";
import ParticipantIdentifier from "../../components/ParticipantIdentifier/ParticipantIdentifier";
import "./Introduction.css";
import exampleImg from "../../assets/images/example.PNG";

function Introduction() {
    
    /*
    *   Show introduction to the experiment.
    */
    return (
        <div>
            <h1>Welcome to the Dots Experiment</h1>
            <div>
                <p>Thank you for participating in our Dots Experiment.</p>
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Title>Dots Game</Card.Title>
                                <Card.Body>
                                    <p>This is the experiment platform in which the described experiment takes place. Please take your time to conclude the experiment.</p>
                                    <p>The picture below shows an image as it will be presented in the experiment.</p>
                                </Card.Body>
                                <div>
                                    <Card.Img variant="bottom" src={exampleImg} />
                                </div>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Title>Payment</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">based on your answers</Card.Subtitle>
                                <Card.Body>
                                    <p>Since we want to understand what you have said, you are being paid according to your stated answer. We do not check whether your answer was correct or not.</p>
                                    <p>Please always respond with a full sentence.</p>
                                    <p><b>If you state that it has more dots on the right side, you are being paid 10 Cents. When you mention the left side has more dots, we pay you 1 Cent.</b></p>
                                </Card.Body>
                            </Card>
                            <ParticipantIdentifier></ParticipantIdentifier>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Introduction;