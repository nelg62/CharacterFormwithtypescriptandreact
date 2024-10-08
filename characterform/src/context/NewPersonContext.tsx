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
  Desc?: string;
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
  handleUpdatePerson: (updatedPerson: PersonType) => void;
}

// chareacter array of objects
const characters: PersonType[] = [
  {
    id: 1,
    FirstName: "Kazuma",
    LastName: "Kiryu",
    Desc: `"Kazuma Kiryu (Japanese: 桐生 一馬, Hepburn: Kiryū Kazuma) is a fictional character and the initial main protagonist of Sega's action-adventure beat 'em up Japanese role-playing game series Yakuza / Like a Dragon. He is popularly known as "the Dragon of Dojima" (堂島の龍, Dōjima no Ryū) due to the tattoo of a dragon on his back and him originally being a fearsome member of the yakuza group known as the Dojima Family, a subsidiary of the Tojo Clan."`,
    Image: "/Kiryu_Y0.webp",
    Border: "solid",
    BackgroundColor: "#ffdbbb",
    BorderColor: "#000000",
  },
  {
    id: 2,
    FirstName: "GIR",
    LastName: "",
    Desc: `"GIR (G Information Retrieval Unit) He is the hyperactive robotic assistant of Zim and the closest thing the incompetent Irken has to a friend, having been constructed from scrap parts by the Almighty Tallest just before it was handed to Zim, instead of a regular SIR (Standard-issue Information Retrieval) Unit."`,
    Image: "/Gir_mouth_open.webp",
    Border: "dotted",
    BackgroundColor: "#D3D3D3",
    BorderColor: "#000000",
  },
  {
    id: 3,
    FirstName: "Goro",
    LastName: "Majima",
    Desc: `"Goro Majima (Japanese: 真島 吾朗, Hepburn: Majima Gorō) is a major recurring character in Sega's Like a Dragon video game series, previously known as Yakuza outside of Japan. He is one of the main playable protagonists of Yakuza 0 and Yakuza: Dead Souls, as well as the Majima Saga of Yakuza Kiwami 2. Introduced as a member of the Tojo Clan and patriarch of its subsidiary group, the Majima Family as well as second-in-command of the Shimano Family, nicknamed "Mad Dog of Shimano""`,
    Image: "/yakuza-0-release-date-set-for-january-1469635416610.webp",
    Border: "solid",
    BackgroundColor: "	#CBC3E3",
    BorderColor: "#000000",
  },
  {
    id: 4,
    FirstName: "Zim",
    LastName: "",
    Desc: `"Zim is a member of the alien Irken race and a former Irken Invader; however, since his actions usually lead to disaster (having nearly destroyed the Irken homeworld during Operation Impending Doom) his leaders, the Almighty Tallest, banished him to Foodcourtia. While there, however, Zim heard of Operation Impending Doom II, and - obviously not understanding the purpose of his previous exile - "quit being banished" and ventured to Conventia in the hope of getting an assignment. Chagrined, the Almighty Tallest sent him on a "secret mission" to Earth, in order to keep him occupied and away from the real Operation Impending Doom II."`,
    Image: "/Zim.yelling.svg",
    Border: "dashed",
    BackgroundColor: "#FFC1C3",
    BorderColor: "#000000",
  },
  {
    id: 5,
    FirstName: "Patrick",
    LastName: "Star",
    Desc: "Patrick is the ignorant but humorous best friend of SpongeBob SquarePants. He is portrayed as being an overweight pink starfish, who serves as the village idiot of the underwater city of Bikini Bottom.",
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
        convertFile,
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
    throw new Error("New character must be used within provider");
  }
  return context;
};
