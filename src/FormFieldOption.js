import React, { Fragment, useState } from "react";

const FormFieldOption = (props) => {
  const { type, name, options, callBack, selectedItem } = props;
  const [value, setValue] = useState(null);

  function handleChange(event) {
    setValue(event.target.value);
    let obj = {};
    obj["type"] = "option";
    obj["name"] = event.target.name;
    obj["value"] = event.target.value;
    obj["selectedItem"] = selectedItem;

    callBack(obj);
  }

  function constructOptions() {
    let optionsArr = [];
    options.forEach((option) => {
      optionsArr.push(
        <option value={option.optionValue}>{option.optionName}</option>
      );
    });

    return optionsArr;
  }

  return (
    <div style={{ marginTop: "5px" }} f>
      <div>
        <label>{name}</label>
      </div>
      <div>
        <select
          style={{ width: "60%" }}
          name={name}
          onChange={(event) => handleChange(event)}
        >
          {constructOptions(options)}
        </select>
      </div>
    </div>
  );
};

export default FormFieldOption;
