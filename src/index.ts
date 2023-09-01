import { startServer } from "./server";

async function main() {
  const app = await startServer();
  app.listen(
    {
      host: "0.0.0.0",
      port: 3000,
    },
    () => console.log("Server up")
  );
}

main();
