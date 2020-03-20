import {MigrationInterface, QueryRunner} from "typeorm";

export class editItem1583531892282 implements MigrationInterface {
    name = 'editItem1583531892282'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "roomName"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD "roomName" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "roomName"`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ADD "roomName" character varying`, undefined);
    }

}
