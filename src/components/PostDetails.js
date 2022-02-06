import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Oval } from  'react-loader-spinner';
import {Link} from "react-router-dom";


/*
<Bars
            color="#00BFFF"
            height={50}
            width={100}
            timeout={3000} //3 secs
          />
* */

export default function PostDetails() {
  const {post, loadingPostDetails} = useSelector(
      (state) => state.PostReducer
  );

  return (
      <Container>
        {loadingPostDetails ? (
            <div className="loader">
              <Oval color="#00BFFF" height={80} width={80} />
            </div>
        ) : (
            <Card className={"posts"}>
              <Card.Header>{post.title}</Card.Header>
              <Card.Body>
                <Card.Subtitle>{post.author}</Card.Subtitle>
                <Card.Text>
                    {post.body}
                </Card.Text>
              </Card.Body>
            </Card>
        )}
      </Container>
  );

//  return (
//      <Container>
//        {loadingPostDetails ? (
//            <div className="loader">
//              <Oval color="#00BFFF" height={80} width={80}/>
//            </div>
//        ) : (
//            <Card className={"postDetail"}>
//              <Card.Header>Featured</Card.Header>
//              <Card.Body>
//                <Card.Title>{post.title}</Card.Title>
//                <Card.Title>{post.author}</Card.Title>
//                <Card.Text>
//                  <Row className="postDetails">
//                    {post.body}
//                  </Row>
//                </Card.Text>
//              </Card.Body>
//            </Card>
//        )}
//      </Container>
//  );
}

//  return (
//    <Container>
//      {loadingPostDetails ? (
//        <div className="loader">
//          <Oval color="#00BFFF" height={80} width={80} />
//        </div>
//      ) : (
//      <Card className='mb-3' data-cy='trip-card'>
//        <Card.Header>{post.title}</Card.Header>
//        <Card.Body>
//          {post.body.map(item => (
//              <Row className="posts" key={item.id}>
//                {item}
//              </Row>
//          ))}
//        </Card.Body>
//      </Card>
//      )}
//    </Container>
//  );
//}

//  return (
//    <Container>
//      {loadingPostDetails ? (
//        <div className="loader">
//          <Oval color="#00BFFF" height={80} width={80} />
//        </div>
//      ) : (
//
//          <Card className={"postDetail"}>
//            <Card.Header>Featured</Card.Header>
//            <Card.Body>
//              <Card.Title>{post.title}</Card.Title>
//              <Card.Text>
//
//                post.body.map((item) => {
//                return (
//                <Row className="posts" key={item.id}>
//              {item}
//                  </Row>
//                  );
//              })
//              </Card.Text>
//            </Card.Body>
//          </Card>
//
//      )}
//    </Container>
//  );
//}
