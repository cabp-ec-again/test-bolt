import Link from 'next/link';
import { type PokemonResponseInterface } from '~/app/models/Pokemon/PokemonResponseInterface';
import { SearchByKeys } from '~/app/enums/SearchByKeysEnum';
import { ArrowRightIcon } from '@heroicons/react/16/solid';
import CharacterProperty from '~/components/molecules/CharacterProperty';

export interface CharacterCardProps {
  character: PokemonResponseInterface;
  className?: string;
}

export default function CharacterCard({ character, className = '' }: CharacterCardProps) {
  return (
    <div className={ `rounded bg-zinc-800 px-8 py-6 ${ className }` }>
      <div className="flex flex-row justify-between">
        <h1 className="font-bold">{ character.name }</h1>
        <span className="text-xs pt-1">No { character.number }</span>
      </div>

      <p>
        {
          character.pokemon_types?.map((type, index) => (
            <span
              key={ `pokeTypeLink_${ index }` }
              className="text-xs"
            >
              <Link href={ `/pokedex?by${ SearchByKeys.typeName }=${ type.poketype_name }` } className="text-yellow-500">
                { type.poketype_name }
              </Link>
              { (index === character.pokemon_types!.length - 1) ? '' : ' / ' }
            </span>
          ))
        }
      </p>

      <p className="text-sm my-2">{ character.description }</p>

      <div className="flex flex-row justify-between">
        <CharacterProperty title="Height" value="10" className="basis-1/3 my-2"/>
        <CharacterProperty title="Weight" value="10" className="basis-1/3 my-2"/>
        <CharacterProperty title="Gender Ratio" className="basis-1/3 my-2">
          <div className="flex flex-row justify-between lg:pe-12">
            <p>{ character.gender_ratio_male }% <span className="icon icon-male bg-white"/></p>
            <p>{ character.gender_ratio_female }% <span className="icon icon-female bg-white"/></p>
          </div>
        </CharacterProperty>
      </div>

      <div className="flex flex-row justify-between">
        <CharacterProperty title="Abilities" className="basis-1/2">
          <div className="flex flex-row justify-between">
            <p>
              {
                character.pokemon_abilities?.map((ability, index) => (
                  <span key={ `abilityLink_${ index }` }>
                    <Link href={ `` } className="hover:text-green-400">{ ability.name }</Link>
                    { (index === character.pokemon_abilities!.length - 1) ? '' : ' / ' }
                  </span>
                ))
              }
            </p>
          </div>
        </CharacterProperty>

        <CharacterProperty title="Egg Groups" className="basis-1/2">
          <div className="flex flex-row justify-between">
            <p>
              {
                character.pokemon_groups?.map((group, index) => (
                  <span key={ `abilityLink_${ index }` }>
                    <Link href={ `` } className="hover:text-green-400">{ group.name }</Link>
                    { (index === character.pokemon_groups!.length - 1) ? '' : ' / ' }
                  </span>
                ))
              }
            </p>
          </div>
        </CharacterProperty>
      </div>

      <h6 className="font-bold mt-6 mb-1">Evolutions</h6>
      <p className="text-sm">{ character.evolution_description }</p>

      <div className="flex justify-between items-center mt-3">
        <img alt={ `${ character.name }'s evolutions` } src="https://placehold.co/144x135" className="w-36"/>
        <ArrowRightIcon aria-hidden="true" className="block h-20"/>
        <img alt={ `${ character.name }'s evolutions` } src="https://placehold.co/144x135" className="w-36"/>
      </div>
    </div>
  );
}
