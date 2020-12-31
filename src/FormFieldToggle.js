import React, { Fragment, useState } from "react";

const FormFieldToggle = (props) => {
  const { type, name, callBack, selectedItem } = props;
  const [value, setValue] = useState(null);

  function handleChange(event) {
    setValue(event.target.value);
    let obj = {};
    obj["type"] = "toggle";
    obj["name"] = event.target.name;
    obj["value"] = event.target.value;
    obj["selectedItem"] = selectedItem;

    callBack(obj);
  }

  return (
    <div style={{ marginTop: "5px" }}>
      <label>{name}</label>
      <input
        type={type}
        name={name}
        onChange={(event) => handleChange(event)}
      />
    </div>
  );
};

export default FormFieldToggle;
