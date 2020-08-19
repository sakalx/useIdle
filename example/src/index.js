import React from 'react';
import {render} from 'react-dom';

import useIdle from '../../src';


const App = () => {
    useIdle();

    return (
        <h1> Howdy~! </h1>
    )
}

render(<App/>, document.getElementById('root'));
