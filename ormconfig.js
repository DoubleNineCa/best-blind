module.exports = [
    {
        name: "development",
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "",
        database: "bestblind",
        synchronize: false,
        logging: false,
        entities: ["src/entity/**/*.ts"],
        migrations: ["src/migration/**/*.ts"],
        subscribers: ["src/subscriber/**/*.ts"],
        cli: {
            entitiesDir: "src/entity",
            migrationsDir: "src/migration",
            subscribersDir: "src/subscriber"
        }
    },
    {
        name: "test",
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: ["src/entity/**/*.ts"],
        synchronize: true,
        logging: false
    },
    {
        name: "production",
        type: "postgres",
        synchronize: false,
        logging: false,
        entities: ["dist/entity/**/*.*"],
        migrations: ["dist/migration/**/*.*"],
        subscribers: ["dist/subscriber/**/*.*"]
    }
];
