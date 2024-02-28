import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState({ 1: [], 2: [], 3: [], 4: [], 5: [] });
  const [view, setView] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let run = async () => {
      try{

        let response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.jso"
      );
      console.log(response.data);
      setData({
        1: response.data.slice(0, 10),
        2: response.data.slice(10, 20),
        3: response.data.slice(20, 30),
        4: response.data.slice(30, 40),
        5: response.data.slice(40),
      });
      setView(response.data.slice(0, 10));
    }catch(e)
    {
      alert(e.message);
    }
    };
    run();
  }, []);
  let handleClick = (val) => {
    let temp = page + val;
    if (temp >= 1 && temp <= 5) {
      setPage(temp);
      setView([...data[temp]]);
    }
  };
  return (
    <>
      <h1 className="top">Employee Data Table</h1>
      <table className="table">
        <thead className="head">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {view.map((val) => {
            return (
              <tr key={val.id} class="row">
                <td>{val.id}</td>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button className="button" onClick={() => handleClick(-1)}>
          Previous
        </button>
        <div className="pageno">{page}</div>
        <button className="button" onClick={() => handleClick(+1)}>
          Next
        </button>
      </div>
    </>
  );
}

export default App;