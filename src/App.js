import React, { Fragment, useState, useEffect } from "react";
import db from "./itemEditorSrc.json";
import Items from "./ItemsList";

function App() {
  const [data, setData] = useState(null);
  const [useItem, setUseItem] = useState(false);
  const [sendItem, setSendItem] = useState({});
  const [cancel, setCancel] = useState(false);
  const [payload, setPayload] = useState([]);
  const [flatMap, setFlatMap] = useState({});
  const [historyFlatMap, setHistoryFlatMap] = useState([
    { "Project Title": ["Please enter a value"] },
    { "Version": ["Please enter a value"] },
    { "Font Family":[ "Please enter a value"] },
    { "Font Size": ["Please enter a value"] },
    { "Line Spacing":[ "Please enter a value"] }
  ]);
  const [currentFlatMap, setCurrentFlatMap] = useState({});
  const [counter, setCounter] = useState(0);

  const title = data ? data.title : "Loading";
  const items = data ? data.items : [];

  function handleUndo(event) {
    setUseItem(true);
    setSendItem(historyFlatMap);
  }
  function handleRedo(event) {
    setSendItem(currentFlatMap);
    setUseItem(true);
  }

  function handleCancel(event) {
    setSendItem({});
    setCancel(true);
  }

  function handleSave(event) {
    /*Payload object will have teh entire JSON object*/
    //callBack(payload);
  }

  function setItemSelected(event) {
    if (event["type"] === "item") {
      setSendItem(flatMap);
    }

    if (event["type"] !== "item") {
      let name = event["name"];

      /*Flat Map is populated to hold values of input fields between navigation of items*/
      flatMap[event["name"]] = event["value"];
      setFlatMap(flatMap);
      setCounter(counter + 1);
      setSendItem(flatMap);
	/*HistoryMap is used for Redo action */
      historyFlatMap.forEach((entry) => {
        if (Object.keys(entry)[0] === event["name"]) {
          if (event["value"].indexOf(".") !== -1) {
            let val = entry[event["name"]];
            val.push(event["value"]);
            entry[event["name"]] = val;
          }
        }
      });
 
      /*CurrentMap is used for Redo action */
      if (currentFlatMap[event["name"]] === undefined) {
        currentFlatMap[event["name"]] = event["value"];
      } else {
        currentFlatMap[event["name"]] = event["value"];
      }
      setCurrentFlatMap(currentFlatMap);

      /*This snippet populates the payload to be sent for save */
      if (payload.length === 0) {
        let data = {};
        data["id"] = event["selectedItem"];
        data["fields"] = [];
        let res = {};
        res["name"] = event["name"];
        res["value"] = event["value"];
        data["fields"].push(res);
        //payload['items'] = data;
        payload.push(data);
        setPayload(payload);
      } else {
        payload.forEach((res) => {
          if (res["id"] === event["selectedItem"]) {
            res["fields"].forEach((entry) => {
              if (entry.name === event["name"]) {
                entry.value = event["value"];
              } else {
                let obj = {};
                obj["name"] = event["name"];
                obj["value"] = event["value"];
                res["fields"].push(obj);
              }
            });

            setPayload(payload);
          } else {
            let data = {};
            data["id"] = event["selectedItem"];
            data["fields"] = [];
            let res = {};
            res["name"] = event["name"];
            res["value"] = event["value"];
            data["fields"].push(res);
            payload.push(data);
            setPayload(payload);
          }
        });
      }
    }
  }

  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(db);
      }, 0);
    }).then((result) => {
      setData(result);
    });
    setSendItem(flatMap);
  }, [flatMap]);

  return (
    <Fragment>
      <div style={{ backgroundColor: "silver", color: "blue" }}>
        <h2 style={{ textalign: "center" }}>{title}</h2>
        <div style={{ float: "right", marginTop: "-45px" }}>
          <input type="button" value="Undo" onClick={() => handleUndo()} />
          <input type="button" value="Redo" onClick={() => handleRedo()} />
          <input type="button" value="Save" onClick={() => handleSave()} />
          <input type="button" value="Cancel" onClick={() => handleCancel()} />
        </div>
      </div>

      <Items
        rows={items}
        callBack={setItemSelected}
        dummy={counter}
        cancel={cancel}
        useItem={useItem}
        payload={sendItem}
      />
    </Fragment>
  );
}

export default App;
