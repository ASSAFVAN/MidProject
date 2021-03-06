import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import myObsAPI from "../../APIs/myObsAPI";
import MyObsTable from "../Tables/MyObsTable/MyObsTable";
import Spinner from "../Spinner/Spinner";
import "./MyObs.css";

export default function MyObs() {
  const [myObservation, setMyObservation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadObservations = async () => {
      setIsLoading(true);
      try {
        const response = await myObsAPI.get();
        console.log(response.data);
        setMyObservation(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    loadObservations();
  }, []);

  const deleteObs = async (id) => {
    await myObsAPI.delete(`/${id}`);
    const newArray = myObservation.filter((item) => {
      return item.id !== id;
    });
    setMyObservation(newArray);
  };

  const editObs = () => {
    console.log("edit");
  };

  return (
    <div className="myObs-container">
      <h1>My Observations</h1>
      <div className="myObs-data">
        <Link className="addObservation-link" to="/myobs/addObservation">
          Add New Observation
        </Link>
        {isLoading && <Spinner />}
      </div>
      <MyObsTable obs={myObservation} deleteObs={deleteObs} editObs={editObs} />
    </div>
  );
}
