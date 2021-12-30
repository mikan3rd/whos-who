# Who's who

## Start Development mode

```bash
docker-compose up -d
```

- http://localhost:3400 typescript/packages/frontend
- http://localhost:3300 typescript/packages/backend
  - http://localhost:3300/graphql GraphQL Playground

## Start Production mode

```bash
docker-compose -f docker-compose-production.yaml up -d
```

- http://localhost:3401 typescript/packages/frontend
- http://localhost:3301 typescript/packages/backend

## etc

Please refer to the README of each directory.
