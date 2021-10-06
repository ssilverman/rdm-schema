# Changelog for the RDM Schema Project

This document details the changes between each release.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.36.0]

### Added
* Added a required `"manufacturer_id"` property to the parameter message. It's a
  16-bit value having a minimum of 1 and a maximum of 0x7FFF.
* Added a note to the `"bit/properties/reserved"` description clarifying that
  absent bits are assumed to be reserved.
* Added a "Notes on the examples" section to the README. There's currently one
  subsection: "Manufacturer ID".
* Added manufacturer ID 0x7FFF to all the ESTA examples. (See the README for a
  discussion of why it isn't zero or 0xFFFF, and why it exists in the examples
  at all.)

### Changed
* Changed `"reservedValue"` to `"valueIfReserved"` for consistency with
  `"bitFieldType/properties/valueForUnspecified"`.

## [0.35.0]

### Added
* "uint128" and "int128" integer types.

### Fixed
* Renamed DNS_IPV4_NAMESERVER example to DNS_IPV4_NAME_SERVER, per the
  E1.37-2 spec.
* Removed a nonexistent GET parameter from OUTPUT_RESPONSE_TIME_DESCRIPTION and
  MODULATION_FREQUENCY_DESCRIPTION examples.

## [0.34.0]

### Added
* Added a default prefix power of zero.
* Added command class labels to PARAMETER_DESCRIPTION.
* Subdevices in responses can now be specified. To support this, subdevices for
  responses were split into a new type and a new "match" value was added to the
  enum list.
* Subdevices were expanded to include ranges and specific values, where a
  "subdevice" is defined as a value in the range 0x0001-0xFFF0 (1-65520), in
  addition to the enum words.
* Added a "TODOs" section to the README.
* Added a section to the README explaining how missing properties, defaults, and
  the "default" keyword are related.
* For those properties having a defined "default" annotation, added a sentence
  to their description describing what their value should be assumed to be if
  the property is absent.

### Fixed
* Changed some unsigned fields to signed, in SENSOR_DEFINITION, SENSOR_VALUE,
  and STATUS_MESSAGES.

## [0.33.0]

### Added
* Added a version and "schemas" path section to the schema $id.
* Added an "Open questions" top-level section to the README.
* Added a "Best practices" top-level section to the README that describes how to
  avoid creating ill-defined messages. This replaces the list from the
  "Constraints and errors" section.

### Changed
* Capitalized titles in the schema.
* Updated the descriptions for the maximum byte lengths for strings and bytes.
  Added a sentence that suggests setting these values if the responder wishes
  for controllers to limit the number of bytes sent.

## [0.32.0]

### Added
* Added two sections to the "Design notes" section of the README. These replace
  the "Open questions" section. These are:
  1. Strings and string lengths
  2. Names and displayable strings
* Added "/$defs/commonPropertiesForNamed" to "refType".

### Changed
* Changed "name" to not be required for "/$defs/bit" and the root.
* Updated the descriptions for "name" and "displayName" in
  "/$defs/commonPropertiesForNamed" with some example uses.
* Improved string and character documentation in the README and the schema.

## [0.31.0]

### Added
* Added "minBytes" to "stringType" for the minimum encoded size in bytes. This
  adds symmetry.
* Reference to UTF-8 RFC in the README.
* Added that characters in strings are defined by JSON (RFC 8259) to the
  descriptions of "minLength" and "maxLength" in the string type.

### Changed
* "RDM E1.20" -> "ANSI E1.20-202x"
* Moved "unevaluatedProperties" from each of the types into the referencers of
  the parent "oneOfTypes".
* Replaced RFC "https://tools.ietf.org/html" links with
  "https://www.rfc-editor.org/rfc" links.
* Updated some descriptions in the schema to use Markdown-style links.

### Fixed
* SHIPPING_LOCK invalid "note" property changed to "notes".

## [0.30.0]

### Added
* Reference to RFC 3696 wherever RFC 1123 is mentioned.

### Changed
* IDN hostnames now refer to RFC 5890 instead of just Punycode.

## [0.29.0]

