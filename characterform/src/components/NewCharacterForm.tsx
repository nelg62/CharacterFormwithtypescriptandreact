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
  Desc: string;
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
  const [Desc, setDesc] = useState("");

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
      Desc,
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
    setDesc("");
  }

  return (
    <>
      <div className="text-center mt-4">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={toggleModal}
        >
          New Character
        </button>
      </div>

      <Modal open={showModal} onClose={toggleModal}>
        <div className="grid grid-cols-2">
          <div>
            <form
              onSubmit={handleSubmit}
              // style={{ borderStyle, borderColor, backgroundColor }}
            >
              <h2 className="text-gray-700 text-2xl font-bold mb-4">
                Create New Character
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* First Name Input */}
                <div>
                  <label
                    className="block text-gray-600 font-semibold"
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
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Last Name Input */}
                <div>
                  <label
                    className="block text-gray-600 font-semibold"
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
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Desctiption */}
              <div className="mb-4">
                <label
                  className="block text-gray-600 font-semibold"
                  htmlFor="Desc"
                >
                  Description
                </label>

                <textarea
                  name="Desc"
                  id="Desc"
                  value={Desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Image Upload */}
              <div className="mb-4">
                <label
                  className="block text-gray-600 font-semibold"
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
                  className="w-full"
                />
                {/* {fileBase64 && (
                  <div className="mt-2">
                    <Image
                      src={fileBase64}
                      className="max-h-40 mt-2 object-contain rounded-md border mx-3"
                      alt="Character Image Preview"
                      width={150}
                      height={150}
                    />
                  </div>
                )} */}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Border Style Picker */}
                <div>
                  <label className="block text-gray-600 font-semibold">
                    Border Style
                  </label>

                  <Dropdown<BorderStyle>
                    label="Choose a border style: "
                    options={borderOptions}
                    selectedOption={borderStyle}
                    onChange={setBorderStyle}
                  />
                </div>

                {/* Border Color Picker */}
                <div>
                  <label className="block text-gray-600 font-semibold">
                    Border Color
                  </label>

                  <ColorPicker
                    label="Choose Border color: "
                    selectedColor={borderColor}
                    onChange={setBorderColor}
                  />
                </div>
              </div>

              {/* Background Color Picker */}
              <div className="mb-4">
                <label className="block text-gray-600 font-semibold">
                  Background Color
                </label>

                <ColorPicker
                  label=":Choose background color:"
                  selectedColor={backgroundColor}
                  onChange={setBackgroundColor}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Live Preview */}
          <div
            className="m-2 border-2 rounded-lg items-center shadow-lg text-center"
            style={{
              borderStyle: borderStyle,
              borderColor: borderColor,
              backgroundColor: backgroundColor,
            }}
          >
            <div className="text-gray-500 text-lg font-bold mt-2 mb-3">ID:</div>
            {/* Firstname Lastname */}
            <h5 className="text-xl font-semibold mb-2 text-gray-700 truncate">
              {FirstName} {LastName}
            </h5>

            {/* Image */}
            <div className="grid items-center justify-items-center">
              {Image && (
                <Image
                  src={fileBase64}
                  alt={FirstName}
                  height={0}
                  width={150}
                  className="max-h-40 w-auto rounded-lg mb-4"
                />
              )}
            </div>

            {/* Description */}
            <h6 className="break-words line-clamp-5">{Desc}</h6>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default NewCharacterForm;
