// Vercel serverless entry — re-exports the Express app from /server.js.
// All /api/* requests are rewritten here via vercel.json.
export { default } from '../server.js';
