import React, { useState } from "react";
import Fields from "./Fields";
import { v4 as uuid } from "uuid";
import axios from "axios";
import './form.css'

const Form = (props) => {
  const [boxValues, setBoxValues] = useState([{ id: uuid() }]);
  const API_ENDPOINT = "http://localhost:8000";

  const changeHandler = (event, id, attr) => {
    setBoxValues((previousValues) => {
      let objs = previousValues.reduce((accum, obj) => {
        if (obj.id == id) {
          obj[attr] = event.target.value;
        }
        return [...accum, obj];
      }, []);
      return [...objs];
    });
  };

  const colorHandler = (color, id) => {
    setBoxValues((previousValues) => {
      let objs = previousValues.reduce((accum, obj) => {
        if (obj.id == id) {
          obj['color'] = color;
        }
        return [...accum, obj];
      }, []);
      return [...objs];
    });
  }

  const deleteHandler = (id) => {
    setBoxValues((previousValues) => [
      ...previousValues.filter((obj) => obj.id != id),
    ]);
  };

  const sendValues = async () => {
    const itemSets = boxValues.map((obj, index) => ({
      refId: index,
      color: obj.color,
      weight: +obj.weight,
      dimensions: {
        x: +obj.x_cord,
        y: +obj.y_cord,
        z: +obj.z_cord,
      },
      quantity: +obj.quantity,
    }));

    const payload = {
      itemSets: itemSets,
      boxTypeSets: [props.method],
    };

    const res = await axios.post(API_ENDPOINT + "/pack", payload, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
    const svgs = res.data.svgs;
    props.setImages(svgs);
  };

  
  return (
    <>
      {boxValues.map((obj) => (
        <Fields
        changeHandler={changeHandler}
        deleteHandler={deleteHandler}
        colorHandler={colorHandler}
        obj={obj}
        key={obj.id}
        />
        ))}
        <div className="p-2">
          <button className="btn btn-primary my-2 form-control" onClick={() =>setBoxValues((previousValue) => [...previousValue, { id: uuid() }])}>Add New Package</button>
          <button className="btn btn-success my-2 form-control" onClick={() => sendValues()}>Start Packing</button>
        </div>
    </>
  );
};

export default Form;
