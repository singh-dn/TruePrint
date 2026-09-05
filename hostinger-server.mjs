import { startProdServer } from "vinext/server/prod-server";

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";

console.log(`[Hostinger] Starting TruePrint on ${host}:${port}`);

await startProdServer({
  port,
  host,
  outDir: "dist",
});