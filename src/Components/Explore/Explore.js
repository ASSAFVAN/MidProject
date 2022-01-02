import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

export default function Homepage() {
  const [specieses, setSpecieses] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    const loadSpecies = async () => {
      const response = await axios.get(
        "https://api.ebird.org/v2/ref/taxonomy/ebird",
        { params: { fmt: "json" } }
      );
      console.log(response.data);
      setSpecieses(response.data);
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
    const response = await axios.get(
      `https://api.ebird.org/v2/data/obs/IL/recent/${code}`,
      {
        headers: {
          "X-eBirdApiToken": "gqrh0a9j82ma",
        },
        params: {
          maxResults: 20,
        },
      }
    );
    console.log(response.data);

    setObservations(response.data);
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
      observations.map(({ subId, locName, obsDt, lat, lng, howMany }) => {
        return (
          <Fragment>
            <tr key={subId}>
              <td>{locName}</td>
              <td>{obsDt.slice(0, -6)}</td>
              <td>{obsDt.substr(obsDt.length - 5)}</td>
              <td>{howMany}</td>
              <td>{lat}</td>
              <td>{lng}</td>
            </tr>
          </Fragment>
        );
      })
    );
  };

  return (
    <Fragment>
      <form action="/action_page.php">
        <input
          list="list"
          type="text"
          placeholder="Search for a spieces"
          onChange={(event) => onChangeHandler(event.target.value)}
          value={text}
        />
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
      <button onClick={() => findSpeciesCode({ text })}>Search</button>
      <h3>{text}</h3>
      <table>
        <thead>
          <tr>{renderObsHeader()}</tr>
        </thead>
        <tbody>{renderObs()}</tbody>
      </table>
    </Fragment>
  );
}
