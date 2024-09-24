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
    <div className="grid grid-cols-4 text-center p-4">
      {/* Map list of characters in card format using array from newperson context to display in grid  */}
      {currentCharacters.map((character) => (
        <div className="m-2 border rounded" key={character.id}>
          {editMode === character.id ? (
            <div>
              <div>
                <input
                  type="text"
                  name="FirstName"
                  value={editPerson.FirstName}
                  onChange={handleEditChange}
                />
                <input
                  type="text"
                  name="LastName"
                  value={editPerson.LastName}
                  onChange={handleEditChange}
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
                    className="max-h-40"
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
              <div>ID: {character.id}</div>
              {/* FirstName and LastName of Character */}
              <div>
                {character.FirstName} {character.LastName}
              </div>
              {/* Display Image of Character */}
              <div className="grid items-center justify-items-center">
                <img src={character.Image} className="max-h-40" />
              </div>
              {/* description of character  */}
              <div>Description</div>
              {/* delete button */}
              <div>
                <button onClick={() => enableEdit(character)}>Edit</button>
                <button
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
