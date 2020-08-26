import React from 'react';
import {render} from 'react-dom';

import {useIdleCallback, useCancelIdleCallback} from '../../src';

const idleCallback = () => {
  console.log('idle detected')
};

const App = () => {

    const id = useIdleCallback(null, {idleTimeout: 3000});
    const cancelIdleCallback = useCancelIdleCallback();

    const cancelIdle = () => {
        cancelIdleCallback(id)
    };

    return (
        <main>
            <h1> Howdy~! </h1>
            <button onClick={cancelIdle}>cancel idle</button>
        </main>

    )
}

render(<App/>, document.getElementById('root'));
