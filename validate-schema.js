const JsonSchema = require("@hyperjump/json-schema");

// Example: Inline schema
const schemaJson = {
  "$schema": "https://json-schema.org/draft/2019-09/schema",
}
JsonSchema.add(schemaJson);
const schema = JsonSchema.get("https://json-schema.org/draft/2019-09/schema");

JsonSchema.setShouldMetaValidate(true);
JsonSchema.setMetaOutputFormat(JsonSchema.VERBOSE);

const output = JsonSchema.validate(schema, "foo", JsonSchema.VERBOSE);
console.log(output);
