import { MigrationInterface, QueryRunner } from "typeorm";

export class editPart1575062850605 implements MigrationInterface {
    name = 'editPart1575062850605'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "item" RENAME COLUMN "blindId" TO "partId"`, undefined);
        await queryRunner.query(`CREATE TABLE "part" ("id" SERIAL NOT NULL, "uuid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "type" character varying NOT NULL, "name" character varying NOT NULL, "color" character varying NOT NULL, "manufacturer" character varying NOT NULL, "grade" character varying NOT NULL, CONSTRAINT "PK_58888debdf048d2dfe459aa59da" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`DROP TABLE "fabric"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "part"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" RENAME COLUMN "partId" TO "blindId"`, undefined);
    }

}
