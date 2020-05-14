const tools = require("simple-svg-tools");
const path = require("path");

// let svgs = {};

tools
  .ImportDir(path.join(__dirname, "../src/assets/images/icons"), {includeSubDirs: false})
  .then(collection => {
    // collection.forEach((svg, name) => {
    //   svgs[name] = svg.getBody();
    // });
    tools
      .ExportJSON(
        collection,
        path.join(__dirname, "../src/assets/images/icons/icons.json")
      )
      .then(json => {
        console.log("Exported collection. JSON data: " + JSON.stringify(json));
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });
