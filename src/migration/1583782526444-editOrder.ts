import {MigrationInterface, QueryRunner} from "typeorm";

export class editOrder1583782526444 implements MigrationInterface {
    name = 'editOrder1583782526444'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" ADD "invAddress" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ADD "invCity" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ADD "invProvince" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ADD "invPostal" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "invPostal"`, undefined);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "invProvince"`, undefined);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "invCity"`, undefined);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "invAddress"`, undefined);
    }

}
