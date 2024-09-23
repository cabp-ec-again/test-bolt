import type { NextApiRequest } from 'next';
import { HandlerOutputInterface } from '~/app/requestHandlers/HandlerOutputInterface';
import { RequestError, RequestErrorJsonInterface } from '~/app/errors/RequestError';
import { PokemonEntityInterface } from '~/app/models/Pokemon/PokemonEntityInterface';
import { PokemonAbilityEntityInterface } from '~/app/models/PokemonAbility/PokemonAbilityEntityInterface';
import { PokemonGroupEntityInterface } from '~/app/models/PokemonGroup/PokemonGroupEntityInterface';
import { PokemonTypeEntityInterface } from '~/app/models/PokemonType/PokemonTypeEntityInterface';
import PrismaCli from '~/app/clients/PrismaCli';

export default async function pokemonDeleteRequestHandler(
  req: NextApiRequest
): Promise<HandlerOutputInterface<PokemonEntityInterface>> {
  const id: number = req.body.id;
  const errors: RequestErrorJsonInterface[] = [];
  const prisma = PrismaCli();
  const where = { pokemon_id: id };

  // 1. TODO: validate data in a thorough fashion (i.e. all fields)
  // TODO: encapsulate validations in a separate function/class/object
  // e.g. Validate minimum name length
  if (!id) {
    errors.push(new RequestError('Entity ID not provided.'));
  }

  if (errors.length) {
    return {
      status: errors[0].status,
      data: null,
      errors
    };
  }

  // 2. Check if entity already exists
  const pokemonModel = await prisma.pokemon.findUnique({
    where,
    include: {
      pokemon_abilities: true,
      pokemon_groups: true,
      pokemon_types: true
    }
  }) as PokemonEntityInterface;

  if (!pokemonModel) {
    return {
      status: 404,
      data: null,
      errors: [(new RequestError('Entity does not exist', 404)).json]
    };
  }

  // TODO: identify why cascade operations are not working
  // 3. Delete Abilities
  await prisma.pokemonAbility.deleteMany({
    where: {
      ability_id: {
        in: pokemonModel.pokemon_abilities?.map((ability: PokemonAbilityEntityInterface) => ability.ability_id)
      }
    }
  });

  // 4. Delete Egg Groups
  await prisma.pokemonGroup.deleteMany({
    where: {
      egg_group_id: {
        in: pokemonModel.pokemon_groups?.map((group: PokemonGroupEntityInterface) => group.egg_group_id)
      }
    }
  });

  // 5. Delete Types
  await prisma.pokemonType.deleteMany({
    where: {
      poketype_id: {
        in: pokemonModel.pokemon_types?.map((type: PokemonTypeEntityInterface) => type.poketype_id)
      }
    }
  });

  // 6. Delete the resource
  await prisma.pokemon.delete({ where });

  await prisma.$disconnect();

  return {
    status: 200,
    data: { success: true },
    errors
  };
}
