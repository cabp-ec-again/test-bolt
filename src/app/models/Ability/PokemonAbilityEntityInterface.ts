export interface PokemonAbilityEntityInterface {
  ability_id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  // pokemon_abilities PokemonAbility[]
  pokemon_abilities: unknown[];
}
