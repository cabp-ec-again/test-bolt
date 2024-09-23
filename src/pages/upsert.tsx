import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { sprintf } from 'sprintf-js';
import { dataFetcher } from '~/app/api/dataFetcher/dataFetcher';
import { SearchByKeys } from '~/app/enums/SearchByKeysEnum';
import { PokemonResponseInterface } from '~/app/models/Pokemon/PokemonResponseInterface';
import NavBar from '../components/atoms/PageHeader';
import PokeLoader from '~/components/atoms/PokeLoader';
import CharacterForm from '~/components/organisms/CharacterForm';
import apiEndpoints from '~/app/static/apiEndpoints';
import { HttpVerbsEnum } from '~/app/enums/HttpVerbsEnum';

export default function Upsert() {
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [character, setCharacter] = useState<PokemonResponseInterface>();

  const [queryArgName, setQueryArgName] = useState<string>();
  const searchParams = useSearchParams()!;
  const queryParamName = searchParams.get(SearchByKeys.name.toLowerCase());

  const uploadImage = (id: number, base64: string) => {
    console.log('UPLOADING IMAGE...', { id, image: base64 });

    dataFetcher(
      `${ apiEndpoints._baseURL }${ apiEndpoints.upload }`,
      HttpVerbsEnum.POST,
      `{ "id": ${ id }, "image": "${ base64 }" }`
    )
      .then(data => {
        console.log('IMAGE UPLOADED', id);
      })
      .catch(error => {
        console.warn('IMAGE NOT UPLOADED', error);
      });
  };

  const onSubmit = (body: string, base64: string) => {
    console.log('SAVING DATA...', body);

    dataFetcher(
      `${ apiEndpoints._baseURL }${ apiEndpoints.create }`,
      HttpVerbsEnum.POST,
      body
    )
      .then((data: PokemonResponseInterface) => {
        console.log('STORED', data);
        setCharacter(data);
        uploadImage(data.pokemon_id!, base64);
      })
      .catch(error => {
        console.warn('STORED', error);
      });
  };

  useEffect(() => {
    if (queryParamName && !queryArgName) {
      setEditMode(true);
      setQueryArgName(queryParamName);

      dataFetcher(`${ apiEndpoints._baseURL }${ sprintf(apiEndpoints.findByName, queryParamName) }`)
        .then(data => {
          console.log('EDIT', data);
          setCharacter(data);
        });
    } else {
      setLoading(false);
    }
  }, [queryArgName, queryParamName]);

  return (
    <>
      <NavBar/>

      <main className="bg-black bg-opacity-50 mx-2 my-8 p-3 rounded-md lg:py-6 lg:px-6 lg:w-1/2 lg:mx-auto">
        {
          loading
            ? <PokeLoader/>
            : <CharacterForm onSubmit={ onSubmit }/>
        }
      </main>
    </>
  );
}
