# Experiment Collector Client

This is the client application for the Experiment Collector project. It includes a React-based frontend built with TypeScript, Vite, and other modern web technologies.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
  - [Local Environment](#local-environment)
  - [Dockerized Environment](#dockerized-environment)
- [Running the Application](#running-the-application)
  - [Local Environment](#local-environment)
  - [Dockerized Environment](#dockerized-environment)
- [Scripts](#scripts)
- [Configuration](#configuration)

## Requirements

**(Relevant only for local evironment)**

For this point in time the code is supported by these versions:

- **Node.js**: v21.7.3
- **npm**: v10.5.2

## Installation

#### Local Environment

1. **Download Node.js**:

   - Visit the [Node.js official website](https://nodejs.org/).
   - Download the LTS version (which includes npm) suitable for your operating system.

2. **Install Node.js and npm**:

   - **Windows**:
     - Run the downloaded installer and follow the setup wizard. Ensure the option to install npm is selected.
   - **macOS**:
     - Open the downloaded `.pkg` file and follow the setup instructions.
   - **Linux**:
     - You can use a package manager to install Node.js and npm. For example, on Debian-based systems (like Ubuntu), you can use:
       ```bash
       sudo apt update
       sudo apt install nodejs npm
       ```

3. **Verify Installation**:
   - After installation, you can verify that Node.js and npm are installed correctly by running:
     ```bash
     node -v
     npm -v
     ```
4. **Install dependencies**:
   ```bash
    npm install
   ```
   Step into the client source code and then install the dependencies.

#### Dockerized Environment

1. **Install Docker: If Docker is not already installed, download and install it from [Docker's official website](https://www.docker.com/) based on your opreating system.**

   - **Windows**:
     - Run the installer and follow the setup instructions.
     - Ensure that you enable WSL 2 during the installation process if prompted.
   - **macOS**:
     - Open the downloaded .dmg file and drag Docker to the Applications folder.
     - Open Docker from the Applications folder and follow the setup instructions.
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
       For other distributions, follow the official Docker installation guide.

2. **Build and run the containers**:
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

The application will be available at http://localhost:3001.

- To start the production server:

```bash
 docker-compose up production
```

The application will be available at http://localhost:8080.

## Configuration

The application uses dotenv-flow to manage environment variables, and cannot run without them.

.env file for exmple:

```env
VITE_PORT=3001

VITE_ENV = dev

VITE_REACT_APP_BACKEND_DEV_URL=http://localhost:3000

VITE_REACT_APP_BACKEND_PROD_URL=http://localhost:8081

```

**Reach Prof. Rakefet Ackerman in mail: [ackerman\@technion.ac.il](mailto:ackerman@technion.ac.il?subject=Request%20for%20ENV%20files) for the _.env_ files**
