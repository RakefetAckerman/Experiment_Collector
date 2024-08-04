# Experiment Collector Server

Welcome to the **Experiment Collector Server**. This backend service supports the Experiment Collector platform by providing API endpoints, managing data, and integrating with MongoDB.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
  - [Local Environment](#local-environment)
  - [Dockerized Environment](#dockerized-environment)
- [Running the Application](#running-the-application)
  - [Local Environment](#local-environment-1)
  - [Dockerized Environment](#dockerized-environment-1)
- [Configuration](#configuration)

## Requirements

**For local development:**

- **Node.js**: v21.7.3
- **npm**: v10.5.2
- **MongoDB**: [Follow the MongoDB installation instructions](https://docs.mongodb.com/manual/installation/) if you are setting up MongoDB locally.

## Installation

### Local Environment

1. **Download and Install Node.js and npm**:

   - Visit the [Node.js official website](https://nodejs.org/).
   - Download and install the LTS version (includes npm) suitable for your operating system.

2. **Install Node.js and npm**:

   - **Windows**:
     - Run the downloaded installer and follow the setup wizard, ensuring npm is selected.
   - **macOS**:
     - Open the `.pkg` file and follow the instructions.
   - **Linux**:
     - Use a package manager to install Node.js and npm. For Debian-based systems (like Ubuntu):
       ```bash
       sudo apt update
       sudo apt install nodejs npm
       ```

3. **Verify Installation**:

   - Ensure Node.js and npm are installed correctly:
     ```bash
     node -v
     npm -v
     ```

4. **Install MongoDB**:

   - Follow the [MongoDB installation instructions](https://docs.mongodb.com/manual/installation/) for your operating system.

5. **Install Dependencies**:
   - Navigate to the server directory and install the dependencies:
     ```bash
     npm install
     ```

### Dockerized Environment

1. **Install Docker**: If Docker is not already installed, download and install it from [Docker's official website](https://www.docker.com/) based on your operating system:

   - **Windows**:
     - Run the installer and follow the setup instructions. Enable WSL 2 if prompted.
   - **macOS**:
     - Open the `.dmg` file and drag Docker to the Applications folder. Follow the setup instructions.
   - **Linux**:
     - For Debian-based distributions (like Ubuntu):
       ```bash
       sudo apt update
       sudo apt install apt-transport-https ca-certificates curl software-properties-common
       curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
       sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
       sudo apt update
       sudo apt install docker-ce
       ```

2. **Build and Run the Containers**:

   ```bash
   docker-compose up --build -d
   ```

   The -d flag runs the containers in detached mode.

### Running the Application

#### Local Environment

- To start the development server:

```bash
 npm run dev
```

- To start the production server:

```bash
 npm run prod
```

- To run tests:

```bash
 npm run test
```

On _development_/_production_ environments the application will start based on the configurations of the _.env_ file.

#### Dockerized Environment

- To start the development server:

```bash
 docker-compose up development
```

The application will be available at http://localhost:3000.

- To start the production server:

```bash
 docker-compose up production
```

The application will be available at http://localhost:8081.

## Configuration

The application uses dotenv-flow to manage environment variables, and cannot run without them.

.env file for exmple:

```env
MONGO_PORT = 27017
MONGO_URL= `mongodb://${HOST_TYPE}:${MONGO_PORT}/${DB_NAME}`
PORT = 3000
JWT_SECRET = yoursecretstring
JWT_EXPIRATION = "7d"

EMAIL_SOURCE = yoursmtpprovider@domain.com
EMAIL_APP_PASS = yoursmtpapllicationpassword

CLIENT_DEV_URL = http://localhost:3001
CLIENT_PROD_URL = http://localhost:8080

ERROR_LOGGING ='error'
WARN_LOGGING ='warn'
INFO_LOGGING ='info'
VERBOUSE_LOGGING ='verbose'
DEBUG_LOGGING ='debug'
SILLY_LOGGING ='silly'

```

**Reach Prof. Rakefet Ackerman in mail: [ackerman\@technion.ac.il](mailto:ackerman@technion.ac.il?subject=Request%20for%20ENV%20files) for the _.env_ files**
