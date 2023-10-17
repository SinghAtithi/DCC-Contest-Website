// const { transporter } = require("./transporter");

// function sendEmail(receiver, message) {
//     if (receiver && message) {
//         try {
//             const mailData = {
//                 from: `Developers and Coders Club <${process.env.EMAIL_USERNAME}>`,
//                 to: receiver,
//                 subject: message.subject,
//                 template: message.template,
//                 context: message.context,
//             };

//             transporter.sendMail(mailData, (err, info) => {
//                 if (err) console.log(err);
//                 else {
//                     console.log("Mail sent.");
//                 }
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     } else {
//         throw Error;
//     }

// }

// module.exports = { sendEmail }

const { createTransportor } = require("./transporter");

async function sendEmail(receiver, message) {
    return new Promise(async (resolve, reject) => {
        if (!receiver || !message) {
            reject(new Error("Missing receiver or message"));
            return;
        }

        const { transporter, email } = await createTransportor();

        const mailData = {
            from: `Developers and Coders Club <${email}>`,
            to: receiver,
            subject: message.subject,
            template: message.template,
            context: message.context,
        };

        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.error(err);
                reject(err); // Reject the Promise if there's an error
            } else {
                console.log("Mail sent.");
                resolve(true); // Resolve the Promise with true for success
            }
        });
    });
}

module.exports = { sendEmail };
