import { Card } from "antd";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { googlecode } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { basename } from 'path';

function CodeFragment({ issue }) {
  const issueLine = issue?.event?.line;
  console.log(issue?.event?.source_code_fragment);

  return (
    <Card title={`Crashed in ${basename(issue?.filename)} at line ${issueLine}`} size="small" className="exception-code-card">
      <SyntaxHighlighter 
        language={issue?.programming_language}
        style={googlecode}
        showLineNumbers={true}        
        startingLineNumber={issue?.event?.fragment_starting_line}
        lineProps={lineNumber => styleLine(issueLine, lineNumber)} 
        wrapLines={true} 
      >
        {issue?.event?.source_code_fragment}
      </SyntaxHighlighter>
    </Card>
  );
}

function styleLine(issue_line, lineNumber) {
  let style = { };

  if (lineNumber === issue_line) {
    style.backgroundColor = '#9ccfff';
  }

  return { style };
}

export default CodeFragment;