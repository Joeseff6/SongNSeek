const { json } = require('express');
const fs = require(`fs`);
const path = require('path');

module.exports = (app) => {
    const obtainJson = () => {
        let data = fs.readFileSync(`./seeds/developSeeds.json`, {encoding: `utf-8`});
        let jsonData = JSON.parse(data);
        return jsonData;
    };

    app.get('/api/songs', (req, res) => {
        let jsonData = obtainJson();
        res.json(jsonData);
    });

    app.post(`/api/songs`, async (req, res) => {
        try {
            let userChoice = req.body;
            console.log(userChoice)
            let jsonData = obtainJson();
            let jsonString = jsonData.stringify;
            // jsonData.push(userChoice);
            console.log(jsonString);
            // let stringData = JSON.stringify(jsonData);

            // fs.writeFileSync(`./seeds/developSeeds.json`, stringData), (err) => {
            //     if (err) {
            //         console.log(err);
            //     };
            // };
        } catch (err) {
            console.log(err)
        }

        // let ids = jsonData.map(existingNote => existingNote.id);
        // note.id = jsonData.length + 1;
        // while (ids.includes(note.id)) {
        //     note.id += 1;
        // }
        // jsonData.push(note);
        // let stringData = JSON.stringify(jsonData);

        // fs.writeFile(`./db/db.json`, stringData, (err) => {
        //     if (err) {
        //         console.log(err);
        //     };
        // });

        res.sendFile(path.join(__dirname, '../../public/html/apiTest.html'));
    });

    app.get(`/api/notes/:id`, (req, res) => {
        let id = parseInt(req.params.id);
        let jsonData = obtainJson();
        let apiNote = jsonData.filter(note => note.id === id);

        if (apiNote.length === 0) {
            res.send(`Note not found!`);
        } else {
            res.json(apiNote);
        };
    });

    app.delete(`/api/notes/:id`, (req, res) => {
        let id = parseInt(req.params.id);
        let jsonData = obtainJson();
        let newJson = jsonData.filter(note => note.id !== id);
        let stringData = JSON.stringify(newJson);

        fs.writeFile(`./db/db.json`, stringData, (err) => {
            if (err) {
                console.log(err);
            };
        });
        
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
};