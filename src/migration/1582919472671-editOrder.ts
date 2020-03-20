import {MigrationInterface, QueryRunner} from "typeorm";

export class editOrder1582919472671 implements MigrationInterface {
    name = 'editOrder1582919472671'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "temp" ("id" SERIAL NOT NULL, "uuid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_fd647a7b9d72ec1b1bf3283fa45" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "installationDiscount"`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ADD "installationDiscount" double precision NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "part" ALTER COLUMN "kind" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "part" ALTER COLUMN "kind" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "installationDiscount"`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ADD "installationDiscount" integer NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`DROP TABLE "temp"`, undefined);
    }

}
