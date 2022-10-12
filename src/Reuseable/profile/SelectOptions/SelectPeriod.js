import React from "react";
const SelectPeriod = () => {
  return (
    <>
      <form action="/action_page.php">
        {/* <label for="cars">Choose a car:</label> */}
        <select
          name="Period"
          //   placeholder="Select Years"

          id="Period"
        >
          <option className="option" value="Select Years">
            Select Period
          </option>
          <option className="option" value="15 days">
            15 days
          </option>
          <option className="option" value="1 month">
            1 Month
          </option>
          <option className="option" value="2 month">
            2 Month
          </option>
        </select>
      </form>
    </>
  );
};

export default SelectPeriod;
