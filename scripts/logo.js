import figlet from "figlet";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const { version: pkgVersion } = require("../package.json");
const version = pkgVersion || "1.0.0";

const name = `DLRT - v${version}`;

try {
  const logo = figlet.textSync(name, {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  });

  console.log(logo);
} catch (err) {
  console.error("Install all dependencies and try again.");
  console.error(err);
}