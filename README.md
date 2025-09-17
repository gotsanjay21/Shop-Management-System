# Project MER(N) -Stack

    This project create for demonstract the knowleadge about get react and express.js and connect database for sql server using axios api

## Code Snippet

`npm init`
`npx degit expressjs/express api -y`
`cd api && npm init -y`
`npm i express mysql2 sequelize dotenv cors helmet morgan zod express-validator jsonwebtoken bcrypt multer pino pino-pretty`
`npm i -D nodemon jest supertest `
`cross-env eslint prettier`

` get-service -name *mysql*`
`Restart-Service -Name MySQL80`
provisional-mern/
    api/
        src/
            config/ # env, db, logger
            middlewares/ # auth, errors, validate
            modules/
                users/
                    user.model.js
                    user.routes.js
                    user.controller.js
                    user.service.js
                    user.test.js
                <feature>/
            utils/
            app.js
            server.js
        package.json
        .env.example
        jest.config.js
        openapi.yaml
    web/
        src/
            app/
                routes.jsx
            components/
            pages/
                _layout.jsx
                Login.jsx
                Dashboard.jsx
                <Feature>List.jsx
                <Feature>Form.jsx
            lib/
            styles/
            main.jsx
        index.html
        package.json
        vite.config.js
        .env.example
    .github/workflows/
        ci.yml
    README.md

# Features:

Runs frontend on http://localhost:5173
Proxies /api → http://localhost:5000 (your Express server)
React plugin enabled (@vitejs/plugin-react)
Build output goes to /dist (can be served with Nginx)