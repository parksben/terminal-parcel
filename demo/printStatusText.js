const { print } = require('../dist'); // const { print } = require('terminal-parcel');

print('<status type="success">success</status>', true);
print('<status type="warning">warning</status>', true);
print('<status type="error">error</status>', true);
print('<status type="notice">notice</status>', true);

print('<status type="success.bold">success bold</status>', true);
print('<status type="warning.bold">warning bold</status>', true);
print('<status type="error.bold">error bold</status>', true);
print('<status type="notice.bold">notice bold</status>', true);
