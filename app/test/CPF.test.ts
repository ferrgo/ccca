import CPF from '../src/CPF';

test.each([
    { value: '', reason: 'is an empty string' },
    { value: '111.111.111-11', reason: 'all digits are the same' },
    { value: 'a935.411.347-80', reason: 'has any letters' },
    { value: '9)5.411.347-80', reason: 'has any char that is not a digit' },
    { value: '0111.111.111-11', reason: 'has more than 11 digits' },
    { value: '1111111111', reason: 'has less than 11 digits' },
    { value: '123.456.789-99', reason: 'verifying digits are wrong' },
])('Should throw Error if $reason', ({value}) => {
    expect(()=>new CPF(value)).toThrow(new Error('Invalid CPF'));
});

test.each([
    { value: '935.411.347-80', reason: 'verifying digits are correct' },
    { 
        value: '9   35   .4   11.347      -80',
        reason: 'verifying digits are correct even with spaces in string' 
    },
    { 
        value: '93541134780',
        reason: 'verifying digits are correct even with without formatting'
    },
])('Should create valid CPF if $reason', ({value}) => {
    const cpf: CPF = new CPF(value);
    expect(cpf).toBeDefined();
});