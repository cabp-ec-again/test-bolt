import { PokemonResponseInterface } from '~/app/models/Pokemon/PokemonResponseInterface';

export interface CharacterThumbnailProps {
  character: PokemonResponseInterface;
  onClick: (character: PokemonResponseInterface) => void;
  tiny?: boolean;
  key?: PropertyKey;
}
