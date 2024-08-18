import { Extension } from "@tiptap/react";

export default class SingleParagraph extends Extension {
  get name() {
    return "single_paragraph";
  }

  get defaultOptions() {
    return {
      tagName: "p",
    };
  }

  get schema() {
    return {
      content: "text*",
      toDOM: () => [this.options.tagName, 0],
      parseDOM: [{ tag: this.options.tagName }],
    };
  }
}
