import {parseLayout} from './layout-h-parser';
import {parseConfig} from './config-h-parser';

import * as glob from 'glob';
import {getVendorProductId} from '.';
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const qmkRepoPath = '../qmk_firmware/keyboards';

function transformQMKFiles(parsedLayout: any, infoJSON: any, config: any) {
  const {rows, cols, layout, name} = parsedLayout;
  const {layouts, keyboard_name, width, height} = infoJSON;
  const infoJSONLayout = layouts[name].layout;
  const {VENDOR_ID, PRODUCT_ID} = config;
  const vendorProductId = getVendorProductId({
    vendorId: VENDOR_ID,
    productId: PRODUCT_ID
  });
  return {
    name: keyboard_name,
    matrix: {cols, rows},
    vendorProductId,
    layouts: {
      width,
      height,
      keys: infoJSONLayout.map((key: any, idx: number) => ({
        ...key,
        ...layout[idx],
        label: undefined,

        r: 0,
        rx: 0,
        ry: 0,
        color: 'alpha',
        w: key.w || 1,
        h: key.h || 1
      }))
    }
  };
}

async function generateVIADefinition(folder: string, skipExisting = false) {
  console.log(folder);
  if (skipExisting && fs.existsSync(`${folder}/keymaps/via`)) {
    console.log('Skipping', folder);
  }
  const layoutHFileName = `${folder}/${folder.split('/').reverse()[0]}.h`;
  const infoJSONFileName = `${folder}/info.json`;
  const layoutH = await readFile(layoutHFileName, 'utf8');
  const configH = await readFile(`${folder}/config.h`, 'utf8');
  const infoJSONFile = await readFile(infoJSONFileName, 'utf8');
  const infoJSON = JSON.parse(infoJSONFile);
  const {layout, name} = parseLayout(layoutH);
  const infoJSONLayout = infoJSON.layouts[name].layout;
  const config = parseConfig(configH);
  if (layout.length === infoJSONLayout.length) {
    fs.writeFileSync(
      `./qmk_converted_json/${infoJSON.keyboard_name}.json`,
      JSON.stringify(
        transformQMKFiles(parseLayout(layoutH), infoJSON, config),
        null,
        2
      )
    );
  }
}

async function processFiles() {
  const paths = glob.sync(`${qmkRepoPath}/**/info.json`, {absolute: true});
  const folders = paths.map(path => path.replace(/\/info\.json$/, ''));
  const failedFiles: any[] = [];
  if (!fs.existsSync('qmk_converted_json')) {
    fs.mkdirSync('qmk_converted_json');
  }
  for (let i = 0; i < folders.length; i++) {
    try {
      await generateVIADefinition(folders[i]);
    } catch (e) {
      if (folders[i].indexOf('prophet') !== -1) {
        failedFiles.push([
          e,
          `${folders[i]}/${folders[i].split('/').reverse()[0]}.h`
        ]);
      }
    }
  }
  console.log(failedFiles);
}

processFiles();
