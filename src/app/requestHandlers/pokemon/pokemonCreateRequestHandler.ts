import type { NextApiRequest } from 'next';
import { HandlerOutputInterface } from '~/app/requestHandlers/HandlerOutputInterface';
import { PokemonCreateBodyInterface } from '~/app/models/Pokemon/PokemonCreateBodyInterface';
import { RequestError, RequestErrorJsonInterface } from '~/app/errors/RequestError';
import { Pokemon } from '@prisma/client';
import PrismaCli from '~/app/clients/PrismaCli';

export default async function pokemonCreateRequestHandler(
  req: NextApiRequest
): Promise<HandlerOutputInterface<Pokemon>> {
  const requestBody = JSON.parse(req.body) as PokemonCreateBodyInterface;
  const errors: RequestErrorJsonInterface[] = [];
  const prisma = PrismaCli();

  // 1. TODO: validate data in a thorough fashion (i.e. all fields)
  // TODO: encapsulate validations in a separate function/class/object
  // e.g. Validate minimum name length
  if (requestBody.name.length < 3) {
    errors.push((new RequestError('Entity name must be at least 3 characters long.')).json);
  }

  if (errors.length) {
    return {
      status: errors[0].status ?? 400,
      data: null,
      errors
    };
  }

  // 2. Check if entity already exists
  const exists = Boolean(await prisma.pokemon.count({
    where: { name: requestBody.name }
  }));

  if (exists) {
    return {
      status: 409,
      data: null,
      errors: [(new RequestError('Entity already exists', 409)).json]
    };
  }

  // 3. Create the resource
  const pokemonModel = await prisma.pokemon.create({
    data: {
      name: requestBody.name,
      number: requestBody.number,
      description: requestBody.description,
      evolution_description: requestBody.evolution_description,
      height: requestBody.height,
      weight: requestBody.weight,
      gender_ratio_male: requestBody.gender_ratio_male,
      gender_ratio_female: requestBody.gender_ratio_female,
      evolution: requestBody.evolution ?? null
    }
  });

  let i;

  // Abilities
  for (i = 0; i < requestBody.abilities.length; i++) {
    await prisma.pokemonAbility.create({
      data: {
        ability_id: requestBody.abilities[i],
        pokemon_id: pokemonModel.pokemon_id
      }
    });
  }

  // Egg Groups
  for (i = 0; i < requestBody.groups.length; i++) {
    await prisma.pokemonGroup.create({
      data: {
        egg_group_id: requestBody.groups[i],
        pokemon_id: pokemonModel.pokemon_id
      }
    });
  }

  // Types
  for (i = 0; i < requestBody.types.length; i++) {
    await prisma.pokemonType.create({
      data: {
        poketype_id: requestBody.types[i],
        pokemon_id: pokemonModel.pokemon_id
      }
    });
  }

  await prisma.$disconnect();

  return {
    status: 200,
    data: pokemonModel,
    errors
  };
}
