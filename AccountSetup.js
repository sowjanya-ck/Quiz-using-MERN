import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

export class AccountSetup extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        const { values, inputChange } = this.props;

        return (
            <form>
            <div className="form-container">
                <h1 className="mb-5">LET'S PLAY</h1>
                <div className="row">
                
                    <label htmlFor="name"><h3>Player name</h3></label>
                    <input type="text" className="form-control" name="fname" placeholder="User name" onChange={inputChange('fname')} value={values.fname} />
                 </div>
                 <br></br>
                <div className="text-right">
                    <button className="btn-btn-primary" onClick={this.continue}>let's start</button>
                </div>
            </div>
            </form>

        )
    }
}

export default AccountSetup
