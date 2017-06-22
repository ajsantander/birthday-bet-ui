import React from 'react';
import './Debug.css';

const Debug = ({ accounts,
                 accountIdx,
                 handleAccountSelect,
                 handleContractDateChange,
                 currentContractDate }) => {

  const dateToStr = date => `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;

  const setDateInputField = (input) => {
    this.dateInputField = input;
  };

  const handleButtonClick = () => {
    let date = new Date(this.dateInputField.value);
    handleContractDateChange(date);
  };

  return (
    <div className="debug-container">

      <h3>DebugPanel</h3>

      <form>
        Account:
        <select onChange={(event) => handleAccountSelect(event.target.value)} defaultValue={accountIdx}>
          {accounts.map((account, index) => {
            return <option value={index} key={index}>account {index}: {account}</option>
          })}
        </select>
      </form>

      <br/>

      <form>
        Contract date:
        <input
          type="date"
          defaultValue={dateToStr(currentContractDate)}
          ref={ref => setDateInputField(ref)}
        />
      </form>

      <button type="submit" onClick={(evt) => handleButtonClick()}>Time Travel</button>

    </div>
  )
};

export default Debug;