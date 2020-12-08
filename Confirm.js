import React, { Component } from 'react'

export class Confirm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const {
            values: { name }
        } = this.props;

        return (
            <div className="form-container">
                <h1 className="mb-5">Instructions</h1>
               <p>*There are 10 questions based on webtechnologies.</p>
               <p>*User  can select one option and once he chooses his answer he will be asked to go to the next question.</p>
               <p>*At the end, score will be displayed along with the right answers for all questions.</p><br /><br />

                <div className="row">
                    <div className="col-6">
                        <button className="btn btn-danger" onClick={this.back}>Back</button>
                    </div>
                    
                    <div className="col-6 text-right">
                        <button className="btn btn-primary" onClick={this.continue}>Continue</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Confirm