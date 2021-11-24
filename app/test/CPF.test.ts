import CPF from '../src/CPF'

test("Should return false if string is empty", function () {
    const badCPF: string = '';
    const isValid = CPF.isValid(badCPF);
    expect(isValid).toBe(false);
});

test("Should return false if all digits are the same", function () {
    const badCPF: string = '111.111.111-11';
    const isValid = CPF.isValid(badCPF);
    expect(isValid).toBe(false);
});

test("Should return false if has any letters", function () {
    const badCPF: string = 'a935.411.347-80';
    const isValid = CPF.isValid(badCPF);
    expect(isValid).toBe(false);
});

test("Should return false if has any char that is not a digit", function () {
    const badCPF: string = '9)5.411.347-80';
    const isValid = CPF.isValid(badCPF);
    expect(isValid).toBe(false);
});

test("Should return false if has more than 11 digits", function () {
    const badCPF: string = '0111.111.111-11';
    const isValid = CPF.isValid(badCPF);
    expect(isValid).toBe(false);
});

test("Should return false if has less than 11 digits", function () {
    const badCPF: string = '1111111111';    
    const isValid = CPF.isValid(badCPF);
    expect(isValid).toBe(false);
});

test("Should return false if verifying digits are wrong", function () {
    const badCPF: string = '123.456.789-99';
    const isValid = CPF.isValid(badCPF);
    expect(isValid).toBe(false);
});

test("Should return true if verifying digits are correct", function () {
    const goodCPF: string = '935.411.347-80';
    const isValid = CPF.isValid(goodCPF);
    expect(isValid).toBe(true);
});

test("Should return true if verifying digits are correct even with spaces in string", function () {
    const goodCPF: string = '9   35   .4   11.347      -80';
    const isValid = CPF.isValid(goodCPF);
    expect(isValid).toBe(true);
});

test("Should return true if verifying digits even without formatting", function () {
    const goodCPF: string = '93541134780';
    const isValid = CPF.isValid(goodCPF);
    expect(isValid).toBe(true);
});