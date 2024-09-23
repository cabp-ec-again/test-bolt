import { PokemonAbilityEntityInterface } from '~/app/models/PokemonAbility/PokemonAbilityEntityInterface';
import { PokemonGroupEntityInterface } from '~/app/models/PokemonGroup/PokemonGroupEntityInterface';

export interface PokemonEntityInterface {
  pokemon_id?: number;
  name: string;
  number: number;
  description: string;
  evolution_description: string;
  height: number;
  weight: number;
  gender_ratio_male: number;
  gender_ratio_female: number;
  evolution?: number;
  created_at?: Date;
  updated_at?: Date;
  // pokemon_abilities   PokemonAbility[]
  pokemon_abilities?: PokemonAbilityEntityInterface[];
  // pokemon_groups      PokemonGroup[]
  pokemon_groups?: PokemonGroupEntityInterface[];
  // pokemon_types       PokemonType[]
  pokemon_types?: unknown[];
}
