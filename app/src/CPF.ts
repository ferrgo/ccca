export default class CPF {
    public static validate(cpf: string) {
        const strippedCpf: string = CPF.stripCPF(cpf);
        if (strippedCpf.length !== 11) return false;
        if (CPF.hasAnyNaNCharacter(strippedCpf)) return false;
        if (CPF.areAllDigitsTheSame(strippedCpf)) return false;
        const expectedVerifyingDigits = CPF.getVerifyingDigits(strippedCpf);
        const informedVerifyingDigits = strippedCpf.substring(strippedCpf.length - 2, strippedCpf.length);
        return informedVerifyingDigits == expectedVerifyingDigits;
    }

    private static stripCPF(str: string): string {
        return str.replace(RegExp('\\.|\\-| ', 'gi'), '');
    }

    private static areAllDigitsTheSame(str: string) {
        return str.split('').every(c => c === str[0]);
    }

    private static hasAnyNaNCharacter(str: string) {
        return !str.split('').every(c => !isNaN(parseInt(c)));
    }

    private static getVerifyingDigits(strippedCpf: string): string {
        const firstVerifyingDigit = CPF.getVerifyingDigit(strippedCpf.substr(0, 9));
        const secondVerifyingDigit = CPF.getVerifyingDigit(strippedCpf.substr(0, 9) + firstVerifyingDigit);
        return '' + firstVerifyingDigit + '' + secondVerifyingDigit;
    }

    private static getVerifyingDigit(str: string) {
        const sumForVerifyingDigit: number = CPF.getVerifyingSum(str);
        const rest = (sumForVerifyingDigit % 11);
        const verifyingDigit = (rest < 2) ? 0 : 11 - rest;
        return verifyingDigit;
    }

    private static getVerifyingSum(str: string): number {
        let verifyingSum: number = 0;
        const maxFactor = str.length + 1;
        for (let nCount = maxFactor; nCount >= 2; nCount--) {
            const currentDigit: number = parseInt(str[maxFactor - nCount]);
            verifyingSum = verifyingSum + (nCount) * currentDigit;
        };
        return verifyingSum;
    }
}