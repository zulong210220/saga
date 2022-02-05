import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Oval } from  'react-loader-spinner';


/*
<Bars
            color="#00BFFF"
            height={50}
            width={100}
            timeout={3000} //3 secs
          />
* */

export default function PostDetails() {
  const { post, loadingPostDetails } = useSelector(
    (state) => state.PostReducer
  );

  return (
    <Container>
      {loadingPostDetails ? (
        <div className="loader">
          <Oval color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <Row className="posts">
          <Col lg={8} md={10} sm={12}>
            <h1>{post.title}</h1>
            <div>
              <pre>
              {post.body}
              </pre>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}
