import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { sprintf } from 'sprintf-js';
import { dataFetcher } from '~/app/api/dataFetcher/dataFetcher';
import { SearchByKeys } from '~/app/enums/SearchByKeysEnum';
import { PokemonResponseInterface } from '~/app/models/Pokemon/PokemonResponseInterface';
import NavBar from '../components/atoms/PageHeader';
import PokeLoader from '~/components/atoms/PokeLoader';
import CharacterCard from '~/components/molecules/CharacterCard';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/16/solid';
import apiEndpoints from '~/app/static/apiEndpoints';

export default function Pokemon() {
  const [queryArgName, setQueryArgName] = useState<string>();
  const [character, setCharacter] = useState<PokemonResponseInterface>();
  const searchParams = useSearchParams()!;
  const queryParamName = searchParams.get(SearchByKeys.name.toLowerCase());
  const router = useRouter();

  useEffect(() => {
    if (queryParamName && !queryArgName) {
      setQueryArgName(queryParamName);

      dataFetcher(`${ apiEndpoints._baseURL }${ sprintf(apiEndpoints.findByName, queryParamName) }`)
        .then(data => {
          console.log('DATA', data);
          setCharacter(data);
        });
    }
  }, [queryArgName, queryParamName]);

  return (
    <>
      <NavBar/>

      <main className="bg-black bg-opacity-50 mx-12 my-8 p-2 lg:p-8 rounded-md">
        {
          character
            ? <>
              <div className="flex flex-row mb-4">
                <div className="grow flex flex-row">
                  <button onClick={ () => router.back() } className="px-2">
                    <ArrowLeftIcon aria-hidden="true" className="h-5"/>
                  </button>
                </div>

                <div className="basis-4/12 flex justify-end text-neutral-300">
                  <button className="flex flex-row py-2 px-3 bg-zinc-800 text-sm rounded-md me-2">
                    <PencilIcon aria-hidden="true" className="h-5 md:me-2"/>
                    <span className="hidden md:inline-block">Edit</span>
                  </button>

                  <button className="flex flex-row py-2 px-3 bg-zinc-800 text-sm rounded-md">
                    <TrashIcon aria-hidden="true" className="h-5 md:me-2"/>
                    <span className="hidden md:inline-block">Delete</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row">
                <div className="lg:basis-1/2 flex justify-center">
                  <img alt="" src="https://placehold.co/144x135" className="w-full md:w-36 lg:w-80"/>
                </div>
                {
                  character
                    ? <CharacterCard character={ character } className="lg:basis-1/2"/>
                    : null
                }
              </div>
            </>
            : <PokeLoader/>
        }
      </main>
    </>
  );
}
