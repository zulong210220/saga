import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Oval } from  'react-loader-spinner';


export default function Abouts() {
    const { about, loadingAbout } = useSelector(
        (state) => state.PostReducer
    );

    return (
        <Container>
            {loadingAbout ? (
                <div className="loader">
                    <Oval color="#00BFFF" height={80} width={80} />
                </div>
            ) : (
                <Row className="about">
                    <Col lg={80} md={100} sm={120}>
                        {about.data}
                    </Col>
                </Row>
            )}
        </Container>
    );
}
