export default class CPF {

    readonly rawCPF: string;

    constructor(cpf: string) {
        this.rawCPF = cpf.replace(/\D*/g, '');
    }

    validate(): boolean {
        if (!this.rawCPF) return false;
        if(this.#hasNotElevenDigits()) return false;
        if(this.#hasAllEqualDigits()) return false;
        return this.#hasValidVerificationDigits()
    }

    #hasNotElevenDigits(): boolean {
        return this.rawCPF.length != 11
    }

    #hasAllEqualDigits(): boolean {
        const [ firstElement ] = this.rawCPF
        return [ ...this.rawCPF ].every(digit => digit === firstElement)
    }

    #hasValidVerificationDigits(): boolean {
        let cpfWithoutVerificationDigits = this.rawCPF.slice(0, 9);
        const firstVerificationDigit = this.#calculateVerificationDigitFor(cpfWithoutVerificationDigits);
        const secondVerificationDigit = this.#calculateVerificationDigitFor(`${cpfWithoutVerificationDigits}${firstVerificationDigit}`);
        const originalVerificationDigits = this.rawCPF.slice(9, 11);
        return `${firstVerificationDigit}${secondVerificationDigit}` == originalVerificationDigits;
    }

    #calculateVerificationDigitFor(input: string): number {
        const verificationNumber = [ ...input ]
            .reverse()
            .reduce((acumulator: number, currentValue: string, index: number) => {
                return acumulator += Number(currentValue) * (index + 2)
        }, 0);
        const restOfDivision = verificationNumber % 11
        if (restOfDivision < 2) return 0;
        return 11 - restOfDivision;
    }
}