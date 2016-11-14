import React, { Component } from 'react';

export default class Rows extends Component {
    render() {
        let rows = [];

        for (let i = 0; i < this.props.players; i++) {
            rows.push(
                <tr key={i}>
                    <th>
                        <button type="button" className="btn btn-primary">option1</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">option2</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">option3</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">option4</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">option4</button>
                    </th>
                    <th>
                        premia
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">option4</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">option4</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">option4</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">option4</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">option4</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">option4</button>
                    </th>
                    <th>
                        <button type="button" className="btn btn-primary">option4</button>
                    </th>
                    <th>SUMA</th>
                </tr>
            );
        }

        console.log(rows);

        return rows;
    }
};