"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import { useNewPerson } from "@/context/NewPersonContext";

interface CharacterFormData {
  id: number;
  FirstName: string;
  LastName: string;
}

function NewCharacterForm() {
  const { handleAddPerson } = useNewPerson();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");

  function toggleModal() {
    setShowModal(!showModal);
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const formData: CharacterFormData = {
      id: 1,
      FirstName,
      LastName,
    };

    console.log("formData", formData);
    handleAddPerson(formData);
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
            className="bg-white text-center rounded-lg border-2 border-gray-300 items-center shadow-lg"
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
                value={FirstName}
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
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                className="text-center mx-3 rounded-lg border border-gray-300"
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
