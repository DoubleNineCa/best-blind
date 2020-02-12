import {MigrationInterface, QueryRunner} from "typeorm";

export class editBaseEntity1581284274972 implements MigrationInterface {
    name = 'editBaseEntity1581284274972'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "temp" ("id" SERIAL NOT NULL, "uuid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_fd647a7b9d72ec1b1bf3283fa45" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "grade" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "grade" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "part" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "part" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "staff" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "staff" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "staff" ALTER COLUMN "updatedAt" SET DEFAULT timezone('EST'`, undefined);
        await queryRunner.query(`ALTER TABLE "staff" ALTER COLUMN "createdAt" SET DEFAULT timezone('EST'`, undefined);
        await queryRunner.query(`ALTER TABLE "part" ALTER COLUMN "updatedAt" SET DEFAULT timezone('EST'`, undefined);
        await queryRunner.query(`ALTER TABLE "part" ALTER COLUMN "createdAt" SET DEFAULT timezone('EST'`, undefined);
        await queryRunner.query(`ALTER TABLE "grade" ALTER COLUMN "updatedAt" SET DEFAULT timezone('EST'`, undefined);
        await queryRunner.query(`ALTER TABLE "grade" ALTER COLUMN "createdAt" SET DEFAULT timezone('EST'`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updatedAt" SET DEFAULT timezone('EST'`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "createdAt" SET DEFAULT timezone('EST'`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updatedAt" SET DEFAULT timezone('EST'`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "createdAt" SET DEFAULT timezone('EST'`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "updatedAt" SET DEFAULT timezone('EST'`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "createdAt" SET DEFAULT timezone('EST'`, undefined);
        await queryRunner.query(`DROP TABLE "temp"`, undefined);
    }

}
