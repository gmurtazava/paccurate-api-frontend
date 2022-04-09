import "./App.css";
import Form from "./Form";
import parse from "html-react-parser";
import { useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [images, setImages] = useState([]);
  const [method, setMethod] = useState("pallet");

  const changeHandler = (e) => {
    setMethod(e.target.value);
  };

  return (
    <div className="App">
      <div className="my-container">
        <h1>Enter Details</h1>
        <label>Select Packing Company</label>
        <select
          onChange={(e) => changeHandler(e)}
          placeholder="Select a method"
          className="m-2"
        >
          <option value="pallet">Pallet</option>
          <option value="usps">USPS</option>
          <option value="fedex">Fedex</option>
          <option value="customer">Customer</option>
        </select>
        <Link className="btn btn-primary" to="/analytics">Analytics</Link>
        <Form setImages={setImages} method={method} />
      </div>
      <div className="my-container">
        <h1>Output</h1>
        <p>Total box count: {images.length}</p>
        {images && images.map((i) => parse(i))}
      </div>
    </div>
  );
}

export default App;
