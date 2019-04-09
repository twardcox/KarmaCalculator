const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

function Crypt(key) {
    key = crypto.createHash('sha256').update(key).digest('base64').substr(0, 32);
    this.encrypt = (text) => {
        const iv = crypto.randomBytes(16);
        let cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: iv.toString('hex'), data: encrypted.toString('hex') };
       }

    this.decrypt = (text) => {
        let iv = Buffer.from(text.iv, 'hex');
        let encryptedText = Buffer.from(text.data, 'hex');
        let decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
       }
}

module.exports = (key) => new Crypt(key);
