import {MigrationInterface, QueryRunner} from "typeorm";

export class editOrder1583512033541 implements MigrationInterface {
    name = 'editOrder1583512033541'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" ADD "invoiceDate" TIMESTAMP`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "invoiceDate"`, undefined);
    }

}
