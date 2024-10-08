"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import { useNewPerson } from "@/context/NewPersonContext";
import Image from "next/image";
import { Dropdown } from "./Dropdown";
import { ColorPicker } from "./ColorPicker";

type BorderStyle = "solid" | "dashed" | "dotted" | "double";

interface CharacterFormData {
  id: number;
  FirstName: string;
  LastName: string;
  Image: string;
  Border: string;
  BorderColor: string;
  BackgroundColor: string;
}

const borderOptions: { value: BorderStyle; label: string }[] = [
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
  { value: "double", label: "Double" },
];

function NewCharacterForm() {
  const { handleAddPerson, convertFile } = useNewPerson();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");

  const [fileBase64, setFileBase64] = useState<string>("");

  const [borderStyle, setBorderStyle] = useState<BorderStyle>("solid");
  const [borderColor, setBorderColor] = useState<string>("#000000");
  const [backgroundColor, setBackgroundColor] = useState<string>("#FFFFFF");

  function toggleModal() {
    setShowModal(!showModal);
    clearForm();
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const formData: CharacterFormData = {
      id: 1,
      FirstName,
      LastName,
      Image: fileBase64,
      Border: borderStyle,
      BorderColor: borderColor,
      BackgroundColor: backgroundColor,
    };

    console.log("formData", formData);
    handleAddPerson(formData);

    toggleModal();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    convertFile(e.target.files, (base64) => {
      setFileBase64(base64);
    });
  };

  function clearForm() {
    setFirstName("");
    setLastName("");
    setFileBase64("");
    setBorderStyle("solid");
    setBorderColor("#000000");
    setBackgroundColor("#FFFFFF");
  }

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
            style={{ borderStyle, borderColor, backgroundColor }}
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

            {/* Image Upload */}
            <div className="flex flex-col items-center">
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
              {fileBase64 && (
                <Image
                  src={fileBase64}
                  className="max-h-40 mt-2 object-contain border mx-3"
                  alt="Character Image Preview"
                  width={150}
                  height={150}
                />
              )}
            </div>

            {/* Border Style Picker */}
            <div>
              <Dropdown<BorderStyle>
                label="Choose a border style:"
                options={borderOptions}
                selectedOption={borderStyle}
                onChange={setBorderStyle}
              />
            </div>

            {/* Border Color Picker */}

            <div>
              <ColorPicker
                label=":Choose Border color:"
                selectedColor={borderColor}
                onChange={setBorderColor}
              />
            </div>

            {/* Background Color Picker */}

            <div>
              <ColorPicker
                label=":Choose background color:"
                selectedColor={backgroundColor}
                onChange={setBackgroundColor}
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
