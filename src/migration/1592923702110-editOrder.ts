import {MigrationInterface, QueryRunner} from "typeorm";

export class editOrder1592923702110 implements MigrationInterface {
    name = 'editOrder1592923702110'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" ADD "midPayment" integer NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ADD "finalPayment" integer NOT NULL DEFAULT 0`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "finalPayment"`, undefined);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "midPayment"`, undefined);
    }

}
