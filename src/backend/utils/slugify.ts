import slugify from "slugify";

export const slugifyText = (text: string) => {
  if (!text) {
    return "";
  }

  const slug = slugify(text, { lower: true, replacement: "_" });
  const uniqueIdentifier = Date.now().toString(36);
  const uniqueSlug = `${slug}_${uniqueIdentifier}`;

  return uniqueSlug;
};
