import commander from "commander";
import { existsSync, readFileSync } from "fs";
import colors from "colors/safe";
import Firebase from "firebase-admin";
import { StepDTO } from "../../common/types/Step";
import { omit } from "lodash";

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

async function run(db: Firebase.firestore.Firestore) {
  const allSteps = await db.collection("steps").get();

  allSteps.forEach(doc => {
    const step = doc.data() as Pick<StepDTO, "videos">;

    const updatedVideos = step.videos.map(v =>
      omit(v, ["thumbnail_url", "snapshot_url"])
    );

    return doc.ref.set(
      {
        videos: updatedVideos,
        __t: Date.now()
      },
      { merge: true }
    );
  });
}

run(firebase.firestore())
  .then(() => console.log(colors.bold(colors.green("All done."))))
  .catch(err => {
    console.log(colors.bold(colors.red("Error running script: ")));
    console.error(err);
  });

process.on("uncaughtException", error => {
  console.error(error);
  process.exit(1);
});
