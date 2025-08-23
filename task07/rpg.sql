CREATE SCHEMA rpg;

-- ## 🚀 Cara Menjalankan
-- Tabel guilds
CREATE TABLE rpg.guilds (
    guild_id SERIAL PRIMARY KEY,
    guild_name VARCHAR(100) NOT NULL,
    motto TEXT
);

-- Tabel heroes
CREATE TABLE rpg.heroes (
    hero_id SERIAL PRIMARY KEY,
    hero_name VARCHAR(100) NOT NULL,
    class VARCHAR(50),
    guild_id INTEGER,
    FOREIGN KEY (guild_id) REFERENCES rpg.guilds(guild_id)
);

-- ## 🧪 Contoh Data
-- Tabel guilds
INSERT INTO rpg.guilds (guild_name, motto)
VALUES
  ('Shadow Fang', 'Strike from the shadows'),
  ('Solar Legion', 'Bravery burns bright'),
  ('Emerald Order', 'Wisdom guides the blade');

-- Tabel heroes
INSERT INTO rpg.heroes (hero_name, class, guild_id)
VALUES
  ('Tommy', 'Paladin', 2),
  ('Jeremy', 'Assassin', 1),
  ('Liora', 'Mage', 3),
  ('Thorne', 'Warrior', 1);