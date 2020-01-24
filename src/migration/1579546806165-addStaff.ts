import {MigrationInterface, QueryRunner} from "typeorm";

export class addStaff1579546806165 implements MigrationInterface {
    name = 'addStaff1579546806165'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "staff" ("id" SERIAL NOT NULL, "uuid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "staffId" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_a455629d6ffbd1f2953f453f3f9" UNIQUE ("staffId"), CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "staff"`, undefined);
    }

}
