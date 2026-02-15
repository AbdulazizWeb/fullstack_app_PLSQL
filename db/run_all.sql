   SET DEFINE OFF;
SET SERVEROUTPUT ON;

@migrations/V001__init_schema.sql
@migrations/V010__sessions.sql
@data/seed.sql