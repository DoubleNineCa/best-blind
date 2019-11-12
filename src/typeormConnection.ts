import { createConnection, getConnectionOptions } from "typeorm";

export default async () => {
    const env = process.env.NODE_ENV;
    const config = await getConnectionOptions(env);
    return env === "production"
        ? createConnection({
            ...config,
            url: process.env.DATABASE_URL,
            name: "default"
        } as any)
        : createConnection({ ...config, name: "default" });
};
