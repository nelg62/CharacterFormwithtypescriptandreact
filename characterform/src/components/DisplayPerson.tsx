"use client";

import { useNewPerson } from "@/context/NewPersonContext";
import Image from "next/image";

function DisplayPerson() {
  const { currentCharacters, setCurrentCharacters } = useNewPerson();

  const handleDelete = (id: number) => {
    console.log("handleDelete id", id);

    setCurrentCharacters(
      currentCharacters.filter((character) => character.id != id)
    );
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 text-center p-4">
      {/* Map list of characters in card format using array from newperson context to display in grid  */}
      {currentCharacters.map((character) => (
        <div
          className="m-2 border-2 rounded-lg border-gray-300 items-center shadow-lg"
          key={character.id}
          style={{
            borderStyle: character.Border,
            borderColor: character.BorderColor,
            backgroundColor: character.BackgroundColor,
          }}
        >
          {/* ID of Character */}
          <div className="text-gray-500 text-lg font-bold mt-2 mb-3">
            ID: {character.id}
          </div>
          {/* FirstName and LastName of Character */}
          <h5 className="text-xl font-semibold mb-2 text-gray-700">
            {character.FirstName} {character.LastName}
          </h5>
          {/* Display Image of Character */}
          <div className="grid items-center justify-items-center">
            <Image
              src={`${character.Image}`}
              alt={`${character.FirstName}`}
              height={0}
              width={150}
              className="max-h-40 w-auto rounded-lg mb-4"
              priority
            />
          </div>
          {/*Delete and edit buttons  */}
          <div className="space-x-3 mb-2">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
              id="deleteBtn"
              onClick={() => handleDelete(character.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayPerson;
