"use client";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface PersonType {
  id: number;
  FirstName: string;
  LastName: string;
}

interface NewPersonContextType {
  handleAddPerson: (newPerson: PersonType) => void;
  currentCharacters: PersonType[];
  setCurrentCharacters: React.Dispatch<SetStateAction<PersonType[]>>;
}

const NewPersonContext = createContext<NewPersonContextType | undefined>(
  undefined
);

const characters: PersonType[] = [
  {
    id: 1,
    FirstName: "Kazuma",
    LastName: "Kiryu",
  },
];

export const NewPersonProvider = ({ children }: { children: ReactNode }) => {
  const [currentCharacters, setCurrentCharacters] = useState(characters);

  const handleAddPerson = (newPerson: PersonType) => {
    newPerson.id = currentCharacters.length + 1;

    setCurrentCharacters([...currentCharacters, newPerson]);
    console.log("currentCharacters", currentCharacters);
  };

  return (
    <NewPersonContext.Provider
      value={{ currentCharacters, setCurrentCharacters, handleAddPerson }}
    >
      {children}
    </NewPersonContext.Provider>
  );
};

export const useNewPerson = () => {
  const context = useContext(NewPersonContext);
  if (!context) {
    throw new Error("New character must be used withing provider");
  }
  return context;
};
