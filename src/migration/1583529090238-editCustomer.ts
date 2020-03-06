import {MigrationInterface, QueryRunner} from "typeorm";

export class editCustomer1583529090238 implements MigrationInterface {
    name = 'editCustomer1583529090238'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" ADD "roomName" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "UQ_ac1455877a69957f7466d5dc78e" UNIQUE ("name")`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "email" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email")`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "email" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "UQ_ac1455877a69957f7466d5dc78e"`, undefined);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "roomName"`, undefined);
    }

}
