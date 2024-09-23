import useSWR from 'swr';
import { PokemonResponseInterface } from '~/app/models/Pokemon/PokemonResponseInterface';
import { dataFetcher } from '~/app/api/dataFetcher/dataFetcher';
import CharacterThumbnail from '~/components/molecules/CharacterThumbnail';
import PokeLoader from '~/components/atoms/PokeLoader';
import apiEndpoints from '~/app/static/apiEndpoints';

export interface CharacterListProps {
  onThumbnailClick: (character: PokemonResponseInterface) => void;
  queryArgByName?: string;
  queryArgByTypeName?: string;
  queryArgByAbilityName?: string;
  queryArgByEggGroupName?: string;
}

export default function CharacterList({
                                        onThumbnailClick,
                                        queryArgByName,
                                        queryArgByTypeName,
                                        queryArgByAbilityName,
                                        queryArgByEggGroupName
                                      }: CharacterListProps) {
  const charactersResponse = useSWR(
    `${ apiEndpoints._baseURL }${ apiEndpoints.getAllPokemons }`,
    url => dataFetcher(url)
  );

  // console.log('Characters', charactersResponse.data);

  if (charactersResponse.isLoading) {
    return <PokeLoader/>;
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4 py-10">
        {
          charactersResponse.data.map((character, i) => (
            <CharacterThumbnail
              key={ `character_${ i }` }
              character={ character }
              onClick={ onThumbnailClick }
            />
          ))
        }
      </div>
    </>
  );
}
