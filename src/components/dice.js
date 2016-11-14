import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { diceCatch } from '../actions/index';
import { bindActionCreators } from 'redux';

class Dice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dice: []
        }
    }

    componentWillMount() {
        this.diceThrow();
    }

    render() {
        return (
            <div>
                <div className="btn-group">{this.state.dice.map( this.diceNumbers )}</div>
                <button type="button" className="btn btn-primary" onClick={ this.diceThrow.bind(this) }>Rzuć</button>
            </div>
        )
    }

    diceNumbers(number, index) {
        return (
            <button key={index} className="btn btn-danger">{number}</button>
        )
    }

    diceThrow() {
        let diceTemp = [];
        let throwValues = {};

        for(let i = 0; i < 5; i++){
            let dTemp = Math.floor(Math.random() * 6 ) + 1;
            diceTemp.push(dTemp);
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
    return { dice: state.dice }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({diceCatch: diceCatch}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dice);