export default class CPF {
    private readonly value: string;

    constructor(value: string){
        if(!this.isValid(value)) throw new Error('Invalid CPF');
        this.value = value;
    }

    private isValid(cpf: string): boolean {
        const strippedCpf: string = this.stripCPF(cpf);
        if (strippedCpf.length !== 11) return false;
        if (this.hasAnyNaNCharacter(strippedCpf)) return false;
        if (this.areAllDigitsTheSame(strippedCpf)) return false;
        const expectedVerifyingDigits: string = this.calculateVerifyingDigits(strippedCpf);
        const informedVerifyingDigits: string = this.getVerifyingDigits(strippedCpf);
        return informedVerifyingDigits === expectedVerifyingDigits;
    }

    private getVerifyingDigits(strippedCpf: string): string {
        return strippedCpf.substring(strippedCpf.length - 2, strippedCpf.length);
    }

    private stripCPF(str: string): string {
        const regexToMatchFormattingSymbols = '[\\.\\- ]';
        return str.replace(RegExp(regexToMatchFormattingSymbols, 'g'), '');
    }

    private areAllDigitsTheSame(str: string): boolean {
        return str.split('').every(c => c === str[0]);
    }

    private hasAnyNaNCharacter(str: string): boolean {
        return !str.split('').every(c => !isNaN(parseInt(c)));
    }

    private calculateVerifyingDigits(strippedCpf: string): string {
        const firstVerifyingDigit = this.getVerifyingDigit(strippedCpf.substr(0, 9));
        const cpfWithFirstVerifyingDigit = strippedCpf.substr(0, 9) + firstVerifyingDigit;
        const secondVerifyingDigit = this.getVerifyingDigit(cpfWithFirstVerifyingDigit);
        return '' + firstVerifyingDigit + '' + secondVerifyingDigit;
    }

    private getVerifyingDigit(str: string): string {
        const rest = (this.getVerifyingSum(str) % 11);
        const verifyingDigit = (rest < 2) ? 0 : 11 - rest;
        return verifyingDigit.toString();
    }

    private getVerifyingSum(str: string): number {
        const maxFactor = str.length + 1;
        return str.split('')
            .reduce((peviousDigit, currentDigit, index) =>
                (peviousDigit + (parseInt(currentDigit) * (maxFactor - index))), 0);
    }
}