import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setGameObject, diceBlock, resetDice, resetDices } from '../actions/index';
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
        this.setState({game: this.makePlayersGameObjects(this.props.players, this.props.playersNames)});
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

    makePlayersGameObjects(playersNo, playersNames) {
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
            diceThrows: 0,
            name: null
        };

        for(let i = 0; i < playersNo; i++) {
            var copy = _.clone(playerGameObject, true);
            if(i !=- 0) copy.nowPlay = false;
            game.push(copy);
        }

        for(let i = 0; i < game.length; i++) {
            game[i].name = playersNames[i];
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
        this.checkGameStatus(index);
    }

    checkGameStatus(index) {
        if(this.checkEndGame()) {
            console.log('Koniec gry');
        } else {
            this.changePlayer(index);
        }
    }

    changePlayer(index){
        let gameTemp = _.clone(this.state.game);
        gameTemp[index].nowPlay = false;
        gameTemp[index].diceThrows = 0;
        this.props.diceBlock(false);
        this.props.resetDice([]);
        this.props.resetDices([]);

        if(index + 1 > gameTemp.length - 1) {
            gameTemp[0].nowPlay = true;
            this.setState({game: gameTemp});
        } else {
            gameTemp[index + 1].nowPlay = true;
            this.setState({game: gameTemp});
        }
    }

    checkEndGame() {
        let gameState = null;
        let gameWinner = null;

        _.forEach(this.state.game, function (item) {
            gameState = _.find(item, function (playerItem) {
                 return playerItem == null;
             });
        });

        if(_.isUndefined(gameState)) {
            gameWinner = _.max(this.state.game, function (players) {
                return players.suma;
            });

            alert('Zwyciężył: ' + gameWinner.name);
        }
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
                        <button type="button" disabled={!game[i].nowPlay || game[i].jedynki !== null} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.jedynki, i, 'jedynki')} >{game[i].jedynki === null ? dice.jedynki : game[i].jedynki}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay || game[i].dwojki !== null} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.dwojki, i, 'dwojki')} >{game[i].dwojki === null ? dice.dwojki : game[i].dwojki}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay || game[i].trojki !== null} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.trojki, i, 'trojki')} >{game[i].trojki === null ? dice.trojki : game[i].trojki}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay || game[i].czworki !== null} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.czworki, i, 'czworki')} >{game[i].czworki === null ? dice.czworki : game[i].czworki}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay || game[i].piatki !== null} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.piatki, i, 'piatki')} >{game[i].piatki === null ? dice.piatki : game[i].piatki}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay || game[i].szostki !== null} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.szostki, i, 'szostki')} >{game[i].szostki === null ? dice.szostki : game[i].szostki}</button>
                    </th>
                    <th>
                        <div>{game[i].premia}</div>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay || game[i].trojka !== null} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.trojka, i, 'trojka')} >{game[i].trojka === null ? dice.trojka : game[i].trojka}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay || game[i].czworka !== null} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.czworka, i, 'czworka')} >{game[i].czworka === null ? dice.czworka : game[i].czworka}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay || game[i].full !== null} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.full, i, 'full')} >{game[i].full === null ? dice.full : game[i].full}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay || game[i].malys !== null} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.malys, i, 'mstrit')} >{game[i].malys === null ? dice.malys : game[i].malys}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay || game[i].duzys !== null} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.duzys, i, 'dstrit')} >{game[i].duzys === null ? dice.duzys : game[i].duzys}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay || game[i].general !== null} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.general, i, 'general')} >{game[i].general === null ? dice.general : game[i].general}</button>
                    </th>
                    <th>
                        <button type="button" disabled={!game[i].nowPlay || game[i].szansa !== null} className={game[i].nowPlay ? 'btn btn-primary' : 'btn btn-default'} onClick={() => this.saveScore(dice.szansa, i, 'szansa')} >{game[i].szansa === null ? dice.szansa : game[i].szansa}</button>
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
        game: state.game,
        diceBlocked: state.diceBlocked
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setGameObject: setGameObject,
        diceBlock: diceBlock,
        resetDice: resetDice,
        resetDices: resetDices
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameTable)