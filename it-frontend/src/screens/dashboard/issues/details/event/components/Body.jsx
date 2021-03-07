import React from "react";
import { Card, Typography } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { googlecode } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const { Title } = Typography;

var html = `
$content = $response->getContent();
if (is_array($content)) {
  $message .= isset($content['message']) ? ': ' . $content['message'] : '';
  $code = isset($content['code']) ? $content['code'] : $response->getStatusCode();
  <h1>return new RestException($message, $code, $response->getStatusCode());</h1>
} else {
  return new RestException($message, $response->getStatusCode(), $response->getStatusCode());
}  
`;

function EventBody({ issue }) {
  return (
    <React.Fragment>
      <div>
        <Title level={4}>Exception</Title>
        {issue?.message}
      </div>
      
      <Card title="Crashed in ReactFragment.php at line 37" size="small" className="exception-code-card">
        <SyntaxHighlighter 
          language={issue?.programming_language}
          style={googlecode}
          showLineNumbers={true} 
          startingLineNumber={37}          
        >
          {html}
        </SyntaxHighlighter>
      </Card>

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