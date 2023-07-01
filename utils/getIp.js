const os = require("os");

function replaceLocalhostWithIpAddress(url) {
  const ipAddress = Object.values(os.networkInterfaces())
    .flat()
    .filter((details) => details.family === "IPv4" && !details.internal)
    .map((details) => details.address)[0];
  return url.replace("localhost", ipAddress);
}

module.exports = replaceLocalhostWithIpAddress;
