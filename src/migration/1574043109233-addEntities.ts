import {MigrationInterface, QueryRunner} from "typeorm";

export class addEntities1574043109233 implements MigrationInterface {
    name = 'addEntities1574043109233'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "item" ("id" SERIAL NOT NULL, "uuid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "width" integer NOT NULL, "height" integer NOT NULL, "handrailMaterial" character varying NOT NULL DEFAULT 'METAL', "handrailType" character varying NOT NULL DEFAULT 'R', "orderId" integer, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "uuid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "orderNo" character varying NOT NULL, "hst" boolean, "deposit" integer, "installation" integer, "total" integer, "status" character varying NOT NULL DEFAULT 'MEASURE', "payment" character varying, "orderDate" TIMESTAMP NOT NULL, "installDate" TIMESTAMP, "customerId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "grade" ("id" SERIAL NOT NULL, "uuid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "fabric" ("id" SERIAL NOT NULL, "uuid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, "manufacturer" character varying NOT NULL, "gradeId" integer, CONSTRAINT "PK_a79c5445789c6ea397fd9a7a865" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" ADD "type" character varying NOT NULL DEFAULT 'INDIVIDUAL'`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_950e218c17c81d5a9ffa1b96080" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "fabric" ADD CONSTRAINT "FK_bb9d67b7ed75099c10f4ad431b8" FOREIGN KEY ("gradeId") REFERENCES "grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fabric" DROP CONSTRAINT "FK_bb9d67b7ed75099c10f4ad431b8"`, undefined);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_950e218c17c81d5a9ffa1b96080"`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "type"`, undefined);
        await queryRunner.query(`DROP TABLE "fabric"`, undefined);
        await queryRunner.query(`DROP TABLE "grade"`, undefined);
        await queryRunner.query(`DROP TABLE "order"`, undefined);
        await queryRunner.query(`DROP TABLE "item"`, undefined);
    }

}
