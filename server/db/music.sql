DROP DATABASE IF EXISTS music;
DROP USER IF EXISTS music;
CREATE USER music WITH LOGIN INHERIT UNENCRYPTED PASSWORD 'music';
CREATE DATABASE music WITH OWNER music;

GRANT CONNECT ON DATABASE music TO music;

\c music;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT,INSERT,UPDATE,DELETE ON TABLES TO music;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT USAGE ON SEQUENCES TO music;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT EXECUTE ON FUNCTIONS TO music;