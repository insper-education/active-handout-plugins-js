import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import colorTheme from "./colorTheme";
import { CodeVisualizerContainer } from "./styles";

interface ICodeVisualizerProps {
  children: string;
  language?: "python" | "css" | "javascript";
}
export function CodeVisualizer({
  children,
  language = "python",
}: ICodeVisualizerProps) {
  return (
    <CodeVisualizerContainer>
      <SyntaxHighlighter
        language={language}
        style={colorTheme}
        showLineNumbers={true}
        wrapLines={false}
        lineNumberStyle={{
          fontWeight: "bold",
          color: "#555a7b",
          padding: "0.25rem 0.5rem",
          marginLeft: "-0.5rem",
          userSelect: "none",
        }}
      >
        {children?.trim()}
      </SyntaxHighlighter>
    </CodeVisualizerContainer>
  );
}
