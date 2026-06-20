-- Contact messages table for public inquiry form
create table if not exists contact_messages (
  id              uuid primary key default gen_random_uuid(),
  nama            text not null,
  email           text not null,
  pesan           text not null,
  created_at      timestamptz not null default now()
);
