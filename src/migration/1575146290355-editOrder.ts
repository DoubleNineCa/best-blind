import {MigrationInterface, QueryRunner} from "typeorm";

export class editOrder1575146290355 implements MigrationInterface {
    name = 'editOrder1575146290355'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" ADD "discount" integer NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ADD "installationDiscount" integer NOT NULL DEFAULT 0`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "installationDiscount"`, undefined);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "discount"`, undefined);
    }

}
