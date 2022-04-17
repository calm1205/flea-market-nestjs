module.exports = {
  type: 'postgres',
  host: 'postgres', // コンテナ間はコンテナ名で疎通可能
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  autoLoadEntities: true,
  entities: ['dist/entities/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    entitiesDir: '../entities',
    migrationsDir: '../migrations',
  },
};
