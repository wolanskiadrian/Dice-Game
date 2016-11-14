import React, { Component } from 'react';
import { Link } from 'react-router';

class GameIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: 0
        }
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor="players">Wybierz ilość graczy:</label>
                <input id="players" type="number" className="form-control" min="1" step="1" onChange={event => this.onInputChange(event.target.value)} />
                <Link to={'game/' + this.state.players} className="btn btn-primary">Start</Link>
            </div>
        )
    }

    onInputChange(players) {
        this.setState({players});
    }
}

export default GameIndex;