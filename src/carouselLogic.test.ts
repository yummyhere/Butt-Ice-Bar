import test from 'node:test';
import assert from 'node:assert/strict';
import { getRole, getNextIndex, getRoleStyles } from './carouselLogic.ts';

test('getRole assigns center, right, and left correctly for 7 items', () => {
  const total = 7;
  // When activeIndex = 0:
  // center = 0, right = 1, left = 6, back-right = 2, back-left = 5, back = 3, 4
  assert.equal(getRole(0, 0, total), 'center');
  assert.equal(getRole(1, 0, total), 'right');
  assert.equal(getRole(6, 0, total), 'left');
  assert.equal(getRole(2, 0, total), 'back-right');
  assert.equal(getRole(5, 0, total), 'back-left');
  assert.equal(getRole(3, 0, total), 'back');
  assert.equal(getRole(4, 0, total), 'back');
});

test('getNextIndex circular navigation across 7 items', () => {
  const total = 7;
  assert.equal(getNextIndex(0, 'next', total), 1);
  assert.equal(getNextIndex(6, 'next', total), 0);
  assert.equal(getNextIndex(0, 'prev', total), 6);
  assert.equal(getNextIndex(3, 'prev', total), 2);
});

test('getRoleStyles returns expected scale for mobile vs desktop', () => {
  const centerDesktop = getRoleStyles('center', false);
  const centerMobile = getRoleStyles('center', true);

  assert.ok(centerDesktop.style.transform?.toString().includes('1.68'));
  assert.ok(centerMobile.style.transform?.toString().includes('1.25'));
  assert.equal(centerDesktop.zIndex, 20);
});
