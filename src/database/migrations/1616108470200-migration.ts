import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1616108470200 implements MigrationInterface {
  name = 'migration1616108470200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "games" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "users_games_games" ("usersId" uuid NOT NULL, "gamesId" uuid NOT NULL, CONSTRAINT "PK_cd4067d574477fd5c7693bc7872" PRIMARY KEY ("usersId", "gamesId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_e5263d029d8644de829aae5c35" ON "users_games_games" ("usersId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_934b0d8f9d0084c97d3876ad32" ON "users_games_games" ("gamesId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "users_games_games" ADD CONSTRAINT "FK_e5263d029d8644de829aae5c35a" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "users_games_games" ADD CONSTRAINT "FK_934b0d8f9d0084c97d3876ad32d" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );

    await queryRunner.query(
      'CREATE TABLE "genres" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), PRIMARY KEY ("id"))'
    );

    await queryRunner.query(
      'CREATE TABLE "games_genres" ("gameId" uuid NOT null, "genresId" uuid NOT null, PRIMARY KEY ("gameId", "genresId"))'
    );

    await queryRunner.query(
      'ALTER TABLE "games_genres" ADD CONSTRAINT "FK_id_games" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO action'
    );

    await queryRunner.query(
      'ALTER TABLE "games_genres" ADD CONSTRAINT "FK_id_genres" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO action'
    );

    await queryRunner.query(
      'CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT null, PRIMARY KEY ("id"))'
    );

    await queryRunner.query(
      'ALTER TABLE "orders" ADD CONSTRAINT "FK_id_users" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO action'
    );

    await queryRunner.query(
      'CREATE TABLE "orders_games" ("ordersId" uuid NOT null, "gamesId" uuid NOT null, PRIMARY KEY ("ordersId", "gamesId"))'
    );

    await queryRunner.query(
      'ALTER TABLE "orders_games" ADD CONSTRAINT "FK_id_games" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO action'
    );

    await queryRunner.query(
      'ALTER TABLE "orders_games" ADD CONSTRAINT "FK_id_orders" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO action'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "orders_games" DROP CONSTRAINT  "FK_id_orders"'
    );
    await queryRunner.query(
      'ALTER TABLE "orders_games" DROP CONSTRAINT  "FK_id_games"'
    );
    await queryRunner.query('DROP TABLE "orders_games"');
    await queryRunner.query(
      'ALTER TABLE "orders" DROP CONSTRAINT  "FK_id_users"'
    );
    await queryRunner.query('DROP TABLE "orders"');
    await queryRunner.query(
      'ALTER TABLE "games_genres" DROP CONSTRAINT  "FK_id_genres"'
    );
    await queryRunner.query(
      'ALTER TABLE "games_genres" DROP CONSTRAINT  "FK_id_games"'
    );
    await queryRunner.query('DROP TABLE "games_genres"');
    await queryRunner.query('DROP TABLE "genres"');
    await queryRunner.query(
      'ALTER TABLE "users_games_games" DROP CONSTRAINT "FK_934b0d8f9d0084c97d3876ad32d"',
    );
    await queryRunner.query(
      'ALTER TABLE "users_games_games" DROP CONSTRAINT "FK_e5263d029d8644de829aae5c35a"',
    );
    await queryRunner.query('DROP INDEX "IDX_934b0d8f9d0084c97d3876ad32"');
    await queryRunner.query('DROP INDEX "IDX_e5263d029d8644de829aae5c35"');
    await queryRunner.query('DROP TABLE "users_games_games"');
    await queryRunner.query('DROP TABLE "games"');
    await queryRunner.query('DROP TABLE "users"');
  }
}
