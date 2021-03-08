import React from "react";
import { Card, Typography } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { googlecode } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CodeFragment from "./CodeFragment";

const { Title } = Typography;

function EventBody({ issue }) {
  return (
    <React.Fragment>
      <div>
        <Title level={4}>Exception</Title>
        {issue?.message}
      </div>
      
      {issue?.event?.source_code_fragment && <CodeFragment issue={issue} />}

      <Card title="Stacktrace" size="small" className="event-stacktrace">
        <SyntaxHighlighter 
          language="plaintext" 
          style={googlecode}
          className="stacktrace-content"
        >
          {issue?.event?.stacktrace}
        </SyntaxHighlighter>
      </Card>            
    </React.Fragment>
  );
}

export default EventBody;