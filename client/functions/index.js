const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

// Business logic for named tasks. Function name should match worker field on task document.
const workers = {
  sendEmail: (options) => sendEmail(options),
};

const sendEmail = (options) => {
  return;
};

exports.taskRunner = functions
  .runWith({ memory: "1GB" })
  .pubsub.schedule("every 24 hours")
  .onRun(async (context) => {
    // Consistent timestamp
    const now = admin.firestore.Timestamp.now();
    // Query all documents ready to perform
    const query = db
      .collection("emailTasks")
      .where("performAt", "<=", now)
      .where("isExecuted", "==", false);
    const tasks = await query.get();

    // Jobs to execute concurrently.
    const jobs = [];
    // Loop over documents and push job.
    tasks.forEach((snapshot) => {
      const { worker, options } = snapshot.data();
      const job = workers[worker](options)
        // Update doc with status on success or error
        .then(() => snapshot.ref.update({ isExecuted: true }))
        .catch((err) => snapshot.ref.update({ hasErrored: true }));
      jobs.push(job);
    });

    // Execute all jobs concurrently
    return await Promise.all(jobs);
  });
