import React from 'react';
import * as DateUtil from '../utils/DateUtil';

const Debug = ({ accounts,
                 accountIdx,
                 handleAccountSelect,
                 handleContractDateChange,
                 currentContractDate,
                 lastDayToBet,
                 playerBalance,
                 handleResolveDateSet }) => {

  const setContractDateInputField = (input) => {
    this.contractDateInputField = input;
  };

  const setResolveDateInputField = (input) => {
    this.resolveDateInputField = input;
  };

  const handleTimeTravelButtonClick = () => {
    let date = new Date(this.contractDateInputField.value);
    handleContractDateChange(date);
  };

  const handleResolveButtonClick = () => {
    let date = new Date(this.resolveDateInputField.value);
    handleResolveDateSet(date);
  };

  return (
    <div>
      <br/>
      <div style={{backgroundColor: "lightgray"}}>

        <h4>DebugPanel</h4>

        {/* SELECT ACCOUNT */}
        <form className="">
          <label>Account:</label>
          <select
            className=""
            onChange={(event) => handleAccountSelect(event.target.value)} defaultValue={accountIdx}>
            {accounts.map((account, index) => {
              return <option value={index} key={index}>account {index}: {account}</option>
            })}
          </select>
          &nbsp; {playerBalance} ETH
        </form>

        {/* TIME TRAVEL */}
        <div className="">
          <label>Contract date:</label>
          <input
            className=""
            type="date"
            defaultValue={DateUtil.dateToStr(currentContractDate, 'yyyy-mm-dd')}
            ref={ref => setContractDateInputField(ref)}
          />
          <button
            type="submit"
            className=""
            onClick={(evt) => handleTimeTravelButtonClick()}>Time Travel</button>
        </div>

        {/* RESOLVE */}
        <div className="">
          <label>Resolve:</label>
          <input
            className=""
            type="date"
            defaultValue={DateUtil.dateToStr(lastDayToBet, 'yyyy-mm-dd')}
            ref={ref => setResolveDateInputField(ref)}
          />
          <button
            type="submit"
            className=""
            onClick={(evt) => handleResolveButtonClick()}>Resolve Game</button>
        </div>
      </div>
    </div>
  )
};

export default Debug;