import crypto from "crypto";

export class CodeChallenge {
  private static instance: CodeChallenge | null = null;

  static getInstance(): CodeChallenge {
    if (!CodeChallenge.instance) {
      CodeChallenge.instance = new CodeChallenge();
    }
    return CodeChallenge.instance;
  }

  public verifier: string;
  public challenge: string;

  constructor() {
    const length = 43;
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    const bytes = crypto.randomBytes(length);
    const code = [];

    for (let i = 0; i < bytes.length; i++) {
      code.push(chars[bytes[i] % chars.length]);
    }

    this.verifier = code.join("");
    this.challenge = this.generateCodeChallenge(this.verifier);
  }

  private generateCodeChallenge(codeVerifier: string): string {
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
