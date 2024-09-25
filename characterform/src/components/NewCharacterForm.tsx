"use client";
import { useNewPerson } from "@/context/NewPersonContext";
import React, { useState } from "react";
import Modal from "./Modal";
import { Dropdown } from "./Dropdown";

type BorderStyle = "solid" | "dashed" | "dotted" | "double";

const borderOptions = [
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
  { value: "double", label: "Double" },
];

function NewCharacterForm() {
  const { handleAddPerson, convertFile } = useNewPerson();
  //   state for Firstname and LastName for form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [filebase64, setFileBase64] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);

  const [borderStyle, setBorderStyle] = useState<BorderStyle>("solid");

  function toggleModal() {
    setShowModal(!showModal);
    clearForm();
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    convertFile(e.target.files, (base64) => {
      setFileBase64(base64);
    });
  };

  function clearForm() {
    setFirstName("");
    setLastName("");
    setFileBase64("");
  }

  //   on form submit
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // set typing of the e.target recieved from the form
    const target = e.target as typeof e.target & {
      FirstName: { value: string };
      LastName: { value: string };
      Image: { value: string };
      Border: { value: string };
    };

    // create a new object from the form data and store in new variable
    const addPersonToForm = {
      id: 1,
      FirstName: target.FirstName.value,
      LastName: target.LastName.value,
      Image: filebase64,
      Border: borderStyle,
    };

    // call handleAddperson from context to add addPersonToForm objerct to the characters array
    handleAddPerson(addPersonToForm);

    console.log("addParsonToForm", addPersonToForm);

    // clear form states
    toggleModal();
  };

  return (
    <>
      <div className="text-center items-center mt-4">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={toggleModal}
        >
          New Character
        </button>
      </div>
      <Modal open={showModal} onClose={toggleModal}>
        <div>
          <form
            className={`bg-white text-center rounded-lg border-${borderStyle} border-2 border-gray-300 items-center shadow-lg`}
            onSubmit={handleSubmit}
          >
            <h2 className="text-gray-700 text-xl font-bold mt-2 mb-3">
              Create New Character
            </h2>
            {/* First Name Input */}
            <div className="flex flex-col">
              <label
                className="text-lg font-semibold text-gray-500"
                htmlFor="fname"
              >
                First Name
              </label>
              <input
                type="text"
                id="fname"
                name="FirstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                className="text-center mx-3 rounded-lg active:text-black border border-gray-300"
              />
            </div>

            {/* Last Name Input */}
            <div className="flex flex-col">
              <label
                className="text-lg font-semibold mt-1 text-gray-500"
                htmlFor="lname"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                name="LastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                className="text-center mx-3 rounded-lg border border-gray-300"
              />
            </div>

            {/* Add image Input */}
            <div className="flex flex-col">
              <label
                className="text-lg font-semibold mt-1 text-gray-500"
                htmlFor="personimage"
              >
                AddImage
              </label>
              <input
                id="personimage"
                type="file"
                name="Image"
                onChange={handleImageChange}
                accept="image/*"
                className="text-gray-500 mx-3 file:rounded-lg rounded-lg border border-gray-300 "
              />
              {filebase64 && (
                <img
                  src={filebase64}
                  className="max-h-40 mt-2 object-contain border mx-3"
                  alt="Preview"
                />
              )}
            </div>

            <div>
              <Dropdown<BorderStyle>
                label="Choose a border style:"
                options={borderOptions}
                selectedOption={borderStyle}
                onChange={setBorderStyle}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 m-2"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default NewCharacterForm;
