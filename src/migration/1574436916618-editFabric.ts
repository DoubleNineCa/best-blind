import {MigrationInterface, QueryRunner} from "typeorm";

export class editFabric1574436916618 implements MigrationInterface {
    name = 'editFabric1574436916618'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fabric" DROP CONSTRAINT "FK_bb9d67b7ed75099c10f4ad431b8"`, undefined);
        await queryRunner.query(`ALTER TABLE "fabric" RENAME COLUMN "gradeId" TO "grade"`, undefined);
        await queryRunner.query(`ALTER TABLE "fabric" DROP COLUMN "grade"`, undefined);
        await queryRunner.query(`ALTER TABLE "fabric" ADD "grade" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fabric" DROP COLUMN "grade"`, undefined);
        await queryRunner.query(`ALTER TABLE "fabric" ADD "grade" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "fabric" RENAME COLUMN "grade" TO "gradeId"`, undefined);
        await queryRunner.query(`ALTER TABLE "fabric" ADD CONSTRAINT "FK_bb9d67b7ed75099c10f4ad431b8" FOREIGN KEY ("gradeId") REFERENCES "grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
