'use client'

import React from "react";
import Head from 'next/head';
import { useState } from "react";
import AnagrammerInput from "./components/AnagrammerInput/AnagrammerInput";
import AnagramDisplay from "./components/AnagramDisplay/AnagramDisplay";
import FinalAnagram from "./components/FinalAnagram/FinalAnagram";
import { ErrorModal } from "./UI/ErrorModal/ErrorModal";
import Header from "./components/Header/Header";
import DictionaryCheck from "./components/DictionaryCheck/DictionaryCheck";
// import { Helmet } from "react-helmet";
import DictionaryDisplay from "./components/DictionaryDisplay/DictionaryDisplay";
import { GetDefinitionHelper } from "./services/GetDefinitionHelper";
import { useErrorState } from './UI/ErrorModal/useErrorState';
import{ CheatDataInfiniteScroll } from './components/CheatDataInfiniteScroll/CheatDataInfiniteScroll.js';
import { CheatLookUpHelper } from './services/CheatLookUpHelper';
import { LocalCheatLookUpHelper } from './services/LocalCheatlookUpHelper';


function App() {
  const { error, removeErrorHandler, errorHandler } = useErrorState();
  const [letters, setLetters] = React.useState("");
  const [anaLetters, setAnaLetters] = React.useState([]);
  const [dictionaryDisplay, setDictionaryDisplay] = React.useState([]);
  const [dictLook, setDictLook] = React.useState(false);
  const [cheatData, setCheatData] = React.useState(undefined);
 
  const anagrammiserHandler = (letters) => {
    letters = letters.toLowerCase().split("");
    setLetters(letters);
  };

  const letterSubmitHandler = (letterData) => {
    const updatedLetters = [...letters];
    for (const letter of letterData) {
      const indexToRemove = updatedLetters.indexOf(letter);
      if (indexToRemove !== -1) {
        updatedLetters.splice(indexToRemove, 1);
      }
    }

    setAnaLetters({ ul: updatedLetters, ld: letterData });
  };

  const resetAnaHandler = () => {
    setAnaLetters({ul:'' , ld: '' });
    setLetters("");
    setDictLook(false);
    setCheatData(undefined);
  };

  const DictLookUpHandler = async (word, errorHandler) => {
    try {
      const data = await GetDefinitionHelper(word, errorHandler);
      setDictionaryDisplay(data);
    } catch (err) {
      errorHandler(err.name, err.message);
    }
  };
  
  const removeDisplayHandler = () => {
    setDictionaryDisplay([]);
  };

  const removeCheatDisplayHandler = () => {
    setCheatData(undefined);
  }

  const cheatLookUpHandler = async (cheatWord, letters) => {
    let data;
  
    if (letters.length >= 15) {
      data = await LocalCheatLookUpHelper(cheatWord, letters, errorHandler);
    } else {
      data = await CheatLookUpHelper(cheatWord, letters, errorHandler);
    }
  
    setCheatData(data);
  };


  return (
    <div>

      <Head>
        <meta charSet="utf-8" />
        <title>Anagrammiser</title>
        <link rel="canonical" href="http://anagrammiser.netlify.app" />
        <meta name="description" content="Anagram solver" />
      </Head>
      <Header />
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={removeErrorHandler}
        />
      )}
      {!letters && <AnagrammerInput
        onAnagrammise={anagrammiserHandler}
        onError={errorHandler}
      />}
      {anaLetters && (<AnagramDisplay
        letters={letters}
        onLetterSubmit={letterSubmitHandler}
        onError={errorHandler}
      />)}
      {letters && (
        <FinalAnagram
          anaLetters={anaLetters}
          resetAna={resetAnaHandler}
          dictLookUp={() => setDictLook(true)}
          cheatLookUp={cheatLookUpHandler}
          letters={letters}
        />
      )}
      {dictLook && (
        <DictionaryCheck
          onDictLookUp={DictLookUpHandler}
          onError={errorHandler}
        />
      )}
      {dictionaryDisplay.length > 0 && (
        <DictionaryDisplay
          wordDisplay={dictionaryDisplay}
          onConfirm={removeDisplayHandler}
        />
      )}
      {cheatData && (
      <CheatDataInfiniteScroll
      cheatData={cheatData}
      letters={letters}
      onConfirm={removeCheatDisplayHandler}
      />
    )}
    </div>
  );
}

export default App;
