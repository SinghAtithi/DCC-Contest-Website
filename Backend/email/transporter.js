const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
const Email = require("../models/emails");

async function resetTime(email) {
    const currTime = new Date();
    if (!email.lastReset || currTime.getHours() !== email.lastReset.getHours()) {
        // Reset the counts for all emails
        await Email.updateMany({}, { count: 0, lastReset: currTime });
        console.log("Reset email counts successful")
    }
}
// To get email and app key from database
async function getEmailPassword() {
    const email = await Email.findOne().sort({ count: 1 }).exec();

    if (email.count >=10) {
        resetTime(email);
        return { email: "", password: "", status: false };
    }
    else {
        const count = email.count;
        email.count = count + 1;
        await email.save();

        resetTime(email);
        return { email: email.email_id, password: email.app_key, status: true };

    }
}

// To create Gmail Transporter
function createGmailTransporter(email, password) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
            user: email,
            pass: password,
        },
    });

    return transporter;
}

// To create outlook Transporter
function createOutlookTransporter(email, password) {
    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        auth: {
            user: email,
            pass: password
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    return transporter;
}

// To bind transporter
async function createTransportor() {
    let { email, password, status } = await getEmailPassword();

    if (!status) {
        email = process.env.EMAIL_USERNAME;
        password = process.env.EMAIL_PASSWORD;
    }

    console.log(email, password)
    var transporter;
    const domain = email.split('@')[1];

    if (domain.includes('outlook.com') || domain.includes('hotmail.com')) {
        transporter = createOutlookTransporter(email, password);
    } else {
        transporter = createGmailTransporter(email, password);
    }

    const options = {
        viewEngine: {
            extName: ".handlebars",
            partialsDir: path.resolve("./templates"),
            defaultLayout: false,
        },
        viewPath: path.resolve("./templates"),
        extName: ".handlebars",
    };

    transporter.use("compile", hbs(options));

    return { transporter: transporter, email: email };
}


// let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//     },
// });

// const options = {
//     viewEngine: {
//         extName: ".handlebars",
//         partialsDir: path.resolve("./templates"),
//         defaultLayout: false,
//     },
//     viewPath: path.resolve("./templates"),
//     extName: ".handlebars",
// };

// transporter.use("compile", hbs(options));

// module.exports = { createTransportor, transporter };
module.exports = { createTransportor };
