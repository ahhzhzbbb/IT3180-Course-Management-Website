console.log(/^0\d{9}$/.test('0585424988'));
console.log(/^0\d{9}$/.test('1234567890'));
console.log('sanitized ->', ' 0585-424988 '.replace(/\D/g, ''));
