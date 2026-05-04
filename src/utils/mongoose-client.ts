import mongoose from "mongoose";
import dns from "dns";

const MONGO_URI = process.env.MONGO_URI!;
const MONGO_DB = process.env.MONGO_DB!;

type MongooseCache = {
  conn?: typeof mongoose;
  promise?: Promise<typeof mongoose>;
};

declare global {
  // eslint-disable-next-line no-var
  var __mongooseCache: MongooseCache | undefined;
}

const cache = globalThis.__mongooseCache ?? (globalThis.__mongooseCache = {});

// Isolated resolver using Google DNS — bypasses system DNS entirely
const resolver = new dns.Resolver();
resolver.setServers(["8.8.8.8", "8.8.4.4"]);

async function buildConnectionString(uri: string): Promise<string> {
  if (!uri.startsWith("mongodb+srv://")) return uri;

  const match = uri.match(/^mongodb\+srv:\/\/([^@]+)@([^/?]+)/);
  if (!match) return uri;

  const [, credentials, host] = match;

  const addresses = await new Promise<dns.SrvRecord[]>((resolve, reject) => {
    resolver.resolveSrv(`_mongodb._tcp.${host}`, (err, addrs) => {
      if (err) reject(err);
      else resolve(addrs);
    });
  });

  const hosts = addresses.map((a) => `${a.name}:${a.port}`).join(",");
  return `mongodb://${credentials}@${hosts}/?ssl=true&authSource=admin`;
}

export async function connectMongoose() {
  if (!MONGO_URI) throw new Error("Missing MONGO_URI");
  if (!MONGO_DB) throw new Error("Missing MONGO_DB");

  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = (async () => {
      const connectionString = await buildConnectionString(MONGO_URI);
      return mongoose.connect(connectionString, {
        bufferCommands: false,
        dbName: MONGO_DB,
      });
    })();
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
