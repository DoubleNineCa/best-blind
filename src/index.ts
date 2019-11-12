import "reflect-metadata";

import typeormConnection from "./typeormConnection";
import app from "./app";

const main = async () => {
    const typeormConn = await typeormConnection();
    if (typeormConn) {
        typeormConn.runMigrations();
    }

    const port = process.env.PORT || 4000;
    app.listen({ port }, () =>
        console.log(`🚀 Server ready at http://localhost:4000/graphql`)
    );
};

main().catch(err => console.log(err));
