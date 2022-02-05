import React from "react";
import "./navbar.scss";

import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
class Navigation extends React.Component {
    state = {
        searchText: "",
    };

    handleRoute = (route) => () => {
        this.props.history.push({ pathname: route });
    };

    handleSearchInput = (event) => {
        this.setState({
            searchText: event.target.value,
        });
    };

    handleSearchSubmit = () => {
        if (this.state.searchText) {
            let text = this.state.searchText;
            this.setState({ searchText: "" });
            this.props.history.push({
                pathname: "/results",
                state: { searchText: text },
            });
        } else {
            alert("Please enter some search text!");
        }
    };

    handleSearchKeyUp = (event) => {
        event.preventDefault();
        if (event.key === "Enter" && event.keyCode === 13) {
            this.handleSearchSubmit();
        }
    };

    handleFormSubmit = (e) => e.preventDefault();

    render() {
        return (
            <>
                <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
                    <a href="/" className="navbar-brand">
                        <i className="fa fa-cube"></i>Brand<b>Name</b>
                    </a>
                    <button
                        type="button"
                        className="navbar-toggler"
                        data-toggle="collapse"
                        data-target="#navbarCollapse"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        id="navbarCollapse"
                        className="collapse navbar-collapse justify-content-start"
                    >
                        <form className="navbar-form form-inline">
                            <div className="input-group search-box">
                                <input
                                    type="text"
                                    id="search"
                                    className="form-control"
                                    placeholder="Search here..."
                                    onChange={this.handleSearchInput}
                                    value={this.state.searchText}
                                    onKeyUp={this.handleSearchKeyUp}
                                />
                                <span className="input-group-addon">
                  <i className="material-icons">&#xE8B6;</i>
                </span>
                            </div>
                        </form>
                        <div className="navbar-nav ml-auto">
                            <a href="/" className="nav-item nav-link active">
                                <i className="fa fa-home"></i>
                                <span>Home</span>
                            </a>
                            <a href="#" className="nav-item nav-link">
                                <i className="fa fa-gears"></i>
                                <span>Projects</span>
                            </a>
                            <a href="#" className="nav-item nav-link">
                                <i className="fa fa-users"></i>
                                <span>Team</span>
                            </a>
                            <a href="#" className="nav-item nav-link">
                                <i className="fa fa-pie-chart"></i>
                                <span>Reports</span>
                            </a>
                            <a href="#" className="nav-item nav-link">
                                <i className="fa fa-briefcase"></i>
                                <span>Careers</span>
                            </a>
                            <a href="#" className="nav-item nav-link">
                                <i className="fa fa-envelope"></i>
                                <span>Messages</span>
                            </a>
                            <a href="#" className="nav-item nav-link">
                                <i className="fa fa-bell"></i>
                                <span>Notifications</span>
                            </a>
                            <div className="nav-item dropdown">
                                <a
                                    href="#"
                                    data-toggle="dropdown"
                                    className="nav-item nav-link dropdown-toggle user-action"
                                >
                                    <img
                                        src="https://www.tutorialrepublic.com/examples/images/avatar/3.jpg"
                                        className="avatar"
                                        alt="Avatar"
                                    />{" "}
                                    Antonio Moreno <b className="caret"></b>
                                </a>
                                <div className="dropdown-menu">
                                    <a href="/about" className="dropdown-item" >
                                        <i className="fa fa-user-o"></i> About
                                    </a>
                                    <a href="#" className="dropdown-item">
                                        <i className="fa fa-user-o"></i> Profile
                                    </a>
                                    <a href="#" className="dropdown-item">
                                        <i className="fa fa-calendar-o"></i> Calendar
                                    </a>
                                    <a href="#" className="dropdown-item">
                                        <i className="fa fa-sliders"></i> Settings
                                    </a>
                                    <div className="divider dropdown-divider"></div>
                                    <a href="#" className="dropdown-item">
                                        <i className="material-icons">&#xE8AC;</i> Logout
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}

export default Navigation;

