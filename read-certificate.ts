import { readFileSync } from "fs";
import { resolve } from "path";

export function readCertificate() {
  try {
    return readFileSync(resolve(process.cwd(), "singlestore_bundle.pem"));
  } catch (error) {
    return undefined;
  }
}
