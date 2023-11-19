import mongoose from 'mongoose';

export class Mongodb {
  public async connect(uri: string) {
    try {
      await mongoose.connect(uri);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  public async disconnect(uri: string) {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
}
