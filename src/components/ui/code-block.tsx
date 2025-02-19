"use client";

import { Prism } from "react-syntax-highlighter";
import { Button } from "./button";
import { Download, Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/lib/hooks/copy-to-clipboard";
import { generateId } from "ai";
import { memo, useMemo } from "react";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
    value: string;
    language: string;
}

interface languageMap {
    [key: string]: string | undefined;
}

const programmingLanguages: languageMap = {
    abap: ".abap",
    abnf: ".abnf",
    actionscript: ".as",
    ada: ".ada",
    agda: ".agda",
    al: ".al",
    antlr4: ".g4",
    apacheconf: ".conf",
    apex: ".cls",
    apl: ".apl",
    applescript: ".applescript",
    aql: ".aql",
    arduino: ".ino",
    arff: ".arff",
    asciidoc: ".adoc",
    asm6502: ".asm",
    asmatmel: ".asm",
    aspnet: ".aspx",
    autohotkey: ".ahk",
    autoit: ".autoit",
    avisynth: ".avs",
    awk: ".awk",
    bash: ".sh",
    basic: ".bas",
    batch: ".bat",
    bison: ".y",
    brainfuck: ".bf",
    c: ".c",
    clojure: ".clj",
    cmake: ".cmake",
    coffeescript: ".coffee",
    cpp: ".cpp",
    crystal: ".cr",
    csharp: ".cs",
    css: ".css",
    dart: ".dart",
    diff: ".diff",
    docker: ".dockerfile",
    ebnf: ".ebnf",
    elixir: ".ex",
    elm: ".elm",
    erb: ".erb",
    erlang: ".erl",
    fortran: ".f90",
    fsharp: ".fs",
    gherkin: ".feature",
    git: ".git",
    glsl: ".glsl",
    go: ".go",
    graphql: ".graphql",
    groovy: ".groovy",
    haskell: ".hs",
    hcl: ".hcl",
    html: ".html",
    ini: ".ini",
    java: ".java",
    javascript: ".js",
    json: ".json",
    julia: ".jl",
    kotlin: ".kt",
    latex: ".tex",
    less: ".less",
    lisp: ".lisp",
    lua: ".lua",
    makefile: ".mk",
    markdown: ".md",
    matlab: ".m",
    nim: ".nim",
    "objective-c": ".m",
    ocaml: ".ml",
    pascal: ".pas",
    perl: ".pl",
    php: ".php",
    powershell: ".ps1",
    prolog: ".pl",
    python: ".py",
    r: ".r",
    raku: ".raku",
    ruby: ".rb",
    rust: ".rs",
    sass: ".sass",
    scala: ".scala",
    scheme: ".scm",
    scss: ".scss",
    shell: ".sh",
    solidity: ".sol",
    sql: ".sql",
    swift: ".swift",
    typescript: ".ts",
    vbscript: ".vbs",
    verilog: ".v",
    vhdl: ".vhd",
    xml: ".xml",
    yaml: ".yaml",
    zig: ".zig",
};

const CodeBlock = ({ value: code, language }: CodeBlockProps) => {
    const { isCopied, copyToClipboard } = useCopyToClipboard({});

    const downloadCode = () => {
        if (typeof window === "undefined") {
            return;
        }

        const extension = programmingLanguages[language] || ".file";
        const fileName = `code-${generateId()}-${language}${extension}`;
        const blob = new Blob([code], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const memoizedPrism = useMemo(
        () => (
            <Prism
                PreTag="div"
                language={language}
                style={vscDarkPlus}
                customStyle={{
                    margin: 0,
                    width: "100%",
                    background: "transparent",
                }}
                showLineNumbers
                lineNumberStyle={{
                    userSelect: "none",
                }}
                codeTagProps={{
                    style: {
                        fontSize: "0.875rem",
                    },
                }}
            >
                {code}
            </Prism>
        ),
        [code, language],
    );

    // TODO: dont render inline/single line codeblocks as entire codeblocks, looks bad

    return (
        <div className="bg-primary/10 w-full overflow-hidden rounded-xl border">
            <div className="bg-primary/20 flex w-full items-center justify-between px-3 py-0.5">
                <span className="text-[0.875rem] capitalize">
                    {language.toLowerCase()}
                </span>
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-xs focus-visible:ring-1 focus-visible:ring-offset-0"
                        onClick={() => copyToClipboard(code)}
                    >
                        {isCopied ? (
                            <Check className="size-4" />
                        ) : (
                            <Copy className="size-4" />
                        )}
                        <span className="sr-only">Copy code</span>
                    </Button>
                    <Button
                        variant="ghost"
                        className="focus-visible:ring-1"
                        size="icon"
                        onClick={downloadCode}
                    >
                        <Download className="size-4" />
                        <span className="sr-only">Download</span>
                    </Button>
                </div>
            </div>
            {memoizedPrism}
        </div>
    );
};

export default memo(CodeBlock);
