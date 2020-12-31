import React, { useState, useEffect } from "react";
import FormFieldText from "./FormFieldText";
import FormFieldToggle from "./FormFieldToggle";
import FormFieldOption from "./FormFieldOption";

const FormPage = (props) => {
  const {
    formElements,
    callBack,
    defaultItem,
    useItem,
    selectedItem,
    name,
    payload,
    cancel,
  } = props;
  const [textValue, setTextValue] = useState(null);

  function handleTextChange(event) {
    let obj = {};
    obj["type"] = "textField";
    obj["name"] = event.target.name;
    obj["value"] = event.target.value;
    obj["selectedItem"] = selectedItem;

    callBack(obj);
  }

  function constructForm(elements) {
    let displayElems = [];
    let formElems = [];
    elements.forEach((formElem) => {
      let val = textValue;
      if (cancel) {
        val = "";
      } else if (payload) {
        if (payload.length && payload.length !== 0) {
          payload.forEach((entry) => {
            if (Object.keys(entry)[0] === formElem.fieldName) {
              let len = entry[formElem.fieldName].length;
              val = entry[formElem.fieldName][len - 2];
            }
          });
        } else if (payload[formElem.fieldName]) {
          val = payload[formElem.fieldName];
        } else {
          val = textValue;
        }
      }
      if (formElem.fieldType === "text") {
        displayElems.push(
          <div>
            <div>
              <label>{formElem.fieldName}</label>
            </div>
            <div>
              <input
                id={selectedItem + "_" + formElem.fieldName}
                name={formElem.fieldName}
                autocomplete="off"
                style={{ width: "60%" }}
                type={"text"}
                value={val}
                onChange={(event) => handleTextChange(event)}
              />
            </div>
          </div>
        );
      } else if (formElem.fieldType === "toggle") {
        displayElems.push(
          <FormFieldToggle
            type={"checkbox"}
            selectedItem={selectedItem}
            name={formElem.fieldName}
            callBack={callBack}
          />
        );
      } else if (formElem.fieldType === "option") {
        displayElems.push(
          <FormFieldOption
            type={"option"}
            selectedItem={selectedItem}
            name={formElem.fieldName}
            callBack={callBack}
            options={formElem.fieldOptions}
          />
        );
      }
    });
    formElems.push(<form>{displayElems}</form>);
    return formElems;
  }

  return (
    <div>
      {formElements && formElements.length > 0 && constructForm(formElements)}
    </div>
  );
};

export default FormPage;
