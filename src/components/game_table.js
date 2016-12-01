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
            szansa: null,
            suma: 0,
            premia: 0,
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

    saveScore(score, index, value) {
        let gameTemp = _.clone(this.state.game);

        switch (value) {
            case 'jedynki':
                if (this.state.game[index].jedynki === null) {
                    gameTemp[index].jedynki = score;
                    this.setState({game: gameTemp});
                }
                break;
            case 'dwojki':
                if (this.state.game[index].dwojki === null) {
                    gameTemp[index].dwojki = score;
                    this.setState({game: gameTemp});
                }
                break;
            case 'trojki':
                if (this.state.game[index].trojki === null) {
                    gameTemp[index].trojki = score;
                    this.setState({game: gameTemp});
                }
                break;
            case 'czworki':
                if (this.state.game[index].czworki === null) {
                    gameTemp[index].czworki = score;
                    this.setState({game: gameTemp});
                }
                break;
            case 'piatki':
                if (this.state.game[index].piatki === null) {
                    gameTemp[index].piatki = score;
                    this.setState({game: gameTemp});
                }
                break;
            case 'szostki':
                if (this.state.game[index].szostki === null) {
                    gameTemp[index].szostki = score;
                    this.setState({game: gameTemp});
                }
                break;
            case 'trojka':
                if (this.state.game[index].trojka === null) {
                    gameTemp[index].trojka = score;
                    this.setState({game: gameTemp});
                }
                break;
            case 'czworka':
                if (this.state.game[index].czworka === null) {
                    gameTemp[index].czworka = score;
                    this.setState({game: gameTemp});
                }
                break;
            case 'full':
                if (this.state.game[index].full === null) {
                    gameTemp[index].full = score;
                    this.setState({game: gameTemp});
                }
                break;
            case 'mstrit':
                if (this.state.game[index].malys === null) {
                    gameTemp[index].malys = score;
                    this.setState({game: gameTemp});
                }
                break;
            case 'dstrit':
                if (this.state.game[index].duzys === null) {
                    gameTemp[index].duzys = score;
                    this.setState({game: gameTemp});
                }
                break;
            case 'general':
                if (this.state.game[index].general === null) {
                    gameTemp[index].general = score;
                    this.setState({game: gameTemp});
                }
                break;
            case 'szansa':
                if (this.state.game[index].szansa === null) {
                    gameTemp[index].szansa = score;
                    this.setState({game: gameTemp});
                }
                break;
            default:
                return false;
        }

        this.checkBonus(index);
        this.checkSum(index);
        //TODO: logic for change player, reset dice
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
                        <button type="button" disabled={!game[i].nowPlay || game[i].jedynki !== null} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.jedynki, i, 'jedynki')} >{dice.jedynki}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.dwojki, i, 'dwojki')} >{dice.dwojki}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.trojki, i, 'trojki')} >{dice.trojki}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.czworki, i, 'czworki')} >{dice.czworki}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.piatki, i, 'piatki')} >{dice.piatki}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.szostki, i, 'szostki')} >{dice.szostki}</button>
                    </th>
                    <th>
                        <div>{game[i].premia}</div>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.trojka, i, 'trojka')} >{dice.trojka}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.czworka, i, 'czworka')} >{dice.czworka}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.full, i, 'full')} >{dice.full}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.malys, i, 'mstrit')} >{dice.malys}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.duzys, i, 'dstrit')} >{dice.duzys}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.general, i, 'general')} >{dice.general}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.szansa, i, 'szansa')} >{dice.szansa}</button>
                    </th>
                    <th><div>{game[i].suma}</div></th>
                </tr>
            );
        }

        return rows;
    }

    checkSum(index) {
        let gameTemp = _.clone(this.state.game);
        gameTemp[index].suma = gameTemp[index].jedynki +
            gameTemp[index].dwojki +
            gameTemp[index].trojki +
            gameTemp[index].czworki +
            gameTemp[index].piatki +
            gameTemp[index].szostki +
            gameTemp[index].trojka +
            gameTemp[index].czworka +
            gameTemp[index].full +
            gameTemp[index].malys +
            gameTemp[index].duzys +
            gameTemp[index].general +
            gameTemp[index].szansa +
            gameTemp[index].premia;

        this.setState({game: gameTemp});
    }

    checkBonus(index) {
        let gameTemp = _.clone(this.state.game);

        let checkSchool = function (currentPlayer) {
            if(
                currentPlayer.jedynki !== null &&
                currentPlayer.dwojki !== null &&
                currentPlayer.trojki !== null &&
                currentPlayer.czworki !== null &&
                currentPlayer.piatki !== null &&
                currentPlayer.szostki !== null
            ) {
                return true;
            } else {
                return false;
            }
        };

        let checkSchoolScore = function (currentPlayer) {
            if(
                currentPlayer.jedynki +
                currentPlayer.dwojki +
                currentPlayer.trojki +
                currentPlayer.czworki +
                currentPlayer.piatki +
                currentPlayer.szostki >= 63
            ) {
                return true;
            } else {
                return false;
            }
        };

        if(checkSchool(gameTemp[index])) {
            if(checkSchoolScore(gameTemp[index])) {
                gameTemp[index].premia = 35;
                this.setState({game: gameTemp});
            }
        }
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