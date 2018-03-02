import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

const Example = (props) => {
  return (
    <div>
      <Card body inverse color="primary">
        <CardTitle>this.props.accountName</CardTitle>
        <CardText>this.props.accountName</CardText>
        <Button color="secondary">Button</Button>
      </Card>
      <Card body inverse color="success">
        <CardTitle>Special Title Treatment</CardTitle>
        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
        <Button color="secondary">Button</Button>
      </Card>
      <Card body inverse color="info">
        <CardTitle>Special Title Treatment</CardTitle>
        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
        <Button color="secondary">Button</Button>
      </Card>
    </div>
  );
};

export default Example;