import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBoxPrice,
  calculateTotalCalories,
  isBoxComplete,
  BoxConfig,
  CONE_OPTIONS,
} from './boxBuilderLogic.ts';

test('calculateBoxPrice returns base price for standard box', () => {
  const config: BoxConfig = {
    boxSize: 4,
    selectedScoops: [],
    coneType: CONE_OPTIONS[0],
    giftPackaging: false,
  };
  assert.equal(calculateBoxPrice(config), 28);
});

test('calculateBoxPrice includes specialty cone and gift packaging', () => {
  const config: BoxConfig = {
    boxSize: 4,
    selectedScoops: [],
    coneType: CONE_OPTIONS[1], // +$2
    giftPackaging: true, // +$4
  };
  assert.equal(calculateBoxPrice(config), 34); // 28 + 2 + 4
});

test('calculateTotalCalories aggregates calories accurately', () => {
  const scoops = [
    { id: '1', name: 'Mango', flavor: 'Mango', price: 7, calories: 210, color: '#F4845F', image: '' },
    { id: '2', name: 'Pistachio', flavor: 'Matcha', price: 7, calories: 235, color: '#6BBF7A', image: '' },
  ];
  assert.equal(calculateTotalCalories(scoops), 445);
});

test('isBoxComplete returns true only when capacity matches target', () => {
  const dummyScoop = { id: '1', name: 'M', flavor: 'F', price: 7, calories: 200, color: '', image: '' };
  const config: BoxConfig = {
    boxSize: 4,
    selectedScoops: [dummyScoop, dummyScoop, dummyScoop],
    coneType: CONE_OPTIONS[0],
    giftPackaging: false,
  };
  assert.equal(isBoxComplete(config), false);

  config.selectedScoops.push(dummyScoop);
  assert.equal(isBoxComplete(config), true);
});
