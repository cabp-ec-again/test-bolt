import type { NextApiRequest, NextApiResponse } from 'next';
import { HttpVerbsEnum } from '~/app/enums/HttpVerbsEnum';
import { RequestErrorJsonInterface } from '~/app/errors/RequestError';
import fs from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown | RequestErrorJsonInterface>
) {
  let ok = false;

  if (req.method !== HttpVerbsEnum.GET) {
    res.setHeader('Allow', [HttpVerbsEnum.GET]);
    res.status(405).json({ ok, message: `Method ${ req.method } Not Allowed` });
  }

  const uploadPath = path.join('public', 'img', 'pokemons', `${ req.query.poke }.png`);

  fs.readFile(uploadPath, function (err, data) {
    if (err) {
      throw err;
    } // Fail if the file can't be read.

    res.status(200).end(Buffer.from(data, 'binary').toString('base64'));
  });

  // res.status(200).end('');
}
