import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelation1649543492806 implements MigrationInterface {
  name = 'addRelation1649543492806';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item" ADD "userId" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "userId"`);
  }
}
