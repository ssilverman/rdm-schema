# README for the RDM Schema Project

This project contains the schema for the Parameter Metadata Language from
Section 5 of E1.37-5.

The schema is subject to change.

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

### Exceptions

`QUEUED_MESSAGE` is the only message that allows responses having a different
PID. First experiments used a response type of `"different_pid"`.
`CAPTURE_PRESET` is the only message with optional fields; the last few can
be present as a group or not.

It was decided that these features would not be included because they're so
rare and they're not desiarable features for representing manufacturer messages,
the original intent for this project.

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

## Resources

* [TSP Published Documents](https://tsp.esta.org/tsp/documents/published_docs.php)
* [TSP Public Review Documents](https://tsp.esta.org/tsp/documents/public_review_docs.php)
* [JSON Schema](https://json-schema.org)
