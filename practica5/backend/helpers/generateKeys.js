import crypto from "crypto"

function generateRSAKeys(keySize = 2048) {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair("rsa", {
      modulusLength: keySize,
      publicKeyEncoding: {
        type: "spki",
        format: "pem"
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem"
      }
    }, (err, publicKey, privateKey) => {
      if (err) {
        reject(err);
      } else {
        const base64PublicKey = Buffer.from(publicKey).toString("base64");
        const base64PrivateKey = Buffer.from(privateKey).toString("base64");

        const keys = {
          publicKey: base64PublicKey,
          privateKey: base64PrivateKey
        };

        resolve(keys);
      }
    });
  });
}

export default generateRSAKeys;
