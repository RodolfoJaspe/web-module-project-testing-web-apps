import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)

    const header = screen.getByText(/contact form/i);

    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByPlaceholderText(/edd/i);

    userEvent.type(firstNameInput, "Rodo");

    const firstNameError = screen.queryByText(/must have at least 5 characters/i);
    const lastNameError = screen.queryByText(/lastName is a required field/i);
    const emailError = screen.queryByText(/must be a valid email address/i);

    expect(firstNameError).toBeInTheDocument();
    expect(lastNameError).not.toBeInTheDocument();
    expect(emailError).not.toBeInTheDocument();
    

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole("button", {name: /submit/i})

    userEvent.click(submitButton);

    const firstNameError = screen.getByText(/must have at least 5 characters/i);
    const lastNameError = screen.getByText(/lastName is a required field/i);
    const emailError = screen.getByText(/must be a valid email address/i);

    expect(firstNameError).toBeInTheDocument();
    expect(lastNameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    const lastNameInput = screen.getByPlaceholderText(/Burke/i);
    const submitButton = screen.getByRole("button", {name: /submit/i})

    userEvent.type(firstNameInput, "Rodolfo");
    userEvent.type(lastNameInput, "Jaspe");
    userEvent.click(submitButton);

    const firstNameError = screen.queryByText(/must have at least 5 characters/i);
    const lastNameError = screen.queryByText(/lastName is a required field/i);
    const emailError = screen.getByText(/must be a valid email address/i);

    expect(firstNameError).not.toBeInTheDocument();
    expect(lastNameError).not.toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)

    const emailInput = screen.getByLabelText(/email/i);

    userEvent.type(emailInput, "machete@machete");

    const emailError = screen.getByText(/must be a valid email address/i);

    expect(emailError).toBeVisible()
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

    render(<ContactForm />);

    const submitButton = screen.getByRole("button", {name: /submit/i});

    userEvent.click(submitButton);

    const lastNameError = screen.queryByText(/lastName is a required field/i);

    expect(lastNameError).toBeInTheDocument();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    const lastNameInput = screen.getByPlaceholderText(/burke/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button", {name: /submit/i});
    
    userEvent.type(firstNameInput, "Rodolfo");
    userEvent.type(lastNameInput, "Jaspe");
    userEvent.type(emailInput, "machete@machete.com");
    userEvent.click(submitButton);

    const firstName = screen.queryByText(/Rodolfo/i);
    const lastName = screen.queryByText(/Jaspe/i);
    const email = screen.queryByText(/machete@machete.com/i);

    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    const lastNameInput = screen.getByPlaceholderText(/burke/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole("button", {name: /submit/i});
    
    userEvent.type(firstNameInput, "Rodolfo");
    userEvent.type(lastNameInput, "Jaspe");
    userEvent.type(emailInput, "machete@machete.com");
    userEvent.type(messageInput, "Cool dude");
    userEvent.click(submitButton);

    const firstName = screen.queryByText(/Rodolfo/i);
    const lastName = screen.queryByText(/Jaspe/i);
    const email = screen.queryByText(/machete@machete.com/i);
    const message = screen.queryAllByText(/Cool dude/i);

    console.log(message[1])

    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(message[1]).toBeInTheDocument();    
});