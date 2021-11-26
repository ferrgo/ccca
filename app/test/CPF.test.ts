import CPF from '../src/CPF';

test.each([
    { cpf: '', expected: false, reason: 'is an empty string' },
    { cpf: '111.111.111-11', expected: false, reason: 'all digits are the same' },
    { cpf: 'a935.411.347-80', expected: false, reason: 'has any letters' },
    { cpf: '9)5.411.347-80', expected: false, reason: 'has any char that is not a digit' },
    { cpf: '0111.111.111-11', expected: false, reason: 'has more than 11 digits' },
    { cpf: '1111111111', expected: false, reason: 'has less than 11 digits' },
    { cpf: '123.456.789-99', expected: false, reason: 'verifying digits are wrong' },
    { cpf: '935.411.347-80', expected: true, reason: 'verifying digits are correct' },
    { 
        cpf: '9   35   .4   11.347      -80', 
        expected: true, 
        reason: 'verifying digits are correct even with spaces in string' 
    },
    { 
        cpf: '93541134780', 
        expected: true, 
        reason: 'verifying digits are correct even with without formatting'
    },
])('Should return $expected if $reason', ({cpf, expected}) => {
    expect(CPF.isValid(cpf)).toBe(expected);
});;