"use client";
import { sprintf } from "sprintf-js";
import { dataFetcher } from "~/app/api/dataFetcher/dataFetcher";
import { useEffect, useState } from "react";
import { type PokemonResponseInterface } from "~/app/models/Pokemon/PokemonResponseInterface";
import NavBar from "../components/atoms/PageHeader";
import CharacterBook from "~/components/organisms/CharacterBook";
import PokeLoader from "~/components/atoms/PokeLoader";
import apiEndpoints from "~/app/static/apiEndpoints";

export default function Home() {
  const [character, setCharacter] = useState<PokemonResponseInterface>();

  const getRandom = () => {
    void dataFetcher(
      `${apiEndpoints._baseURL}${sprintf(apiEndpoints.getRandomPokemons, 1)}`,
    ).then((data: PokemonResponseInterface) => {
      setCharacter(data);
    });
  };

  useEffect(() => {
    if (!character) {
      getRandom();
    }
  }, [character]);

  return (
    <>
      <NavBar />

      <main className="page-content mx-12 my-8 rounded-md bg-black bg-opacity-50 px-10 py-8">
        {character ? (
          <CharacterBook character={character} onSearchClick={getRandom} />
        ) : (
          <PokeLoader />
        )}
      </main>
    </>
  );
}
