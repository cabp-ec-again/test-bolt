import { CharacterThumbnailProps } from '~/components/molecules/CharacterThumbnail/CharacterThumbnailProps';
import Link from 'next/link';
import { SearchByKeys } from '~/app/enums/SearchByKeysEnum';

export default function CharacterThumbnail({ character, onClick, tiny = false }: CharacterThumbnailProps) {
  return (
    <div className="rounded bg-zinc-800 overflow-hidden text-center pb-2">
      <div onClick={ () => onClick(character) } className="cursor-pointer pt-3">
        <img alt={ character.name } src="https://placehold.co/144x135" className="inline-block pb-3"/>

        <p title={ character.name } className="text-xs">
          { character.number }
        </p>

        <p
          title={ character.name }
          className="block font-bold"
        >
          { character.name }
        </p>
      </div>

      <p>
        {
          character.pokemon_types?.map((type, index) => (
            <span key={ `type_${ index }` }>
              <Link
                href={ `/pokedex?by${ SearchByKeys.typeName }=${ type.poketype_name }` }
                className="block text-yellow-500 lg:text-xs py-1"
              >
                { type.poketype_name }
              </Link>
              { (index === character.pokemon_types?.length - 1) ? '' : ' / ' }
            </span>
          ))
        }
      </p>
    </div>
  );
}
