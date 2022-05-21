const { print } = require('../dist'); // const { print } = require('terminal-parcel');

print('<status type="success">success</status>');
print('<status type="warning">warning</status>');
print('<status type="error">error</status>');
print('<status type="notice">notice</status>');

print('<status type="success.bold">success bold</status>');
print('<status type="warning.bold">warning bold</status>');
print('<status type="error.bold">error bold</status>');
print('<status type="notice.bold">notice bold</status>');
