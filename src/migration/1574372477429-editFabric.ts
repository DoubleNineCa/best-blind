import {MigrationInterface, QueryRunner} from "typeorm";

export class editFabric1574372477429 implements MigrationInterface {
    name = 'editFabric1574372477429'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fabric" ADD "color" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fabric" DROP COLUMN "color"`, undefined);
    }

}
