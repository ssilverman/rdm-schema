const JsonSchema = require("@hyperjump/json-schema");

async function validate(filename) {
  // Fetch from file
  const schema = await JsonSchema.get("file:///home/runner/work/rdm-schema/rdm-schema/rdm-schema.json");

  JsonSchema.setShouldMetaValidate(true);
  JsonSchema.setMetaOutputFormat(JsonSchema.VERBOSE);

  const output = await JsonSchema.validate(schema, filename, JsonSchema.VERBOSE);
  console.log(output);
  if (output.valid) {
    console.log("File " + filename + " is valid :-)");
  } else {
    console.log("File " + filename + " is invalid :-(");
    process.exitCode = 1
  }
}

validate("file:///home/runner/work/rdm-schema/rdm-schema/rdm-schema/examples/e1.20/DEVICE_INFO.json");
validate("file:///home/runner/work/rdm-schema/rdm-schema/rdm-schema/examples/e1.20/IDENTIFY_DEVICE.json");
