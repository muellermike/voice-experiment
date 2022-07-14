import React from "react";
import "./QuestionImage.css";
import { Card } from "react-bootstrap";
import emptyEx from "../../assets/images/empty_ex.PNG";

class QuestionImage extends React.Component {
    constructor(props){
        super(props);

        // set basic state values
        this.state = {
            timeIsUp: false
        };
    }

    /*
    *   Run steps after component is updated:
    *   set timeout for showing image several seconds
    */
     componentDidUpdate(prevProps, prevState) {
         if(prevProps !== this.props) {
            this.setState({
                timeIsUp: false
            });
            
            if(this.timer) {
                clearTimeout(this.timer);
            }

            this.timer = setTimeout(() => {
                this.setState({
                    timeIsUp: true
                   });
               }, this.props.imageDuration);
         }
    }

    componentDidMount() {
        if(this.timer) {
            clearTimeout(this.timer);
        }
        
        this.timer = setTimeout(() => {
            this.setState({
                timeIsUp: true
               });
           }, this.props.imageDuration);
    }

    /*
    *  Run steps before the component will unmount.
    *  timeout is cleared.
    */
    componentWillUnmount() {
        if(this.timer) {
            clearTimeout(this.timer);
        }
    }

    render(){
        // show picture and question
        return (
            <div>
                <Card>
                    <Card.Body className="card-body-image">
                        <Card.Text>
                            {this.props.question}
                        </Card.Text>
                    </Card.Body>
                    <div>
                        {this.state.timeIsUp ? <div><p className="left-text">left</p><Card.Img className="Image-Dots" variant="bottom" src={emptyEx} /><p className="right-text">right</p></div> : 
                            <div><p className="left-text">left</p><Card.Img className="Image-Dots" variant="bottom" src={this.props.image} /><p className="right-text">right</p></div>
                        }
                    </div>
                </Card>
            </div>
        );
    }
}

export default QuestionImage;