"use client";

import { useState } from "react";
import Intro from "./components/Intro";
import SoundToggle from "./components/SoundToggle";
import Details from "./components/Details";
import Apology from "./components/Apology";
import Matters from "./components/Matters";
import Smile from "./components/Smile";
import Memories from "./components/Memories";
import Constellation from "./components/Constellation";
import FinalLetter from "./components/FinalLetter";

export default function Page() {
  const [entered, setEntered] = useState(false);

  const enter = () => {
    setEntered(true);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <SoundToggle />
      {!entered ? (
        <Intro onEnter={enter} />
      ) : (
        <main className="animate-rise">
          <header className="px-5 pb-4 pt-20 text-center">
            <p className="font-hand text-2xl text-plum">a little universe made with care</p>
            <h1 className="font-serif text-4xl text-plum-deep sm:text-5xl">for fatima 💜</h1>
          </header>
          <Details />
          <Apology />
          <Matters />
          <Smile />
          <Memories />
          <Constellation />
          <FinalLetter />
        </main>
      )}
    </>
  );
}
