import {MigrationInterface, QueryRunner} from "typeorm";

export class editItem1584731368015 implements MigrationInterface {
    name = 'editItem1584731368015'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "item" ADD "partType" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "partType"`, undefined);
    }

}
