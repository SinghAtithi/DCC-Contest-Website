const ImageKit = require("imagekit");
const uuid = require("uuid");

async function imageKitController(req, res) {
  try {
    var imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: "https://ik.imagekit.io/pqymxdgbi/",
    });

    const token = req.query.t || uuid.v4();
    console.log(token);
    const expiration =
      req.query.expire || parseInt(Date.now() / 1000) + 60 * 10; // Default expiration in 10 mins

    const signatureObj = imagekit.getAuthenticationParameters(
      token,
      expiration
    );

    console.log(signatureObj);
    res.status(200).send(signatureObj);
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

module.exports = imageKitController;
