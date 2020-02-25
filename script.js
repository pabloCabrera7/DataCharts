
console.log('Usage: node epa-http.txt FILENAME');

const fs = require('fs')
let filename = 'epa-http.txt';

// We read the document who has the content
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    console.log('OK: ' + filename);
    let struc = storeData(data);
    writeFile(struc)
});

// We store the processed data
function writeFile(struc) {
    fs.writeFile('data.json', JSON.stringify(struc), () => {
        console.log('data write in file')
    })
}

// We process the information and build the structure required
function storeData(data) {
    let lines = data.split(/\r?\n/);
    let structure = [];
    lines.forEach((element) => {
        let lin = element.split(' ');
        // We know that a 'good lines' must have 7 diferents values, otherwhise we don't process itxl
        if (lin.length === 7) {
            let linDate = lin[1].replace('[', '').replace(']', '').split(':');
            structure.push(
                {
                    host: lin[0],
                    datetime: {
                        day: linDate[0],
                        hour: linDate[1],
                        minute: linDate[2],
                        second: linDate[3],
                    },
                    request: {
                        method: lin[2].replace('"', ''),
                        url: lin[3],
                        protocol: lin[4].split('/')[0],
                        protocol_version: lin[4].split('/')[1].replace('"', '')
                    },
                    response_code: lin[5],
                    document_size: lin[6]
                }
            )
        }
    });
    return structure;
}