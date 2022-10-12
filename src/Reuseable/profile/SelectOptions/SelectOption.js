import React from "react";
const SelectOption = () => {
  return (
    <>
      <form action="/action_page.php">
        {/* <label for="cars">Choose a car:</label> */}
        <select
          name="years"
          //   placeholder="Select Years"
          className="years-month"
          id="years"
        >
          <option className="option" value="Select Years">
            Select Years
          </option>
          <option className="option" value="2022">
            2022
          </option>
          <option className="option" value="2021">
            2021
          </option>
          <option className="option" value="2020">
            2020
          </option>
          <option className="option" value="2019">
            2019
          </option>
          <option className="option" value="2018">
            2018
          </option>
          <option className="option" value="2022">
            2022
          </option>
          <option className="option" value="2022">
            2022
          </option>
          <option className="option" value="2022">
            2022
          </option>
          <option className="option" value="2022">
            2022
          </option>
          <option className="option" value="2022">
            2022
          </option>
          <option className="option" value="2022">
            2022
          </option>
        </select>
      </form>
    </>
  );
};

export default SelectOption;
