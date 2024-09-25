"use client";
import { useNewPerson } from "@/context/NewPersonContext";
import { useState } from "react";

interface DisplayType {
  handleDelete: (e: React.SyntheticEvent) => void;
}

function DisplayPerson() {
  const {
    currentCharacters,
    setCurrentCharacters,
    convertFile,
    handleUpdatePerson,
  } = useNewPerson();

  const [editMode, setEditMode] = useState<number | null>(null);
  const [editPerson, setEditPerson] = useState({
    id: 0,
    FirstName: "",
    LastName: "",
    Image: "",
    Border: "",
  });

  // Delete Character from characters array
  const handleDelete = (id: number) => {
    console.log("e", id);

    setCurrentCharacters(
      currentCharacters.filter((character) => character.id != id)
    );
  };

  const enableEdit = (character: any) => {
    console.log("character", character);

    setEditMode(character.id);
    setEditPerson(character);
  };

  const handleEditChange = (e: { target: { name: any; value: any } }) => {
    setEditPerson({
      ...editPerson,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: { target: { files: FileList | null } }) => {
    convertFile(e.target.files, (base64) => {
      setEditPerson((prev) => ({ ...prev, Image: base64 }));
    });
  };

  const handleSave = () => {
    handleUpdatePerson(editPerson);
    // setCurrentCharacters(
    //   currentCharacters.map((character) =>
    //     character.id === editPerson.id ? editPerson : character
    //   )
    // );
    setEditMode(null);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 text-center p-4">
      {/* Map list of characters in card format using array from newperson context to display in grid  */}
      {currentCharacters.map((character) => (
        <div
          className={`m-2 border-${character.Border} border-2 rounded-lg border-gray-300 bg-white items-center shadow-lg`}
          key={character.id}
        >
          {editMode === character.id ? (
            <div>
              <div>
                <input
                  type="text"
                  name="FirstName"
                  value={editPerson.FirstName}
                  onChange={handleEditChange}
                  className="text-black"
                />
                <input
                  type="text"
                  name="LastName"
                  value={editPerson.LastName}
                  onChange={handleEditChange}
                  className="text-black"
                />
                {/* Image Upload */}
                <div>
                  <input
                    type="file"
                    name="Image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <img
                    src={editPerson.Image}
                    className="max-h-40 inline"
                    alt="Character"
                  />
                </div>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditMode(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              {/* ID of Character */}
              <div className="text-gray-500 text-lg font-bold mt-2 mb-3 ">
                ID: {character.id}
              </div>
              {/* FirstName and LastName of Character */}
              <h5 className="text-xl font-semibold mb-2 text-gray-700">
                {character.FirstName} {character.LastName}
              </h5>
              {/* Display Image of Character */}
              <div className="grid items-center justify-items-center">
                <img
                  src={character.Image}
                  className="max-h-40 rounded-lg mb-4"
                />
              </div>
              {/* description of character  */}
              <p className="text-gray-700 mb-4">Description</p>
              {/* delete button */}
              <div className="space-x-3 mb-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                  onClick={() => enableEdit(character)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                  id="deleteBtn"
                  onClick={() => handleDelete(character.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DisplayPerson;
