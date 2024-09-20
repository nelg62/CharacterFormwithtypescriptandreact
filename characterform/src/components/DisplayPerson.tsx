"use client";
import { useNewPerson } from "@/context/NewPersonContext";

interface DisplayType {
  handleDelete: (e: React.SyntheticEvent) => void;
}

function DisplayPerson() {
  const { currentCharacters, setCurrentCharacters, filebase64 } =
    useNewPerson();

  // Delete Character from characters array
  const handleDelete = (id: number) => {
    console.log("e", id);

    setCurrentCharacters(
      currentCharacters.filter((character) => character.id != id)
    );
  };

  return (
    <div className="grid grid-cols-4 text-center p-4">
      {/* Map list of characters in card format using array from newperson context to display in grid  */}
      {currentCharacters.map((character) => (
        <div className="m-2 border rounded">
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
            <button id="deleteBtn" onClick={() => handleDelete(character.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayPerson;
