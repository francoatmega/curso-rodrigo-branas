
export default class CPF {

    cpf: string;

    constructor(cpf: string) {
        this.cpf = cpf
    }

    validate(): boolean {

        const FACTOR_DIGIT_1 = 10;
        const FACTOR_DIGIT_2 = 11;

        const cleanCpf = function (cpf: any) {
            return cpf.replace(/[\.\-]/g, "");
        }

        const isValidLength = function (cpf: any) {
            return cpf.length === 11;
        }

        const hasAllDigitsEqual = function (cpf: any) {
            const [firstDigit] = cpf;
            return [...cpf].every(digit => digit === firstDigit);
        }

        const calculateCheckDigit = function (cpf: any, factor: number) {
            let total = 0;
            for (const digit of cpf) {
                if (factor > 1) total += digit * factor--;
            }
            const rest = total%11;
            return (rest < 2) ? 0 : (11 - rest);
        }

        const extractCheckDigit = function (cpf: any) {
            return cpf.slice(-2);
        }

        if (!this.cpf) return false;
        this.cpf = cleanCpf(this.cpf);
        if (!isValidLength(this.cpf)) return false;
        if (hasAllDigitsEqual(this.cpf)) return false;
        const digit1 = calculateCheckDigit(this.cpf, FACTOR_DIGIT_1);
        const digit2 = calculateCheckDigit(this.cpf, FACTOR_DIGIT_2);
        let checkDigit = extractCheckDigit(this.cpf);
        const calculatedDigit = `${digit1}${digit2}`;
        return checkDigit == calculatedDigit;
    }
}