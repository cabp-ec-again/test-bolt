/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     9/19/2024 11:00:10 PM                        */

DROP INDEX abilities_pk;
DROP TABLE abilities;
DROP INDEX egg_groups_pk;
DROP TABLE egg_groups;
DROP INDEX pokemons_pk;
DROP TABLE pokemons;
DROP INDEX abilities_pokemons_fk;
DROP INDEX pokemon_abilities2_fk;
DROP INDEX pokemon_abilities_pk;
DROP TABLE pokemon_abilities;
DROP INDEX pokemons_groups_fk;
DROP INDEX pokemon_groups2_fk;
DROP INDEX pokemon_groups_pk;
DROP TABLE pokemon_groups;
DROP INDEX types_pokemons_fk;
DROP INDEX pokemon_types2_fk;
DROP INDEX pokemon_types_pk;
DROP TABLE pokemon_types;
DROP INDEX poke_types_pk;
DROP TABLE poke_types;

/* Table: abilities */
CREATE TABLE abilities
(
  ability_id  SERIAL       NOT NULL,
  name        VARCHAR(64)  NOT NULL,
  description VARCHAR(255) NULL,
  created_at  DATE         NOT NULL DEFAULT now(),
  updated_at  DATE         NULL,
  CONSTRAINT pk_abilities PRIMARY KEY (ability_id)
);

/* Index: abilities_pk */
CREATE UNIQUE INDEX abilities_pk ON abilities (ability_id);

/* Table: egg_groups */
CREATE TABLE egg_groups
(
  egg_group_id SERIAL       NOT NULL,
  name         VARCHAR(64)  NOT NULL,
  description  VARCHAR(255) NULL,
  created_at   DATE         NOT NULL DEFAULT now(),
  updated_at   DATE         NULL,
  CONSTRAINT pk_egg_groups PRIMARY KEY (egg_group_id)
);

/* Index: egg_groups_pk */
CREATE UNIQUE INDEX egg_groups_pk ON egg_groups (egg_group_id);

/* Table: pokemons */
CREATE TABLE pokemons
(
  pokemon_id            SERIAL        NOT NULL,
  name                  VARCHAR(64)   NOT NULL,
  number                INT4          NOT NULL,
  description           VARCHAR(255)  NOT NULL,
  evolution_description VARCHAR(255)  NULL,
  height                DECIMAL(3, 2) NOT NULL,
  weight                DECIMAL(3, 2) NOT NULL,
  gender_ratio_male     DECIMAL(3, 2) NOT NULL,
  gender_ratio_female   DECIMAL(3, 2) NOT NULL,
  evolution             INT4          NULL,
  created_at            DATE          NOT NULL DEFAULT now(),
  updated_at            DATE          NULL,
  CONSTRAINT pk_pokemons PRIMARY KEY (pokemon_id)
);

/* Index: pokemons_pk */
CREATE UNIQUE INDEX pokemons_pk ON pokemons (pokemon_id);

/* Table: pokemon_abilities */
CREATE TABLE pokemon_abilities
(
  ability_id INT4 NOT NULL,
  pokemon_id INT4 NOT NULL,
  CONSTRAINT pk_pokemon_abilities PRIMARY KEY (ability_id, pokemon_id)
);

/* Index: pokemon_abilities_pk */
CREATE UNIQUE INDEX pokemon_abilities_pk ON pokemon_abilities (ability_id, pokemon_id);

/* Index: pokemon_abilities2_fk */
CREATE INDEX pokemon_abilities2_fk ON pokemon_abilities (pokemon_id);

/* Index: abilities_pokemons_fk */
CREATE INDEX abilities_pokemons_fk ON pokemon_abilities (ability_id);

/* Table: pokemon_groups */
CREATE TABLE pokemon_groups
(
  pokemon_id   INT4 NOT NULL,
  egg_group_id INT4 NOT NULL,
  CONSTRAINT pk_pokemon_groups PRIMARY KEY (pokemon_id, egg_group_id)
);

/* Index: pokemon_groups_pk */
CREATE UNIQUE INDEX pokemon_groups_pk ON pokemon_groups (pokemon_id, egg_group_id);

/* Index: pokemon_groups2_fk */
CREATE INDEX pokemon_groups2_fk ON pokemon_groups (egg_group_id);

/* Index: pokemons_groups_fk */
CREATE INDEX pokemons_groups_fk ON pokemon_groups (pokemon_id);

/* Table: pokemon_types */
CREATE TABLE pokemon_types
(
  poketype_id INT4 NOT NULL,
  pokemon_id  INT4 NOT NULL,
  CONSTRAINT pk_pokemon_types PRIMARY KEY (poketype_id, pokemon_id)
);

/* Index: pokemon_types_pk */
CREATE UNIQUE INDEX pokemon_types_pk ON pokemon_types (poketype_id, pokemon_id);

/* Index: pokemon_types2_fk */
CREATE INDEX pokemon_types2_fk ON pokemon_types (pokemon_id);

/* Index: types_pokemons_fk */
CREATE INDEX types_pokemons_fk ON pokemon_types (poketype_id);

/* Table: poke_types */
CREATE TABLE poke_types
(
  poketype_id          SERIAL       NOT NULL,
  poketype_name        VARCHAR(64)  NOT NULL,
  poketype_description VARCHAR(255) NULL,
  poketype_created_at  DATE         NOT NULL,
  poketype_updated_at  DATE         NULL,
  CONSTRAINT pk_poke_types PRIMARY KEY (poketype_id)
);

/* Index: poke_types_pk */
CREATE UNIQUE INDEX poke_types_pk ON poke_types (poketype_id);

ALTER TABLE pokemon_abilities
  add CONSTRAINT fk_pa_ability FOREIGN KEY (ability_id)
    REFERENCES abilities (ability_id)
    ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE pokemon_abilities
  add CONSTRAINT fk_pa_pokemon FOREIGN KEY (pokemon_id)
    REFERENCES pokemons (pokemon_id)
    ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE pokemon_groups
  add CONSTRAINT fk_pg_group FOREIGN KEY (egg_group_id)
    REFERENCES egg_groups (egg_group_id)
    ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE pokemon_groups
  add CONSTRAINT fk_pg_pokemon FOREIGN KEY (pokemon_id)
    REFERENCES pokemons (pokemon_id)
    ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE pokemon_types
  add CONSTRAINT fk_py_pokemon FOREIGN KEY (pokemon_id)
    REFERENCES pokemons (pokemon_id)
    ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE pokemon_types
  add CONSTRAINT fk_pt_type FOREIGN KEY (poketype_id)
    REFERENCES poke_types (poketype_id)
    ON DELETE RESTRICT ON UPDATE RESTRICT;

