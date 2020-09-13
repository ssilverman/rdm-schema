const fs = require("fs");
const path = require("path");
const JsonSchema = require("@hyperjump/json-schema");

async function validate(filename) {
  // Fetch from file
  const schema = await JsonSchema.get("file:///home/runner/work/rdm-schema/rdm-schema/rdm-schema.json");

  JsonSchema.setShouldMetaValidate(true);
  JsonSchema.setMetaOutputFormat(JsonSchema.VERBOSE);
  
  const output = await JsonSchema.validate(schema, "file://" + filename, JsonSchema.VERBOSE);
  console.log(output);
  if (output.valid) {
    console.log("File " + filename + " is valid :-)");
  } else {
    console.log("File " + filename + " is invalid :-(");    process.exitCode = 1
  }
}

//From https://gist.github.com/lovasoa/8691344#file-node-walk-es6
async function* walk(dir) {
    for await (const d of await fs.promises.opendir(dir)) {
        const entry = path.join(dir, d.name);
        if (d.isDirectory()) yield* walk(entry);
        else if (d.isFile()) yield entry;
    }
}

async function validateAllFiles(exampleDir) {
  for await (const file of walk(exampleDir)) {
    if (/\.json$/.test(file)) {
      await validate(file);
    }
  }
}

validateAllFiles("/home/runner/work/rdm-schema/rdm-schema/examples/");