### Added
* New "Relation to other RDM types and structure" section under "Design notes"
  in the README. This discusses type mapping.
* New "References mentioned in the schema" section under "Resources" in the
  README. This adds all the links mentioned in the schema.
* README "Resources": Added the schema's canonical URL and a link to its
  main page.
* README "Usage notes": New "Constraints and errors" section that describes
  errors the schema doesn't catch.
* Added to the `"refType"` description that it is an error if the reference does
  not point to an object having one of the types in `#/$defs/oneOfTypes`, or if
  there is a circular reference. Updated the README to reflect this.
* README link to an online validator that can validate Draft 2019-09 schemas.

### Changed
* Updated some type descriptions to state that they map to "the intent of" an
  RDM type.
* Changed the schema's canonical URL to be "http://estalink.us/rdm-schema.json".

### Fixed
* The description for the list-of-fields schema in `"command"` is now "zero or
  more" instead of "one or more".

## [0.28.0]

### Added
* Alternative patterns for a hostname to the notes in DNS_HOSTNAME.
* New "Questions" section in the "Design notes" section of the README.

### Changed
* Added and updated titles and descriptions where appropriate.
* Using "$comment" values where appropriate.
* Renamed "unspecifiedValues" to "valueForUnspecified" in "bitFieldType" to
  remove ambiguity.
* Renamed those schemas that have a "Type" suffix, that aren't a "type" in the
  UI sense, to have no "Type" suffix. The suffix "Type" here doesn't mean "type"
  in the programming language sense. These include: "bit", "command",
  "labeledBoolean", "labeledInteger", "range", and "subdevices".

### Removed
* The "nameType" schema is now gone. Its functionality is contained in
  "commonPropertiesForNamed" and isn't needed elsewhere.

## [0.27.0]

This release inserts the original schema at the root of the branch; sorry to
have rebased everything, but I felt it was important to include the original
schema file.

