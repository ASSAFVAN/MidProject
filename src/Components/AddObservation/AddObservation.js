import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import "./AddObservation.css";

export default function AddObservation() {
  // const initUser = {id: null, name: '', username: ''};

  // const [user, setUser] = useState(initUser);

  // const handleChange = e => {
  //   const {name, value} = e.target;
  //   setUser({...user, [name]: value});
  // }

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   if (user.name && user.username) {
  //     handleChange(e, props.addUser(user));
  //   }
  // }

  let history = useHistory();
  function handleClick() {
    history.goBack();
  }
  return (
    <Fragment>
      <div className="add-observation-container">
        <form>
          <div>
            <label>Species Name</label>
            <input type="text" />
          </div>
          <div>
            <label>Location</label>
            <input type="text" />
          </div>
          <div>
            <label>How Many</label>
            <input type="text" />
          </div>
          <div>
            <label>Date</label>
            <input type="text" />
          </div>
          <div>
            <label>Time</label>
            <input type="text" />
          </div>
          <div>
            <label>Lat</label>
            <input type="text" />
          </div>
          <div>
            <label>Lng</label>
            <input type="text" />
          </div>
          <button type="submit">Add Observation</button>
        </form>
        <button className="go-back" onClick={handleClick}>
          Back
        </button>
      </div>
    </Fragment>
  );
}
