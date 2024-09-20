"use client";

import DisplayPerson from "@/components/DisplayPerson";
import NewCharacterForm from "@/components/NewCharacterForm";

export default function Home() {
  return (
    <div>
      {/* component Form for creating character  */}
      <NewCharacterForm />

      {/* Component for displaying created characters  */}
      <DisplayPerson />
    </div>
  );
}
