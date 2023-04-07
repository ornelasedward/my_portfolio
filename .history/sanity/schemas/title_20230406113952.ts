const title = {
  name: "title",
  title: "Title",
  type: "string",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },

    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};

export default title;
