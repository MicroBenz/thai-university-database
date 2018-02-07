const parseXlsx = require('excel');
const fs = require('fs');
const path = require('path');
const empty = require('is-empty');
const fetch = require('node-fetch');



let result = {};

console.log("Downloading Excel from MUA...");
fetch('http://www.mua.go.th/assets/img/university_mua.xlsx')
	.then(res => {
		console.log("Download finish, saving file...");
        const dest = fs.createWriteStream('./university_mua.xlsx');
        res.body.pipe(dest)
	    	.on('finish', () => {
		    	parseXlsx('./university_mua.xlsx', function(err, data) {
					if(err) throw err;
					console.log("Start reading MUA Excel");
					data.shift()
					data.forEach((row) => {
						let universityMeta = {
							'university': row[2],
							'thCode': row[3]
						};
						if(!empty(row[2]) && !empty(row[3]))
							result[row[3]] = universityMeta;
					});

					console.log("Finish reading MUA Excel, merging Wikipedia JSON");
					let wikiResult = JSON.parse(fs.readFileSync('./dist/universities.json', 'utf8'));
					wikiResult.forEach((row) => {
						result[row.thCode] = row;
					});

					console.log("Finish reading Wikipedia JSON, merging universities_with_mua.json");
					fs.writeFileSync(path.join(__dirname, './dist/universities_with_mua.json'), JSON.stringify(Object.values(result)));

					console.log("Finish");
				});
		    });
    })
    .catch(err => console.error(err));