import ParticipantIdentifier from "../../components/ParticipantIdentifier/ParticipantIdentifier";
import "./Introduction.css";

function Introduction() {
    
    /*
    *   Show introduction to the experiment.
    */
    return (
        <div>
            <h1>Welcome to the Dots Estimating Experiment</h1>
            <div>
                <ParticipantIdentifier></ParticipantIdentifier>
            </div>
        </div>
    )
}

export default Introduction;