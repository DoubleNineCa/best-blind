import {MigrationInterface, QueryRunner} from "typeorm";

export class editItem1576529923849 implements MigrationInterface {
    name = 'editItem1576529923849'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "item" ("id" SERIAL NOT NULL, "uuid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "partId" integer NOT NULL, "itemName" character varying NOT NULL, "width" double precision, "height" double precision, "price" double precision NOT NULL DEFAULT 0, "handrailMaterial" character varying DEFAULT 'METAL', "handrailType" character varying NOT NULL DEFAULT 'R', "handrailLength" double precision NOT NULL, "coverColor" character varying NOT NULL, "orderId" integer, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "uuid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "orderNo" character varying NOT NULL, "hst" boolean NOT NULL DEFAULT true, "deposit" integer, "discount" integer NOT NULL DEFAULT 0, "installation" integer, "installationDiscount" integer NOT NULL DEFAULT 0, "total" double precision NOT NULL DEFAULT 0, "status" character varying NOT NULL DEFAULT 'MEASURE', "payment" character varying, "orderDate" TIMESTAMP NOT NULL, "installDate" TIMESTAMP, "customerId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "uuid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "type" character varying NOT NULL DEFAULT 'INDIVIDUAL', "note" character varying, CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "grade" ("id" SERIAL NOT NULL, "uuid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "part" ("id" SERIAL NOT NULL, "uuid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "type" character varying NOT NULL, "kind" character varying, "name" character varying NOT NULL, "color" character varying NOT NULL, "manufacturer" character varying NOT NULL, "grade" character varying NOT NULL, "modelNo" character varying, "stocks" integer NOT NULL DEFAULT 0, CONSTRAINT "PK_58888debdf048d2dfe459aa59da" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_950e218c17c81d5a9ffa1b96080" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_950e218c17c81d5a9ffa1b96080"`, undefined);
        await queryRunner.query(`DROP TABLE "part"`, undefined);
        await queryRunner.query(`DROP TABLE "grade"`, undefined);
        await queryRunner.query(`DROP TABLE "customer"`, undefined);
        await queryRunner.query(`DROP TABLE "order"`, undefined);
        await queryRunner.query(`DROP TABLE "item"`, undefined);
    }

}
