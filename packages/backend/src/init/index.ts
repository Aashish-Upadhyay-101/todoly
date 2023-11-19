import { Mongodb } from './mongo';

export async function init() {
  const mongodb = new Mongodb();
  await mongodb.connect(process.env.DATABASE_URL || '');
}
