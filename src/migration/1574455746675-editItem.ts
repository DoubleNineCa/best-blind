import {MigrationInterface, QueryRunner} from "typeorm";

export class editItem1574455746675 implements MigrationInterface {
    name = 'editItem1574455746675'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "item" ADD "blindId" integer NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "blindId"`, undefined);
    }

}
