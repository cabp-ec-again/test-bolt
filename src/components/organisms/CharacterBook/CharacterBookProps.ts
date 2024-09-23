import { PokemonResponseInterface } from '~/app/models/Pokemon/PokemonResponseInterface';

export interface CharacterBookProps {
  character: PokemonResponseInterface;
  onSearchClick: () => void;
}
