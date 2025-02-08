'use strict';

const expect = require('chai').expect;
const express = require('express');
const router = express.Router();
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  router.get('/', (req, res) => {
    res.render('index');
  })

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;

    if (!input) {
      return res.json({ error: 'No input provided' });
    }

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    console.log("📌 用户输入:", input);
    console.log("🔢 解析出的数:", initNum, "📏 解析出的单位:", initUnit);

    if (initNum === null && initUnit === null) {
      console.log("🚨 返回错误: Invalid number and unit");
      return res.json({ error: 'invalid number and unit' })
    }

    if (initNum === null) {
      console.log("🚨 返回错误: Invalid number");
      return res.json({ error: 'invalid number' });
    }

    if (initUnit === null) {
      console.log("🚨 返回错误: Invalid unit");
      return res.json({ error: 'invalid unit' });
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);

    const initUnitString = convertHandler.spellOutUnit(initUnit);
   
    const returnUnitString = convertHandler.spellOutUnit(returnUnit);

    const returnNum = convertHandler.convert(initNum, initUnit);

    if (returnNum === null) {
      return res.json({ error: 'cannot convert' });
    }

    const string = convertHandler.getString(initNum, initUnitString, returnNum, returnUnitString);

    const responseData = { initNum, initUnit, returnNum, returnUnit, string };
    console.log("✅ 最终返回数据:", responseData);

    return res.json(responseData)
  })
};
