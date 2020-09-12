const fs = require("fs");
const path = require("path");
const JsonSchema = require("@hyperjump/json-schema");

// Fetch from file
const schema = JsonSchema.get("file:///home/runner/work/rdm-schema/rdm-schema/rdm-schema.json");

JsonSchema.setShouldMetaValidate(true);
JsonSchema.setMetaOutputFormat(JsonSchema.VERBOSE);

function validate(filename) {
  const output = JsonSchema.validate(schema, "file://" + filename, JsonSchema.VERBOSE);
  console.log(output);
  if (output.valid) {
    console.log("File " + filename + " is valid :-)");
  } else {
    console.log("File " + filename + " is invalid :-(");    process.exitCode = 1
  }
}

//From https://gist.github.com/kethinov/6658166#gistcomment-1921157
function walkSync(dir, filelist) {
  files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.lstatSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    } else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
}

function validateAllFiles(exampleDir) {
  walkSync(exampleDir)
    .filter((entry) => /\.json$/.test(entry))
    .forEach((entry) => {
      validate(entry)
    });
}

validateAllFiles("/home/runner/work/rdm-schema/rdm-schema/examples/");
