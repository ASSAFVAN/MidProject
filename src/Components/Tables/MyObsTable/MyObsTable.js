import React from "react";
import "./MyObsTable.css";

const MyObsTable = (props) => {
  return (
    <table className="my-obs-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Species Name</th>
          <th>Location</th>
          <th>How Many</th>
          <th>Date</th>
          <th>Time</th>
          <th>Lat</th>
          <th>Lng</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.obs.length > 0 ? (
          props.obs.map((observation) => {
            const {
              id,
              speciesName,
              location,
              howMany,
              date,
              time,
              lat,
              lng,
            } = observation;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{speciesName}</td>
                <td>{location}</td>
                <td>{howMany}</td>
                <td>{date}</td>
                <td>{time}</td>
                <td>{lat}</td>
                <td>{lng}</td>
                <td>
                  <button
                    className="action-btn"
                    onClick={() => props.deleteObs(id)}
                  >
                    Delete
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => props.editObs(id, observation)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={4}>No observations found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default MyObsTable;
