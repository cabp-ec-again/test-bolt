import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import NavBar from '../components/atoms/PageHeader';
import CharacterList from '~/components/organisms/CharacterList';
import { SearchByKeys } from '~/app/enums/SearchByKeysEnum';
import SearchBar from '~/components/molecules/SearchBar';
import { PokemonResponseInterface } from '~/app/models/Pokemon/PokemonResponseInterface';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [queryArgByName, setQueryArgByName] = useState<string>();
  const [queryArgByTypeName, setQueryArgByTypeName] = useState<string>();
  const [queryArgByAbilityName, setQueryArgByAbilityName] = useState<string>();
  const [queryArgByEggGroupName, setQueryArgByEggGroupName] = useState<string>();

  const searchParams = useSearchParams()!;
  const queryParamByName = searchParams.get(`by${ SearchByKeys.name }`);
  const queryParamByTypeName = searchParams.get(`by${ SearchByKeys.typeName }`);
  const queryParamByAbilityName = searchParams.get(`by${ SearchByKeys.abilityName }`);
  const queryParamByEggGroupName = searchParams.get(`by${ SearchByKeys.eggGroupName }`);

  const onThumbnailClick = (character: PokemonResponseInterface): void => {
    console.log('SHOW CHARACTER CARD', character);
    // Here we can either navigate to a different URL or render a different component.
    // We choose the former.
    router.push(`/pokemon?${ SearchByKeys.name.toLowerCase() }=${ character.name }`);
  };

  const onAddClick = (): void => {
    console.log('ADD NEW CHARACTER');
    router.push('/upsert');
  };

  useEffect(() => {
    if (queryParamByName) {
      setQueryArgByName(queryParamByName);
    }

    if (queryParamByTypeName) {
      setQueryArgByTypeName(queryParamByTypeName);
    }

    if (queryParamByAbilityName) {
      setQueryArgByAbilityName(queryParamByAbilityName);
    }

    if (queryParamByEggGroupName) {
      setQueryArgByEggGroupName(queryParamByEggGroupName);
    }
  }, [
    queryParamByName,
    queryParamByTypeName,
    queryParamByAbilityName,
    queryParamByEggGroupName
  ]);

  return (
    <>
      <NavBar/>

      <main className="bg-black bg-opacity-50 mx-12 my-8 p-2 lg:p-8 rounded-md">
        <h1 className="font-bold mb-4">Pokedex</h1>
        <SearchBar onAddClick={ onAddClick }/>
        <CharacterList
          onThumbnailClick={ onThumbnailClick }
          queryArgByName={ queryArgByName }
          queryArgByTypeName={ queryArgByTypeName }
          queryArgByAbilityName={ queryArgByAbilityName }
          queryArgByEggGroupName={ queryArgByEggGroupName }
        />
      </main>
    </>
  );
}
