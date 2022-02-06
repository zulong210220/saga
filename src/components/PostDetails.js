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

import axios from 'axios'
class PostDetails extends React.Component {
  constructor(props) {
    super(props);
    //react定义数据
    this.state = {
      list:[],
      title:'',
      author: '',
      isLoading: true ,
    }
  }
  componentDidMount() {
  //请求接口的方法
    var  api='http://192.168.50.101:8000/posts/'+this.props.id;
    axios.get(api)
        .then((response) =>{
          //console.log(response);
          console.log("axios",response.data);
          //用到this需要注意指向，箭头函数
          this.setState({
            list:response.data.body,
            title: response.data.title,
            author: response.data.author,
            isLoading: false ,
          })
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });

  }
  render() {
    return (
        <Container>
          {this.state.isLoading ? (
              <div className="loader">
                <Oval color="#00BFFF" height={80} width={80} />
              </div>
          ) : (
    <Card className={"posts"}>
      <Card.Header>{this.state.title}</Card.Header>
      <Card.Body>
        <Card.Subtitle>{this.state.author}</Card.Subtitle>
          {
            this.state.list.map((value,key)=>{
              return<Card.Text key={key}>{value}</Card.Text>
            })
          }
      </Card.Body>
    </Card>
          )}
        </Container>
  )
  }
}

export default PostDetails

//export default function PostDetails11() {
  function PostDetails11() {
  const {post, loadingPostDetails} = useSelector(
      (state) => state.PostReducer
  );

  console.log(post.body)
  console.debug("body:",typeof post.body)

  //console.debug("body:",post.body.values())
  //console.log(post.body.length)
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
