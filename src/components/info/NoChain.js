import React from 'react';
import BubblePreloader from 'react-bubble-preloader';

const NoChain = () => {
  return (
    <div>

      <BubblePreloader
        bubble={{ width: '2rem', height: '2rem' }}
        animation={{ speed: 2 }}
        className=""
        colors={['#ffbb33', '#FF8800', '#ff4444']}
      />
      <h1>
        <span className="label label-default">
          Connecting to the ethereum network...
        </span>
      </h1>
      <br/>
      <span>
        NOTE: This experiment needs to be ran on desktop chrome,
        with the metamask
        extension, running on the Ethereum ropsten testnet.
          See 'How to play' for more details.
      </span>

    </div>
  )
};

export default NoChain;