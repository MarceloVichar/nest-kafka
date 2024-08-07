<img src="docs/kafka.png" alt="Kafka" width="300"/>

# Nest with Kafka

A basic example of Nest application with microservices connecting through kafka

## Run the application

---
Access the directory and open your IDE.

Run the containers:

```bash
docker compose up
```

access the app container:

```bash
docker compose exec app bash
```

Install the dependencies:

```bash
npm install
```

#### Users app

Run the migrate command:

```bash
cd apps/users && npx prisma migrate dev
```

Run the application:

```bash
npm run start:dev
```

#### Configs app

Run the migrate command:

```bash
cd apps/configs && npx prisma migrate dev
```

Run the application:

```bash
npm run start:dev configs
```

#### Control-center

To view the triggered messages, enter the control-center, accessing `localhost:9021`.
