# React hook to track user idle.

Simple, light hook to execute callback during a browser's idle periods.
________________________________________________________
________________________________________________________
#### options
| Name | Type | Description |
| --- | --- | --- |
| **callback** | `function` | A reference to a function that should be called in the near future. |
| **idleTimeout** | `number` | Time in milliseconds to call during the next idle period. Default: 5min (300000ms) |
| **trackEvents** | `array` | List of tracking events. Default: [`click`, `keydown`, `mousedown`, `mousemove`, `touchstart`, `scroll`]|
________________________________________________________
________________________________________________________
### Example
after component mounted will be start tracking Idle,

```javascript
import React from 'react';
import useIdle from 'react-use-idle';

const App = () => {
    const idleCallback = () => {
        console.log('idle detected');
    };

    useIdle({ 
        callback: idleCallback,
        idleTimeout: 5000, // 5sec
    });
  
    return (
      <main>
        <h1>...Your App</h1>
      </main>
    )
}
```
________________________________________________________
________________________________________________________
