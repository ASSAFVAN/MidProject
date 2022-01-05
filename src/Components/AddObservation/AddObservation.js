import React, { Fragment, useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import eBirdTaxonomy from "../../APIs/eBirdTaxonomy";
import myObsAPI from "../../APIs/myObsAPI";
import { v4 as uuid } from "uuid";

import "./AddObservation.css";

export default function AddObservation() {
  const initObservation = {
    id: uuid(),
    speciesName: "",
    location: "",
    howMany: null,
    date: "",
    time: "",
    lat: null,
    lng: null,
  };

  const [specieses, setSpecieses] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [myObservations, setMyObservations] = useState(initObservation);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const loadSpecies = async () => {
      // setIsLoading(true);
      try {
        const response = await eBirdTaxonomy.get("/ebird", {
          cancelToken: source.token,
        });
        console.log(response.data);
        setSpecieses(response.data);
      } catch (error) {
        console.log(error);
      }
      // setIsLoading(false);
    };
    loadSpecies();
    return () => {
      source.cancel();
    };
  }, []);

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 5) {
      matches = specieses.filter((species) => {
        return species.comName.toLowerCase().includes(text);
      });
    }
    setSuggestions(matches);
    setText(text);
    setMyObservations({ ...myObservations, speciesName: text });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMyObservations({ ...myObservations, [name]: value });
    console.log(myObservations);
  };

  // Adding data to API on submit button
  const handleSubmit = async (event) => {
    event.preventDefault();
    await myObsAPI.post("/", myObservations);
    resetForm();
  };

  //Reset Form
  const resetForm = () => {
    setText("");
    setMyObservations(initObservation);
  };

  //Go back button
  let history = useHistory();
  function handleClick() {
    history.goBack();
  }
  return (
    <Fragment>
      <div className="add-observation-container">
        <form>
          <h3>Add your new observation</h3>
          <div>
            <input
              className="add-observation--input"
              list="list"
              type="text"
              placeholder="Species Name"
              ref={inputRef}
              onChange={(event) => onChangeHandler(event.target.value)}
              value={text}
              name="speciesName"
              required
            />
          </div>
          <datalist id="list" name="spicies">
            {suggestions &&
              suggestions.map((suggestion) => {
                return (
                  <option
                    key={suggestion.speciesCode}
                    value={suggestion.comName}
                  >
                    {suggestion.comName}
                  </option>
                );
              })}
          </datalist>
          <div>
            <input
              className="add-observation--input"
              type="text"
              placeholder="Location"
              name="location"
              value={myObservations.location}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              className="add-observation--input"
              type="number"
              min="0"
              placeholder="How Many"
              name="howMany"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              className="add-observation--input"
              type="date"
              placeholder="Date"
              name="date"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              className="add-observation--input"
              type="time"
              placeholder="Time"
              name="time"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              className="add-observation--input"
              type="number"
              placeholder="Lat"
              name="lat"
              min="-90"
              max="90"
              step="0.00001"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              className="add-observation--input"
              type="number"
              placeholder="Lng"
              name="lng"
              min="-180"
              max="180"
              step="0.00001"
              onChange={handleChange}
              required
            />
          </div>
          <button className="add-observation-btn" onClick={handleSubmit}>
            Add Observation
          </button>
        </form>
        <div className="form-btn-container">
          <button className="go-back-btn" onClick={handleClick}>
            Back
          </button>
          <button className="reset-btn" onClick={resetForm}>
            Clear
          </button>
        </div>
      </div>
    </Fragment>
  );
}
