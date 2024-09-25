"use client";

import DisplayPerson from "@/components/DisplayPerson";
import Modal from "@/components/Modal";
import NewCharacterForm from "@/components/NewCharacterForm";
import { useState } from "react";

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
