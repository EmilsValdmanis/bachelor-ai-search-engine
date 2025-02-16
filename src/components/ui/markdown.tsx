import { memo } from "react";
import ReactMarkdownBase, { Options } from "react-markdown";

const Markdown: React.FC<Options> = memo(
    ReactMarkdownBase,
    (prevProps, nextProps) =>
        prevProps.children === nextProps.children &&
        prevProps.className === nextProps.className,
);

export default Markdown;
