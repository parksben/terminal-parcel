const { print } = require('../dist'); // const { print } = require('terminal-parcel');

print('1. print one sentence:');
print('this is one sentence.');

print('\n2. print one object:');
print({ Value: 'face', Prop: 0.5 });

print('\n3. print with `colors.js`:');
print('<color code="green">outputs green text</color>');
print('<color code="red.underline">outputs red underlined text</color>');
print('<color code="inverse">inverse the color</color>');
print('<color code="rainbow">OMG Rainbows!</color>');
print('<color code="trap">Drops the bass</color>');

print('\n4. print with status-color:');
print('<color code="success">success</color>');
print('<color code="warning">warning</color>');
print('<color code="error">error</color>');
print('<color code="notice">notice</color>');
print('<color code="success.bold">success bold</color>');
print('<color code="warning.bold">warning bold</color>');
print('<color code="error.bold">error bold</color>');
print('<color code="notice.bold">notice bold</color>');
