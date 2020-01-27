import {MigrationInterface, QueryRunner} from "typeorm";

export class editItem1575051419487 implements MigrationInterface {
    name = 'editItem1575051419487'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "item" ADD "itemName" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD "price" double precision NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "width" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "height" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "handrailMaterial" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "handrailMaterial" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "height" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "width" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "price"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "itemName"`, undefined);
    }

}
