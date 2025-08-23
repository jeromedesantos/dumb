-- buat table
CREATE TABLE public.contact ( 
    no SERIAL PRIMARY KEY, 
    name VARCHAR(50), 
    password VARCHAR(50), 
    );

-- isi table
INSERT INTO public.contact (name, password) VALUES
  ('aria', 'wind123'),
  ('leo', 'sword456'),
  ('nina', 'fire789'),
  ('kai', 'earth321'),
  ('mira', 'aqua852');
