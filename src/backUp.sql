-- public.ts01_institute definition

-- Drop table

-- DROP TABLE public.ts01_institute;

CREATE TABLE public.ts01_institute (
	id serial4 NOT NULL,
	uid uuid NOT NULL DEFAULT uuid_generate_v4(),
	"name" varchar(50) NOT NULL,
	email varchar(100) NOT NULL,
	"password" text NOT NULL,
	salt varchar(128) NOT NULL,
	address text NULL,
	country varchar(100) NULL,
	city varchar(100) NULL,
	state varchar(100) NULL,
	zip_code varchar(10) NULL,
	added_in_db int8 NOT NULL DEFAULT EXTRACT(epoch FROM now()),
	status int4 NULL,
	phone varchar(20) NOT NULL,
	picture text NULL,
	updated_at int8 NULL,
	updated_by int4 NULL,
	CONSTRAINT ts01_institute_pkey PRIMARY KEY (id),
	CONSTRAINT ts01_institute_uid_key UNIQUE (uid),
	CONSTRAINT ts01_institute_un UNIQUE (email),
	CONSTRAINT ts01_institute_un_phone UNIQUE (picture),
	CONSTRAINT ts01_institute_updated_at_key UNIQUE (updated_at)
);


-- public.ts01_institute foreign keys

ALTER TABLE public.ts01_institute ADD CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES public.terminologies(id) ON DELETE RESTRICT ON UPDATE CASCADE;



-- public.terminologies definition

-- Drop table

-- DROP TABLE public.terminologies;

CREATE TABLE public.terminologies (
	id serial4 NOT NULL,
	group_name varchar(20) NOT NULL,
	code varchar(20) NOT NULL,
	"name" varchar(100) NOT NULL,
	status int2 NOT NULL,
	added_in_db int8 NULL DEFAULT EXTRACT(epoch FROM now())::bigint,
	CONSTRAINT terminologies_pkey PRIMARY KEY (id)
);




-- public.s01_payment definition

-- Drop table

-- DROP TABLE public.s01_payment;

CREATE TABLE public.s01_payment (
	id serial4 NOT NULL,
	patient_uid uuid NOT NULL,
	received_amount numeric(18, 2) NOT NULL,
	payment_date timestamp NOT NULL,
	payment_method varchar(30) NOT NULL,
	status int4 NULL,
	created_at int8 NULL,
	created_by int4 NULL,
	CONSTRAINT s01_payment_created_at_key UNIQUE (created_at),
	CONSTRAINT s01_payment_pkey PRIMARY KEY (id)
);


-- public.s01_payment foreign keys

ALTER TABLE public.s01_payment ADD CONSTRAINT fk_patient_uid FOREIGN KEY (patient_uid) REFERENCES public.action_users(uid) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE public.s01_payment ADD CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES public.terminologies(id) ON DELETE RESTRICT ON UPDATE CASCADE;



-- public.r_01_blog_posts definition

-- Drop table

-- DROP TABLE public.r_01_blog_posts;

CREATE TABLE public.r_01_blog_posts (
	id serial4 NOT NULL,
	user_uid uuid NOT NULL,
	title varchar(150) NOT NULL,
	"content" text NOT NULL,
	status int4 NULL,
	added_in_db int8 NOT NULL DEFAULT EXTRACT(epoch FROM now()),
	CONSTRAINT r_01_blog_posts_pkey PRIMARY KEY (id)
);


-- public.r_01_blog_posts foreign keys

ALTER TABLE public.r_01_blog_posts ADD CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES public.terminologies(id) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE public.r_01_blog_posts ADD CONSTRAINT fk_user_uid FOREIGN KEY (user_uid) REFERENCES public.action_users(uid) ON DELETE RESTRICT ON UPDATE CASCADE;

-- public.r02_blog_post_commenters definition

-- Drop table

-- DROP TABLE public.r02_blog_post_commenters;

CREATE TABLE public.r02_blog_post_commenters (
	id serial4 NOT NULL,
	post_id int4 NOT NULL,
	commenter varchar(50) NOT NULL,
	"comment" text NOT NULL,
	created_at timestamp NOT NULL,
	status int4 NULL,
	CONSTRAINT r02_blog_post_commenters_created_at_key UNIQUE (created_at),
	CONSTRAINT r02_blog_post_commenters_pkey PRIMARY KEY (id)
);


-- public.r02_blog_post_commenters foreign keys

ALTER TABLE public.r02_blog_post_commenters ADD CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES public.r_01_blog_posts(id) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE public.r02_blog_post_commenters ADD CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES public.terminologies(id) ON DELETE RESTRICT ON UPDATE CASCADE;


-- public.r01_contact_us definition

-- Drop table

