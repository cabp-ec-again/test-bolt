import { type Ability, type EggGroup, type PokeType } from '@prisma/client';

export interface PokemonResponseInterface {
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
  pokemon_abilities?: Ability[];
  // pokemon_groups      PokemonGroup[]
  pokemon_groups?: EggGroup[];
  // pokemon_types       PokemonType[]
  pokemon_types?: PokeType[];
}
