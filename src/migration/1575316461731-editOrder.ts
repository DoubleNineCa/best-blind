import {MigrationInterface, QueryRunner} from "typeorm";

export class editOrder1575316461731 implements MigrationInterface {
    name = 'editOrder1575316461731'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "width"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD "width" double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "height"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD "height" double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "total"`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ADD "total" double precision NOT NULL DEFAULT 0`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "total"`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ADD "total" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "height"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD "height" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "width"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD "width" integer`, undefined);
    }

}
