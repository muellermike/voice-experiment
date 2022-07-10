import { Card, Col, Container, Row } from "react-bootstrap";
import ParticipantIdentifier from "../../components/ParticipantIdentifier/ParticipantIdentifier";
import "./Introduction.css";

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
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <ParticipantIdentifier></ParticipantIdentifier>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Introduction;