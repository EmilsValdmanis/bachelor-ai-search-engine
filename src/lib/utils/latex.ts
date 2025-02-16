//https://github.com/remarkjs/react-markdown/issues/785 - prashantbhudwal

export const containsLaTeX = (input: string) => {
    return /\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/.test(input || "");
};

export const processLatex = (content: string) => {
    const blockProcessedContent = content.replace(
        /\\\[([\s\S]*?)\\\]/g,
        (_, equation) => `$$${equation}$$`,
    );
    const inlineProcessedContent = blockProcessedContent.replace(
        /\\\(([\s\S]*?)\\\)/g,
        (_, equation) => `$${equation}$`,
    );
    return inlineProcessedContent;
};
