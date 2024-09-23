export interface PokemonCreateBodyInterface {
  pokemon_id?: number;
  name: string;
  number: number;
  description: string;
  evolution_description: string;
  height: number;
  weight: number;
  gender_ratio_male: number;
  gender_ratio_female: number;
  abilities: number[];
  groups: number[];
  types: number[];
  evolution?: number;
}
