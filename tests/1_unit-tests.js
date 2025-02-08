const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('convertHandler', function() {
        test('should correctly read a whole number input', function() {
            assert.strictEqual(convertHandler.getNum('321lbs'), 321, '321lbs 应解析为 321');
        });
        test('should correctly read a decimal number input', function() {
            assert.strictEqual(convertHandler.getNum('1.2mi'), 1.2, '1.2mi 应解析为 1.2');
        });
        test('should correctly read a fractional input', function() {
            assert.strictEqual(convertHandler.getNum('3/4lbs'), 3/4, '3/4lbs 应解析为 0.75');
        });
        test('should correctly read a fractional input with a decimal', function() {
            assert.strictEqual(convertHandler.getNum('3.5/4lbs'), 3.5/4, '3.5/4lbs 应解析为 3.5/4');
        });
        test('should correctly return an error on a double-fraction', function() {
            assert.strictEqual(convertHandler.getNum('3/7.2/4lbs'), null, '3/7.2/4lbs 应解析为 null');
        });
        test('should correctly default to a numerical input of 1 when no numerical input is provided', function() {
            assert.strictEqual(convertHandler.getNum('lbs'), 1, 'lbs 应解析为 1');
        });
        test('should correctly read each valid input unit', function() {
            assert.strictEqual(convertHandler.getUnit('321l'), 'L', '321l 应解析为 L');
            assert.strictEqual(convertHandler.getUnit('321gal'), 'gal', '32lgal 应解析为 gal');
            assert.strictEqual(convertHandler.getUnit('321lbs'), 'lbs', '32lbs 应解析为 lbs');
            assert.strictEqual(convertHandler.getUnit('321kg'), 'kg', '321kg 应解析为 kg');
            assert.strictEqual(convertHandler.getUnit('321mi'), 'mi', '32lmi 应解析为 mi');
            assert.strictEqual(convertHandler.getUnit('321km'), 'km', '32lkm 应解析为 km');
        });
        test('should correctly return an error for an invalid input unit', function() {
            assert.strictEqual(convertHandler.getUnit('321k'), null, '32lk 应解析为 null');
        });
        test('should return the correct return unit for each valid input unit', function() {
            assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi', 'km 应转换为 mi');
            assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km', 'mi 应转换为 km');
            assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg', 'lbs 应转换为 kg');
            assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs', 'kg 应转换为 lbs');
            assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L', 'gal 应转换为 L');
            assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal', 'L 应转换为 gal');
        });
        test('should correctly return the spelled-out string unit for each valid input unit', function() {
            assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons', 'gal 应拼写为 gallons');
            assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters', 'L 应拼写为 liters');
            assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds', 'lbs 应拼写为 pounds');
            assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms', 'kg 应拼写为 kilograms');
            assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles', 'mi 应拼写为 miles');
            assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers', 'km 应拼写为 kilometers');
        });
        test('convertHandler should correctly convert gal to L', function() {
            assert.approximately(convertHandler.convert(5, 'gal'), 18.92705, 0.1);
        });
        test('convertHandler should correctly convert L to gal', function() {
            assert.approximately(convertHandler.convert(10, 'L'), 2.64172, 0.1);
        });
        test('convertHandler should correctly convert lbs to kg', function() {
            assert.approximately(convertHandler.convert(10, 'lbs'), 4.53592, 0.1);
        });
        test('convertHandler should correctly convert kg to lbs', function() {
            assert.approximately(convertHandler.convert(10, 'kg'), 22.04624, 0.1);
        });
        test('convertHandler should correctly convert mi to km', function() {
            assert.approximately(convertHandler.convert(3, 'mi'), 4.82802, 0.1);
        });
        test('convertHandler should correctly convert km to mi', function() {
            assert.approximately(convertHandler.convert(5, 'km'), 3.10686, 0.1);
        });
    })
});