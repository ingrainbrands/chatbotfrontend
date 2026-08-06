export const markdownOptions = {
    breaks: true,
    gfm: true,
};

export const sanitizeMarkdown = (text = "") => {
    return text
        .replace(/\r\n/g, "\n")
        .replace(/\t/g, "    ")
        .trim();
};