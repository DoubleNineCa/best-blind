import {MigrationInterface, QueryRunner} from "typeorm";

export class editCustomer1583770802808 implements MigrationInterface {
    name = 'editCustomer1583770802808'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "customer" ADD "city" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" ADD "province" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" ADD "postal" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "postal"`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "province"`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "city"`, undefined);
    }

}
