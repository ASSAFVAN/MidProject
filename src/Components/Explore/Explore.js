import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

export default function Homepage() {
  const [specieses, setSpecieses] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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
        // const regex = new RegExp(`${text}`, "gi");
        // return species.comName.match(regex);
        return species.comName.toLowerCase().includes(text);
      });
    }
    setSuggestions(matches);
    setText(text);
  };

  return (
    <Fragment>
      {/* // {suggestions &&
            //   suggestions.map((suggestion) => {
            //     return <div key={suggestion.speciesCode}>{suggestion.comName}</div>; */}

      <form action="/action_page.php">
        <input
          list="assaf"
          type="text"
          placeholder="Search for a spieces"
          onChange={(event) => onChangeHandler(event.target.value)}
          value={text}
        />
        <datalist id="assaf" name="spicies">
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
    </Fragment>
  );
}
