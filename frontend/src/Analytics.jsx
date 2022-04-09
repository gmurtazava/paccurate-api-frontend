import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";


function Analytics() {
  const [data, setData] = useState([]);
  const API_ENDPOINT = "http://localhost:8000";

  useEffect(() => getData(), []);

  const getData = () => {
    axios.get(API_ENDPOINT + "/analyze").then((res) => setData(res.data));
  };
  
  let count = 0;

  return (
    <div className="App">
      <div>
        <Link className="btn btn-primary" to="/">
          Back
        </Link>
      </div>
      <div>
        <h1>Analytics</h1>
        <table className="table table-striped form-control">
          <thead>
            <tr>
              <th>SR.No</th>
              <th>Price</th>
              <th>Max Weight</th>
              <th>Used Weight</th>
              <th>Box Name</th>
              <th>Method</th>
              <th>svg</th>
            </tr>
          </thead>
          <tbody>
            {data.map((obj) => {
              {
                return obj.boxes.map((o, i) => {
                    return (
                      <tr>
                        <td>{++count}</td>
                        <td>{o.box.price}</td>
                        <td>{o.box.weightMax}</td>
                        <td>{o.box.weightNet}</td>
                        <td>{o.box.name}</td>
                        <td>{obj.method}</td>
                        <td style={{ width: '100px' }}>{parse(obj.svgs[i])}</td>
                      </tr>
                    )
                  });
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analytics;
