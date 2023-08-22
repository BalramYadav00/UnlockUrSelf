import React from "react";
import { useNavigate } from "react-router-dom";

function Doctor({ doctor }) {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 cursor-pointer"
      onClick={() => navigate(`/book-appointment/${doctor._id}`)}
    >
      <h1 className="card-mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {doctor.firstName} {doctor.lastName}
      </h1>
      <hr className=" border-y-1" />
      <p>
        <b>specialization : </b>
        {doctor.specialization}
      </p>
      <p>
        <b> Experience : </b>
        {doctor.experience}
      </p>
      <p>
        <b>Phone Number : </b>
        {doctor.phoneNumber}
      </p>
      <p>
        <b>Address : </b>
        {doctor.address}
      </p>
      <p>
        <b>Fee per Visit : </b>
        {doctor.feePerCunsultation}
      </p>
      <p>
        <b>Timings : </b>
        {doctor.timings[0]} - {doctor.timings[1]}
      </p>
    </div>
  );
}

export default Doctor;
