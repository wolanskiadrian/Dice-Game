import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Rows from './game_table_player_rows';

class GameTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: []
        }
    };

    componentWillMount() {
        this.setState({game: this.makePlayersGameObjects(this.props.players)});
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>jedynki</th>
                        <th>dwójki</th>
                        <th>trójki</th>
                        <th>czwórki</th>
                        <th>piątki</th>
                        <th>szóstki</th>
                        <th>PREMIA</th>
                        <th>3</th>
                        <th>4</th>
                        <th>full</th>
                        <th>mały strit</th>
                        <th>duży strit</th>
                        <th>generał</th>
                        <th>szansa</th>
                        <th>SUMA</th>
                    </tr>
                </thead>
                <tbody>
                    {/*<Rows players={this.props.players} />*/}
                    {this.getRows(this.props.players, this.props.dice)}
                </tbody>
            </table>
        )
    }

    makePlayersGameObjects(playersNo) {
        let game = [];
        let playerGameObject = {
            jedynki: null,
            dwojki: null,
            trojki: null,
            czworki: null,
            piatki: null,
            szostki: null,
            premia: null,
            trojka: null,
            czworka: null,
            full: null,
            malys: null,
            duzys: null,
            general: null,
            suma: null
        };

        for(let i = 0; i < playersNo; i++) {
            var copy = _.clone(playerGameObject, true);
            game.push(copy);
        }

        return game;

    }

    getRows(players, dice) {
        let rows = [];

        for(let i = 0; i < players; i++) {
            rows.push(
                <tr key={i}>
                    <th>
                        <button type="button" className="btn btn-primary">{dice.jedynki}</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">{dice.dwojki}</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">{dice.trojki}</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">{dice.czworki}</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">{dice.piatki}</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">{dice.szostki}</button>
                    </th>
                    <th>
                        premia
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">{dice.trojka}</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">{dice.czworka}</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">{dice.full}</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">{dice.malys}</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">{dice.duzys}</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">{dice.general}</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">{dice.szansa}</button>
                    </th>
                    <th>SUMA</th>
                </tr>
            );
        }

        return rows;
    }
}

function mapStateToProps(state) {
    return {
        dice: state.dice
    }
}

export default connect(mapStateToProps)(GameTable)