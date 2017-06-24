import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      textAlign: 'center',
      paddingTop: '19px',
      color: '#777',
      borderTop: '1px solid #e5e5e5'
    }}>
      <p>This is a Solidity experiment running in the Ethereum ropsten testnet.
        <br/>Alejandro Santander
        <a href="https://ajsantander.github.io" target="_blank" rel="noopener noreferrer">ajsantander.github.io</a></p>
    </footer>
  )
};

export default Footer;