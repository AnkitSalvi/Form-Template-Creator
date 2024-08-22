# Form Template Creator

This project is a full-stack application for creating and managing form templates. The client-side is built using React, while the server-side is developed using Node.js with Express.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
  - [Client](#client)
  - [Server](#server)
- [Usage](#usage)
  - [Running the Client](#running-the-client)
  - [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, edit, and delete form templates.
- Manage form fields with various input types (text, radio, checkbox, etc.).
- Save and retrieve form templates from a database.
- RESTful API to handle form template operations.

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Client

The client-side code is located in the `client` directory.

1. Navigate to the `client` directory:
   cd client
Install the dependencies:

npm install
or
yarn install


### Server
The server-side code is located in the server directory.

Navigate to the server directory:
cd server

npm install
or
yarn install

###Set up environment variables by creating a .env file in the server directory. Add the necessary configurations, such as the database connection string, port, etc.
PORT=5000
DATABASE_URL=your_database_url


#$#Running the Client
To start the client application, navigate to the client directory and run:

npm start
or
yarn start
The client will be running on http://localhost:3000.

#$#Running the Server
To start the server application, navigate to the server directory and run:

npm start
or
yarn start
The server will be running on http://localhost:5000.


$$$Technologies Used
Client-side: React, Redux, Axios, Material-UI
Server-side: Node.js, Express, MongoDB (Mongoose)
Other Tools: Jest (for testing), ESLint (for code linting)
Contributing
Contributions are welcome! Please fork this repository and submit a pull request.

###Fork the project
Create your feature branch (git checkout -b feature/new-feature)
Commit your changes (git commit -m 'Add new feature')
Push to the branch (git push origin feature/new-feature)
Open a pull request






