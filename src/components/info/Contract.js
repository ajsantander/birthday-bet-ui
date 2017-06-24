import React from 'react';
import Highlight from 'react-highlight';
import ContractCode from '../../eth/BetOnDate.js';

const Contract = () => {

  console.log('ContracCode: ', ContractCode);

  return (
    <div>
      <Highlight>{ContractCode}</Highlight>
    </div>
  )
};

export default Contract;