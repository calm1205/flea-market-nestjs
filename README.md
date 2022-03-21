## setup

```bash
docker compose up -d
docker compose exec node bash
npx typeorm migration:run
```

```bash
npx nest -v
8.2.3
```

## migration

new migration

```
docker compose exec node bash
npx typeorm migration:generate -n <migration_name>
```

migration

```
docker compose exec node bash
npx typeorm migration:run
```
