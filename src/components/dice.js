import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { diceCatch } from '../actions/index';
import { diceBlock, resetDices } from '../actions/index';
import { bindActionCreators } from 'redux';

class Dice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dice: [],
            // diceBlocked: false
        };

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
                    disabled={this.props.diceBlocked}
                    type="button" className="btn btn-primary"
                    onClick={() => this.diceThrow() }
                    style={throwDiceStyle}>
                        Rzuć
                </button>
            </div>
        )
    }

    componentWillReceiveProps(props) {
        if(props.dices.length !== 5) {
            this.setState({dice: []});
            this.diceClicked = [];
        }
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
                });
            }

            if(currentPlayer.diceThrows < 2) {
                currentPlayer.diceThrows++;
            } else {
                this.props.diceBlock(true);
            }
        }

        this.setState({dice: diceTemp});
        throwValues = this.checkGameValues(diceTemp);
        this.props.resetDices(diceTemp);
        this.props.diceCatch(throwValues);
    }

    checkGameValues(diceValues) {
        let currentPlayer = _.find(this.props.game, function (item) {
            return item.nowPlay === true;
        });
        let currentPlayerIndex = _.indexOf(this.props.game, currentPlayer);
        let tempValues = {
            jedynki: this.checkJedynki(diceValues, this.props.game[currentPlayerIndex].jedynki),
            dwojki: this.checkDwojki(diceValues, this.props.game[currentPlayerIndex].dwojki),
            trojki: this.checkTrojki(diceValues, this.props.game[currentPlayerIndex].trojki),
            czworki: this.checkCzworki(diceValues, this.props.game[currentPlayerIndex].czworki),
            piatki: this.checkPiatki(diceValues, this.props.game[currentPlayerIndex].piatki),
            szostki: this.checkSzostki(diceValues, this.props.game[currentPlayerIndex].szostki),
            trojka: this.checkTrojka(diceValues, this.props.game[currentPlayerIndex].trojka),
            czworka: this.checkCzworka(diceValues, this.props.game[currentPlayerIndex].czworka),
            full: this.checkFull(diceValues, this.props.game[currentPlayerIndex].full),
            malys: this.checkMStrit(diceValues, this.props.game[currentPlayerIndex].malys),
            duzys: this.checkDStrit(diceValues, this.props.game[currentPlayerIndex].duzys),
            general: this.checkGeneral(diceValues, this.props.game[currentPlayerIndex].general),
            szansa: this.checkSzansa(diceValues, this.props.game[currentPlayerIndex].szansa)
        };

        return tempValues;
    }

    checkJedynki(diceValues, score) {
        if(score === null) {
            let result = 0;

            _.forEach(diceValues, function (v) {
                if (v === 1) {
                    result += 1;
                }
            });

            return result;
        } else {
            return score;
        }
    }

    checkDwojki(diceValues, score) {
        if(score === null) {
            let result = 0;

            _.forEach(diceValues, function (v) {
                if (v === 2) {
                    result += 2;
                }
            });

            return result;
        } else {
            return score;
        }
    }

    checkTrojki(diceValues, score) {
        if(score === null) {
            let result = 0;

            _.forEach(diceValues, function (v) {
                if (v === 3) {
                    result += 3;
                }
            });

            return result;
        } else {
            return score;
        }
    }

    checkCzworki(diceValues, score) {
        if(score === null) {
            let result = 0;

            _.forEach(diceValues, function (v) {
                if (v === 4) {
                    result += 4;
                }
            });

            return result;
        } else {
            return score;
        }
    }

    checkPiatki(diceValues, score) {
        if(score === null) {
            let result = 0;

            _.forEach(diceValues, function (v) {
                if (v === 5) {
                    result += 5;
                }
            });

            return result;
        } else {
            return score;
        }
    }

    checkSzostki(diceValues, score) {
        if(score === null) {
            let result = 0;

            _.forEach(diceValues, function (v) {
                if (v === 6) {
                    result += 6;
                }
            });

            return result;
        } else {
            return score;
        }
    }

    checkTrojka(diceValues, score) {
        if(score === null) {
            let newArray = _.clone(diceValues).sort();
            let duplicates = this.checkDuplicates(newArray);
            let result = 0;

            _.forEach(duplicates, function (item) {
                if (item === 3) {
                    _.forEach(newArray, function (v) {
                        result += v;
                    });
                }
            });

            return result;
        } else {
            return score;
        }
    }

    checkCzworka(diceValues, score) {
        if(score === null) {
            let newArray = _.clone(diceValues).sort();
            let duplicates = this.checkDuplicates(newArray);
            let result = 0;

            _.forEach(duplicates, function (item) {
                if (item === 4) {
                    _.forEach(newArray, function (v) {
                        result += v;
                    });
                }
            });

            return result;
        } else {
            return score;
        }
    }

    checkFull(diceValues, score) {
        if(score === null) {
            let newArray = _.clone(diceValues).sort();
            let duplicates = this.checkDuplicates(newArray);
            let goodTwo = false;
            let goodThree = false;
            let result = 0;

            _.forEach(duplicates, function (item) {
                if (item == 2) {
                    goodTwo = true;
                }

                if (item == 3) {
                    goodThree = true;
                }
            });

            if (goodTwo && goodThree) {
                result = 25;
            }

            return result;
        } else {
            return score;
        }
    }

    checkMStrit(diceValues, score) {
        if(score === null) {
            let result = 0;
            let newArray = _.clone(diceValues).sort();
            let duplicates = this.checkDuplicates(newArray);
            let duplicatedItem = _.find(duplicates, function (item) {
                return item > 1;
            });

            if(_.isUndefined(duplicatedItem)) {
                if(newArray[0] + 3 === newArray[3] || newArray[1] + 3 === newArray[4]) {
                    result = 30;
                }
            } else {
                newArray = _.uniq(newArray);
                if(newArray.length == 4) {
                    if(newArray[0] + 3 === newArray[3]) {
                        result = 30;
                    }
                }
            }

            return result;
        } else {
            return score;
        }
    }

    checkDStrit(diceValues, score) {
        if(score === null) {
            let result = 0;
            let newArray = _.clone(diceValues).sort();
            let duplicates = this.checkDuplicates(newArray);
            let duplicatedItem = _.find(duplicates, function (item) {
                return item > 1;
            });

            if(_.isUndefined(duplicatedItem)) {
                if(newArray[0] + 4 === newArray[4]) {
                    result = 40;
                }
            }

            return result;
        } else {
            return score;
        }
    }

    checkGeneral(diceValues, score) {
        if(score === null) {
            let newArray = _.clone(diceValues).sort();
            let duplicates = this.checkDuplicates(newArray);
            let result = 0;

            _.forEach(duplicates, function (item) {
                if (item === 5) {
                    result = 50;
                }
            });

            return result;
        } else {
            return score;
        }
    }

    checkSzansa(diceValues, score) {
        if(score === null) {
            let result = 0;

            _.forEach(diceValues, function (item) {
                result += item;
            });

            return result;
        } else {
            return score;
        }
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
        game: state.game,
        diceBlocked: state.diceBlocked,
        dices: state.dices
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        diceCatch: diceCatch,
        diceBlock: diceBlock,
        resetDices: resetDices,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dice);