/* eslint import/imports-first:0  import/newline-after-import:0 */
import express        from 'express';
import bluebird       from 'bluebird';
// import middlewares    from './middlewares.mjs';
import mainRoutes     from './router.mjs';


// Init app
const app = express();

// app.use(middlewares.json);
// app.use(middlewares.clsMiddleware);
// app.use(middlewares.urlencoded);
// app.use(middlewares.cors);
// app.use(middlewares.include);
app.use('/api/v1', mainRoutes);

let server = null;

export function start({ appPort }) {
    server = app.listen(appPort, () => {
        const { port, address } = server.address();

        global.REST_API_PORT = port; // For tests. TODO: export app and use it tests
        console.log(`[RestApiApp] STARTING AT PORT [${port}] ADDRESS [${address}]`);
    });

    server.closeAsync = bluebird.promisify(server.close);
}

export async function stop() {
    if (!server) return;
    console.log('[RestApiApp] Closing server');
    await server.closeAsync();
}

export default app;
