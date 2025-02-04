import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1738670549529 implements MigrationInterface {
    name = 'Migration1738670549529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."activity_action_enum" AS ENUM('create', 'update', 'download_report', 'login')`);
        await queryRunner.query(`CREATE TYPE "public"."activity_updatedfield_enum" AS ENUM('name', 'email', 'role', 'password')`);
        await queryRunner.query(`CREATE TYPE "public"."activity_status_enum" AS ENUM('success', 'failure')`);
        await queryRunner.query(`CREATE TABLE "activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "action" "public"."activity_action_enum" NOT NULL, "updatedField" "public"."activity_updatedfield_enum", "status" "public"."activity_status_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_3571467bcbe021f66e2bdce96ea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_3571467bcbe021f66e2bdce96ea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "activity"`);
        await queryRunner.query(`DROP TYPE "public"."activity_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."activity_updatedfield_enum"`);
        await queryRunner.query(`DROP TYPE "public"."activity_action_enum"`);
    }

}