-- DROP TABLE public.r01_contact_us;

CREATE TABLE public.r01_contact_us (
	id serial4 NOT NULL,
	"name" varchar(50) NOT NULL,
	email varchar(100) NOT NULL,
	phone varchar(16) NOT NULL,
	message text NOT NULL,
	added_in_db int8 NOT NULL DEFAULT EXTRACT(epoch FROM now()),
	status int4 NULL,
	CONSTRAINT r01_contact_us_pkey PRIMARY KEY (id)
);


-- public.r01_contact_us foreign keys

ALTER TABLE public.r01_contact_us ADD CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES public.terminologies(id) ON DELETE RESTRICT ON UPDATE CASCADE;


-- public.pd02_consultancy_appointment definition

-- Drop table

-- DROP TABLE public.pd02_consultancy_appointment;

CREATE TABLE public.pd02_consultancy_appointment (
	id serial4 NOT NULL,
	doctor_uid uuid NULL,
	program_data_uid uuid NULL,
	payment_id int4 NULL,
	condition_level int4 NULL,
	re_schedule timestamp NULL,
	schedule timestamp NULL,
	payment_status bpchar(2) NULL,
	created_at int8 NOT NULL,
	created_by int4 NOT NULL,
	added_in_db int8 NOT NULL DEFAULT EXTRACT(epoch FROM now()),
	status int4 NULL,
	updated_at int8 NULL,
	updated_by int4 NULL,
	CONSTRAINT pd02_consultancy_appointment_added_in_db_key UNIQUE (added_in_db),
	CONSTRAINT pd02_consultancy_appointment_created_at_key UNIQUE (created_at),
	CONSTRAINT pd02_consultancy_appointment_pkey PRIMARY KEY (id),
	CONSTRAINT pd02_consultancy_appointment_updated_at_key UNIQUE (updated_at)
);


-- public.pd02_consultancy_appointment foreign keys

ALTER TABLE public.pd02_consultancy_appointment ADD CONSTRAINT fk_condition_level FOREIGN KEY (condition_level) REFERENCES public.terminologies(id) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE public.pd02_consultancy_appointment ADD CONSTRAINT fk_doctor_uid FOREIGN KEY (doctor_uid) REFERENCES public.action_users(uid) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE public.pd02_consultancy_appointment ADD CONSTRAINT fk_payment_id FOREIGN KEY (payment_id) REFERENCES public.s01_payment(id) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE public.pd02_consultancy_appointment ADD CONSTRAINT fk_program_data_uid FOREIGN KEY (program_data_uid) REFERENCES public.p02_program_data(uid) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE public.pd02_consultancy_appointment ADD CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES public.terminologies(id) ON DELETE RESTRICT ON UPDATE CASCADE;

-- public.p02_program_data definition

-- Drop table

-- DROP TABLE public.p02_program_data;

CREATE TABLE public.p02_program_data (
	id serial4 NOT NULL,
	uid uuid NOT NULL DEFAULT uuid_generate_v4(),
	patient_uid uuid NULL,
	"name" varchar(20) NOT NULL,
	"condition" varchar(20) NULL,
	metadata text NULL,
	score float8 NULL DEFAULT 0,
	created_at int8 NOT NULL,
	created_by int4 NOT NULL,
	added_in_db int8 NOT NULL DEFAULT EXTRACT(epoch FROM now()),
	status int4 NULL,
	updated_at int8 NULL,
	updated_by int4 NULL,
	consultancy_status bpchar(2) NULL,
	CONSTRAINT p02_program_data_added_in_db_key UNIQUE (added_in_db),
	CONSTRAINT p02_program_data_created_at_key UNIQUE (created_at),
	CONSTRAINT p02_program_data_pkey PRIMARY KEY (id),
	CONSTRAINT p02_program_data_uid_key UNIQUE (uid),
	CONSTRAINT p02_program_data_updated_at_key UNIQUE (updated_at)
);


-- public.p02_program_data foreign keys

ALTER TABLE public.p02_program_data ADD CONSTRAINT fk_patient_uid FOREIGN KEY (patient_uid) REFERENCES public.action_users(uid) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE public.p02_program_data ADD CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES public.terminologies(id) ON DELETE RESTRICT ON UPDATE CASCADE;


-- public.i02_invatation definition

-- Drop table

-- DROP TABLE public.i02_invatation;

CREATE TABLE public.i02_invatation (
	id int4 NOT NULL DEFAULT nextval('st01_institute_id_seq'::regclass),
	institute_uid uuid NULL,
	email varchar(100) NOT NULL,
	invitation_link text NULL,
	added_in_db int8 NOT NULL DEFAULT EXTRACT(epoch FROM now()),
	requested bpchar(2) NULL DEFAULT 'NA'::bpchar,
	status int4 NULL,
	invitation_for bpchar(2) NULL DEFAULT 'T'::bpchar,
	no_of_invitation int2 NULL,
	CONSTRAINT st01_institute_pkey PRIMARY KEY (id)
);


