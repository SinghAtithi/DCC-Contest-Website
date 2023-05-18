const ImageKit = require("imagekit");
const uuid = require("uuid");

async function imageKitController(req, res) {
  try {
    var imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: "https://ik.imagekit.io/pqymxdgbi/Code-DCC",
    });

    const token = req.query.t || uuid.v4();
    const expiration =
      req.query.expire || parseInt(Date.now() / 1000) + 60 * 10; // Default expiration in 10 mins

    const signatureObj = imagekit.getAuthenticationParameters(
      token,
      expiration
    );

    res.status(200).send(signatureObj);
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

module.exports = imageKitController;
