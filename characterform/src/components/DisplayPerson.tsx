"use client";

import { useNewPerson } from "@/context/NewPersonContext";

function DisplayPerson() {
  const { currentCharacters } = useNewPerson();

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 text-center p-4">
      {currentCharacters.map((character) => (
        <div
          className="m-2 border-2 rounded-lg border-gray-300 items-center shadow-lg"
          key={character.id}
        ></div>
      ))}
    </div>
  );
}

export default DisplayPerson;
