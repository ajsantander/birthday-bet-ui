class ConsoleUtil {

  constructor(contractDelegate) {

    window.balances = function() {
      let accounts = contractDelegate.web3.eth.accounts;
      for(let i = 0; i < accounts.length; i++) {
        let account = accounts[i];
        console.log('balance ' + account + ' [' + i + ']: ', window.getBalance(account));
      }
    };

    window.getBalance = function(account) {
      let balWei = contractDelegate.web3.eth.getBalance(account).toNumber();
      let balEther = +contractDelegate.web3.fromWei(balWei, 'ether');
      return balEther;
    };

    window.skipToDate = function(date) {
      let dateUnix = contractDelegate.getUnixTimeStamp(date);
      contractDelegate.contract.setTime(dateUnix, {from: contractDelegate.web3.eth.accounts[0]});
    };

    window.resolve = function(date) {
      let dateUnix = contractDelegate.getUnixTimeStamp(date);
      contractDelegate.contract.resolve(dateUnix, {from: contractDelegate.web3.eth.accounts[0], gas: 2100000});
    };

    window.withdraw = function(acctIdx) {
      contractDelegate.contract.withdrawPrize({from: contractDelegate.web3.eth.accounts[acctIdx], gas: 2100000});
    };

    window.web3 = contractDelegate.web3;
  }
}

export default ConsoleUtil;