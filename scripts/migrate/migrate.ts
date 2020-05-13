import { readdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";
import commander from "commander";
import colors from "colors/safe";
import Firebase from "firebase-admin";
import { Migration, RunFn } from "./types";
import "reflect-metadata";

const ACCOUNT_CREDENTIALS_PATH = "accountCredentials";
commander
  .option(
    "-a, --" + ACCOUNT_CREDENTIALS_PATH + " <path>",
    "Google Cloud account credentials JSON file"
  )
  .parse(process.argv);

const accountCredentialsPath = commander[ACCOUNT_CREDENTIALS_PATH];
if (accountCredentialsPath && !existsSync(accountCredentialsPath)) {
  console.log(
    colors.bold(colors.red("Account credentials file does not exist: ")) +
      colors.bold(accountCredentialsPath)
  );
  commander.help();
  process.exit(1);
}

let firebase: Firebase.app.App;
try {
  const credentialsBuffer = readFileSync(accountCredentialsPath);
  const credentials = JSON.parse(credentialsBuffer.toString());
  firebase = Firebase.initializeApp(
    {
      credential: Firebase.credential.cert(credentials)
    },
    accountCredentialsPath
  );
} catch (err) {
  console.log(
    colors.bold(colors.red("Unable to read: ")) +
      colors.bold(accountCredentialsPath) +
      " - " +
      err
  );
  process.exit(1);
}

function getAllMigrations(): Migration[] {
  const extensionRegexp = /\.(?:t|j)s$/;

  try {
    const migrationsPath = join(__dirname, "migrations");
    const filenames = readdirSync(migrationsPath);

    return filenames
      .filter(name => extensionRegexp.test(name))
      .sort()
      .map(name => {
        const run: RunFn = require(join(migrationsPath, name)).default;
        const id = name.replace(extensionRegexp, "");
        return {
          id,
          run
        };
      });
  } catch (err) {
    colors.bold(colors.red("Error reading migrations"));
    console.error(err);
    process.exit(1);
  }
}

async function runAllMigrations(db: Firebase.firestore.Firestore) {
  const migrations = getAllMigrations();

  for (let migration of migrations) {
    const ref = db.collection("_migrations").doc(migration.id);
    const doc = await ref.get();
    if (doc.exists) {
      console.log(
        `Migration ${colors.bold(migration.id)} already run, skipping.`
      );
      continue;
    }

    console.log(`Running migration ${colors.bold(migration.id)}...`);
    await migration.run(db);
    await ref.set({
      created_at: Date.now()
    });
    console.log(
      `Migration ${colors.bold(migration.id)}: ${colors.bold(
        colors.green("OK")
      )}.`
    );
  }
}

runAllMigrations(firebase.firestore())
  .then(() => console.log(colors.bold(colors.green("All done."))))
  .catch(err => {
    console.log(colors.bold(colors.red("Error running migrations: ")));
    console.error(err);
  });

process.on("uncaughtException", error => {
  console.error(error);
  process.exit(1);
});
