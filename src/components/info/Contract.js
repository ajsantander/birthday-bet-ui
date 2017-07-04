import React from 'react';
import Highlight from 'react-highlight';
import ContractCode from '../../eth/BetOnDate.js';

const Contract = ({contractAddress}) => {

  const url = 'https://ropsten.etherscan.io/address/' + contractAddress;

  return (
    <div>
      <div>
        <Highlight>{ContractCode}</Highlight>
      </div>
      <div className="text-center">
        <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
      </div>
      <br/>
    </div>
  )
};

export default Contract;