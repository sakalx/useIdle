import React from 'react';
import {render} from 'react-dom';

import useIdleCallback from '../../src';

const idleCallback = () => console.log('idle detected')

const App = () => {
    const { cancelIdle, resetIdle } = useIdleCallback({
        callback: idleCallback,
        idleTimeout: 2000,
    });

    return (
        <main>
            <h1> Howdy~! </h1>
            <button onClick={cancelIdle}>cancel idle</button>
            <button onClick={resetIdle}>resetTimer idle</button>
        </main>
    )
}

render(<App/>, document.getElementById('root'));
