import {parseLayout} from './src/layout-h-parser';
const fs = require('fs');
const all = require('./filtered.json');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const path = '../qmk_firmware/keyboards/';
async function processFiles() {
  const processedFiles: any[] = [];
  const failedFiles: any[] = [];
  for (let i = 0; i < all.length; i++) {
    try {
      const f = await readFile(
        `${path}${all[i].folder}/${all[i].folder.split('/').reverse()[0]}.h`,
        'utf8'
      );
      const {rows, cols, layout, name} = parseLayout(f);
      if (layout.length === (all[i].layouts[name].layout || []).length) {
        fs.writeFileSync(
          `./qmk_converted_json/${all[i].name}.json`,
          JSON.stringify(
            {
              ...all[i],
              matrix: {cols, rows},
              layouts: all[i].layouts[name].layout.map(
                (key: any, idx: number) => ({
                  ...key,
                  ...layout[idx]
                })
              )
            },
            null,
            2
          )
        );
      }
    } catch (e) {
      failedFiles.push(
        `${path}${all[i].folder}/${all[i].folder.split('/').reverse()[0]}.h`
      );
    }
  }
  console.log(failedFiles);
}

processFiles();
