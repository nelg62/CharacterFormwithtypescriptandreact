"use client";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

// create typing for characters array
interface PersonType {
  id: number;
  FirstName: string;
  LastName: string;
  Image: string;
  Border: string;
  BackgroundColor: string;
  BorderColor: string;
}

// create typing for context
interface NewPersonContextType {
  handleAddPerson: (newPerson: PersonType) => void;
  handleUpdatePerson: (updatedPerson: PersonType) => void;
  currentCharacters: PersonType[];
  setCurrentCharacters: React.Dispatch<SetStateAction<PersonType[]>>;
  // filebase64: string;
  convertFile: (
    files: FileList | null,
    callback: (base64: string) => void
  ) => void;
  // setFileBase64: React.Dispatch<SetStateAction<string>>;
}

const NewPersonContext = createContext<NewPersonContextType | undefined>(
  undefined
);

// created characters array
const characters: PersonType[] = [
  {
    id: 1,
    FirstName: "Kazuma",
    LastName: "Kiryu",
    Image: "Kiryu_Y0.webp",
    Border: "solid",
    BackgroundColor: "#ffdbbb",
    BorderColor: "#000000",
  },
  {
    id: 2,
    FirstName: "GIR",
    LastName: "",
    Image: "Gir_mouth_open.webp",
    Border: "dotted",
    BackgroundColor: "#D3D3D3",
    BorderColor: "#000000",
  },
  {
    id: 3,
    FirstName: "Goro",
    LastName: "Majima",
    Image: "yakuza-0-release-date-set-for-january-1469635416610.webp",
    Border: "solid",
    BackgroundColor: "	#CBC3E3",
    BorderColor: "#000000",
  },
  {
    id: 4,
    FirstName: "Zim",
    LastName: "",
    Image: "Zim.yelling.svg",
    Border: "dashed",
    BackgroundColor: "#FFC1C3",
    BorderColor: "#000000",
  },
  {
    id: 5,
    FirstName: "Patrick",
    LastName: "Star",
    Image: "Patrick_Star.svg.png",
    Border: "solid",
    BackgroundColor: "#add8e6",
    BorderColor: "#000000",
  },
];

export const NewPersonProvider = ({ children }: { children: ReactNode }) => {
  // used to grab data and set data to characters array
  const [currentCharacters, setCurrentCharacters] = useState(characters);

  //   state for managing images on form
  // const [filebase64, setFileBase64] = useState<string>("");

  //   form for converting file types from form to usable data (limited to images at the moment)
  const convertFile = (
    files: FileList | null,
    callback: (base64: string) => void
  ) => {
    if (files) {
      const fileRef = files[0] || "";
      const fileType: string = fileRef.type || "";
      const reader = new FileReader();
      reader.readAsBinaryString(fileRef);
      reader.onload = (ev: any) => {
        const base64String = `data:${fileType};base64,${btoa(
          ev.target.result
        )}`;
        callback(base64String);
      };
    }
  };

  //   add new person to characters array
  const handleAddPerson = (newPerson: PersonType) => {
    // set id (will change to a better method of id assigning later)
    newPerson.id = currentCharacters.length + 1;

    setCurrentCharacters([...currentCharacters, newPerson]);
    console.log("currentCharacters", currentCharacters);
  };

  const handleUpdatePerson = (updatedPerson: PersonType) => {
    setCurrentCharacters(
      currentCharacters.map((character) =>
        character.id === updatedPerson.id ? updatedPerson : character
      )
    );
  };

  return (
    <NewPersonContext.Provider
      value={{
        currentCharacters,
        setCurrentCharacters,
        handleAddPerson,
        // filebase64,
        convertFile,
        // setFileBase64,
        handleUpdatePerson,
      }}
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
