import pokemonCreateRequestHandler from '~/app/requestHandlers/pokemon/pokemonCreateRequestHandler';
import pokemonReadRequestHandler from '~/app/requestHandlers/pokemon/pokemonReadRequestHandler';
import pokemonUpdateRequestHandler from '~/app/requestHandlers/pokemon/pokemonUpdateRequestHandler';
import pokemonDeleteRequestHandler from '~/app/requestHandlers/pokemon/pokemonDeleteRequestHandler';

const pokemonREST = {
  create: pokemonCreateRequestHandler,
  read: pokemonReadRequestHandler,
  update: pokemonUpdateRequestHandler,
  delete: pokemonDeleteRequestHandler
};

export default pokemonREST;
