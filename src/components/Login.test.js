import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { render, fireEvent } from "@testing-library/react";
import Login from "./Login";

describe('Login', () => {
    /* Snapshot Testing */
    it('matches the snapshot when a user logs in', () => {
        const store = createStore(reducer, middleware);
        const component = render(
            <Provider store={store}>
                <Login />
            </Provider>);
        expect(component).toMatchSnapshot();
    });

    /* Login Test */
    it('will disable login button if username or password is blank', () => {
        const store = createStore(reducer, middleware);
        var component = render(
            <Provider store={store}>
                <Login />
            </Provider>);

        var username = component.queryByTestId('username-input');
        fireEvent.change(username, { target: { value: '' } });
        var password = component.queryByTestId('password-input');
        fireEvent.change(password, { target: { value: '' } });
        var logInButton = component.getByTestId('login-button');
        expect(logInButton).toBeDisabled();
    });

    it('will enable login button if username and password is filled', () => {
        const store = createStore(reducer, middleware);
        var component = render(
            <Provider store={store}>
                <Login />
            </Provider>);

        var username = component.queryByTestId('username-input');
        fireEvent.change(username, { target: { value: 'billiechan' } });
        var password = component.queryByTestId('password-input');
        fireEvent.change(password, { target: { value: 'pass123' } });
        var logInButton = component.getByTestId('login-button');
        expect(logInButton).not.toBeDisabled();
    });

    it('will display error message if username does not match any user', () => {
        const store = createStore(reducer, middleware);
        var component = render(
            <Provider store={store}>
                <Login />
            </Provider>);

        var username = component.queryByTestId('username-input');
        fireEvent.change(username, { target: { value: 'bil' } });
        var password = component.queryByTestId('password-input');
        fireEvent.change(password, { target: { value: 'pass123' } });
        var logInButton = component.getByTestId('login-button');
        fireEvent.click(logInButton);
        var errorMsg = component.queryByTestId('error-header');
        expect(errorMsg).toBeInTheDocument();
    });

    it('will display error message if password does not match username', () => {
        const store = createStore(reducer, middleware);
        var component = render(
            <Provider store={store}>
                <Login />
            </Provider>);

        var username = component.queryByTestId('username-input');
        fireEvent.change(username, { target: { value: 'billiechan' } });
        var password = component.queryByTestId('password-input');
        fireEvent.change(password, { target: { value: 'pass' } });
        var logInButton = component.getByTestId('login-button');
        fireEvent.click(logInButton);
        var errorMsg = component.queryByTestId('error-header');
        expect(errorMsg).toBeInTheDocument();
    });

    it('will allow user to login as existing user', () => {
        const store = createStore(reducer, middleware);
        var component = render(
            <Provider store={store}>
                <Login />
            </Provider>);

        var newUserButton = component.getByTestId('newuser-button');
        fireEvent.click(newUserButton);
        var oldUserButton = component.getByTestId('olduser-button');
        fireEvent.click(oldUserButton);
        expect(component.getByTestId('login-button')).toBeInTheDocument();
        expect(component.queryByTestId('name-input')).not.toBeInTheDocument();
        expect(component.queryByTestId('signup-button')).not.toBeInTheDocument();
    });

    /* Sign Up Test */
    it('will allow user to sign up as new user', () => {
        const store = createStore(reducer, middleware);
        var component = render(
            <Provider store={store}>
                <Login />
            </Provider>);

        var newUserButton = component.getByTestId('newuser-button');
        fireEvent.click(newUserButton);
        expect(component.queryByTestId('name-input')).toBeInTheDocument();
        expect(component.getByTestId('signup-button')).toBeInTheDocument();
        expect(component.queryByTestId('login-button')).not.toBeInTheDocument();
    });

    it('will disable sign up button if username, name or password is blank', () => {
        const store = createStore(reducer, middleware);
        var component = render(
            <Provider store={store}>
                <Login />
            </Provider>);

        var newUserButton = component.getByTestId('newuser-button');
        fireEvent.click(newUserButton);
        var username = component.queryByTestId('username-input');
        fireEvent.change(username, { target: { value: '' } });
        var name = component.queryByTestId('name-input');
        fireEvent.change(name, { target: { value: '' } });
        var password = component.queryByTestId('password-input');
        fireEvent.change(password, { target: { value: '' } });
        var signUpButton = component.getByTestId('signup-button');
        expect(signUpButton).toBeDisabled();
    });

    it('will enable sign up button if username, name and password is filled', () => {
        const store = createStore(reducer, middleware);
        var component = render(
            <Provider store={store}>
                <Login />
            </Provider>);

        var newUserButton = component.getByTestId('newuser-button');
        fireEvent.click(newUserButton);
        var username = component.queryByTestId('username-input');
        fireEvent.change(username, { target: { value: 'billiechan' } });
        var name = component.queryByTestId('name-input');
        fireEvent.change(name, { target: { value: 'Billie Chan' } });
        var password = component.queryByTestId('password-input');
        fireEvent.change(password, { target: { value: 'pass123' } });
        var signUpButton = component.getByTestId('signup-button');
        expect(signUpButton).not.toBeDisabled();
    });

    it('will display error message if username does not match criteria', () => {
        const store = createStore(reducer, middleware);
        var component = render(
            <Provider store={store}>
                <Login />
            </Provider>);

        var newUserButton = component.getByTestId('newuser-button');
        fireEvent.click(newUserButton);
        var username = component.queryByTestId('username-input');
        fireEvent.change(username, { target: { value: 'bil' } });
        var name = component.queryByTestId('name-input');
        fireEvent.change(name, { target: { value: 'Billie Chan' } });
        var password = component.queryByTestId('password-input');
        fireEvent.change(password, { target: { value: 'pass123' } });
        var signUpButton = component.getByTestId('signup-button');
        fireEvent.click(signUpButton);
        var errorMsg = component.queryByTestId('error-header');
        var info = component.queryByTestId('criteria-info');
        expect(errorMsg).toBeInTheDocument();
        expect(info).toBeInTheDocument();
    });

    it('will display error message if password does not match criteria', () => {
        const store = createStore(reducer, middleware);
        var component = render(
            <Provider store={store}>
                <Login />
            </Provider>);

        var newUserButton = component.getByTestId('newuser-button');
        fireEvent.click(newUserButton);
        var username = component.queryByTestId('username-input');
        fireEvent.change(username, { target: { value: 'billiechan' } });
        var name = component.queryByTestId('name-input');
        fireEvent.change(name, { target: { value: 'Billie Chan' } });
        var password = component.queryByTestId('password-input');
        fireEvent.change(password, { target: { value: 'bil' } });
        var signUpButton = component.getByTestId('signup-button');
        fireEvent.click(signUpButton);
        var errorMsg = component.queryByTestId('error-header');
        var info = component.queryByTestId('criteria-info');
        expect(errorMsg).toBeInTheDocument();
        expect(info).toBeInTheDocument();
    });
})