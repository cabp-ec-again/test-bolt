import type { NextApiRequest } from 'next';
import { type HandlerOutputInterface } from '~/app/requestHandlers/HandlerOutputInterface';
import { type PokemonAbilityEntityInterface } from '~/app/models/PokemonAbility/PokemonAbilityEntityInterface';
import { type PokemonGroupEntityInterface } from '~/app/models/PokemonGroup/PokemonGroupEntityInterface';
import { type PokemonTypeEntityInterface } from '~/app/models/PokemonType/PokemonTypeEntityInterface';
import { type PokemonEntityInterface } from '~/app/models/Pokemon/PokemonEntityInterface';
import PrismaCli from '~/app/clients/PrismaCli';

export default async function pokemonReadRequestHandler(
  req: NextApiRequest
): Promise<HandlerOutputInterface<PokemonEntityInterface | PokemonEntityInterface[]>> {
  const { name, random, limit } = req.query;
  const prisma = PrismaCli();
  let data;

  if (name) { // Get one
    data = [await prisma.pokemon.findFirst({
      where: { name },
      include: {
        pokemon_abilities: true,
        pokemon_groups: true,
        pokemon_types: true
      }
    })];
  } else if (random) { // Get one randomly
    const randRecordIds = await prisma.$queryRaw`SELECT pokemon_id
                                                 FROM pokemons
                                                 ORDER BY RANDOM()
                                                 LIMIT ${ Number(limit) }`;

    data = [await prisma.pokemon.findUnique({
      where: { pokemon_id: randRecordIds[0].pokemon_id },
      include: {
        pokemon_abilities: true,
        pokemon_groups: true,
        pokemon_types: true
      }
    })];
  } else { // Get all
    data = await prisma.pokemon.findMany({
      include: {
        pokemon_abilities: true,
        pokemon_groups: true,
        pokemon_types: true
      }
    });
  }

  // We're selecting several different records,
  // therefore we use a blocking loop here...
  for (let i = 0; i < data.length; i++) {
    const pokemon = data[i];

    // Abilities
    data[i].pokemon_abilities = await prisma.ability.findMany({
      select: { ability_id: true, name: true, description: true },
      where: {
        ability_id: {
          in: pokemon.pokemon_abilities.map((ability: PokemonAbilityEntityInterface) => ability.ability_id)
        }
      }
    });

    // Egg Groups
    data[i].pokemon_groups = await prisma.eggGroup.findMany({
      select: { egg_group_id: true, name: true, description: true },
      where: {
        egg_group_id: {
          in: pokemon.pokemon_groups.map((group: PokemonGroupEntityInterface) => group.egg_group_id)
        }
      }
    });

    // Types
    data[i].pokemon_types = await prisma.pokeType.findMany({
      select: { poketype_id: true, poketype_name: true, poketype_description: true },
      where: {
        poketype_id: {
          in: pokemon.pokemon_types.map((type: PokemonTypeEntityInterface) => type.poketype_id)
        }
      }
    });
  }

  return {
    status: !data || data.length === 0 ? 404 : 200,
    data: (name || random) ? data[0] : data,
    errors: []
  };
}
