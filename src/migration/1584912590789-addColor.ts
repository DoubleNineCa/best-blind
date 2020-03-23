import {MigrationInterface, QueryRunner} from "typeorm";

export class addColor1584912590789 implements MigrationInterface {
    name = 'addColor1584912590789'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "color" ("id" SERIAL NOT NULL, "uuid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "color" character varying NOT NULL, CONSTRAINT "UQ_4c5e2e3621137be6eac8c269aa6" UNIQUE ("color"), CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "color"`, undefined);
    }

}
