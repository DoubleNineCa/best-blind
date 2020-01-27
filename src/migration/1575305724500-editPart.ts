import {MigrationInterface, QueryRunner} from "typeorm";

export class editPart1575305724500 implements MigrationInterface {
    name = 'editPart1575305724500'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "part" ADD "kind" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "part" ADD "modelNo" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "part" ADD "stocks" integer NOT NULL DEFAULT 0`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "part" DROP COLUMN "stocks"`, undefined);
        await queryRunner.query(`ALTER TABLE "part" DROP COLUMN "modelNo"`, undefined);
        await queryRunner.query(`ALTER TABLE "part" DROP COLUMN "kind"`, undefined);
    }

}
