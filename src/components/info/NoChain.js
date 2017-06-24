import React from 'react';

const NoChain = () => {
  return (
    <div>

      <h1>
        <span className="label label-danger">
          No Testnet Wallet Detected
        </span>
      </h1>

      <br/>

      <span>
        This experiment needs to be ran on chrome with the metamask
        extension, running on the Ethereum ropsten testnet.
        See 'How to play' for more details.
      </span>
    </div>
  )
};

export default NoChain;