-- public.i02_invatation foreign keys

ALTER TABLE public.i02_invatation ADD CONSTRAINT fk_institute_uid FOREIGN KEY (institute_uid) REFERENCES public.ts01_institute(uid) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE public.i02_invatation ADD CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES public.terminologies(id) ON DELETE RESTRICT ON UPDATE CASCADE;

-- public.d02_doctor_details definition

-- Drop table

-- DROP TABLE public.d02_doctor_details;

CREATE TABLE public.d02_doctor_details (
	id serial4 NOT NULL,
	doctor_uid uuid NULL,
	collage_name varchar(150) NOT NULL,
	course varchar(150) NOT NULL,
	"year" date NOT NULL,
	certificates jsonb NOT NULL,
	professional_experience jsonb NULL,
	clinic_schedule jsonb NULL,
	added_in_db int8 NOT NULL DEFAULT EXTRACT(epoch FROM now()),
	status int4 NULL,
	updated_at int8 NULL,
	updated_by int4 NULL,
	created_at int8 NOT NULL,
	created_by int4 NOT NULL,
	verification_status bpchar(2) NULL DEFAULT '0'::bpchar,
	CONSTRAINT d02_doctor_details_pkey PRIMARY KEY (id)
);


-- public.d02_doctor_details foreign keys

ALTER TABLE public.d02_doctor_details ADD CONSTRAINT fk_doctor_uid FOREIGN KEY (doctor_uid) REFERENCES public.action_users(uid) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE public.d02_doctor_details ADD CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES public.terminologies(id) ON DELETE RESTRICT ON UPDATE CASCADE;


-- public.assessments definition

-- Drop table

-- DROP TABLE public.assessments;

CREATE TABLE public.assessments (
	id serial4 NOT NULL,
	form_name varchar(50) NOT NULL,
	metadata text NULL,
	score text NULL,
	status int2 NOT NULL,
	added_in_db int8 NULL DEFAULT EXTRACT(epoch FROM now())::bigint,
	CONSTRAINT assessments_pkey PRIMARY KEY (id)
);


-- public.action_users definition

-- Drop table

-- DROP TABLE public.action_users;

CREATE TABLE public.action_users (
	id serial4 NOT NULL,
	uid uuid NOT NULL DEFAULT uuid_generate_v4(),
	"name" varchar(50) NOT NULL,
	dob date NOT NULL,
	email varchar(100) NOT NULL,
	"password" text NOT NULL,
	salt varchar(128) NOT NULL,
	gender int4 NOT NULL,
	relationship_level int4 NULL,
	reference_id int4 NULL,
	address text NULL,
	country varchar(100) NULL,
	city varchar(100) NULL,
	state varchar(100) NULL,
	zip_code varchar(10) NULL,
	added_in_db int8 NOT NULL DEFAULT EXTRACT(epoch FROM now()),
	status int4 NULL,
	phone varchar(20) NOT NULL,
	"level" int4 NULL,
	picture text NULL,
	updated_at int8 NULL,
	updated_by int4 NULL,
	institute_uid uuid NULL,
	CONSTRAINT aciton_users_level CHECK ((level = ANY (ARRAY[10, 11, 12, 13]))),
	CONSTRAINT action_users_check CHECK ((gender = ANY (ARRAY[7, 8, 9]))),
	CONSTRAINT action_users_email_key UNIQUE (email),
	CONSTRAINT action_users_phone_key UNIQUE (phone),
	CONSTRAINT action_users_pkey PRIMARY KEY (id),
	CONSTRAINT action_users_uid_key UNIQUE (uid),
	CONSTRAINT action_users_updated_at_key UNIQUE (updated_at)
);


-- public.action_users foreign keys

ALTER TABLE public.action_users ADD CONSTRAINT action_users_fk FOREIGN KEY ("level") REFERENCES public.terminologies(id) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE public.action_users ADD CONSTRAINT fk_gender FOREIGN KEY (gender) REFERENCES public.terminologies(id) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE public.action_users ADD CONSTRAINT fk_institute_uid FOREIGN KEY (institute_uid) REFERENCES public.ts01_institute(uid) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE public.action_users ADD CONSTRAINT fk_reference_id FOREIGN KEY (reference_id) REFERENCES public.action_users(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE public.action_users ADD CONSTRAINT fk_relationship_level FOREIGN KEY (relationship_level) REFERENCES public.terminologies(id) ON DELETE RESTRICT ON UPDATE CASCADE;