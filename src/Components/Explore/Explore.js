import React, { useState, useEffect, useRef, Fragment } from "react";
import axios from "axios";
import Map from "../Map/Map";
import "./Explore.css";
import Spinner from "../Spinner/Spinner";
import eBirdData from "../../APIs/eBirdData";
import eBirdTaxonomy from "../../APIs/eBirdTaxonomy";

export default function Homepage() {
  const [specieses, setSpecieses] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [observations, setObservations] = useState([]);
  const [showmsg, setshowmsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const loadSpecies = async () => {
      setIsLoading(true);
      try {
        const response = await eBirdTaxonomy.get("/ebird", {
          cancelToken: source.token,
        });
        console.log(response.data);
        setSpecieses(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
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
  };

  const findSpeciesCode = (text) => {
    const result = specieses.find((item) => {
      return item.comName === text.text;
    });
    if (text.text === "") {
      setshowmsg(true);
    } else {
      setshowmsg(false);
    }
    handleSearchClick(result.speciesCode);
  };

  const handleSearchClick = async (code) => {
    setIsLoading(true);
    try {
      const response = await eBirdData.get(`/obs/IL/recent/${code}`);
      setObservations(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const renderObsHeader = () => {
    const headerElement = ["Location", "Date", "Time", "Quantity"];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderObs = () => {
    return (
      observations &&
      observations.map(({ locName, obsDt, lat, lng, howMany }, index) => {
        return (
          <Fragment key={index}>
            <tr>
              <td>{locName}</td>
              <td>{obsDt.slice(0, -6)}</td>
              <td>{obsDt.substr(obsDt.length - 5)}</td>
              <td>{howMany}</td>
            </tr>
          </Fragment>
        );
      })
    );
  };

  return (
    <div className="main-content-wrapper">
      <form className="explore-form" action="/action_page.php">
        <div className="input-wrapper">
          <input
            className="input-search"
            list="list"
            type="text"
            placeholder="Search for a spieces"
            onChange={(event) => onChangeHandler(event.target.value)}
            value={text}
            ref={inputRef}
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
      {isLoading && <Spinner />}
      {showmsg && <div>No results</div>}
      <div className="central-content">
        {observations.length > 0 && (
          <table className="obs-table">
            <thead>
              <tr>{renderObsHeader()}</tr>
            </thead>
            <tbody>{renderObs()}</tbody>
          </table>
        )}
        <Map obs={observations} />
      </div>
    </div>
  );
}
