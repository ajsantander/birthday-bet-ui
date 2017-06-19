import React from 'react';
import PlaceBets from './PlaceBets';
import BetsClosed from './BetsClosed';
import Winner from './Winner';
import Stats from './Stats';

class StateHub extends React.Component {
  render() {
    return (
      <div>
        <PlaceBets/>
        <BetsClosed/>
        <Winner/>
        <Stats/>
      </div>
    )
  }
}

export default StateHub;