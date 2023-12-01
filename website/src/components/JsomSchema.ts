export const jsonSchema = {
  $ref: "#/definitions/HTMLElement",
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions: {
    Attribute: {
      properties: {
        name: {
          type: "string",
        },
        value: {
          type: "string",
        },
      },
      required: ["name", "value"],
      type: "object",
    },
    HTMLElement: {
      properties: {
        attributes: {
          items: {
            $ref: "#/definitions/Attribute",
          },
          type: "array",
        },
        children: {
          anyOf: [
            {
              items: {
                $ref: "#/definitions/HTMLElement",
              },
              type: "array",
            },
            {
              type: "string",
            },
          ],
        },
        name: {
          type: "string",
        },
        needClosing: {
          type: "boolean",
        },
      },
      required: ["name"],
      type: "object",
    },
  },
};
