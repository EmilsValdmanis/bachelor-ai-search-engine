import { ToolInvocation } from "ai";
import SearchResult from "./search-result";

function ToolResult({ tool }: { tool: ToolInvocation }) {
    if (tool.toolName === "search") {
        return <SearchResult tool={tool} />;
    }
}

export default ToolResult;
