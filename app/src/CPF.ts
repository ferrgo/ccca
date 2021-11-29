export default class CPF {
    value: string;

    constructor(value: string){
        if(!CPF.isValid(value)) throw new Error('Invalid CPF');
        this.value = value;
    }

    public static isValid(cpf: string): boolean {
        const strippedCpf: string = CPF.stripCPF(cpf);
        if (strippedCpf.length !== 11) return false;
        if (CPF.hasAnyNaNCharacter(strippedCpf)) return false;
        if (CPF.areAllDigitsTheSame(strippedCpf)) return false;
        const expectedVerifyingDigits: string = CPF.calculateVerifyingDigits(strippedCpf);
        const informedVerifyingDigits: string = CPF.getVerifyingDigits(strippedCpf);
        return informedVerifyingDigits === expectedVerifyingDigits;
    }

    private static getVerifyingDigits(strippedCpf: string): string {
        return strippedCpf.substring(strippedCpf.length - 2, strippedCpf.length);
    }

    private static stripCPF(str: string): string {
        const regexToMatchFormattingSymbols = '\\.|\\-| ';
        return str.replace(RegExp(regexToMatchFormattingSymbols, 'g'), '');
    }

    private static areAllDigitsTheSame(str: string): boolean {
        return str.split('').every(c => c === str[0]);
    }

    private static hasAnyNaNCharacter(str: string): boolean {
        return !str.split('').every(c => !isNaN(parseInt(c)));
    }

    private static calculateVerifyingDigits(strippedCpf: string): string {
        const firstVerifyingDigit = CPF.getVerifyingDigit(strippedCpf.substr(0, 9));
        const cpfWithFirstVerifyingDigit = strippedCpf.substr(0, 9) + firstVerifyingDigit;
        const secondVerifyingDigit = CPF.getVerifyingDigit(cpfWithFirstVerifyingDigit);
        return '' + firstVerifyingDigit + '' + secondVerifyingDigit;
    }

    private static getVerifyingDigit(str: string): string {
        const rest = (CPF.getVerifyingSum(str) % 11);
        const verifyingDigit = (rest < 2) ? 0 : 11 - rest;
        return verifyingDigit.toString();
    }

    private static getVerifyingSum(str: string): number {
        const maxFactor = str.length + 1;
        return str.split('')
            .reduce((peviousDigit, currentDigit, index) =>
                (peviousDigit + (parseInt(currentDigit) * (maxFactor - index))), 0);
    }
}