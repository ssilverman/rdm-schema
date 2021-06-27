import { promises as fs } from 'fs';
import { Validator } from '@cfworker/json-schema';
import * as path from "path"
// const path = require("path");
// const JsonSchema = require("@cfworker/json-schema");
//import RdmSchema from "./rdm-schema.json"
//const { RdmSchema } = JSON.parse(fs.readFile('./rdm-schema.json'));

async function validate(validator, filename) {
  // JsonSchema.setShouldMetaValidate(true);
  // JsonSchema.setMetaOutputFormat(JsonSchema.VERBOSE);

  // Fetch from file
  const fileContent = await fs.readFile(path.resolve() + filename)
  console.log("Checking file " + path.resolve() + filename);
  console.log("Contents:");
  console.log(JSON.parse(fileContent.toString()));
  // const output = validator.validate(JSON.parse(fileContent.toString()))
  // const output = await JsonSchema.validate(schema, "file://" + filename, JsonSchema.VERBOSE);
  //  console.log(output);
  /*if (output.valid) {
    console.log("File " + filename + " is valid :-)");
  } else {
    console.log("File " + filename + " is invalid :-(", output.errors); process.exitCode = 1
  }*/
}

//From https://gist.github.com/lovasoa/8691344#file-node-walk-es6
async function* walk(dir) {
  for await (const d of await fs.opendir(path.resolve() + dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}

async function validateAllFiles(validator, exampleDir) {
  for await (const file of walk(exampleDir)) {
    if (/\.json$/.test(file)) {
      await validate(validator, file);
    }
  }
}

(async function() {
  console.log("Loading schema");
  const { RdmSchema } = JSON.parse(await fs.readFile(path.resolve() + "/rdm-schema.json"));
  console.log("Got schema:");
  console.log(RdmSchema);

  console.log("Prepping validator");
  const validator = new Validator(RdmSchema, '2019-09');
  // validator.addSchema("https://json-schema.org/draft/2019-09/schema")
  
  console.log("Validating single file");
  validate(validator, "/examples/e1.20/BOOT_SOFTWARE_VERSION_ID.json");
  // console.log("Validating all examples");
  // validateAllFiles(validator, "/examples/");
    })();
