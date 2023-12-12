const pool = require('./database'); 

// Führen Sie eine einfache Testabfrage aus, um die Verbindung zu überprüfen
pool.query('SELECT 1 + 1 AS result', (error, results) => {
    if (error) {
        console.error('Fehler bei der Verbindung zur MySQL-Datenbank: ' + error.stack);
        return;
    }
    
    // Überprüfen Sie das Ergebnis der Testabfrage
    if (results && results.length > 0 && results[0].result === 2) {
        console.log('Erfolgreich mit der MySQL-Datenbank verbunden.');
    } else {
        console.error('Fehler beim Überprüfen der Verbindung zur MySQL-Datenbank.');
    }
});
