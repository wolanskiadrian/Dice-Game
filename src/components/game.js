import React, { Component } from 'react';
import GameTable from './game_table';
import Dice from './dice';

export default class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: 0,
        };
    }

    componentWillMount() {
        this.setState({players: this.props.params.players})
    }

    render() {
        return (
            <div>
                <GameTable players={this.state.players} />
                <Dice />
            </div>
        )
    }
}