# README for the RDM Schema Project

Version: 0.37.0

This project contains the schema for the Parameter Metadata Language from
Section 5 of E1.37-5.

The schema is subject to change.

## Table of contents

1. [Project intent](#project-intent)
2. [Design notes](#design-notes)
   1. [Relation to other RDM types and structure](#relation-to-other-rdm-types-and-structure)
   2. [Exceptions](#exceptions)
   3. [Strings and string lengths](#strings-and-string-lengths)
   4. [Names and displayable strings](#names-and-displayable-strings)
3. [Usage notes](#usage-notes)
   1. [Framing is at a different layer](#framing-is-at-a-different-layer)
   2. [Arbitrary field sizes](#arbitrary-field-sizes)
   3. [Constraints and errors](#constraints-and-errors)
   4. [Defaults and the "default" annotation](#defaults-and-the-"default"-annotation)
4. [Best practices](#best-practices)
5. [Notes on the examples](#notes-on-the-examples)
   1. [Manufacturer ID](#manufacturer-id)
6. [Open questions](#open-questions)
7. [TODOs](#todos)
8. [Resources](#resources)
   1. [References mentioned in the schema](#references-mentioned-in-the-schema)

## Project intent

This project intends to provide a machine-readable way to describe
manufacturer-specific RDM messages. Controllers can then process, and perhaps
provide a meaningful UI for, these messages.

## Design notes

It was chosen to use the latest version of the schema specification,
Draft 2019-09 to take advantage of the latest features. It is intended that the
schema will be updated as later drafts and releases come out, as appropriate.

To develop the schema, all known RDM messages were implemented as schema
instances so that every case in the specifications was accounted for. There were
two exceptions, however, `QUEUED_MESSAGE` and `CAPTURE_PRESET`.

### Relation to other RDM types and structure

The "DS_*" types in ANSI E1.20-202x, plus the types from related specifications,
are not sufficient to describe a proper type system, so there is no direct
mapping from ANSI E1.20-202x to this schema.

Whilst this schema can be used to represent everything in the specifications,
the facilities in the specifications can't be used to represent everything
RDM messages might wish to represent, manufacturer-specific or otherwise.

### Exceptions

`QUEUED_MESSAGE` is the only message that allows responses having a different
PID. First experiments used a response type of `"different_pid"`.
`CAPTURE_PRESET` is the only message with optional fields; the last few can
be present as a group or not.

It was decided that these features would not be included because they're so
rare and they're not desirable features for representing manufacturer messages,
the original intent for this project.

### Strings and string lengths

There are two facilities this schema provides for "string length". The first is
"length in characters", defined by `"minLength"` and `"maxLength"`. A
"character" is defined the same way that JSON defines a character: a single code
point, possibly composed using a UTF-16 surrogate pair.

The second facility is "byte length", expressed in `"minBytes"` and
`"maxBytes"`. Strings will use the UTF-8 encoding and the length in bytes gives
bounds on the storage requirements.

From
[Validation Keywords for Strings](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.6.3):

> The length of a string instance is defined as the number of its characters as
> defined by [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259.html).

Specifically, see
[Section 7: Strings](https://www.rfc-editor.org/rfc/rfc8259.html#section-7) and
[Section 8: String and Character Issues](https://www.rfc-editor.org/rfc/rfc8259.html#section-8).

In other words, "length" in this schema means the same things as "string length"
per the JSON specification.

There are further considerations when using a string for display, say in a UI.
However, this specification does not address those things. Those considerations
may include, but are not limited to, normalization, canonicalization, glyph
size, and character-to-display approaches. It is up to the manufacturer to
decide what to use for string content.

See the discussion at [What's the difference between a character, a code point,
a glyph and a grapheme?](https://stackoverflow.com/a/27331885).

Relevant terms: UCS-4, UTF-8, Unicode, Basic Multilingual Plane, Unicode Plane.

### Names and displayable strings

For nameable things, `"name"` is intended to be a unique ID and `"displayName"`
is intended to be a name for display. Note that both are optional.

In the case that a manufacturer wishes to provide localized names, this design
takes a cue from how Java does localized strings. The name would be used as a
lookup into some manufacturer-supplied table for the actual display string, and
the `"displayName"` value could be used as a fallback or as the actual
displayable name in the case where a manufacturer does not provide that
out-of-band table.

## Usage notes

### Framing is at a different layer

The schema can describe complete messages, but does not describe message
framing. For example, if a message is larger than can fit inside a single RDM
packet, then the underlying implementation would use
`RESPONSE_TYPE_ACK_OVERFLOW` appropriately.

### Arbitrary field sizes

There are several field types that can be non-fixed sizes. For example, "a
string having a length in the range 0-32" or "a list of arbitrary size". So that
there is no ambiguity, a message should contain at most one non-fixed-size
field, and that field should appear last, serially.

If a responder wishes for controllers to limit the number of bytes sent, then it
should set appropriate values for the `"maxLength"` field for strings and the
`"maxLength"` field for bytes.

### Constraints and errors

Note that the schema does not capture every possible error. Some errors can only
be caught after processing a schema instance. Please see the
[Best practices](#best-practices) section for more details about avoiding these
kinds of errors.

### Defaults and the "default" annotation

In JSON Schema, the "default" keyword is merely an annotation that applies to
the current schema location, if present; it does not describe the value to use
when the property is absent. This is counterintuitive insofar as a "default"
annotation does not provide a default value in the case of a missing property.

An implementation is expected to follow the usage notes in the description if a
default value is needed. It can use the value of the "default" annotation, but
this is not a JSON Schema feature.

In other words, a JSON parser/validator will not return values for absent
properties; it is up to the application to supply values.

## Best practices

It's certainly possible to create badly defined messages, even though they
conform to the schema. These messages may just be ill-defined or may not be
compatible with the responder serving these messages. This section describes
some restrictions that, if followed, will prevent many of these kinds
of problems.

1. If a responder wishes for controllers to limit the number of bytes sent for
   strings or bytes, then it should set appropriate values for the `"maxBytes"`
   field for strings and the `"maxLength"` field for bytes. It's conceivable
   that a responder doesn't need this, but many responders do because they're
   implemented on smaller systems that may need to preallocate memory.
2. Minimums should be less than maximums. For example, the "bytes" type has
   `"minLength"` and `"maxLength"` fields; `"minLength"` should be less than or
   equal to `"maxLength"`.
3. A bit field size should be greater than or equal to the number of its
   defined bits.
4. A command should not refer to itself. For example, a `"get_response"` cannot
   have a value of `"get_response"`. Please refer to the "Command Duplicate"
   subschema under the "command" schema.
5. References ("$ref") should refer to an object having a valid type. Also,
   there should not be any circular references.
6. String patterns should not contradict any minimum or maximum lengths, and
   vice versa.
7. The `"format"` value for bytes or strings, if a fixed-size type, should not
   contradict any minimum or maximum lengths.

## Notes on the examples

### Manufacturer ID

All the example messages should use a manufacturer ID of zero or 0xFFFF because
those are ESTA's. However, those will not validate against the schema if the
value is restricted to the range 0x0001-0x7FFFF. There was some discussion
on this:
1. It is stated in several places that manufacturer IDs must be in the range
   0x0001-0x7FFF, so we should restrict the range. See:
   1. [ANSI E1.20](https://tsp.esta.org/tsp/documents/public_review_docs.php)
   2. [ANSI E1.33](https://tsp.esta.org/tsp/documents/public_review_docs.php)
   3. [Control Protocols Working Group - Manufacturer IDs](https://tsp.esta.org/tsp/working_groups/CP/mfctrIDs.php)
2. There was some concern that developers will copy & paste the examples and not
   choose their own manufacturer ID, so keeping the examples from validating
   will prevent this.

It is the opinion of the author of this document that it is not reasonable to
restrict the schema just to prevent possible misuse. In addition, it's defined
as a 16-bit value. Using the schema to restrict the value will cause future
changes and uses to be invalid. It may be beyond the scope of the schema to
accomplish any restriction.

If the manufacturer ID is required, if it is restricted to 0x0001-0x7FFF, and if
the examples should validate, then there are two possible ways to express ESTA
examples. Either:
1. Remove `"manufacturer_id"` from the examples and remove the field from the
   list of required fields, or
2. Use a valid manufacturer ID in the examples, such as 0x7FFF from the
   prototyping/experimental use region.

In other words, we can't simultaneously have all the following things:
1. Examples having manufacturer ID zero.
2. Manufacturer ID's limited to the range 0x0001-0x7FFF.
3. Examples that validate.
4. `"manufacturer_id"` being a required property.

For now, the value in all the examples is set to 0 (0x7FFF).

## Open questions

Some open questions:
1. Versioning. Perhaps we change the schema's $id each time there's an update?
   We could include the version in the URI. Some possibilities:
   1. https://estalink.us/schemas/v1.0.1/rdm-schema.json
   2. https://estalink.us/schemas/rdm-schema-v1.0.1.json
2. How to have examples with the ESTA manufacturer ID (zero), while at the same
   time having them validate and requiring the manufacturer ID be a required
   property. The temporary solution is the change all the example manufacturer
   ID's to something in the prototyping/experimental use region (0x7FF0-0x7FFF).

## TODOs

Work that still needs to be done:
1. Supply valid PIDs to some of the examples. Currently, they are using an
   invalid value of -1.

## Resources

* [TSP Published Documents](https://tsp.esta.org/tsp/documents/published_docs.php)
  * The latest ANSI E1.20 specification can be found here.
* [TSP Public Review Documents](https://tsp.esta.org/tsp/documents/public_review_docs.php)
  * ANSI E1.20-202x can be found here when it's released for public review.
* [JSON Schema](https://json-schema.org)
* RDM schema canonical URI (not necessarily a network locator):
  http://estalink.us/rdm-schema.json
* RDM schema main page (expected to be here, but not here yet):
  http://estalink.us/rdm-schema
* Online JSON schema validator:
  [Hyperjump - JSON Schema Validator](https://json-schema.hyperjump.io/)
* [JSON](https://www.rfc-editor.org/rfc/rfc8259.html)
* [JSON Schema Validation: Validation Keywords for Strings](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.6.3)
* [UTF-8](https://www.rfc-editor.org/rfc/rfc3629)
* The discussion at
  [What's the difference between a character, a code point, a glyph and a grapheme?](https://stackoverflow.com/a/27331885)

### References mentioned in the schema

* [URI Syntax](https://www.rfc-editor.org/rfc/rfc3986.html)
* [JSON Pointer](https://www.rfc-editor.org/rfc/rfc6901.html)
* [JSON](https://www.rfc-editor.org/rfc/rfc8259.html)
  * [Section 7: Strings](https://www.rfc-editor.org/rfc/rfc8259.html#section-7)
  * [Section 8: String and Character Issues](https://www.rfc-editor.org/rfc/rfc8259.html#section-8)
* [JSON Schema Validation: Defined Formats](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.7.3)
* Format "hostname":
  * [Requirements for Internet Hosts: Host Names and Numbers](https://www.rfc-editor.org/rfc/rfc1123.html#section-2)\
    (You may need to scroll to Section 2.1.)
  * [Application Techniques for Checking and Transformation of Names](https://www.rfc-editor.org/rfc/rfc3696.html#section-2)
  * [Internationalized Domain Names for Applications (IDNA): Definitions and Document Framework](https://www.rfc-editor.org/rfc/rfc5890.html)
* Format "json" and string characters: [JSON](https://www.rfc-editor.org/rfc/rfc8259.html)
* Format "url":
  * [URI](https://www.rfc-editor.org/rfc/rfc3986.html)\
    See also (from [Section 1.1.3](https://www.rfc-editor.org/rfc/rfc3986.html#section-1.1.3)):
    [URI, URL, URN Clarifications](https://www.rfc-editor.org/rfc/rfc3305.html)
  * [URL](https://www.rfc-editor.org/rfc/rfc1738.html)
* [ECMA-262](https://www.ecma-international.org/publications/standards/Ecma-262.htm)
  (Regular Expressions)
