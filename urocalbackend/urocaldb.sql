/*
created: 1/11/2020
modified: 14/12/2020
model: re postgresql 12
database: postgresql 12
*/

-- create sequences section -------------------------------------------------

create sequence "public"."almacenamiento_almacenamientoid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."asociacion_asociacionid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."carga_cargaid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."centroacopio_centroacopioid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."ciudad_ciudadid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."compra_compraid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."contrato_contratoid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."controlmaleza_controlmalezaid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."cosecha_cosechaid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."despacho_despachoid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."detallecompra_detallecompraid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."detallefacturaexportacion_detallefacturaexportacion_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."empresa_empresaid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."facturaexportacion_facturaexportacionid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."fetilizacion_fertilizacionid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."fitosanitario_fitosanitarioid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."guiaremision_guiaremisionid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."limpiezaherramienta_limpiezaherramientaid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."medioambiente_medioambienteid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."mix_mixid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."pais_paisid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."palet_paletid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."finca_fincaid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."persona_personaid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."egresoinsumo_egresoinsumosid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."poda_podaid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."producto_productoid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."productor_productorid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."provincia_provinciaid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."registroenvio_registroenvioid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."revisionhumedad_revisionhumedadid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."riego_riegoid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."siembra_siembraid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."sitio_sitioid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."suelo_sueloid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."tratamiento_tratamientoid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

create sequence "public"."vehiculo_vehiculoid_seq"
  as integer
  increment by 1
  start with 1
  maxvalue 2147483647
  no minvalue
  cache 1
;

-- create tables section -------------------------------------------------

-- table public.almacenamiento

