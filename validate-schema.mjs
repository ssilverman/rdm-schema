import { promises as fs } from 'fs';
import * as path from "path"
// const path = require("path");
// const JsonSchema = require("@cfworker/json-schema");
//import RdmSchema from "./rdm-schema.json"
const { RdmSchema } = require('./rdm-schema.json');
import { Validator } from '@cfworker/json-schema';

const validator = new Validator(RdmSchema);
// validator.addSchema("https://json-schema.org/draft/2019-09/schema")


async function validate(filename) {
  // JsonSchema.setShouldMetaValidate(true);
  // JsonSchema.setMetaOutputFormat(JsonSchema.VERBOSE);

  // Fetch from file
  const fileContent = await fs.readFile(path.resolve() + filename)
  const output = validator.validate(JSON.parse(fileContent.toString()))
  // const output = await JsonSchema.validate(schema, "file://" + filename, JsonSchema.VERBOSE);
  //  console.log(output);
  if (output.valid) {
    console.log("File " + filename + " is valid :-)");
  } else {
    console.log("File " + filename + " is invalid :-(", output.errors); process.exitCode = 1
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

validate("/examples/e1.20/BOOT_SOFTWARE_VERSION_ID.json");
validateAllFiles(__dirname + "/examples/");
