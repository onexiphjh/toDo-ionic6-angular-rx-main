CREATE TABLE IF NOT EXISTS todotable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    duedate DATE,
    priority TEXT,
    category TEXT,
    commpleted BOOLEAN
);


INSERT
    or IGNORE INTO todotable(id, title, duedate)
VALUES (
        1,
        'Einkaufen',
        DateTime('now'),
        'medium',
        '',
        false
    );