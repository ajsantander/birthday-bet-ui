import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      textAlign: 'center',
      paddingTop: '19px',
      color: '#777',
      borderTop: '1px solid #e5e5e5'
    }}>
      <p>This is a Solidity experiment running in the Ethereum ropsten testnet. <br/>
        <a href="https://ajsantander.github.io" target="_blank" rel="noopener noreferrer">Alejandro Santander</a>
        &nbsp;Sources on Github&nbsp;
        <a href="https://github.com/ajsantander/birthday-bet" target="_blank" rel="noopener noreferrer">birthday-bet</a>
        &nbsp;|&nbsp;<a href="https://github.com/ajsantander/birthday-bet-ui" target="_blank" rel="noopener noreferrer">birthday-bet-ui</a>
      </p>
    </footer>
  )
};

export default Footer;