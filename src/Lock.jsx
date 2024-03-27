import React from 'react';

export function Lock({setLock, lock}) {

    function changeLock() {
        setLock(prevLock => !prevLock)
        console.log(lock)
    }
    return (
        <div>
        {lock ? (
          <button onClick={changeLock}>Lock On</button>
          
        ) : (
          <button onClick={changeLock}>Lock Off</button>
        )}
      </div>
      );
    }