import React, { Component } from 'react';
import GameTable from './game_table';
import Dice from './dice';
import { connect } from 'react-redux';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: 0,
            game: []
        };
    }

    componentWillMount() {
        this.setState({players: this.props.params.players});
    }

    render() {
        return (
            <div>
                <GameTable players={this.state.players} game={this.state.game}/>
                <Dice />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        game: state.game
    }
}

export default connect(mapStateToProps)(Game);