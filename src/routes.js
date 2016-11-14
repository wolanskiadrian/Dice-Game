import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import GameIndex from './components/game_index'
import Game from './components/game';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={GameIndex} />
        <Route path="game/:players" component={Game} />
    </Route>
);