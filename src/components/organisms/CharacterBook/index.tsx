import { CharacterBookProps } from '~/components/organisms/CharacterBook/CharacterBookProps';
import Link from 'next/link';
// import dynamic from 'next/dynamic';

export default function CharacterBook({ character, onSearchClick }: CharacterBookProps) {
  // const characterImage = dynamic(() => import(`/public/img/pokemons/${ character.pokemon_id }.png`));
  // console.log('characterImage', characterImage);

  return (
    <div className="character-book flex mx-auto text-black">
      <div className="basis-1/2 pt-28">
        <div className="flex flex-col items-center justify-center pt-12 px-16 text-xs">
          <div className="w-full">
            <div className="flex flex-row justify-between">
              <h1 className="font-bold">{ character.name }</h1>
              <span>No. { character.number }</span>
            </div>

            { character.pokemon_types?.map((type, index) => (<p key={ `type_${ index }` }>{ type.poketype_name }</p>)) }
            <p className="py-1">{ character.description }</p>
            { character.pokemon_types?.map((type, index) => (<p key={ `type_${ index }` }>{ type.poketype_name }</p>)) }

            <div className="flex flex-row justify-between text-center mt-1">
              <p><span className="font-bold">Height</span><br/>{ character.height }</p>
              <p><span className="font-bold">Weight</span><br/>{ character.weight }</p>
            </div>
          </div>
        </div>

        <div className="mt-44 ms-24">
          <button
            type="button"
            onClick={ onSearchClick }
            className="text-black text-sm"
          >
            Search
          </button>
        </div>
      </div>

      <div className="basis-1/2 pt-28">
        <div className="flex flex-col items-center justify-center pt-12 ps-4">
          <img
            alt={ character.name }
            src={ `/public/img/pokemons/${ character.pokemon_id }.png` }
            className={ `w-52 mt-3` }
          />
        </div>

        <div className="mt-16 ms-24 text-sm">
          <Link href={ `/pokedex?pokemon=${ character.name }` }>
            View More
          </Link>
        </div>
      </div>
    </div>
  );
}
