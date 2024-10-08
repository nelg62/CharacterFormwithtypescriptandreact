"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

// Typing for characters
interface PersonType {
  id: number;
  FirstName: string;
  LastName: string;
  Image?: string;
  Border?: string;
  BackgroundColor?: string;
  BorderColor?: string;
}

// context typing
interface NewPersonContextType {
  currentCharacters: PersonType[];
  setCurrentCharacters: Dispatch<SetStateAction<PersonType[]>>;
  handleAddPerson: (newPerson: PersonType) => void;
  convertFile: (
    files: FileList | null,
    callback: (base64: string) => void
  ) => void;
}

// chareacter array of objects
const characters: PersonType[] = [
  {
    id: 1,
    FirstName: "Kazuma",
    LastName: "Kiryu",
    Image: "/Kiryu_Y0.webp",
    Border: "solid",
    BackgroundColor: "#ffdbbb",
    BorderColor: "#000000",
  },
  {
    id: 2,
    FirstName: "GIR",
    LastName: "",
    Image: "/Gir_mouth_open.webp",
    Border: "dotted",
    BackgroundColor: "#D3D3D3",
    BorderColor: "#000000",
  },
  {
    id: 3,
    FirstName: "Goro",
    LastName: "Majima",
    Image: "/yakuza-0-release-date-set-for-january-1469635416610.webp",
    Border: "solid",
    BackgroundColor: "	#CBC3E3",
    BorderColor: "#000000",
  },
  {
    id: 4,
    FirstName: "Zim",
    LastName: "",
    Image: "/Zim.yelling.svg",
    Border: "dashed",
    BackgroundColor: "#FFC1C3",
    BorderColor: "#000000",
  },
  {
    id: 5,
    FirstName: "Patrick",
    LastName: "Star",
    Image: "/Patrick_Star.svg.png",
    Border: "solid",
    BackgroundColor: "#add8e6",
    BorderColor: "#000000",
  },
];

// creating context
const NewPersonContext = createContext<NewPersonContextType | undefined>(
  undefined
);

// create context provider
export const NewPersonProvider = ({ children }: { children: ReactNode }) => {
  const [currentCharacters, setCurrentCharacters] = useState(characters);

  const handleAddPerson = (newPerson: PersonType) => {
    newPerson.id = currentCharacters.length + 1;

    setCurrentCharacters([...currentCharacters, newPerson]);
    console.log("currentCharacters", currentCharacters);
  };

  const convertFile = (
    files: FileList | null,
    callback: (base64: string) => void
  ) => {
    if (files) {
      const fileRef = files[0];
      if (!fileRef) return;

      const fileType: string = fileRef.type || "";
      const reader = new FileReader();

      reader.readAsBinaryString(fileRef);

      reader.onload = (ev: ProgressEvent<FileReader>) => {
        const result = ev.target?.result as string | null;
        if (result) {
          const base64String = `data:${fileType};base64,${btoa(result)}`;
          callback(base64String);
        }
      };
    }
  };

  return (
    <NewPersonContext.Provider
      value={{
        currentCharacters,
        setCurrentCharacters,
        handleAddPerson,
        convertFile,
      }}
    >
      {children}
    </NewPersonContext.Provider>
  );
};

export const useNewPerson = () => {
  const context = useContext(NewPersonContext);
  if (!context) {
    throw new Error("New character must be used within provider");
  }
  return context;
};
