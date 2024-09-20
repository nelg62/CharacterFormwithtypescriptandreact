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
}

// create typing for context
interface NewPersonContextType {
  handleAddPerson: (newPerson: PersonType) => void;
  currentCharacters: PersonType[];
  setCurrentCharacters: React.Dispatch<SetStateAction<PersonType[]>>;
  filebase64: string;
  convertFile: (files: FileList | null) => void;
  setFileBase64: React.Dispatch<SetStateAction<string>>;
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
  },
  {
    id: 2,
    FirstName: "GIR",
    LastName: "",
    Image: "Gir_mouth_open.webp",
  },
  {
    id: 3,
    FirstName: "Goro",
    LastName: "Majima",
    Image: "yakuza-0-release-date-set-for-january-1469635416610.webp",
  },
  {
    id: 4,
    FirstName: "Zim",
    LastName: "",
    Image: "Zim.yelling.svg",
  },
  {
    id: 5,
    FirstName: "Patrick",
    LastName: "Star",
    Image: "Patrick_Star.svg.png",
  },
];

export const NewPersonProvider = ({ children }: { children: ReactNode }) => {
  // used to grab data and set data to characters array
  const [currentCharacters, setCurrentCharacters] = useState(characters);

  //   state for managing images on form
  const [filebase64, setFileBase64] = useState<string>("");

  //   form for converting file types from form to usable data (limited to images at the moment)
  function convertFile(files: FileList | null) {
    if (files) {
      const fileRef = files[0] || "";
      const fileType: string = fileRef.type || "";
      console.log("This file upload is of type:", fileType);
      const reader = new FileReader();
      reader.readAsBinaryString(fileRef);
      reader.onload = (ev: any) => {
        // convert it to base64
        setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`);
      };
    }
  }

  //   add new person to characters array
  const handleAddPerson = (newPerson: PersonType) => {
    // set id (will change to a better method of id assigning later)
    newPerson.id = currentCharacters.length + 1;

    setCurrentCharacters([...currentCharacters, newPerson]);
    console.log("currentCharacters", currentCharacters);
  };

  return (
    <NewPersonContext.Provider
      value={{
        currentCharacters,
        setCurrentCharacters,
        handleAddPerson,
        filebase64,
        convertFile,
        setFileBase64,
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
