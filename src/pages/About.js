import { Container } from "react-bootstrap";
import Abouts from "../components/About";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAbout } from "../store/posts/actions";

export default function About() {
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAbout());
    }, []);

    return (
        <Container className="about">
            <Abouts />
        </Container>
    );
}
