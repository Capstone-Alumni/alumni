-- Create migration schema function
CREATE OR REPLACE FUNCTION run_migration(change text) RETURNS void AS
$BODY$
DECLARE
v_schema text;
BEGIN
	FOR v_schema IN
		SELECT quote_ident(nspname)  
		FROM   pg_namespace n
		WHERE  nspname !~~ 'pg_%' 
		LOOP
			EXECUTE 'SET LOCAL search_path = ' || v_schema;
			EXECUTE change;
END LOOP;
END;
$BODY$
LANGUAGE plpgsql VOLATILE
COST 100;