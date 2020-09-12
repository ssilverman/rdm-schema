const JsonSchema = require("@hyperjump/json-schema");

async function validate() {
  // Fetch from file
  const schema = await JsonSchema.get("file:///home/runner/work/rdm-schema/rdm-schema/rdm-schema.json");

  JsonSchema.setShouldMetaValidate(true);
  JsonSchema.setMetaOutputFormat(JsonSchema.VERBOSE);

  const output = await JsonSchema.validate(schema, "file:///home/runner/work/rdm-schema/rdm-schema/rdm-schema/examples/e1.20/DEVICE_INFO.json", JsonSchema.VERBOSE);
  console.log(output);
  if (output.valid) {
    console.log("File is valid :-)");
  } else {
    console.log("File is invalid :-(");
    process.exitCode = 1
  }
}

validate();
