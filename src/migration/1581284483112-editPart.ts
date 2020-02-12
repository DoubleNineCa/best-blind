import {MigrationInterface, QueryRunner} from "typeorm";

export class editPart1581284483112 implements MigrationInterface {
    name = 'editPart1581284483112'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "part" ALTER COLUMN "type" SET DEFAULT 'FABRIC'`, undefined);
        await queryRunner.query(`ALTER TABLE "part" ALTER COLUMN "kind" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "part" ALTER COLUMN "kind" SET DEFAULT 'COMBI'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "part" ALTER COLUMN "kind" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "part" ALTER COLUMN "kind" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "part" ALTER COLUMN "type" DROP DEFAULT`, undefined);
    }

}
