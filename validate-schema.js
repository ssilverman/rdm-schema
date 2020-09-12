const JsonSchema = require("@hyperjump/json-schema");

// Example: Inline schema
const schemaJson = {
  "$schema": "https://json-schema.org/draft/2019-09/schema",
}
JsonSchema.add(schemaJson);
const schema = await JsonSchema.get("https://json-schema.org/draft/2019-09/schema");

// Example: Specify output format
const output = await JsonSchema.validate(schema, "foo", JsonSchema.VERBOSE);
console.log(output);
