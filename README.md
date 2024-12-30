# Project: Data Management System

## Overview
This project is a data management system for inserting street data in Israel into a database using a queuing platform. It is built using **Node.js** and **TypeScript**. The project utilizes **RabbitMQ** for queuing and **PostgreSQL** as the database.

### Components
- **Publisher Service**: Publishes city information to RabbitMQ.
- **Consumer Service**: Consumes city information from RabbitMQ, fetches corresponding street data using the StreetsService, and inserts the data into the database.

### Technology Stack
- **Node.js** (v16.x)
- **TypeScript** (v4.x)
- **RabbitMQ** (message queue)
- **PostgreSQL** (database)
- **Docker** (for containerization)


## Setup and Installation
### Prerequisites
- Docker and Docker Compose installed

### Steps to Run
1. **Clone the repository**:
   ```bash
   git clone git@github.com:liorsham/dm-assignment.git
   cd dm-assignment
   ```

2. **Build the published**:
   ```bash
    cd src/publisher
    npm install
    npm run build
    cd ../..
    ```
    
3. **Build and start all services**:
   ```bash
   docker-compose up --build
   ```
   This will set up RabbitMQ, PostgreSQL, and consumer services.


## Running the Publisher
The publisher publishes city data to RabbitMQ.

### Example Command
Run the following command to publish city information (use "" if the city has space in it):
```bash
cd src/publisher
npm run publish <City Name>
```

### Expected Output
- The message is published to the `street_data` queue in RabbitMQ.
- You can verify the queue status in the RabbitMQ Management UI (port 15672).

## Running the Consumer
The consumer processes messages from RabbitMQ:
1. Fetches the city details.
2. Ensures the city and region exist in the database.
3. Fetches the corresponding street data using `StreetsService`.
4. Inserts the street data into the database.

The consumer service automatically starts when you run `docker-compose up`.

## Testing the Application
### Running Tests
1. Install Jest:
   ```bash
   npm install --save-dev jest @types/jest ts-jest
   ```

2. Run tests:
   ```bash
   npm test
   ```

## Example Workflow
1. Start the application:
   ```bash
   docker-compose up --build
   ```

2. Publish a city message:
   ```bash
   npm run publish Ashdod
   ```

3. Verify the consumer:
   - Check the logs for successful message processing.
   - Verify the `regions`, `cities`, and `streets` tables in PostgreSQL are populated correctly.

## Troubleshooting
### Common Issues
- **RabbitMQ Connection Issues**:
  Ensure RabbitMQ is running and accessible on port `5672`.
- **Database Connection Issues**:
  Ensure PostgreSQL is running and accessible on port `5432`.

