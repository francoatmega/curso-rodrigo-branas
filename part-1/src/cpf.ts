export default class CPF {

    readonly rawCPF: string;

    constructor(cpf: string) {
        this.rawCPF = cpf.replace(/\D*/g, '');
    }

    validate(): boolean {
        if (!this.rawCPF) return false;
        if(this.#hasNotElevenDigits()) return false;
        if(this.#isAllEqualDigits()) return false;
        return this.#hasValidVerificationDigits()
    }

    #hasNotElevenDigits(): boolean {
        return this.rawCPF.length != 11
    }

    #isAllEqualDigits(): boolean {
        return this.rawCPF.split('').every(item => item === this.rawCPF[0])
    }

    #hasValidVerificationDigits(): boolean {
        let cpfWithoutVerificationDigits = this.rawCPF.slice(0, 9);
        const firstVerificationDigit = this.#calculateVerificationDigitFor(cpfWithoutVerificationDigits);
        const secondVerificationDigit = this.#calculateVerificationDigitFor(`${cpfWithoutVerificationDigits}${firstVerificationDigit}`);
        const originalVerificationDigits = this.rawCPF.slice(9, 11);
        return `${firstVerificationDigit}${secondVerificationDigit}` == originalVerificationDigits;
    }

    #calculateVerificationDigitFor(input: string): number {
        const verificationNumber = input.split('')
            .reverse()
            .reduce((acumulator: number, currentValue: string, index: number) => {
            return acumulator += Number(currentValue) * (index + 2)
        }, 0);
        if ((verificationNumber % 11) < 2) return 0;
        return 11 - (verificationNumber % 11);
    }
}