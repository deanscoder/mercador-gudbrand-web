require('dotenv').config()
if(process.env.MAINTENANCE_MODE === "1"){
  module.exports = {
    redirects() {
      return [
        process.env.MAINTENANCE_MODE === "1"
          ? { source: "/((?!soon).*)", destination: "/soon.html", permanent: false }
          : null,
      ].filter(Boolean);
    },
    env: {
      // Reference a variable that was defined in the .env file and make it available at Build Time
      TEST_VAR: process.env.TEST_VAR,
    },
  }
} else {
  module.exports = {
    env: {
      // Reference a variable that was defined in the .env file and make it available at Build Time
      TEST_VAR: process.env.TEST_VAR,
    },
  }
}