import type { NextApiRequest, NextApiResponse } from 'next';
import { HttpVerbsEnum } from '~/app/enums/HttpVerbsEnum';
import { RequestErrorJsonInterface } from '~/app/errors/RequestError';
import fs from 'fs';
import path from 'path';
import { ImageResponse } from 'next/og';

export interface IdImagePairInterface {
  id: number;
  image: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown | RequestErrorJsonInterface>
) {
  let ok = false;

  if (req.method !== HttpVerbsEnum.POST) {
    res.setHeader('Allow', [HttpVerbsEnum.POST]);
    res.status(405).json({ ok, message: `Method ${ req.method } Not Allowed` });
  }

  // Parsing the body string didn't work; thus, I had to figure out
  // a way to get the ID and the base64 string then save such a string
  // as an image.
  const base64Key = 'base64,';
  const base64Index = req.body.indexOf(base64Key);
  const idString = req.body.substring(0, base64Index);
  const idMatches = idString.match(/(\d+)/);
  const type = idString.split(';')[0].split('/')[1];
  const data = req.body.substring(base64Index + base64Key.length, req.body.length - 3);

  try {
    const uploadPath = path.join('public', 'img', 'pokemons', `${ idMatches[0] }.${ type }`);
    fs.writeFileSync(uploadPath, Buffer.from(data, 'base64'));
    ok = true;
  } catch (err) {
    console.error(err);
  }

  res.status(ok ? 200 : 500).json({ ok });
}
