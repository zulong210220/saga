import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Bars } from  'react-loader-spinner';

import { useState } from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

/*
     <Bars
            color="#00BFFF"
            height={50}
            width={100}
            timeout={3000} //3 secs
          />
* */

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


export default function Posts() {
  const { posts, loadingPosts } = useSelector((state) => state.PostReducer);

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <Container>
      {loadingPosts ? (
        <div className="loader">
          <Bars
              color="#00BFFF"
              height={50}
              width={100}
              timeout={3000} //3 secs
          />
          <ClipLoader color={color} loading={loading} css={override} size={150} />
        </div>
      ) : (
        posts.map((item) => {
          return (
            <Row className="posts" key={item.id}>
              <Col lg={8} md={10} sm={12}>
                <Link to={`/${item.id}`} >
                  <Card>
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.body}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </Row>
          );
        })
      )}
    </Container>
  );
}
