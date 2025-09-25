-- Initialize ET University Platform Database
-- Multi-tenant setup with basic schema

-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create universities table (tenants)
CREATE TABLE universities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    domain VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create campuses table
CREATE TABLE campuses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    university_id UUID NOT NULL REFERENCES universities(id),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(university_id, code)
);

-- Insert sample data
INSERT INTO universities (name, code, domain) VALUES 
    ('Addis Ababa University', 'AAU', 'aau.edu.et'),
    ('Bahir Dar University', 'BDU', 'bdu.edu.et'),
    ('Hawassa University', 'HU', 'hu.edu.et');

INSERT INTO campuses (university_id, name, code, address) VALUES 
    ((SELECT id FROM universities WHERE code = 'AAU'), 'Main Campus', 'MAIN', 'Addis Ababa, Ethiopia'),
    ((SELECT id FROM universities WHERE code = 'AAU'), 'Medical Campus', 'MED', 'Addis Ababa, Ethiopia'),
    ((SELECT id FROM universities WHERE code = 'BDU'), 'Main Campus', 'MAIN', 'Bahir Dar, Ethiopia'),
    ((SELECT id FROM universities WHERE code = 'HU'), 'Main Campus', 'MAIN', 'Hawassa, Ethiopia');

-- Create indexes for performance
CREATE INDEX idx_universities_code ON universities(code);
CREATE INDEX idx_campuses_university_id ON campuses(university_id);
CREATE INDEX idx_campuses_code ON campuses(university_id, code);

-- Grant permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;

-- Log initialization
INSERT INTO universities (name, code, domain) VALUES ('System', 'SYS', 'system.internal') 
ON CONFLICT (code) DO NOTHING;

SELECT 'ET University Platform database initialized successfully' as status;
