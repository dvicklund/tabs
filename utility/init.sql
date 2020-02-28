-- Create tabs database

CREATE TABLE tabs (
  id              SERIAL,
  slug            SERIAL,
  title           varchar(60) NOT NULL,
  artist          varchar(50) NOT NULL,
  content         text,
  created         timetz NOT NULL DEFAULT now(),
  modified        timetz NOT NULL DEFAULT now()
);
