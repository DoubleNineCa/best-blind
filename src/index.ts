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
        console.log(`🚀 Server ready at https://whispering-journey-64794.herokuapp.com:${port}/graphql`)
    );
};

main().catch(err => console.log(err));
