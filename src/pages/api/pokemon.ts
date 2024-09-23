import type { NextApiRequest, NextApiResponse } from 'next';
import { type PokemonEntityInterface } from '~/app/models/Pokemon/PokemonEntityInterface';
import pokemonREST from '~/app/requestHandlers/pokemonREST';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PokemonEntityInterface | PokemonEntityInterface[]>
) {
  let result;

  switch (req.method) {
    case 'POST':
      result = await pokemonREST.create(req);
      break;
    case 'GET':
      result = await pokemonREST.read(req);
      break;
    case 'PUT':
      result = await pokemonREST.update(req);
      break;
    case 'DELETE':
      result = await pokemonREST.delete(req);
      break;
    default: // 405
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${ req.method } Not Allowed`);
      break;
  }

  res.status(result.status).json(result.errors.length ? result.errors : result.data);
}
