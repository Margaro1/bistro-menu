-- Categorías
create table categories (
  id serial primary key,
  slug text not null unique,
  "order" integer not null
);

-- Traducciones de categorías
create table category_translations (
  id serial primary key,
  category_id integer not null references categories(id) on delete cascade,
  language text not null check (language in ('es', 'en', 'ko', 'pt', 'ja')),
  name text not null,
  unique(category_id, language)
);

-- Productos
create table products (
  id serial primary key,
  category_id integer not null references categories(id) on delete restrict,
  image_url text,
  price numeric(10, 2) not null,
  available boolean not null default true,
  created_at timestamptz not null default now()
);

-- Traducciones de productos
create table product_translations (
  id serial primary key,
  product_id integer not null references products(id) on delete cascade,
  language text not null check (language in ('es', 'en', 'ko', 'pt', 'ja')),
  name text not null,
  description text not null default '',
  unique(product_id, language)
);

-- Categorías iniciales
insert into categories (slug, "order") values
  ('bebidas-calientes', 1),
  ('bebidas-frias', 2),
  ('platillos', 3),
  ('postres', 4);

-- Traducciones de categorías
insert into category_translations (category_id, language, name) values
  (1, 'es', 'Bebidas Calientes'), (1, 'en', 'Hot Drinks'),    (1, 'ko', '따뜻한 음료'),  (1, 'pt', 'Bebidas Quentes'), (1, 'ja', 'ホットドリンク'),
  (2, 'es', 'Bebidas Frías'),     (2, 'en', 'Cold Drinks'),   (2, 'ko', '차가운 음료'),  (2, 'pt', 'Bebidas Frias'),   (2, 'ja', 'コールドドリンク'),
  (3, 'es', 'Platillos'),         (3, 'en', 'Dishes'),        (3, 'ko', '요리'),         (3, 'pt', 'Pratos'),          (3, 'ja', '料理'),
  (4, 'es', 'Postres'),           (4, 'en', 'Desserts'),      (4, 'ko', '디저트'),       (4, 'pt', 'Sobremesas'),      (4, 'ja', 'デザート');
