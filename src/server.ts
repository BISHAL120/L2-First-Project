import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import {Server} from 'http'


let server : Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`🤧🤧 unhandledRejection is Detected,,  Shutting Down  ...`);
  if(server){
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1);
});

process.on('uncaughtException', ()=> {
  console.log(`🤧🤧 uncaughtException is Detected,,  Shutting Down  ...`);
  process.exit(1);
});
