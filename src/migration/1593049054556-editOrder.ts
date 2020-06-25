import {MigrationInterface, QueryRunner} from "typeorm";

export class editOrder1593049054556 implements MigrationInterface {
    name = 'editOrder1593049054556'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" ADD "installAddress" character varying NOT NULL DEFAULT ''`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "installAddress"`, undefined);
    }

}
