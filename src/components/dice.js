import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { diceCatch } from '../actions/index';
import { bindActionCreators } from 'redux';

class Dice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dice: [],
            diceBlocked: false
        };

        this.currentPlayerNo = 0;
        this.diceClicked = [];
    }

    render() {
        const throwDiceStyle = {
            marginLeft: 20 + 'px'
        };

        return (
            <div>
                <div className="btn-group">{this.state.dice.map( this.diceNumbers.bind(this)) }</div>
                <button
                    disabled={this.state.diceBlocked}
                    type="button" className="btn btn-primary"
                    onClick={() => this.diceThrow() }
                    style={throwDiceStyle}>
                        Rzuć
                </button>
            </div>
        )
    }

    diceNumbers(number, index) {
        return (
            <button key={index} className="btn btn-default" onClick={event => this.setClicked(index, number, event.target)} >{number}</button>
        )
    }

    setClicked(index, score, buttonClass) {

        if(this.diceClicked.length === 0) {
            this.diceClicked.push({diceIndex: index, score: score});
            buttonClass.className = 'btn btn-primary';
        } else {
            let existingItem = _.find(this.diceClicked, function (item) {
                return item.diceIndex === index;
            });

            if(_.isUndefined(existingItem)) {
                this.diceClicked.push({diceIndex: index, score: score});
                buttonClass.className = 'btn btn-primary';
            } else {
                let existingIndex = _.indexOf(this.diceClicked, existingItem);
                this.diceClicked.splice(existingIndex, 1);
                buttonClass.className = 'btn btn-default';
            }
        }
    }

    diceThrow() {
        let diceTemp = [];
        let throwValues = {};

        if(this.props.game.length > 0) {
            let currentPlayer = _.find(this.props.game, function (player) {
                return player.nowPlay == true;
            });

            if(currentPlayer.diceThrows < 2) {
                currentPlayer.diceThrows++;

                if(this.diceClicked.length === 0) {
                    for (let i = 0; i < 5; i++) {
                        let dTemp = Math.floor(Math.random() * 6) + 1;
                        diceTemp.push(dTemp);
                    }
                } else {
                    for(let i = 0; i < 5 - this.diceClicked.length; i++) {
                        let dTemp = Math.floor(Math.random() * 6) + 1;
                        diceTemp.push(dTemp);
                    }

                    _.forEach(this.diceClicked, function (item) {
                        diceTemp.splice(item.diceIndex, 0, item.score);
                        console.log(diceTemp);
                        diceTemp.join();
                    });

                    //TODO: logic for save dice results of this.diceClicked
                }
            } else {
                if(this.diceClicked.length === 0) {
                    for (let i = 0; i < 5; i++) {
                        let dTemp = Math.floor(Math.random() * 6) + 1;
                        diceTemp.push(dTemp);
                    }
                } else {
                    for (let i = 0; i < 5 - this.diceClicked.length; i++) {
                        let dTemp = Math.floor(Math.random() * 6) + 1;
                        diceTemp.push(dTemp);
                    }

                    _.forEach(this.diceClicked, function (item) {
                        diceTemp.splice(item.diceIndex, 0, item.score);
                        console.log(diceTemp);
                        diceTemp.join();
                    });
                }

                this.setState({diceBlocked: true});

                // currentPlayer.diceThrows = 0;
                // currentPlayer.nowPlay = false;
                //
                // if(this.currentPlayerNo === this.props.game.length - 1) {
                //     console.log(this.props.game[0]);
                //     this.props.game[0].nowPlay = true;
                //     this.currentPlayerNo = 0;
                // } else {
                //     this.currentPlayerNo++;
                //     this.props.game[this.currentPlayerNo].nowPlay = true;
                // }
                //
                // for (let i = 0; i < 5; i++) {
                //     let dTemp = Math.floor(Math.random() * 6) + 1;
                //     diceTemp.push(dTemp);
                // }
            }
        }

        this.setState({dice: diceTemp});
        throwValues = this.checkGameValues(diceTemp);
        this.props.diceCatch(throwValues);
    }

    checkGameValues(diceValues) {
        let tempValues = {
            jedynki: this.checkJedynki(diceValues),
            dwojki: this.checkDwojki(diceValues),
            trojki: this.checkTrojki(diceValues),
            czworki: this.checkCzworki(diceValues),
            piatki: this.checkPiatki(diceValues),
            szostki: this.checkSzostki(diceValues),
            trojka: this.checkTrojka(diceValues),
            czworka: this.checkCzworka(diceValues),
            full: this.checkFull(diceValues),
            malys: 0,
            duzys: 0,
            general: this.checkGeneral(diceValues),
            szansa: this.checkSzansa(diceValues)
        };

        return tempValues;
    }

    checkJedynki(diceValues) {
        let result = 0;

        _.forEach(diceValues, function (v) {
            if(v === 1){
                result += 1;
            }
        });

        return result;
    }

    checkDwojki(diceValues) {
        let result = 0;

        _.forEach(diceValues, function (v) {
            if(v === 2){
                result += 2;
            }
        });

        return result;
    }

    checkTrojki(diceValues) {
        let result = 0;

        _.forEach(diceValues, function (v) {
            if(v === 3){
                result += 3;
            }
        });

        return result;
    }

    checkCzworki(diceValues) {
        let result = 0;

        _.forEach(diceValues, function (v) {
            if(v === 4){
                result += 4;
            }
        });

        return result;
    }

    checkPiatki(diceValues) {
        let result = 0;

        _.forEach(diceValues, function (v) {
            if(v === 5){
                result += 5;
            }
        });

        return result;
    }

    checkSzostki(diceValues) {
        let result = 0;

        _.forEach(diceValues, function (v) {
            if(v === 6){
                result += 6;
            }
        });

        return result;
    }

    checkTrojka(diceValues) {
        let newArray = _.clone(diceValues).sort();
        let duplicates = this.checkDuplicates(newArray);
        let result = 0;

        _.forEach(duplicates, function (item) {
            if(item === 3) {
                _.forEach(newArray, function (v) {
                    result += v;
                });
            }
        });

        return result;
    }

    checkCzworka(diceValues) {
        let newArray = _.clone(diceValues).sort();
        let duplicates = this.checkDuplicates(newArray);
        let result = 0;

        _.forEach(duplicates, function (item) {
            if(item === 4) {
                _.forEach(newArray, function (v) {
                    result += v;
                });
            }
        });

        return result;
    }

    checkFull(diceValues) {
        let newArray = _.clone(diceValues).sort();
        let duplicates = this.checkDuplicates(newArray);
        let goodTwo = false;
        let goodThree = false;
        let result = 0;

        _.forEach(duplicates, function (item) {
             if(item == 2) {
                 goodTwo = true;
             }

             if(item == 3) {
                 goodThree = true;
             }
        });

        if(goodTwo && goodThree) {
            result = 25;
        }

        return result;
    }

    checkGeneral(diceValues) {
        let newArray = _.clone(diceValues).sort();
        let duplicates = this.checkDuplicates(newArray);
        let result = 0;

        _.forEach(duplicates, function (item) {
            if(item === 5) {
                result = 50;
            }
        });

        return result;
    }

    checkSzansa(diceValues) {
        let result = 0;

        _.forEach(diceValues, function (item) {
            result += item;
        });

        return result;
    }

    checkDuplicates(array) {
        let temp = [];

        var current = null;
        var cnt = 0;
        for (var i = 0; i < array.length; i++) {
            if (array[i] != current) {
                if (cnt > 0) {
                    temp.push(cnt);
                }
                current = array[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if (cnt > 0) {
            temp.push(cnt);
        }

        return temp;
    }
}

function mapStateToProps(state) {
    return {
        dice: state.dice,
        game: state.game
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({diceCatch: diceCatch}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dice);