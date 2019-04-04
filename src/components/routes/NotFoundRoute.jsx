import React from 'react';
import { Container } from 'react-bootstrap';
import Emoji from '../Emoji/Emoji';

export default function NotFoundRoute() {
  return (
    <Container className="text-center" style={{ paddingTop: 100 }}>
      <h3>The Page you are looking for does not exist</h3>
      <Emoji icon="😭" />
    </Container>
  );
}
