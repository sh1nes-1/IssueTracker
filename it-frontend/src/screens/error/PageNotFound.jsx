import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

function BackHome() {
  return (
    <Link to="/">
      <Button type="primary">Back Home</Button>
    </Link>
  );
}

function PageNotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<BackHome />}
    />
  );
}

export default PageNotFound;