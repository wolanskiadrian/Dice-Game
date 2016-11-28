import React, { Component } from 'react';
import { Link } from 'react-router';

class GameIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: 0,
            playersNames: []
        };

        this.playersNames = [];
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor="players">Wybierz ilość graczy:</label>
                <input id="players" type="number" className="form-control players-count" min="1" step="1" onChange={event => this.onInputChange(event.target.value)}/>
                {/*<button className="btn btn-primary" onClick={this.mapPlayers()}>OK</button>*/}
                {/*<Link to={'game/' + this.state.players} className="btn btn-primary">Start</Link>*/}
                {this.mapPlayers()}
                {this.startGame()}
            </div>
        )
    }

    onInputChange(players) {
        this.setState({players});
    }

    onInputChangePN(name, nr) {
        this.playersNames[nr] = name;
        this.setState({playersNames: this.playersNames});

        console.log(this.state);
    }

    mapPlayers() {
        let inputsNames = [];

        if(this.state.players !== 0) {
            for(let i = 0; i < this.state.players; i++){
                inputsNames.push(
                    <div key={i}>
                        <input className="form-control" type="text" onChange={event => this.onInputChangePN(event.target.value, i)} required/>
                    </div>
                )
            }

            return inputsNames;
        }
    }

    startGame() {
        //TODO: name forms validation
        if(this.state.players == this.playersNames.length && this.state.players !== 0) {
            // this.setState({playersNames: this.playersNames});
            return (
                <div>
                    {/*<button className="btn btn-primary">START</button>*/}
                    <Link to={'game/' + this.state.players} className="btn btn-primary">Start</Link>
                </div>
            )
        }
    }
}

export default GameIndex;