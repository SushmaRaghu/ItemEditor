import React, { Fragment, useState } from "react";

const FormFieldText = (props) => {
  const { type, name, callBack, defaultItem, useItem, selectedItem } = props;
  const [textValue, setTextValue] = useState(null);

  const value = useItem && defaultItem !== undefined ? defaultItem : textValue;

  function handleTextChange(event) {
    // setTextValue(value);
    let obj = {};
    obj["type"] = "textField";
    obj["name"] = event.target.name;
    obj["value"] = event.target.value;
    obj["selectedItem"] = selectedItem;

    callBack(obj);
  }

  return (
    <div style={{ marginTop: "5px" }} f>
      <div>
        <label>{name}</label>
      </div>
      <div>
        <input
          name={name}
          placeholder="Please enter quantity"
          style={{ width: "60%" }}
          type={type}
          value={value}
          onChange={(event) => handleTextChange(event)}
        />
      </div>
    </div>
  );
};

export default FormFieldText;
