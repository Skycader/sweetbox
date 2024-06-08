const replace = require("replace-in-file");
const init = (from, to, path) => {
  const options = {
    files: path,
    from: from,
    to: to,
  };

  try {
    const results = replace.sync(options);
    console.log("Replacement results:", results);
    // if (results)
  } catch (error) {
    console.error("❗Error occurred:", error);
  }
};

module.exports = init;
