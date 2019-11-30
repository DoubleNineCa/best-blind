import {MigrationInterface, QueryRunner} from "typeorm";

export class editOrder1575137154568 implements MigrationInterface {
    name = 'editOrder1575137154568'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" ADD "installationDiscount" integer NOT NULL DEFAULT 0`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "installationDiscount"`, undefined);
    }

}
