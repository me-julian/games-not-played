SELECT Entries.*, Games.name FROM Entries
JOIN Games
ON Entries.gameId = Games.id
WHERE userId = --REPLACEME-- AND deletedAt IS NULL
ORDER BY Entries.order ASC