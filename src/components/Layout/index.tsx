import React, { ReactElement } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

interface LayoutProps {
  children: ReactElement;
  title?: string;
}
const Layout = ({ children, title }: LayoutProps): ReactElement => {
  return (
    <>
      <Helmet>
        <title>{title ? title : 'Joke Reader'}</title>
      </Helmet>

      <div className='App'>
        <Container>
          <Row>
            <Col xs={12}>
              {children}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Layout;
