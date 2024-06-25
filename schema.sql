CREATE TABLE IF NOT EXISTS votings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    owner TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS options (
    id SERIAL PRIMARY KEY,
    voting_id UUID NOT NULL,
    option TEXT NOT NULL,
    FOREIGN KEY (voting_id) REFERENCES votings(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    option_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    owner TEXT NOT NULL,
    FOREIGN KEY (option_id) REFERENCES options(id) ON DELETE CASCADE,
    CONSTRAINT unique_vote UNIQUE (owner, option_id)
);