import {MigrationInterface, QueryRunner} from "typeorm";

export class editOrder1574530910699 implements MigrationInterface {
    name = 'editOrder1574530910699'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "hst" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "hst" SET DEFAULT true`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "hst" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "hst" DROP NOT NULL`, undefined);
    }

}