Here's the articles I referenced:
* [Insert a commit before the root commit in Git?](https://stackoverflow.com/questions/645450/insert-a-commit-before-the-root-commit-in-git)
* [How to inject a commit between some two arbitrary commits in the past?](https://stackoverflow.com/questions/32315156/how-to-inject-a-commit-between-some-two-arbitrary-commits-in-the-past)

### Added
* Added a README.

### Changed
* Clarified that "minLength" and "maxLength" in "stringType" specify the length
  in characters.
* Changed CONTROLLER_FLAG_SUPPORT to use a bit field.
* Changed "labeledBooleanType" and "labeledIntegerType" to use properties from
  "commonPropertiesForNamed" instead of the custom "label" and "notes".

### Removed
* Removed "additionalItems" from all the "array" types because it turns out it's
  for array-valued "items" and not schema-valued "items".

### Fixed
* Fixed the pattern length in the TEST_DATA response. Also changed the
  field names.

## [0.26.0]

### Added
* Added a resource to INTERFACE_HARDWARE_ADDRESS_TYPE1.

### Changed
* Updated notes in DNS_HOSTNAME and DNS_DOMAIN_NAME to describe the actual
  intent of these messages, added some resource links, and added a pattern to
  DNS_HOSTNAME.

### Removed
* Removed "domain-name" from the "format" list in "stringType".

## [0.25.0]

### Added
* Added "maxBytes" to "stringType" for the maximum encoded size in bytes.
* Added a link for ECMA-262 to the "pattern" description in "stringType".
* Added a "restrictToASCII" flag for "stringType".

### Changed
* Updated the "format" description in "stringType": added that the formats from
  the JSON Schema Validation spec are valid and added URLs that describe the
  format for each of the format words.
* Updated examples that need to be restricted to ASCII with the new
  "restrictToASCII" flag.

### Removed
* Since "default" is just informative, and does not exist as a value if the
  associated property does not exist, removed it from "restrictToLabeled" in
  "integerType" and "reserved" in "bitType".

### Fixed
* Fixed the SET response in CLEAR_STATUS_ID to be empty.

## [0.24.0]

### Added
* Added E1.37-7 examples. These contain some "$ref" examples.
* Added sensor type labels to SENSOR_DEFINITION.
* Added "json" to the list in "format" for "stringType".
* Added E1.37-5 examples.

### Changed
* Updated all examples to have "get_subdevice_range" and "set_subdevice_range"
  to illustrate that "default" (at least in spec draft 2019-09) doesn't imply
  that the property exists.
* Changed "hour" in the REAL_TIME_CLOCK example to having a max. of 24 but
  leaving the "second" max. at 60.
* Updated the personality to be restricted to 1-255 in: DMX_PERSONALITY,
  DEVICE_INFO, and DMX_PERSONALITY_DESCRIPTION.

### Removed
* Removed "required" from "rangeType" and updated its description.

### Fixed
* Fixed the "required" field in "refType" to contain "$ref" and not "ref".

## [0.23.0]

### Added
* Added `"additionalItems": false` to all the arrays.

### Changed
* Factored out all the common properties for named objects
  into "commonPropertiesForNamed".
* Moved around, changed, and added "additionalProperties" and
  "unevaluatedProperties" where needed.
* Changed the title to "Parameter Message".
* Moved the "$defs" section to the bottom of the schema.
* Changed the property name "ref" in "refType" to "$ref".
* Changed "commandType" to accept a single type in addition to an array
  of types.
* Changed the "references" property in "commonPropertiesForNamed" to "resources"
  to help minimize confusion with "$ref".
* Changed all example "pid" values marked as '#undefined' to -1. Now they'll all
  at least parse, even if they don't validate.
* Updated all example labels to capitalize all words.
* Updated PACKED_PID_SUB and PACKED_PID_INDEX with notes and constraints.

### Fixed
* Fixed some example syntax errors: SENSOR_VALUE and FACTORY_DEFAULTS.

## [0.22.0]

### Added
* Added a "reference" field to "bitFieldType", "booleanType", and "integerType".
* Added all the E1.37-2 messages to the examples.

### Changed
* Changed "mac" in the "bytesType" type to "mac-address".
* Changed the single string "reference" to "references", an array of the same.

## [0.21.0]

### Added
* Added "labels" to "booleanType" and a new "labeledBooleanType".
* Added labels to "unit" and "unit_prefix" in PARAMETER_DESCRIPTION and
  SENSOR_DEFINITION.
* Added a "prefixBase" to "integerType". It has 10 as a default.
* Finished adding all the E1.37-1 messages to the examples.

### Changed
* Changed these examples to use "boolean" with some labels instead of "uint8"
  with two labeled false and true values: IDENTIFY_DEVICE, PAN_INVERT,
  PAN_TILT_SWAP, TILT_INVERT.
* Set all "additionalProperties" to false for every defined object.

### Removed
* Removed the "different_pid" option from "get_response" because that's a
  special case and not meant for manufacturer PIDs.

### Fixed
* Fixed "restrictToLabeled" description by removing an extraneous "the".
* Fixed "unit_prefix" type so that it's "uint8" instead of "uint16"
  in PARAMETER_DESCRIPTION.
* Fixed "properties" spelling in "refType".

## [0.20.0]

### Added
* Added labelled values to PRODUCT_DETAIL_ID_LIST.
* New E1.37-1 examples.

### Changed
* Replaced "prefix" with "prefixPower" in "integerType" and also changed its
  meaning to the power of 10 instead of a value from Table A-14 of E1.20.
* Renamed "unit" to "units" in "integerType".
* Updated DMX_FAIL_MODE, DMX_STARTUP_MODE, and CAPTURE_PRESET examples to use
  the new "units" and "prefixPower" fields for their times.
* Changed the product category to a single field in the DEVICE_INFO example and
  added some labels.

### Removed
* Removed obvious label prefixes from: LAMP_ON_MODE, POWER_STATE,
  PRESET_PLAYBACK, and PRODUCT_DETAIL_ID_LIST.

## [0.19.0]

### Added
* Added a "restrictToLabeled" field that specifies whether valid values should
  be restricted to those in the "labeled" list.
* Added a choice for "get_response" to be "different_pid" in the case of
  messages having GET responses that don't match the GET request PID, for
  example, QUEUED_MESSAGE has this.
* Added a "reference" field, a uri-reference, to the main message.
* Added "reservedValue" to "bitType" to indicate what value a reserved bit is
  supposed to be.
* Added a "size" field to "bitFieldType". Also added to the description that
  it's an error if the size is less than the number of defined bits. Also added
  this to the list of required fields.
* Added a sentence to "pattern", "minLength", and "maxLength" of "stringType",
  and to "minLength" and "maxLength" of "bytesType", stating that it's an error
  if there's a contradiction.
* Added an "unspecifiedValues" field to "bitFieldType".
* Added "notes" to "labeledIntegerType".

### Changed
* Updated the "ranges" (inside "integerType") description to mention that it
  should not be specified if "restrictToLabeled" is "true".
* Changed the format of "refType" to "uri-reference" from "json-pointer". This
  allows cross-document references.
* Improved the "refType" description.
* Improved "commandType" to define all the "oneOf"'s there: array of types,
  duplicate command, or reference. Removed "duplicateCommand" and updated the
  four commands.
* Changed "interpretation" in "bytesType" and "stringType" to "format".
* Updated the description for "bitFieldType" to discuss multiples of 8 bits and
  the other new things.
* All kinds of changes to current messages plus new example messages. All the
  E1.20 messages are included plus one from E1.37-1, IDENTIFY_MODE.

### Fixed
* Fixed "dependencies" to be "dependentRequired".

### To-do
* TODO: How to do optional fields, for example in CAPTURE_PRESET?

## [0.18.0]

### Added
* Added a reference to DS_BOOLEAN in the "booleanType" description.

## [0.17.0]

### Added
* Added a new "bytesType" type.

### Changed
* Improved the "pattern", "minLength", and "maxLength" descriptions
  in "stringType".
* Improved the "reference" description in "stringType": Changing "URI" to "URL"
  and adding the word, "informative".
* Moved "ipv4", "ipv6", "mac", "uid", and "uuid" to the new "bytesType" type.
* Updated the PROXIED_DEVICES example to use the new "bytes" type.

### To-do
* TODO: Add implicit patterns for each of the known string types.
* TODO: Use correct "pid" for PACKED_PID_INDEX, PACKED_PID_SUB,
  QUEUED_MESSAGE_SENSOR_SUBSCRIBE, and SUPPORTED_PARAMETERS_ENHANCED.

## [0.16.0]

### Added
* Added back the known string interpretation type, "uuid".

## [0.15.0]

### Added
* Added to the "stringType" description:
  * Another suggestion for delimiting strings: another "length" field.
  * UTF-8 encoding.
* Added a "booleanType" in the drive to simplify "simpleType".
* Added "interpretation" and "pattern" fields to "stringType". The first is an
  optional description of how to interpret the value, for example, "url". The
  second is an optional way for the value to be validated using a regex.
* Added "domain-name" (1.37-2) to and removed "uuid" (because I can't find it in
  any RDM-related spec) from the "known string types" list.
* Added a "reference" field to "stringType" so that a URI can be used as the
  source for the field's specification.

### Changed
* Updated the descriptions for "stringType"'s "minLength" and "maxLength" to
  state that care should be taken to not contradict each other nor "pattern".
* Updated LANGUAGE_CAPABILITIES and PROXIED_DEVICES examples.

### Removed
* Removed "simpleType".

### Fixed
* Fixed "refType" to be of type "string" with a "format" of "json-pointer".
* Fixed "labeledIntegerType" by changing "name" to "label" and removing
  "displayName" and "notes".

### To-do
* TODO: Add implicit patterns for each of the known string types.
* TODO: Use correct "pid" for PACKED_PID_INDEX, PACKED_PID_SUB,
  QUEUED_MESSAGE_SENSOR_SUBSCRIBE, and SUPPORTED_PARAMETERS_ENHANCED.

## [0.14.0]

### Fixed
* Fixed up the "simpleType" logic.

## [0.13.0]

### Added
* Added a "notes" everywhere there's a "name". This might help with how-to's in
  a UI.

## [0.12.0]

### Added
* Added a "displayName" everywhere there's a "name".
* Added labels to "status_type" in STATUS_MESSAGES.json.

### Changed
* Updated the description in "simpleType" to reference "Table A-15: Data Type
  Defines" in the RDM spec.

### Fixed
* Fixed the DEVICE_INFO.json example: moved "No footprint" to
  "dmx_start_address" from "dmx_footprint".
* Fixed spelling mistake in PRODUCT_DETAIL_ID_LIST.json.

## [0.11.0]

### Added
* Added a "duplicateCommandType" that can specify that one command has the same
  contents as another command. The GET/SET request/response commands can now
  either be a "commandType" or a "duplicateCommandType".
* Added a "refType" to the "oneOfTypes" list so that other parts can also be
  duplicated. For example, maybe one of the items in a command needs to
  duplicate another command item, either in the same or a different command.
  It is of type "json-pointer", see https://tools.ietf.org/html/rfc6901.

### Changed
* Updated the DEVICE_LABEL.json example to illustrate using a duplicate command.
* Changed "simpleType" to be of type "anyOf an enum". In other words, other
  strings not in the list are allowed, so that there can exist manufacturer-
  specific types.

## [0.10.0] - This was the latest after the discussion.

### Changed
* Changed the word "might" to "may" in the description for "stringType".

### Removed
* Removed integer types "int128" and "uint128", and removed simple type "uri"
  because, sadly, they're not in the current E1.20 spec. :(

## [0.9.0]

### Changed
* Using "http://estalink.us/jsonschema" for the "$id" value.

### To-do
* Need to discuss:
  * Should the ID link "https" instead of "http"? (Obviously, would change in
    the spec too.)

## [0.8.0]

### Added
* Added a "reserved" property to "bitType" to indicate that a bit is unused or
  reserved. This helps with padding the bit count in a bit field to be a
  multiple of 8.
* Added an "$id" field with the value "#placeholder".

### Changed
* Updated the "bitFieldType" description to add the sentence: "Implementations
  are likely to store the values in a structure having a multiple of 8 bits."
  It's not possible using the JSON schema to restrict an array count to a
  multiple of 8. Additionally, if we added the "size" property as before,
  there's currently no clean way of guaranteeing its value is at least as large
  as the array element count.
* Changed the "bool" item in "simpleType" to "boolean" so that it matches the
  JSON schema word, for consistency.
* Updated the "stringType" description to add the sentence: "Implementations
  might need to use a NUL terminator for multi-field messages where a string is
  followed by another field so that its boundary can be determined."
* Updated the SUPPORTED_PARAMETERS_ENHANCED example to use a bit field.

### To-do
* Need to discuss:
  * Either removing these: "int128, uint128, hostname, mac, uri, uuid", or
    defining them in Table A-15 of the new RDM spec.
  * What will the value of "$id" be?
  * Clarifying that any string-based types (eg. uuid, mac, hostname, random
    other strings) need to be NUL-terminated if the field is followed by
    another, so that its length can be determined.
  * Clarifying that a version number is an 8-bit byte instead of "the version
    shall start at zero". The second seems too proscriptive and the first
    accomplishes the same thing without inflaming those whose opinion says that
    versions MUST start at 1.

## [0.7.0]

### Removed
* Removed the word, "informative", from the description and title.

## [0.6.0]

### Added
* Added a description to "pid" and "version".

### Changed
* Improved the description of "subdeviceType".
* Changed default subdevice ranges in GET and SET to just ["root"].
  Comments on this choice welcome.

## [0.5.0]

### Added
* Added a "uri" "simpleType". Yes, it's a superset of a URL, but people may wish
  to use one or both because URLs are so common.
* Added "name" to the "required" list in "labeledIntegerType", per Peter N.
* Added "int128" and "uint128" to "integerType".
* Added a "length" maximum of 255, per Peter N.
* Added missing "type":"object" to "stringType", "bitFieldType",
  and "integerType".
* Added "uuid" to "simpleType".
* Added a "subdeviceType" for specifying which subdevices a GET or SET request
  can be sent to. The default is the union of all of the enum values.

### Changed
* Changed "version" minimum back to 0 because I'm not convinced it should be a
  schema check. It's just a two-byte number. There's no reason to put this
  restriction on someone's message.
* Updated the description for "commandType" to clarify that it represents the
  contents of a command.
* Changed "definitions" to "$defs", per the 2019-09 draft.
* Updated the "simpleType" description to state its purpose as a catch-all list
  of likely values.
* Changed "$schema" to "https://json-schema.org/draft/2019-09/schema".

## [0.4.0]

### Added
* Added "url" and "mac" to "simpleType".

### Changed
* Changed "version" minimum to 1 from 0.

## [0.3.0]

### Removed
* Removed "fieldType" and instead made "commandType" be a collection
  of "oneOfTypes".

## [0.2.0]

### Added
* Added an optional "length" property to "pdEnvelope".

### Changed
* Factored all the types into a "oneOf" so that it can be referenced from
  "compoundType", "listType", and "fieldType".
* Changed "boundedIntegerType" to "integerType" and "boundedStringType"
  to "stringType".
* Changed some descriptions.
* Changed "upper" and "lower" in "rangeType" to "maximum" and "minimum",
  respectively, for consistency with JSON schema naming conventions.

### Removed
* Removed "name" from the "required" list of "labeledIntegerType"
  and "listType".

## [0.1.0] - All changes done in order from the initial specification.

### Added, Changed, Removed
* Changed spacing to make it easier to read.
* Added a schema "title".
* Added "description" values.
* Changed single-value enums to "const".
* Changed "bitfield" to "bit" because a "bitfield" is technically a collection
  of bits.
* Removed the "size" property of the "bitfield" type in "field". This can be
  inferred from the data.
* Combined all the simple types into one. This contains:
  * bool
  * hostname
  * ipv4
  * ipv6
  * uid
* Reordered things to make it match the mental model and also to make it easier
  to read.
* Removed "minimum" and "maximum" from the "label" type because there shouldn't
  be assumptions about the possible values. For example, the range 0-(2^31-1)
  disregards negative values. This is mixing the "layers" in how to define a
  schema: I think what was intended was for two additional fields: "minimum" and
  "maximum" at the user level, not this schema level. However, this is not
  appropriate either because it's up to the user to define the value and its
  range, not us.
* Changed the "label" property in the "label" type to "name", for consistency.
* Changed "label" to "labeledInteger".
* Changed "max_size" and "min_size" to "maxLength" and "minLength", for
  consistency with JSON schema naming conventions.
* Changed "bitfield" to "bitField" because it's two words.
* Added '"uniqueItems": true' to the "bits" field of the "bitField" field type.
* Added '"uniqueItems": true' to the integer field type.
* Deleted "get_subdevice_range" and "set_subdevice_range" because it's not clear
  what they're for.
* Factoring out all the possible "field" types.
* Added a new "packedFields" field type that represents a list of length/data
  pairs. Note that there's no minimum/maximum count as it's unneeded.
* Changed all names to use the "name" type reference.
* Added a "maximum" of 65535 to the "version" field.
* Changed the "command" type to "array" and removing the intermediary "fields"
  property. There's no minimum size because, in theory, a message may contain
  zero bytes.
* Added a "name" to the "bitField" type.
* Added '"uniqueItems": true' to "command".
* Added '"uniqueItems": true' to "ranges".
* Added a new "pdEnvelope" type.
* Added a new "list" type that represents a list of any valid non-list
  field type.
* Removed the requirement of having "name" for some of the types so they can
  also be used in lists.
* Suffixed all the types with "Type" so that naming is consistent. These aren't
  the words that will be used when writing a schema and they don't have to be
  the same as the constant names, eg. "uint8" or "string" or "list".
* Added a "compoundType" type so that we don't have to make a special type for
  all possibilities. For example, the list of 3-field items returned
  in SLOT_INFO. These compound types are only supported in the list type,
  "listType", because a field is only used in "commandType".
* Added 12 examples, most with lists of compound (packed) types.
* Think of "listType" as a holder for a "packed" list of things, where each
  "thing" can be a simple or compound type.

## [0.0.0] - Base release from the initial specification.
