/* eslint-disable no-console */
const path = require('path');
const dayjs = require('dayjs');

require('dotenv').config();

const csvParser = require('./csv_parser');

const DATE_FORMAT = 'DD_MM_YYYY';
const BLOCK_NO = process.env.BLOCK_NO;
const APARTMENT_NO = process.env.APARTMENT_NO;
const PHONE = process.env.PHONE;
const USER_NAME = process.env.USER_NAME;

const today = dayjs();

(async () => {
  try {
    const todayStr = today.format(DATE_FORMAT);
    const filePath = path.resolve('./orders', `${todayStr}.csv`);
    const orderLines = await csvParser(filePath);

    console.log(JSON.stringify(orderLines, null, 2));

    console.log('\n');
    console.log(`${USER_NAME}-${BLOCK_NO}_${APARTMENT_NO}\n${PHONE}`);

    orderLines.forEach(({ name, quantity }, index) => {
      console.log(`${index + 1}. ${name} - ${quantity}`);
    });

    console.log('\n');
  } catch (error) {
    console.error(`Error occurs`, error.message);
  }
})();
