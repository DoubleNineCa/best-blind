import {MigrationInterface, QueryRunner} from "typeorm";

export class Customer1573593923957 implements MigrationInterface {
    name = 'Customer1573593923957'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "uuid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "note" character varying, CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "customer"`, undefined);
    }

}
