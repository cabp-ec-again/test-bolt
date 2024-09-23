import type { NextApiRequest } from 'next';
import { HandlerOutputInterface } from '~/app/requestHandlers/HandlerOutputInterface';
import { PokemonCreateBodyInterface } from '~/app/models/Pokemon/PokemonCreateBodyInterface';
import { RequestError, RequestErrorJsonInterface } from '~/app/errors/RequestError';
import { PokemonEntityInterface } from '~/app/models/Pokemon/PokemonEntityInterface';
import PrismaCli from '~/app/clients/PrismaCli';

export default async function pokemonUpdateRequestHandler(
  req: NextApiRequest
): Promise<HandlerOutputInterface<PokemonEntityInterface>> {
  const requestBody = req.body as PokemonCreateBodyInterface;
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
      status: errors[0].status,
      data: null,
      errors
    };
  }

  // 2. Check if entity already exists
  const exists = Boolean(await prisma.pokemon.count({
    where: { pokemon_id: requestBody.pokemon_id }
  }));

  if (!exists) {
    return {
      status: 404,
      data: null,
      errors: [(new RequestError('Can\t update, entity does not exist', 404)).json]
    };
  }

  const pokemonModel = await prisma.pokemon.update({
    where: { pokemon_id: requestBody.pokemon_id },
    data: requestBody
  }) as PokemonEntityInterface;

  await prisma.$disconnect();

  return {
    status: 200,
    data: pokemonModel,
    errors
  };
}
