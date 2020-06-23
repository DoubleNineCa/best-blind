import {MigrationInterface, QueryRunner} from "typeorm";

export class editOrder1592936187164 implements MigrationInterface {
    name = 'editOrder1592936187164'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" ADD "midPayment" character varying NOT NULL DEFAULT ''`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ADD "finalPayment" character varying NOT NULL DEFAULT ''`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "finalPayment"`, undefined);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "midPayment"`, undefined);
    }

}
