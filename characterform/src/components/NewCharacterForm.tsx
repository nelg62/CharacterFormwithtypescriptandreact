"use client";
import { useNewPerson } from "@/context/NewPersonContext";
import React, { useState } from "react";

function NewCharacterForm() {
  const { handleAddPerson, convertFile, filebase64, setFileBase64 } =
    useNewPerson();
  //   state for Firstname and LastName for form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //   on form submit
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // set typing of the e.target recieved from the form
    const target = e.target as typeof e.target & {
      FirstName: { value: string };
      LastName: { value: string };
      Image: { value: string };
    };

    // create a new object from the form data and store in new variable
    const addPersonToForm = {
      id: 1,
      FirstName: target.FirstName.value,
      LastName: target.LastName.value,
      Image: filebase64,
    };

    // call handleAddperson from context to add addPersonToForm objerct to the characters array
    handleAddPerson(addPersonToForm);

    console.log("addParsonToForm", addPersonToForm);

    // clear form states
    setFirstName("");
    setLastName("");
    setFileBase64("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create New Character</h2>
        {/* First Name Input */}
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
        <div>
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            id="lname"
            name="LastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />
        </div>

        {/* Add image Input */}
        <div>
          <label htmlFor="personimage">AddImage: </label>
          <input
            id="personimage"
            type="file"
            name="Image"
            onChange={(e) => convertFile(e.target.files)}
            accept="image/*"
          />
          <img src={filebase64} className="max-h-40" />
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewCharacterForm;
