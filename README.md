# README for the RDM Schema Project

Version: 0.32.0

This project contains the schema for the Parameter Metadata Language from
Section 5 of E1.37-5.

The schema is subject to change.

## Table of contents

1. [Project intent](#project-intent)
2. [Design notes](#design-notes)
   1. [Relation to other RDM types and structure](#relation-to-other-rdm-types-and-structure)
   2. [Exceptions](#exceptions)
   3. [Open questions](#open-questions)
3. [Usage notes](#usage-notes)
   1. [Framing is at a different layer](#framing-is-at-a-different-layer)
   2. [Arbitrary field sizes](#arbitrary-field-sizes)
   3. [Constraints and errors](#constraints-and-errors)
4. [Resources](#resources)
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
rare and they're not desiarable features for representing manufacturer messages,
the original intent for this project.

### Open questions

Is having a `"displayName"` necessary for fields? If this is for UI generation
then wouldn't a displayable name already be in "name"?

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

### Constraints and errors

The schema does not capture every possible error. Some errors can only be caught
after processing a schema instance. It is an error if any of the requirements
below are not met.

1. `"bitField"` type: the number of bits defined in the array must be less than
   or equal to the `"size"` value.
2. `"bytes"` type: the `"minLength"` value must be less than or equal to the
   `"maxLength"` value.
3. `"string"` type: any size limits described by `"pattern"` must not contradict
   the limits described by `"minLength"` and `"maxLength"`. As well, the
   `"minLength"` value must be less than or equal to the `"maxLength"` value.
4. If a command is a duplicate of another command then it cannot duplicate
   itself. For example, a `"get_response"` cannot have a value
   of `"get_response"`.
5. `"refType"`: the reference must point to an object having one of the types in
   `#/$defs/oneOfTypes` and there must not be any circular references.

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

### References mentioned in the schema

* [URI Syntax](https://www.rfc-editor.org/rfc/rfc3986.html)
* [JSON Pointer](https://www.rfc-editor.org/rfc/rfc6901.html)
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
* [UTF-8](https://www.rfc-editor.org/rfc/rfc3629)
