"use client";
import { useNewPerson } from "@/context/NewPersonContext";
import React, { useState } from "react";

function NewCharacterForm() {
  const { handleAddPerson } = useNewPerson();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      FirstName: { value: string };
      LastName: { value: string };
    };

    const addPersonToForm = {
      id: 1,
      FirstName: target.FirstName.value,
      LastName: target.LastName.value,
    };

    handleAddPerson(addPersonToForm);

    console.log("addParsonToForm", addPersonToForm);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create New Character</h2>
        {/* Fist Name Input */}
        <div>
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            id="fname"
            name="FirstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
        </div>

        {/* Last Name Input */}
        <label htmlFor="lname">Last Name:</label>
        <input
          type="text"
          id="lname"
          name="LastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name"
        />

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewCharacterForm;
