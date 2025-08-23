-- buat table
CREATE TABLE public.project (
  no SERIAL PRIMARY KEY,
  name_project VARCHAR(100) NOT NULL,         
  date_start DATE NOT NULL,                   
  date_end DATE NOT NULL,                         
  description TEXT NOT NULL,                           
  technologies VARCHAR(50) NOT NULL,                  
  image_filename VARCHAR(255) NOT NULL                 
);

-- isi table
INSERT INTO public.project (
  name_project,
  date_start,
  date_end,
  description,
  technologies,
  image_filename
) VALUES (
  'RPG Database Web App',
  '2025-07-01',
  '2025-08-01',
  'A web application to manage RPG heroes and guilds using PostgreSQL and Express.',
  'js, react',
  'rpg-app-banner.png'
);

-- lihat table
SELECT * FROM public.project ORDER BY date_start DESC;

--reset increment 
ALTER SEQUENCE project_no_seq RESTART WITH 1; -- mulai dari satu

-- hapus semua isi tabel + reset
TRUNCATE TABLE project RESTART IDENTITY;