create table "public"."almacenamiento"
(
  "almacenamientoid" integer default nextval('"almacenamiento_almacenamientoid_seq"'::regclass) not null,
  "almcontrato" text,
  "almfechaacopio" date,
  "almfechaingresobodega" date,
  "almnumerobultos" numeric(10,4),
  "almpesobulto" numeric(10,4),
  "almpesototalingreso" numeric(10,4),
  "almsaldo" numeric(10,4),
  "almobservaciones" text,
  "tratamientoid" integer default nextval('"tratamiento_tratamientoid_seq"'::regclass),
  "centroacopioid" integer default nextval('"centroacopio_centroacopioid_seq"'::regclass) not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."almacenamiento" add constraint "almacenamiento_pkey" primary key ("almacenamientoid")
;

-- table public.asociacion

create table "public"."asociacion"
(
  "asociacionid" integer default nextval('"asociacion_asociacionid_seq"'::regclass) not null,
  "asonombre" text not null,
  "asoabreviado" text,
  "asoruc" text not null,
  "asoobservacion" text,
  "asonumerosocios" integer,
  "asonumerohombres" integer,
  "asonumeromujeres" integer,
  "asoresponsableid" integer default nextval('"persona_personaid_seq"'::regclass)
)
with (
  autovacuum_enabled=true)
;

alter table "public"."asociacion" add constraint "asociacion_pkey" primary key ("asociacionid")
;

alter table "public"."asociacion" add constraint "asoruc" unique ("asoruc")
;

-- table public.carga

create table "public"."carga"
(
  "cargaid" integer default nextval('"carga_cargaid_seq"'::regclass) not null,
  "carcantidad" numeric(10,4),
  "carunidad" text,
  "cardescripcion" bigint,
  "carestado" text,
  "cosechaid" integer default nextval('"cosecha_cosechaid_seq"'::regclass),
  "guiaremisionid" integer default nextval('"guiaremision_guiaremisionid_seq"'::regclass)
)
with (
  autovacuum_enabled=true)
;

alter table "public"."carga" add constraint "carga_pkey" primary key ("cargaid")
;

-- table public.centroacopio

create table "public"."centroacopio"
(
  "centroacopioid" integer default nextval('"centroacopio_centroacopioid_seq"'::regclass) not null,
  "centroacopionombre" text,
  "responsableacopioid" integer
)
with (
  autovacuum_enabled=true)
;

alter table "public"."centroacopio" add constraint "centroacopio_pkey" primary key ("centroacopioid")
;

-- table public.ciudad

create table "public"."ciudad"
(
  "ciudadid" integer default nextval('"ciudad_ciudadid_seq"'::regclass) not null,
  "ciudadnombre" text not null,
  "provinciaid" integer not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."ciudad" add constraint "ciudad_pkey" primary key ("ciudadid")
;

-- table public.compra

create table "public"."compra"
(
  "compraid" integer default nextval('"compra_compraid_seq"'::regclass) not null,
  "comnumero" integer not null,
  "comfechaemision" date,
  "comsubtotal" numeric(10,4),
  "comdescuentos" numeric(10,4),
  "comotrosvalores" numeric(10,4),
  "comtotal" numeric(10,4),
  "comobservaciones" text,
  "guiaremisionid" integer default nextval('"guiaremision_guiaremisionid_seq"'::regclass)
)
with (
  autovacuum_enabled=true)
;

alter table "public"."compra" add constraint "compra_pkey" primary key ("compraid")
;

alter table "public"."compra" add constraint "comnumero" unique ("comnumero")
;

-- table public.conductor

create table "public"."conductor"
(
  "conductorid" integer default nextval('"persona_personaid_seq"'::regclass) not null,
  "conductorlicencia" bigint
)
with (
  autovacuum_enabled=true)
;

alter table "public"."conductor" add constraint "conductor_pkey" primary key ("conductorid")
;

-- table public.controlmaleza

create table "public"."controlmaleza"
(
  "controlmalezaid" integer default nextval('"controlmaleza_controlmalezaid_seq"'::regclass) not null,
  "confecha" date,
  "conhectareas" numeric(10,4),
  "conmetodo" text,
  "conoperario" text,
  "cultivoid" integer not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."controlmaleza" add constraint "controlmaleza_pkey" primary key ("controlmalezaid")
;

-- table public.cosecha

create table "public"."cosecha"
(
  "cosechaid" integer default nextval('"cosecha_cosechaid_seq"'::regclass) not null,
  "cosfecha" date,
  "coscantidad" numeric(10,4),
  "cosunidad" text,
  "cospesototal" numeric(10,4),
  "cosobservacion" text,
  "coscodigo" text not null,
  "tratamientoid" integer default nextval('"tratamiento_tratamientoid_seq"'::regclass),
  "cultivoid" integer not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."cosecha" add constraint "cosecha_pkey" primary key ("cosechaid")
;

alter table "public"."cosecha" add constraint "coscodigo" unique ("coscodigo")
;

-- table public.despacho

create table "public"."despacho"
(
  "despachoid" integer default nextval('"despacho_despachoid_seq"'::regclass) not null,
  "desnumero" integer,
  "desfechasalida" date,
  "desdestino" text,
  "desmotivo" text,
  "desorganico" boolean,
  "desspp" boolean
)
with (
  autovacuum_enabled=true)
;

alter table "public"."despacho" add constraint "despacho_pkey" primary key ("despachoid")
;

-- table public.detallecompra

create table "public"."detallecompra"
(
  "detallecompraid" integer default nextval('"cosecha_cosechaid_seq"'::regclass) not null,
  "detporcentajefermentacion" numeric(10,4),
  "detporcentajehumedad" numeric(10,4),
  "detporcentajeimpurezas" numeric(10,4),
  "detmoho" boolean,
  "detpizarra" boolean,
  "detvioleta" boolean,
  "detsemivioleta" boolean,
  "detoptimio" boolean,
  "detpenalidad" text,
  "detestimulo" numeric(10,4),
  "dettara" numeric(10,4),
  "detestado" text,
  "detunidad" text,
  "detpreciounidad" numeric(10,4),
  "detcantidadunidades" numeric(10,4),
  "detpreciototal" numeric(10,4),
  "compraid" integer
)
with (
  autovacuum_enabled=true)
;

alter table "public"."detallecompra" add constraint "detallecompra_pkey" primary key ("detallecompraid")
;

-- table public.detalleenvio

create table "public"."detalleenvio"
(
  "detalleenvioid" serial not null,
  "detenvcantidad" numeric(10,4) not null,
  "detenvunidades" text,
  "registroenvioid" integer,
  "guiaremisionid" integer default nextval('"guiaremision_guiaremisionid_seq"'::regclass),
  "cosechaid" integer default nextval('"cosecha_cosechaid_seq"'::regclass)
)
with (
  autovacuum_enabled=true)
;

alter table "public"."detalleenvio" add constraint "detalleenvio_pkey" primary key ("detalleenvioid")
;

-- table public.detallefacturaexportacion

create table "public"."detallefacturaexportacion"
(
  "detallefacturaexportacion" integer default nextval('"detallefacturaexportacion_detallefacturaexportacion_seq"'::regclass) not null,
  "detcodigoprincipal" integer,
  "detcantidad" integer,
  "detdescripcion" text,
  "detpreciounitario" numeric(10,4),
  "detporcentajedesc" numeric(10,4),
  "detpreciototal" numeric(10,4),
  "facturaexportacionid" integer
)
with (
  autovacuum_enabled=true)
;

alter table "public"."detallefacturaexportacion" add constraint "detallefacturaexportacion_pkey" primary key ("detallefacturaexportacion")
;

-- table public.empresa

create table "public"."empresa"
(
  "empresaid" integer default nextval('"empresa_empresaid_seq"'::regclass) not null,
  "emprazonsocial" text,
  "empruc" text not null,
  "emptipo" text,
  "empdireccion" text,
  "emptelefono" text,
  "empemail" text,
  "paisid" integer
)
with (
  autovacuum_enabled=true)
;

alter table "public"."empresa" add constraint "empresa_pkey" primary key ("empresaid")
;

alter table "public"."empresa" add constraint "empruc" unique ("empruc")
;

-- table public.exportador

create table "public"."exportador"
(
  "exportadorid" integer default nextval('"persona_personaid_seq"'::regclass) not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."exportador" add constraint "exportador_pkey" primary key ("exportadorid")
;

-- table public.facturaexportacion

create table "public"."facturaexportacion"
(
  "facturaexportacionid" integer default nextval('"facturaexportacion_facturaexportacionid_seq"'::regclass) not null,
  "facnumero" text not null,
  "compradorid" integer,
  "vendedorid" integer default nextval('"empresa_empresaid_seq"'::regclass),
  "facfecha" date,
  "facpuertoembarque" text,
  "facpuertodestino" text,
  "facvapor" text,
  "facsubtotal12" numeric(10,4),
  "facsubtotal0" numeric(10,4),
  "facsubtotalsiniva" numeric(10,4),
  "facsubtotalivaexcento" numeric(10,4),
  "facsubtotalsinimpuestos" numeric(10,4),
  "factotaldesc" numeric(10,4),
  "facice" numeric(10,4),
  "faciva12" numeric(10,4),
  "facirbpn" numeric(10,4),
  "facvalortotal" numeric(10,4),
  "facformapago" text,
  "facplazo" integer,
  "factiempo" text,
  "facdae" text,
  "facpesoneto" numeric(10,4),
  "facpesobruto" numeric(10,4),
  "faclote" text not null,
  "faccontenedor" text,
  "facsemana" integer,
  "facfechazarpe" date,
  "facmarca" text,
  "faccertificaciones" text
)
with (
  autovacuum_enabled=true)
;

alter table "public"."facturaexportacion" add constraint "facturaexportacion_pkey" primary key ("facturaexportacionid")
;

alter table "public"."facturaexportacion" add constraint "faclote" unique ("faclote")
;

alter table "public"."facturaexportacion" add constraint "facnumero" unique ("facnumero")
;

-- table public.fertilizacion

create table "public"."fertilizacion"
(
  "fertilizacionid" integer default nextval('"fetilizacion_fertilizacionid_seq"'::regclass) not null,
  "ferciclo" text,
  "ferfecha" date,
  "fernombrecomercial" text,
  "ferelementos" text,
  "ferconcentracion" text,
  "ferareaaplicada" numeric(10,4),
  "fercantidadaplicada" numeric(10,4),
  "ferunidadmedida" text,
  "ferequipoaplicacion" text,
  "fermetodoaplicacion" text,
  "feroperario" text,
  "cultivoid" integer not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."fertilizacion" add constraint "fetilizacion_pkey" primary key ("fertilizacionid")
;

-- table public.fitosanitario

create table "public"."fitosanitario"
(
  "fitosanitarioid" integer default nextval('"fitosanitario_fitosanitarioid_seq"'::regclass) not null,
  "fitciclo" text,
  "fitfecha" date,
  "fitnombrecomercial" text,
  "fitingredienteactivo" text,
  "fitautorizaciontecnica" text,
  "fitnombrecomun" text,
  "fitdosis" text,
  "fitcantidadtotal" numeric(10,4),
  "fitareaaplicada" numeric(10,4),
  "fitequipoaplicacion" text,
  "fitmetodo" text,
  "fitplazoseguridad" integer,
  "fitoperario" text,
  "cultivoid" integer not null,
  "condicionclimaticaid" integer not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."fitosanitario" add constraint "fitosanitario_pkey" primary key ("fitosanitarioid")
;

-- table public.guiaremision

create table "public"."guiaremision"
(
  "guiaremisionid" integer default nextval('"guiaremision_guiaremisionid_seq"'::regclass) not null,
  "guiserie" text,
  "guinumero" integer,
  "guifechaemision" date,
  "guifechainicio" date,
  "guihorainicio" time,
  "guifechafin" date,
  "guihorafin" time,
  "guipuntoinicio" text,
  "guipuntofin" text,
  "guicomprobanteventa" bigint,
  "guimotivo" text,
  "guidestinatario" text,
  "guiformapago" text,
  "guiobservacion" text,
  "guiemiteurocal" boolean,
  "conductorid" integer not null,
  "vehiculoid" integer default nextval('"vehiculo_vehiculoid_seq"'::regclass) not null,
  "productorid" integer default nextval('"productor_productorid_seq"'::regclass)
)
with (
  autovacuum_enabled=true)
;

alter table "public"."guiaremision" add constraint "guiaremision_pkey" primary key ("guiaremisionid")
;

-- table public.limpiezaherramienta

create table "public"."limpiezaherramienta"
(
  "limpiezaherramientaid" integer default nextval('"limpiezaherramienta_limpiezaherramientaid_seq"'::regclass) not null,
  "limfecha" date,
  "limproducto" text,
  "limequipos" text,
  "limmaquinaria" text,
  "limherramientas" text,
  "limcajones" text,
  "limtendales" text,
  "limoperario" text,
  "cultivoid" integer not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."limpiezaherramienta" add constraint "limpiezaherramienta_pkey" primary key ("limpiezaherramientaid")
;

-- table public.medioambiente

create table "public"."medioambiente"
(
  "medioambienteid" integer default nextval('"medioambiente_medioambienteid_seq"'::regclass) not null,
  "medtemperaturapromedio" numeric(5,4),
  "medaltitud" numeric(10,4),
  "medtopografia" text,
  "medhumedadrelativa" numeric(5,4),
  "medpluviosidad" text,
  "medotros" text,
  "medtomamuestra" date,
  "lotecultivadoid" integer not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."medioambiente" add constraint "medioambiente_pkey" primary key ("medioambienteid")
;

-- table public.mix

create table "public"."mix"
(
  "mixid" integer default nextval('"mix_mixid_seq"'::regclass) not null,
  "almacenamientoid" integer,
  "cosechaid" integer default nextval('"cosecha_cosechaid_seq"'::regclass)
)
with (
  autovacuum_enabled=true)
;

alter table "public"."mix" add constraint "mix_pkey" primary key ("mixid")
;

-- table public.pais

create table "public"."pais"
(
  "paisid" integer default nextval('"pais_paisid_seq"'::regclass) not null,
  "paisnombre" text not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."pais" add constraint "pais_pkey" primary key ("paisid")
;

-- table public.finca

create table "public"."finca"
(
  "fincaid" integer default nextval('"finca_fincaid_seq"'::regclass) not null,
  "fincodigo" text not null,
  "finnombrefinca" text,
  "finsuperficietotal" numeric(10,4),
  "finsuperficiecultivada" numeric(10,4),
  "fincoordenadax" numeric(10,4),
  "fincoordenaday" numeric(10,4),
  "finproductosprohibidos" date,
  "finprimerainspeccion" date,
  "fin ultimainspeccion" date,
  "finnoconformidades" text,
  "fincertificacioneu" text,
  "fincertificacionnop" text,
  "fincertificacionjas" text,
  "finobservacion" text,
  "asociacionid" integer,
  "propietarioid" integer,
  "sitioid" integer
)
with (
  autovacuum_enabled=true)
;

alter table "public"."finca" add constraint "finca_pkey" primary key ("fincaid")
;

alter table "public"."finca" add constraint "fincodigo" unique ("fincodigo")
;

-- table public.persona

create table "public"."persona"
(
  "personaid" integer default nextval('"persona_personaid_seq"'::regclass) not null,
  "percedula" text not null,
  "perapellidos" text not null,
  "pernombres" text not null,
  "perdireccion" text,
  "pertelefono" text,
  "perwhatsapp" text,
  "peremail" text,
  "pergenero" text,
  "perfechanacimiento" text,
  "ciudadnacimientoid" integer default nextval('"ciudad_ciudadid_seq"'::regclass) not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."persona" add constraint "persona_pkey" primary key ("personaid")
;

alter table "public"."persona" add constraint "percedula" unique ("percedula")
;

-- table public.poda

create table "public"."poda"
(
  "podaid" integer default nextval('"poda_podaid_seq"'::regclass) not null,
  "podfecha" date,
  "podtipo" text,
  "podhectareas" numeric(10,4),
  "podcantidadplantas" integer,
  "podherramienta" text,
  "podoperario" text,
  "cultivoid" integer not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."poda" add constraint "poda_pkey" primary key ("podaid")
;

-- table public.producto

create table "public"."producto"
(
  "productoid" integer default nextval('"producto_productoid_seq"'::regclass) not null,
  "pronombre" text not null,
  "provariedad" text,
  "procaracteristica" text,
  "procodigo" text not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."producto" add constraint "producto_pkey" primary key ("productoid")
;

alter table "public"."producto" add constraint "procodigo" unique ("procodigo")
;

-- table public.productor

create table "public"."productor"
(
  "productorid" integer default nextval('"persona_personaid_seq"'::regclass) not null,
  "productoridioma" text
)
with (
  autovacuum_enabled=true)
;

alter table "public"."productor" add constraint "productor_pkey" primary key ("productorid")
;

-- table public.provincia

create table "public"."provincia"
(
  "provinciaid" integer default nextval('"provincia_provinciaid_seq"'::regclass) not null,
  "provincianombre" text not null,
  "paisid" integer not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."provincia" add constraint "provincia_pkey" primary key ("provinciaid")
;

-- table public.registroenvio

create table "public"."registroenvio"
(
  "registroenvioid" integer default nextval('"registroenvio_registroenvioid_seq"'::regclass) not null,
  "regfecha" date,
  "reglote" text not null,
  "regdestino" text,
  "regtipo" text,
  "regorganico" boolean,
  "regspp" boolean
)
with (
  autovacuum_enabled=true)
;

alter table "public"."registroenvio" add constraint "registroenvio_pkey" primary key ("registroenvioid")
;

alter table "public"."registroenvio" add constraint "reglote" unique ("reglote")
;

-- table public.responsableacopio

create table "public"."responsableacopio"
(
  "responsableacopioid" integer default nextval('"persona_personaid_seq"'::regclass) not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."responsableacopio" add constraint "responsableacopio_pkey" primary key ("responsableacopioid")
;

-- table public.revisionhumedad

create table "public"."revisionhumedad"
(
  "revisionhumedadid" integer default nextval('"revisionhumedad_revisionhumedadid_seq"'::regclass) not null,
  "revporcentajehumedad" numeric(10,4),
  "revfechaingresosecadora" date,
  "revhoraingresosecadora" time,
  "revfechasalidasecadora" date,
  "revhorasalidasecadora" time,
  "almacenamientoid" integer
)
with (
  autovacuum_enabled=true)
;

alter table "public"."revisionhumedad" add constraint "revisionhumedad_pkey" primary key ("revisionhumedadid")
;

-- table public.riego

create table "public"."riego"
(
  "riegoid" integer default nextval('"riego_riegoid_seq"'::regclass) not null,
  "riesuperficie" numeric(10,4),
  "riemodulos" integer,
  "riesemana" integer,
  "rieanio" integer,
  "riehorasregadas" time,
  "rieporcentajeeficiencia" numeric(10,4),
  "rievolumenutilizado" numeric(10,4),
  "rieoperario" text,
  "cultivoid" integer not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."riego" add constraint "riego_pkey" primary key ("riegoid")
;

-- table public.siembra

create table "public"."siembra"
(
  "siembraid" integer default nextval('"siembra_siembraid_seq"'::regclass) not null,
  "siefechacomprasemilla" date,
  "sieproveedorsemilla" text,
  "siefechasiembra" date,
  "siecantidadplantas" integer,
  "siehectareas" numeric(10,4),
  "sieoperario" text,
  "cultivoid" integer not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."siembra" add constraint "siembra_pkey" primary key ("siembraid")
;

-- table public.calidadsemilla

create table "public"."calidadsemilla"
(
  "calidadsemillaid" integer default nextval('"siembra_siembraid_seq"'::regclass) not null,
  "siecriterioaltura" numeric(10,4),
  "siecriteriopeso" numeric(10,4),
  "siesignosplaga" boolean,
  "sieproductoaplicado" text,
  "sieingredienteactivo" text,
  "siedosishectarea" text,
  "sietotalproducto" numeric(30,6),
  "siemetodoaplicacion" text,
  "siemaquinaria" text,
  "siembraid" integer default nextval('"siembra_siembraid_seq"'::regclass) not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."calidadsemilla" add constraint "calidadsemilla_pkey" primary key ("calidadsemillaid")
;

-- table public.sitio

create table "public"."sitio"
(
  "sitioid" integer default nextval('"sitio_sitioid_seq"'::regclass) not null,
  "sitionombre" text not null,
  "ciudadid" integer not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."sitio" add constraint "sitio_pkey" primary key ("sitioid")
;

-- table public.suelo

create table "public"."suelo"
(
  "sueloid" integer default nextval('"suelo_sueloid_seq"'::regclass) not null,
  "sueclase" text,
  "suecolor" text,
  "suetextura" text,
  "sueph" text,
  "suetipoanalisis" text,
  "suetomamuestras" date,
  "sueresultados" text,
  "lotecultivadoid" integer not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."suelo" add constraint "suelo_pkey" primary key ("sueloid")
;

-- table public.tratamiento

create table "public"."tratamiento"
(
  "tratamientoid" integer default nextval('"tratamiento_tratamientoid_seq"'::regclass) not null,
  "trafechainiciofermentacion" date,
  "trafechafinfermentacion" date,
  "tratiposecado" text,
  "trafechainiciosecado" date,
  "trafechafinsecado" date,
  "travolumenseco" numeric(10,4),
  "traconversion" numeric(10,4),
  "traobservacion" text,
  "traoperario" text
)
with (
  autovacuum_enabled=true)
;

alter table "public"."tratamiento" add constraint "tratamiento_pkey" primary key ("tratamientoid")
;

-- table public.usuario

create table "public"."usuario"
(
  "personaid" integer default nextval('"persona_personaid_seq"'::regclass) not null,
  "usuclave" text,
  "usutipo" text not null,
  "usuactivo" boolean
)
with (
  autovacuum_enabled=true)
;

alter table "public"."usuario" add constraint "usuario_pkey" primary key ("personaid")
;

-- table public.vehiculo

create table "public"."vehiculo"
(
  "vehiculoid" integer default nextval('"vehiculo_vehiculoid_seq"'::regclass) not null,
  "vehplaca" text not null,
  "vehmarca" text,
  "vehdescripcion" text,
  "vehlona" boolean,
  "vehcaseta" boolean,
  "vehpuerta" boolean,
  "fincaid" integer default nextval('"finca_fincaid_seq"'::regclass)
)
with (
  autovacuum_enabled=true)
;

alter table "public"."vehiculo" add constraint "vehiculo_pkey" primary key ("vehiculoid")
;

alter table "public"."vehiculo" add constraint "vehplaca" unique ("vehplaca")
;

-- table public.detalledespacho

create table "public"."detalledespacho"
(
  "detalledespachoid" serial not null,
  "despachoid" integer default nextval('"despacho_despachoid_seq"'::regclass) not null,
  "almacenamientoid" integer default nextval('"almacenamiento_almacenamientoid_seq"'::regclass) not null,
  "detdesnumerobultos" integer,
  "detdespesounitario" numeric(10,4),
  "detdespesototal" numeric(10,4)
)
with (
  autovacuum_enabled=true)
;

alter table "public"."detalledespacho" add constraint "pk_detalledespacho" primary key ("detalledespachoid")
;

-- table public.egresoinsumo

create table "public"."egresoinsumo"
(
  "egresoinsumosid" integer default nextval('"egresoinsumo_egresoinsumosid_seq"'::regclass) not null,
  "egrinsfechaegreso" date,
  "egrinsparacontrolar" text,
  "egrinsdosis" text,
  "egrinscantidadentregada" numeric,
  "egrinsencargado" text,
  "ingresoinsumosid" integer not null,
  "fincaid" integer default nextval('"finca_fincaid_seq"'::regclass)
)
with (
  autovacuum_enabled=true)
;

alter table "public"."egresoinsumo" add constraint "pk_egresoinsumo" primary key ("egresoinsumosid")
;

-- table public.limpiezavehiculo

create table "public"."limpiezavehiculo"
(
  "limpiezavehiculoid" serial not null,
  "limvehfecha" date,
  "limvehproductoutilizado" text,
  "limvehescobillon" boolean,
  "limvehescoba" boolean,
  "limvehagua" boolean,
  "limvehaspiradora" boolean,
  "vehiculoid" integer default nextval('"vehiculo_vehiculoid_seq"'::regclass) not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."limpiezavehiculo" add constraint "limpiezavehiculo_pkey" primary key ("limpiezavehiculoid")
;

-- table public.limpiezacentroacopio

create table "public"."limpiezacentroacopio"
(
  "limpiezacentroacopioid" serial not null,
  "limcenfecha" date,
  "limcenareas" text,
  "limcenmateriales" text,
  "limcenproductos" text,
  "limcenmotivo" text,
  "centroacopioid" integer default nextval('"centroacopio_centroacopioid_seq"'::regclass) not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."limpiezacentroacopio" add constraint "limpiezacentroacopio_pkey" primary key ("limpiezacentroacopioid")
;

-- table public.ingresoinsumo

create table "public"."ingresoinsumo"
(
  "ingresoinsumosid" serial not null,
  "inginsfechaingreso" date,
  "inginsproducto" text,
  "inginsfactura" text,
  "inginsproveedor" text,
  "inginscantidadingreso" numeric,
  "inginsunidad" text,
  "inginssaldo" numeric,
  "ingencargado" text,
  "centroacopioid" integer default nextval('"centroacopio_centroacopioid_seq"'::regclass) not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."ingresoinsumo" add constraint "ingresoinsumo_pkey" primary key ("ingresoinsumosid")
;

-- table public.lotecultivado

create table "public"."lotecultivado"
(
  "lotecultivadoid" serial not null,
  "lotnumero" integer,
  "lotnumerohectareas" numeric(10,4),
  "lotestado" text,
  "lotobservacion" text,
  "fincaid" integer default nextval('"finca_fincaid_seq"'::regclass)
)
with (
  autovacuum_enabled=true)
;

alter table "public"."lotecultivado" add constraint "lotecultivado_pkey" primary key ("lotecultivadoid")
;

-- table public.cultivo

create table "public"."cultivo"
(
  "cultivoid" serial not null,
  "lotecultivadoid" integer not null,
  "productoid" integer default nextval('"producto_productoid_seq"'::regclass) not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."cultivo" add constraint "pk_cultivo" primary key ("cultivoid")
;

-- table public.elaboracionabono

create table "public"."elaboracionabono"
(
  "elaboracionabonoid" serial not null,
  "fincaid" integer default nextval('"finca_fincaid_seq"'::regclass)
)
with (
  autovacuum_enabled=true)
;

alter table "public"."elaboracionabono" add constraint "pk_elaboracionabono" primary key ("elaboracionabonoid")
;

-- table public.operario

create table "public"."operario"
(
  "operarioid" integer default nextval('"persona_personaid_seq"'::regclass) not null,
  "opecargo" text
)
with (
  autovacuum_enabled=true)
;

alter table "public"."operario" add constraint "pk_operario" primary key ("operarioid")
;

-- table public.nomina

create table "public"."nomina"
(
  "operarioid" integer default nextval('"persona_personaid_seq"'::regclass) not null,
  "fincaid" integer default nextval('"finca_fincaid_seq"'::regclass) not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."nomina" add constraint "pk_nomina" primary key ("operarioid","fincaid")
;

-- table public.cajabanano

create table "public"."cajabanano"
(
  "cajabananoid" serial not null,
  "cajmarca" text,
  "cajtipo" text
)
with (
  autovacuum_enabled=true)
;

alter table "public"."cajabanano" add constraint "pk_cajabanano" primary key ("cajabananoid")
;

-- table public.rendimientocosecha

create table "public"."rendimientocosecha"
(
  "rendimientocosechaid" serial not null,
  "renracimoscosechados" integer,
  "renracimosrechazados" integer,
  "renracimosprocesados" integer,
  "rencajasprocesadas" numeric(10,4),
  "renconversion" numeric(10,4),
  "renpesorechazo" numeric(10,4),
  "rencintaroja" integer,
  "rencintablanca" integer,
  "rencintanegra" integer,
  "rencintaverde" integer,
  "rencintacafe" integer,
  "rencintamorada" integer,
  "rencintaamarilla" integer,
  "rencintaazul" integer,
  "cosechaid" integer default nextval('"cosecha_cosechaid_seq"'::regclass) not null,
  "cajabananoid" integer not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."rendimientocosecha" add constraint "pk_rendimientocosecha" primary key ("rendimientocosechaid")
;

-- table public.monitoreoroedor

create table "public"."monitoreoroedor"
(
  "monitoreoroedorid" serial not null,
  "monfechatrampeo" date,
  "montipotrampa" text,
  "monnumerotrampas" integer,
  "monceboutilizado" text,
  "monroedoresmuertos" integer,
  "monaccionestomadas" text,
  "monoperario" text,
  "moninspector" text
)
with (
  autovacuum_enabled=true)
;

alter table "public"."monitoreoroedor" add constraint "pk_monitoreoroedor" primary key ("monitoreoroedorid")
;

-- table public.monitoreoroedor_centroacopio

create table "public"."monitoreoroedor_centroacopio"
(
  "monitoreoroedorid" integer not null,
  "centroacopioid" integer default nextval('"centroacopio_centroacopioid_seq"'::regclass) not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."monitoreoroedor_centroacopio" add constraint "pk_monitoreoroedor_centroacopio" primary key ("monitoreoroedorid","centroacopioid")
;

-- table public.monitoreoroedores_finca

create table "public"."monitoreoroedores_finca"
(
  "monitoreoroedorid" integer not null,
  "fincaid" integer default nextval('"finca_fincaid_seq"'::regclass) not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."monitoreoroedores_finca" add constraint "pk_monitoreoroedores_finca" primary key ("monitoreoroedorid","fincaid")
;

-- table public.mantenimientoequipo

create table "public"."mantenimientoequipo"
(
  "mantenimientoequipoid" serial not null,
  "manfecha" date,
  "mandiafragmatapa" boolean,
  "manfondotanque" boolean,
  "manlanza" boolean,
  "manmando" boolean,
  "manembologastado" boolean,
  "manimpurezasempaque" boolean,
  "mandesgasteempaque" boolean,
  "mancambioaceite" boolean,
  "mandescarbonizada" boolean,
  "manrecipiente" boolean,
  "manlimpiezabomba" boolean,
  "manrecipienterociador" boolean,
  "mantaparociador" boolean,
  "manlubricacionmando" boolean,
  "manlimpiezarociador" boolean,
  "manobservaciones" text,
  "manoperario" text,
  "equipoaplicacionid" integer not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."mantenimientoequipo" add constraint "pk_mantenimientoequipo" primary key ("mantenimientoequipoid")
;

-- table public.equipoaplicacion

create table "public"."equipoaplicacion"
(
  "equipoaplicacionid" serial not null,
  "equinombre" text,
  "equifechaadquisicion" date,
  "fincaid" integer default nextval('"finca_fincaid_seq"'::regclass)
)
with (
  autovacuum_enabled=true)
;

alter table "public"."equipoaplicacion" add constraint "pk_equipoaplicacion" primary key ("equipoaplicacionid")
;

-- table public.mantenimientomaquinaria

create table "public"."mantenimientomaquinaria"
(
  "mantenimientomaquinariaid" serial not null,
  "manfecha" date,
  "mancambioaceite" boolean,
  "mancambiofiltro" boolean,
  "mancambiobujias" boolean,
  "mancambiograsas" boolean,
  "manresumen" text,
  "manoperario" text,
  "maquinariaid" integer not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."mantenimientomaquinaria" add constraint "pk_mantenimientomaquinaria" primary key ("mantenimientomaquinariaid")
;

-- table public.maquinaria

create table "public"."maquinaria"
(
  "maquinariaid" serial not null,
  "maqnombre" text,
  "maqmarca" text,
  "maqmodelo" text,
  "maqpotencia" text,
  "fincaid" integer default nextval('"finca_fincaid_seq"'::regclass)
)
with (
  autovacuum_enabled=true)
;

alter table "public"."maquinaria" add constraint "pk_maquinaria" primary key ("maquinariaid")
;

-- table public.aspersormanual

create table "public"."aspersormanual"
(
  "aspersormanualid" serial not null,
  "aspnumero" integer,
  "aspnombre" text,
  "asptipoboquilla" text,
  "fincaid" integer default nextval('"finca_fincaid_seq"'::regclass)
)
with (
  autovacuum_enabled=true)
;

alter table "public"."aspersormanual" add constraint "pk_aspersormanual" primary key ("aspersormanualid")
;

-- table public.condicionclimatica

create table "public"."condicionclimatica"
(
  "condicionclimaticaid" serial not null,
  "climfecha" date,
  "climhoratermino" time,
  "climtemperatura" text,
  "climviento" text,
  "climhumedad" text,
  "climprecipitacion" text
)
with (
  autovacuum_enabled=true)
;

alter table "public"."condicionclimatica" add constraint "pk_condicionclimatica" primary key ("condicionclimaticaid")
;

-- table public.calendarioenfunde

create table "public"."calendarioenfunde"
(
  "calendarioenfundeid" serial not null,
  "enfanio" integer,
  "enfmes" text,
  "enfsemana" integer,
  "enfcolor" text,
  "enfprimeravuelta" integer,
  "enfsegundavuelta" integer,
  "enftotal" integer,
  "enfbuffer" integer,
  "fincaid" integer default nextval('"finca_fincaid_seq"'::regclass)
)
with (
  autovacuum_enabled=true)
;

alter table "public"."calendarioenfunde" add constraint "pk_calendarioenfunde" primary key ("calendarioenfundeid")
;

-- table public.calibracionbalanza

create table "public"."calibracionbalanza"
(
  "calibracionbalanzaid" serial not null,
  "balfecha" date,
  "balhora" time,
  "balmedidainicial" numeric(10,4),
  "balmedidafinal" numeric(10,4),
  "balcalibracion" boolean,
  "balinspeccion" text,
  "balpesopatron" text,
  "baloperario" text,
  "fincaid" integer default nextval('"finca_fincaid_seq"'::regclass)
)
with (
  autovacuum_enabled=true)
;

alter table "public"."calibracionbalanza" add constraint "pk_calibracionbalanza" primary key ("calibracionbalanzaid")
;

-- table public.potabilizacionagua

create table "public"."potabilizacionagua"
(
  "potabilizacionaguaid" serial not null,
  "potfecha" date,
  "potph" numeric(10,4),
  "potmuestreo" text,
  "pottina1" text,
  "pottina2" text,
  "potdosis" numeric(10,4),
  "potproducto" text,
  "potingredienteactivo" text,
  "potoperario" text,
  "cosechaid" integer default nextval('"cosecha_cosechaid_seq"'::regclass) not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."potabilizacionagua" add constraint "pk_potabilizacionagua" primary key ("potabilizacionaguaid")
;

-- table public.aplicacionproductopostcosecha

create table "public"."aplicacionproductopostcosecha"
(
  "aplicacionproductopostcosechaid" serial not null,
  "postnombreproducto" text,
  "postingredienteactivo" text,
  "postformaaplicacion" text,
  "postequipoaplicacion" text,
  "postfecha" date,
  "postingreso" numeric(10,4),
  "postutilizado" numeric(10,4),
  "postsaldo" numeric(10,4),
  "postpreparada" numeric(10,4),
  "postoperario" text,
  "cosechaid" integer default nextval('"cosecha_cosechaid_seq"'::regclass) not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."aplicacionproductopostcosecha" add constraint "pk_aplicacionproductopostcosecha" primary key ("aplicacionproductopostcosechaid")
;

-- table public.envasefitosanitario

create table "public"."envasefitosanitario"
(
  "envasefitosanitarioid" serial not null,
  "envfechaingreso" date,
  "envnombreinsumo" text,
  "envpresentacion" text,
  "envcantidad" integer,
  "envobjetivocontrol" text,
  "envfechasalida" date,
  "envdestino" text,
  "empresaid" integer default nextval('"empresa_empresaid_seq"'::regclass) not null,
  "fincaid" integer default nextval('"finca_fincaid_seq"'::regclass)
)
with (
  autovacuum_enabled=true)
;

alter table "public"."envasefitosanitario" add constraint "pk_envasefitosanitario" primary key ("envasefitosanitarioid")
;

-- table public.exportadorempresa

create table "public"."exportadorempresa"
(
  "exportadorid" integer default nextval('"persona_personaid_seq"'::regclass) not null,
  "empresaid" integer default nextval('"empresa_empresaid_seq"'::regclass) not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."exportadorempresa" add constraint "pk_exportadorempresa" primary key ("exportadorid","empresaid")
;

-- table public.materialesplasticos

create table "public"."materialesplasticos"
(
  "materialesplasticosid" serial not null,
  "matfecha" date,
  "matfundasracimos" integer,
  "matdaipas" integer,
  "matzunchos" integer,
  "matcintas" integer,
  "matfundasempaque" integer,
  "matpeso" numeric(10,4),
  "matencargado" text,
  "fincaid" integer default nextval('"finca_fincaid_seq"'::regclass)
)
with (
  autovacuum_enabled=true)
;

alter table "public"."materialesplasticos" add constraint "pk_materialesplasticos" primary key ("materialesplasticosid")
;

-- table public.limpiezaequipopersonal

create table "public"."limpiezaequipopersonal"
(
  "limpiezaequipopersonalid" serial not null,
  "limperfecha" date,
  "limperguantes" boolean,
  "limpermascarilla" boolean,
  "limperoverol" boolean,
  "limperdelantal" boolean,
  "limpergafas" boolean,
  "limpercascos" boolean,
  "limperorejeras" boolean,
  "limpergorras" boolean,
  "limperbotas" boolean,
  "limperfaja" boolean,
  "limperinspeccion" text,
  "operarioid" integer default nextval('"persona_personaid_seq"'::regclass) not null,
  "fincaid" integer default nextval('"finca_fincaid_seq"'::regclass) not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."limpiezaequipopersonal" add constraint "pk_limpiezaequipopersonal" primary key ("limpiezaequipopersonalid")
;

-- table public.bananoagroindustria

create table "public"."bananoagroindustria"
(
  "bananoagroindustriaid" serial not null,
  "banfecha" date,
  "bansacos" numeric(10,4),
  "banagroindustria" text,
  "banmaquila" text,
  "bannumtarjarecepcion" numeric(10,4),
  "cosechaid" integer default nextval('"cosecha_cosechaid_seq"'::regclass) not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."bananoagroindustria" add constraint "pk_bananoagroindustria" primary key ("bananoagroindustriaid")
;

-- table public.inspector

create table "public"."inspector"
(
  "personaid" integer default nextval('"persona_personaid_seq"'::regclass) not null
)
with (
  autovacuum_enabled=true)
;

alter table "public"."inspector" add constraint "pk_inspector" primary key ("personaid")
;

-- create foreign keys (relationships) section -------------------------------------------------

alter table "public"."provincia"
  add constraint "provincia_paisid_fkey"
    foreign key ("paisid")
    references "public"."pais" ("paisid")
      on delete no action
      on update no action
;

alter table "public"."ciudad"
  add constraint "ciudad_provinciaid_fkey"
    foreign key ("provinciaid")
    references "public"."provincia" ("provinciaid")
      on delete no action
      on update no action
;

alter table "public"."sitio"
  add constraint "sitio_ciudadid_fkey"
    foreign key ("ciudadid")
    references "public"."ciudad" ("ciudadid")
      on delete no action
      on update no action
;

alter table "public"."usuario"
  add constraint "usuario_personaid_fkey"
    foreign key ("personaid")
    references "public"."persona" ("personaid")
      on delete no action
      on update no action
;

alter table "public"."asociacion"
  add constraint "asociacion_asoresponsableid_fkey"
    foreign key ("asoresponsableid")
    references "public"."persona" ("personaid")
      on delete no action
      on update no action
    not valid
;

alter table "public"."finca"
  add constraint "finca_sitioid_fkey"
    foreign key ("sitioid")
    references "public"."sitio" ("sitioid")
      on delete no action
      on update no action
;

alter table "public"."finca"
  add constraint "finca_asociacionid_fkey"
    foreign key ("asociacionid")
    references "public"."asociacion" ("asociacionid")
      on delete no action
      on update no action
;

alter table "public"."finca"
  add constraint "finca_propietarioid_fkey"
    foreign key ("propietarioid")
    references "public"."productor" ("productorid")
      on delete no action
      on update no action
    not valid
;

alter table "public"."productor"
  add constraint "productor_productorid_fkey"
    foreign key ("productorid")
    references "public"."persona" ("personaid")
      on delete no action
      on update no action
;

alter table "public"."conductor"
  add constraint "conductor_conductorid_fkey"
    foreign key ("conductorid")
    references "public"."persona" ("personaid")
      on delete no action
      on update no action
;

alter table "public"."carga"
  add constraint "carga_guiaremisionid_fkey"
    foreign key ("guiaremisionid")
    references "public"."guiaremision" ("guiaremisionid")
      on delete no action
      on update no action
    not valid
;

alter table "public"."carga"
  add constraint "carga_cosechaid_fkey"
    foreign key ("cosechaid")
    references "public"."cosecha" ("cosechaid")
      on delete no action
      on update no action
    not valid
;

alter table "public"."guiaremision"
  add constraint "guiaremision_conductorid_fkey"
    foreign key ("conductorid")
    references "public"."conductor" ("conductorid")
      on delete no action
      on update no action
;

alter table "public"."compra"
  add constraint "compra_guiaremisionid_fkey"
    foreign key ("guiaremisionid")
    references "public"."guiaremision" ("guiaremisionid")
      on delete no action
      on update no action
;

alter table "public"."mix"
  add constraint "mix_detallecompraid_fkey"
    foreign key ("cosechaid")
    references "public"."detallecompra" ("detallecompraid")
      on delete no action
      on update no action
    not valid
;

alter table "public"."mix"
  add constraint "mix_almacenamientoid_fkey"
    foreign key ("almacenamientoid")
    references "public"."almacenamiento" ("almacenamientoid")
      on delete no action
      on update no action
    not valid
;

alter table "public"."responsableacopio"
  add constraint "responsableacopio_responsableacopioid_fkey"
    foreign key ("responsableacopioid")
    references "public"."persona" ("personaid")
      on delete no action
      on update no action
;

alter table "public"."centroacopio"
  add constraint "centroacopio_responsableacopioid_fkey"
    foreign key ("responsableacopioid")
    references "public"."responsableacopio" ("responsableacopioid")
      on delete no action
      on update no action
;

alter table "public"."cosecha"
  add constraint "cosecha_tratamientoid_fkey"
    foreign key ("tratamientoid")
    references "public"."tratamiento" ("tratamientoid")
      on delete no action
      on update no action
;

alter table "public"."detallecompra"
  add constraint "detallecompra_compraid_fkey"
    foreign key ("compraid")
    references "public"."compra" ("compraid")
      on delete no action
      on update no action
;

alter table "public"."detallecompra"
  add constraint "detallecompra_cosechaid_fkey"
    foreign key ("detallecompraid")
    references "public"."cosecha" ("cosechaid")
      on delete no action
      on update no action
;

alter table "public"."almacenamiento"
  add constraint "almacenamiento_tratamientoid_fkey"
    foreign key ("tratamientoid")
    references "public"."tratamiento" ("tratamientoid")
      on delete no action
      on update no action
;

alter table "public"."revisionhumedad"
  add constraint "revisionhumedad_almacenamientoid_fkey"
    foreign key ("almacenamientoid")
    references "public"."almacenamiento" ("almacenamientoid")
      on delete no action
      on update no action
;

alter table "public"."detalleenvio"
  add constraint "detalleenvio_registroenvioid_fkey"
    foreign key ("registroenvioid")
    references "public"."registroenvio" ("registroenvioid")
      on delete no action
      on update no action
;

alter table "public"."empresa"
  add constraint "empresa_paisid_fkey"
    foreign key ("paisid")
    references "public"."pais" ("paisid")
      on delete no action
      on update no action
;

alter table "public"."exportador"
  add constraint "exportador_exportadorid_fkey"
    foreign key ("exportadorid")
    references "public"."persona" ("personaid")
      on delete no action
      on update no action
;

alter table "public"."facturaexportacion"
  add constraint "facturaexportacion_compradorid_fkey"
    foreign key ("compradorid")
    references "public"."empresa" ("empresaid")
      on delete no action
      on update no action
;

alter table "public"."detallefacturaexportacion"
  add constraint "detallefacturaexportacion_facturaexportacionid_fkey"
    foreign key ("facturaexportacionid")
    references "public"."facturaexportacion" ("facturaexportacionid")
      on delete no action
      on update no action
    not valid
;

alter table "public"."guiaremision"
  add constraint "guiaremision_vehiculo_fkey"
    foreign key ("vehiculoid")
    references "public"."vehiculo" ("vehiculoid")
      on delete no action
      on update no action
;

alter table "public"."detalledespacho"
  add constraint "detalledespacho_despachoid"
    foreign key ("despachoid")
    references "public"."despacho" ("despachoid")
      on delete no action
      on update no action
;

alter table "public"."detalledespacho"
  add constraint "detalledespacho_almaenamientoid"
    foreign key ("almacenamientoid")
    references "public"."almacenamiento" ("almacenamientoid")
      on delete no action
      on update no action
;

alter table "public"."almacenamiento"
  add constraint "almacenamiento_centroacopio_fkey"
    foreign key ("centroacopioid")
    references "public"."centroacopio" ("centroacopioid")
      on delete no action
      on update no action
;

alter table "public"."detalleenvio"
  add constraint "detalleenvio_detallecompra_fkey"
    foreign key ("cosechaid")
    references "public"."detallecompra" ("detallecompraid")
      on delete no action
      on update no action
;

alter table "public"."egresoinsumo"
  add constraint "insumo_finca_fkey"
    foreign key ("fincaid")
    references "public"."finca" ("fincaid")
      on delete no action
      on update no action
;

alter table "public"."limpiezavehiculo"
  add constraint "limpiezavehiculo_vehiculo_fkey"
    foreign key ("vehiculoid")
    references "public"."vehiculo" ("vehiculoid")
      on delete no action
      on update no action
;

alter table "public"."facturaexportacion"
  add constraint "facturaexportacion_vendedor_fkey"
    foreign key ("vendedorid")
    references "public"."empresa" ("empresaid")
      on delete no action
      on update no action
;

alter table "public"."limpiezacentroacopio"
  add constraint "limpiezacentroacopio_centroacopio_fkey"
    foreign key ("centroacopioid")
    references "public"."centroacopio" ("centroacopioid")
      on delete no action
      on update no action
;

alter table "public"."detalleenvio"
  add constraint "detalleenvio_guiaremision_fkey"
    foreign key ("guiaremisionid")
    references "public"."guiaremision" ("guiaremisionid")
      on delete no action
      on update no action
;

alter table "public"."egresoinsumo"
  add constraint "egresoinsumo_ingresoinsumo_fkey"
    foreign key ("ingresoinsumosid")
    references "public"."ingresoinsumo" ("ingresoinsumosid")
      on delete no action
      on update no action
;

alter table "public"."ingresoinsumo"
  add constraint "ingresoinsumo_centroacopio"
    foreign key ("centroacopioid")
    references "public"."centroacopio" ("centroacopioid")
      on delete no action
      on update no action
;

alter table "public"."lotecultivado"
  add constraint "lotecultivo_finca_fkey"
    foreign key ("fincaid")
    references "public"."finca" ("fincaid")
      on delete no action
      on update no action
;

alter table "public"."guiaremision"
  add constraint "guiaremisionproductor"
    foreign key ("productorid")
    references "public"."productor" ("productorid")
      on delete no action
      on update no action
;

alter table "public"."medioambiente"
  add constraint "medioambiente_lotecultivado_fkey"
    foreign key ("lotecultivadoid")
    references "public"."lotecultivado" ("lotecultivadoid")
      on delete no action
      on update no action
;

alter table "public"."suelo"
  add constraint "suelo_lotecultivado_fkey"
    foreign key ("lotecultivadoid")
    references "public"."lotecultivado" ("lotecultivadoid")
      on delete no action
      on update no action
;

alter table "public"."cultivo"
  add constraint "cultivo_lotecultivado_fkey"
    foreign key ("lotecultivadoid")
    references "public"."lotecultivado" ("lotecultivadoid")
      on delete no action
      on update no action
;

alter table "public"."cultivo"
  add constraint "cultivo_producto_fkey"
    foreign key ("productoid")
    references "public"."producto" ("productoid")
      on delete no action
      on update no action
;

alter table "public"."limpiezaherramienta"
  add constraint "relationship24"
    foreign key ("cultivoid")
    references "public"."cultivo" ("cultivoid")
      on delete no action
      on update no action
;

alter table "public"."poda"
  add constraint "relationship25"
    foreign key ("cultivoid")
    references "public"."cultivo" ("cultivoid")
      on delete no action
      on update no action
;

alter table "public"."controlmaleza"
  add constraint "relationship26"
    foreign key ("cultivoid")
    references "public"."cultivo" ("cultivoid")
      on delete no action
      on update no action
;

alter table "public"."riego"
  add constraint "relationship27"
    foreign key ("cultivoid")
    references "public"."cultivo" ("cultivoid")
      on delete no action
      on update no action
;

alter table "public"."fitosanitario"
  add constraint "relationship28"
    foreign key ("cultivoid")
    references "public"."cultivo" ("cultivoid")
      on delete no action
      on update no action
;

alter table "public"."fertilizacion"
  add constraint "relationship29"
    foreign key ("cultivoid")
    references "public"."cultivo" ("cultivoid")
      on delete no action
      on update no action
;

alter table "public"."siembra"
  add constraint "relationship30"
    foreign key ("cultivoid")
    references "public"."cultivo" ("cultivoid")
      on delete no action
      on update no action
;

alter table "public"."cosecha"
  add constraint "relationship31"
    foreign key ("cultivoid")
    references "public"."cultivo" ("cultivoid")
      on delete no action
      on update no action
;

alter table "public"."operario"
  add constraint "relationship32"
    foreign key ("operarioid")
    references "public"."persona" ("personaid")
      on delete no action
      on update no action
;

alter table "public"."persona"
  add constraint "relationship33"
    foreign key ("ciudadnacimientoid")
    references "public"."ciudad" ("ciudadid")
      on delete no action
      on update no action
;

alter table "public"."nomina"
  add constraint "relationship34"
    foreign key ("operarioid")
    references "public"."operario" ("operarioid")
      on delete no action
      on update no action
;

alter table "public"."nomina"
  add constraint "relationship35"
    foreign key ("fincaid")
    references "public"."finca" ("fincaid")
      on delete no action
      on update no action
;

alter table "public"."rendimientocosecha"
  add constraint "relationship36"
    foreign key ("cajabananoid")
    references "public"."cajabanano" ("cajabananoid")
      on delete no action
      on update no action
;

alter table "public"."rendimientocosecha"
  add constraint "relationship37"
    foreign key ("cosechaid")
    references "public"."cosecha" ("cosechaid")
      on delete no action
      on update no action
;

alter table "public"."elaboracionabono"
  add constraint "relationship38"
    foreign key ("fincaid")
    references "public"."finca" ("fincaid")
      on delete no action
      on update no action
;

alter table "public"."monitoreoroedor_centroacopio"
  add constraint "relationship39"
    foreign key ("monitoreoroedorid")
    references "public"."monitoreoroedor" ("monitoreoroedorid")
      on delete no action
      on update no action
;

alter table "public"."monitoreoroedor_centroacopio"
  add constraint "relationship40"
    foreign key ("centroacopioid")
    references "public"."centroacopio" ("centroacopioid")
      on delete no action
      on update no action
;

alter table "public"."monitoreoroedores_finca"
  add constraint "relationship41"
    foreign key ("monitoreoroedorid")
    references "public"."monitoreoroedor" ("monitoreoroedorid")
      on delete no action
      on update no action
;

alter table "public"."monitoreoroedores_finca"
  add constraint "relationship42"
    foreign key ("fincaid")
    references "public"."finca" ("fincaid")
      on delete no action
      on update no action
;

alter table "public"."vehiculo"
  add constraint "vehiculo_finca_fkey"
    foreign key ("fincaid")
    references "public"."finca" ("fincaid")
      on delete no action
      on update no action
;

alter table "public"."calidadsemilla"
  add constraint "relationship44"
    foreign key ("siembraid")
    references "public"."siembra" ("siembraid")
      on delete no action
      on update no action
;

alter table "public"."mantenimientoequipo"
  add constraint "relationship47"
    foreign key ("equipoaplicacionid")
    references "public"."equipoaplicacion" ("equipoaplicacionid")
      on delete no action
      on update no action
;

alter table "public"."mantenimientomaquinaria"
  add constraint "relationship48"
    foreign key ("maquinariaid")
    references "public"."maquinaria" ("maquinariaid")
      on delete no action
      on update no action
;

alter table "public"."maquinaria"
  add constraint "relationship52"
    foreign key ("fincaid")
    references "public"."finca" ("fincaid")
      on delete no action
      on update no action
;

alter table "public"."equipoaplicacion"
  add constraint "relationship53"
    foreign key ("fincaid")
    references "public"."finca" ("fincaid")
      on delete no action
      on update no action
;

alter table "public"."aspersormanual"
  add constraint "relationship54"
    foreign key ("fincaid")
    references "public"."finca" ("fincaid")
      on delete no action
      on update no action
;

alter table "public"."fitosanitario"
  add constraint "relationship56"
    foreign key ("condicionclimaticaid")
    references "public"."condicionclimatica" ("condicionclimaticaid")
      on delete no action
      on update no action
;

alter table "public"."calendarioenfunde"
  add constraint "relationship57"
    foreign key ("fincaid")
    references "public"."finca" ("fincaid")
      on delete no action
      on update no action
;

alter table "public"."calibracionbalanza"
  add constraint "relationship58"
    foreign key ("fincaid")
    references "public"."finca" ("fincaid")
      on delete no action
      on update no action
;

alter table "public"."potabilizacionagua"
  add constraint "relationship60"
    foreign key ("cosechaid")
    references "public"."cosecha" ("cosechaid")
      on delete no action
      on update no action
;

alter table "public"."aplicacionproductopostcosecha"
  add constraint "relationship62"
    foreign key ("cosechaid")
    references "public"."cosecha" ("cosechaid")
      on delete no action
      on update no action
;

alter table "public"."exportadorempresa"
  add constraint "relationship63"
    foreign key ("exportadorid")
    references "public"."exportador" ("exportadorid")
      on delete no action
      on update no action
;

alter table "public"."exportadorempresa"
  add constraint "relationship64"
    foreign key ("empresaid")
    references "public"."empresa" ("empresaid")
      on delete no action
      on update no action
;

alter table "public"."envasefitosanitario"
  add constraint "relationship65"
    foreign key ("empresaid")
    references "public"."empresa" ("empresaid")
      on delete no action
      on update no action
;

alter table "public"."envasefitosanitario"
  add constraint "relationship66"
    foreign key ("fincaid")
    references "public"."finca" ("fincaid")
      on delete no action
      on update no action
;

alter table "public"."materialesplasticos"
  add constraint "relationship67"
    foreign key ("fincaid")
    references "public"."finca" ("fincaid")
      on delete no action
      on update no action
;

alter table "public"."limpiezaequipopersonal"
  add constraint "relationship70"
    foreign key ("operarioid", "fincaid")
    references "public"."nomina" ("operarioid", "fincaid")
      on delete no action
      on update no action
;

alter table "public"."bananoagroindustria"
  add constraint "relationship71"
    foreign key ("cosechaid")
    references "public"."cosecha" ("cosechaid")
      on delete no action
      on update no action
;

alter table "public"."inspector"
  add constraint "relationship72"
    foreign key ("personaid")
    references "public"."persona" ("personaid")
      on delete no action
      on update no action
;

-- associating sequence with table column section section ------------------------------

alter sequence "public"."almacenamiento_almacenamientoid_seq" owned by "public"."almacenamiento"."almacenamientoid"
;
alter sequence "public"."asociacion_asociacionid_seq" owned by "public"."asociacion"."asociacionid"
;
alter sequence "public"."carga_cargaid_seq" owned by "public"."carga"."cargaid"
;
alter sequence "public"."centroacopio_centroacopioid_seq" owned by "public"."centroacopio"."centroacopioid"
;
alter sequence "public"."ciudad_ciudadid_seq" owned by "public"."ciudad"."ciudadid"
;
alter sequence "public"."compra_compraid_seq" owned by "public"."compra"."compraid"
;
alter sequence "public"."controlmaleza_controlmalezaid_seq" owned by "public"."controlmaleza"."controlmalezaid"
;
alter sequence "public"."cosecha_cosechaid_seq" owned by "public"."cosecha"."cosechaid"
;
alter sequence "public"."despacho_despachoid_seq" owned by "public"."despacho"."despachoid"
;
alter sequence "public"."detallecompra_detallecompraid_seq" owned by "public"."detallecompra"."detallecompraid"
;
alter sequence "public"."detallefacturaexportacion_detallefacturaexportacion_seq" owned by "public"."detallefacturaexportacion"."detallefacturaexportacion"
;
alter sequence "public"."empresa_empresaid_seq" owned by "public"."empresa"."empresaid"
;
alter sequence "public"."facturaexportacion_facturaexportacionid_seq" owned by "public"."facturaexportacion"."facturaexportacionid"
;
alter sequence "public"."fetilizacion_fertilizacionid_seq" owned by "public"."fertilizacion"."fertilizacionid"
;
alter sequence "public"."fitosanitario_fitosanitarioid_seq" owned by "public"."fitosanitario"."fitosanitarioid"
;
alter sequence "public"."guiaremision_guiaremisionid_seq" owned by "public"."guiaremision"."guiaremisionid"
;
alter sequence "public"."limpiezaherramienta_limpiezaherramientaid_seq" owned by "public"."limpiezaherramienta"."limpiezaherramientaid"
;
alter sequence "public"."medioambiente_medioambienteid_seq" owned by "public"."medioambiente"."medioambienteid"
;
alter sequence "public"."mix_mixid_seq" owned by "public"."mix"."mixid"
;
alter sequence "public"."pais_paisid_seq" owned by "public"."pais"."paisid"
;
alter sequence "public"."finca_fincaid_seq" owned by "public"."finca"."fincaid"
;
alter sequence "public"."persona_personaid_seq" owned by "public"."persona"."personaid"
;
alter sequence "public"."poda_podaid_seq" owned by "public"."poda"."podaid"
;
alter sequence "public"."producto_productoid_seq" owned by "public"."producto"."productoid"
;
alter sequence "public"."productor_productorid_seq" owned by "public"."productor"."productorid"
;
alter sequence "public"."provincia_provinciaid_seq" owned by "public"."provincia"."provinciaid"
;
alter sequence "public"."registroenvio_registroenvioid_seq" owned by "public"."registroenvio"."registroenvioid"
;
alter sequence "public"."revisionhumedad_revisionhumedadid_seq" owned by "public"."revisionhumedad"."revisionhumedadid"
;
alter sequence "public"."riego_riegoid_seq" owned by "public"."riego"."riegoid"
;
alter sequence "public"."siembra_siembraid_seq" owned by "public"."siembra"."siembraid"
;
alter sequence "public"."sitio_sitioid_seq" owned by "public"."sitio"."sitioid"
;
alter sequence "public"."suelo_sueloid_seq" owned by "public"."suelo"."sueloid"
;
alter sequence "public"."tratamiento_tratamientoid_seq" owned by "public"."tratamiento"."tratamientoid"
;
alter sequence "public"."vehiculo_vehiculoid_seq" owned by "public"."vehiculo"."vehiculoid"
;