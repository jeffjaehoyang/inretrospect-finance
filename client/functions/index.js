const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const MailGen = require("mailgen");
const sgMail = require("@sendgrid/mail");

// Business logic for named tasks. Function name should match worker field on task document.
const workers = {
  sendEmail: (options) => sendEmail(options),
};

const sendEmail = async (options) => {
  const mailGenerator = new MailGen({
    theme: "cerberus",
    product: {
      name: "inretrospect.finance",
      link: "https://www.inretrospect.finance",
      // logo: your app logo url
    },
  });

  const email = {
    body: {
      name: options.displayName,
      intro: "Your records were unlocked!",
      action: {
        instructions:
          "Click the link below to check out how your investments would have been doing by now - they are unlocked!",
        button: {
          color: "#1f2937",
          text: "Go Check",
          link: "https://www.inretrospect.finance/dashboard",
        },
      },
    },
  };

  const emailTemplate = mailGenerator.generate(email);
  const msg = {
    to: options.emailTo,
    from: "jho.yang96@gmail.com",
    subject: "Your records were unlocked! Time to look back in retrospect.",
    html: emailTemplate,
  };
  require("fs").writeFileSync("preview.html", emailTemplate, "utf8");

  try {
    sgMail.setApiKey(functions.config().sendGridAPI.key);
    await sgMail.send(msg);
  } catch (error) {
    throw new Error(error.message);
  }
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
