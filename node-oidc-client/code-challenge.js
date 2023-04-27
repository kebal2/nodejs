import crypto from "crypto";

class CodeChallenge {
  static instance = null;

  static getInstance() {
    if (!CodeChallenge.instance) {
      CodeChallenge.instance = new CodeChallenge();
    }
    return CodeChallenge.instance;
  }

  codeVerifier = null;
  codeChallenge = null;

  constructor() {
    const length = 43;
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    const bytes = crypto.randomBytes(length);
    const code = [];

    for (let i = 0; i < bytes.length; i++) {
      code.push(chars[bytes[i] % chars.length]);
    }

    this.codeVerifier = code.join("");
    this.codeChallenge = this.generateCodeChallenge(this.codeVerifier);
  }

  generateCodeChallenge(codeVerifier) {
    const digest = crypto
      .createHash("sha256")
      .update(codeVerifier)
      .digest("base64");
    const challenge = digest
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
    return challenge;
  }
}

export default CodeChallenge.getInstance();
