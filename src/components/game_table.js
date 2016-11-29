import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setGameObject } from '../actions/index'
// import Rows from './game_table_player_rows';

class GameTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: [],
            playersNames: []
        }
    };

    componentWillMount() {
        this.setState({game: this.makePlayersGameObjects(this.props.players)});
        // this.makePlayersGameObjects(this.props.players);
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Imię</th>
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
                    {this.getRows(this.props.players, this.props.dice, this.props.playersNames, this.state.game)}
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
            suma: null,
            nowPlay: true,
            diceThrows: 0
        };

        for(let i = 0; i < playersNo; i++) {
            var copy = _.clone(playerGameObject, true);
            if(i !=- 0) copy.nowPlay = false;
            game.push(copy);
        }

        this.props.setGameObject(game);
        return game;

    }

    getRows(players, dice, names, game) {
        let rows = [];

        for(let i = 0; i < players; i++) {
            rows.push(
                <tr key={i}>
                    <th>
                        {names[i]}
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className="btn btn-primary">{dice.jedynki}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className="btn btn-primary">{dice.dwojki}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className="btn btn-primary">{dice.trojki}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className="btn btn-primary">{dice.czworki}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className="btn btn-primary">{dice.piatki}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className="btn btn-primary">{dice.szostki}</button>
                    </th>
                    <th>
                        premia
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className="btn btn-primary">{dice.trojka}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className="btn btn-primary">{dice.czworka}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className="btn btn-primary">{dice.full}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className="btn btn-primary">{dice.malys}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className="btn btn-primary">{dice.duzys}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className="btn btn-primary">{dice.general}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className="btn btn-primary">{dice.szansa}</button>
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
        dice: state.dice,
        playersNames: state.playersNames,
        game: state.game
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setGameObject: setGameObject}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameTable)