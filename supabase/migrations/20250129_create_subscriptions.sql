create table public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  status text not null,
  price_id text,
  quantity integer,
  cancel_at_period_end boolean,
  cancel_at timestamp with time zone,
  canceled_at timestamp with time zone,
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  created timestamp with time zone default timezone('utc'::text, now()) not null,
  ended_at timestamp with time zone,
  trial_start timestamp with time zone,
  trial_end timestamp with time zone,
  stripe_subscription_id text unique
);
