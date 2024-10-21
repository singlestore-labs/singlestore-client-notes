# SingleStore Notes

A simple base application demonstrating how to use [`@singlestore/client`](https://www.npmjs.com/package/@singlestore/client) in a Next.js project.
It shows how to perform CRUD operations and create chat completions using [`@singlestore/ai`](https://www.npmjs.com/package/@singlestore/ai).

## Getting Started

1. Create a `.env.local` file based on the `.env.example` file.
2. Install the dependencies by running `npm install`.
3. Build the app by running `npm run build`.
4. Start the app by running `npm run start`.
5. Open [`http://localhost:3000`](http://localhost:3000) in your browser to view the app.

### Free Tier Setup

1. Download an SSL certificate using this [link](https://portal.singlestore.com/static/ca/singlestore_bundle.pem).
2. Place the SSL certificate in the root directory of the project.
3. Set the value of the `IS_FREE_TIER` variable to `1` in the `.env.local` file.
