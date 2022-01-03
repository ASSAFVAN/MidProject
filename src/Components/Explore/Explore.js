import React, { useState, useEffect, Fragment } from "react";
import "./Explore.css";
import Spinner from "../Spinner/Spinner";
import eBirdData from "../../APIs/eBirdData";
import eBirdTaxonomy from "../../APIs/eBirdTaxonomy";

export default function Homepage() {
  const [specieses, setSpecieses] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [observations, setObservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadSpecies = async () => {
      setIsLoading(true);
      try {
        const response = await eBirdTaxonomy.get();
        console.log(response.data);
        setSpecieses(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    loadSpecies();
  }, []);

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 4) {
      matches = specieses.filter((species) => {
        return species.comName.toLowerCase().includes(text);
      });
    }
    setSuggestions(matches);
    setText(text);
  };

  const findSpeciesCode = (text) => {
    const result = specieses.find((item) => {
      return item.comName === text.text;
    });
    handleSearchClick(result.speciesCode);
  };

  const handleSearchClick = async (code) => {
    setIsLoading(true);
    try {
      const response = await eBirdData.get(`/obs/IL/recent/${code}`);
      console.log(response.data);

      setObservations(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const renderObsHeader = () => {
    let headerElement = [
      "Location",
      "Date",
      "Time",
      "Quantity",
      "Latitude",
      "Longitude",
    ];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderObs = () => {
    return (
      observations &&
      observations.map(
        ({ subId, locName, obsDt, lat, lng, howMany }, index) => {
          return (
            <Fragment>
              <tr key={index}>
                <td>{locName}</td>
                <td>{obsDt.slice(0, -6)}</td>
                <td>{obsDt.substr(obsDt.length - 5)}</td>
                <td>{howMany}</td>
                <td>{lat}</td>
                <td>{lng}</td>
              </tr>
            </Fragment>
          );
        }
      )
    );
  };

  return (
    <div className="main-content-wrapper">
      <form action="/action_page.php">
        <div className="input-wrapper">
          <input
            list="list"
            type="text"
            placeholder="Search for a spieces"
            onChange={(event) => onChangeHandler(event.target.value)}
            value={text}
          />
          <i
            role="button"
            onClick={() => findSpeciesCode({ text })}
            className="fas fa-search input-icon"
          ></i>
        </div>
        <datalist id="list" name="spicies">
          {suggestions &&
            suggestions.map((suggestion) => {
              return (
                <option key={suggestion.speciesCode} value={suggestion.comName}>
                  {suggestion.comName}
                </option>
              );
            })}
        </datalist>
      </form>
      {/* <button onClick={() => findSpeciesCode({ text })}>Search</button> */}
      {isLoading && <Spinner />}
      <table className="obs-table">
        <thead>
          <tr>{renderObsHeader()}</tr>
        </thead>
        <tbody>{renderObs()}</tbody>
      </table>
    </div>
  );
}
