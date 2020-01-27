import {MigrationInterface, QueryRunner} from "typeorm";

export class editItem1576530176948 implements MigrationInterface {
    name = 'editItem1576530176948'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "item" ADD "handrailLength" double precision NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD "coverColor" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "coverColor"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "handrailLength"`, undefined);
    }

}
