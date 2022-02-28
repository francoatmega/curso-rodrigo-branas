import CPF from "./cpf";

test("Should return false when no CPF is passed", function () {
    const cpf = new CPF('');
    expect(cpf.validate()).toBe(false);
});

test("Should return false when CPF passed is non digits", function () {
    const cpf = new CPF('myCPF');
    expect(cpf.validate()).toBe(false);
});

test("Should return false when CPF has all equal digits", function () {
    const cpf = new CPF('11111111111');
    expect(cpf.validate()).toBe(false);
});

test("Should return false when CPF with less then 11 digits is passed", function () {
    const cpf = new CPF('0599');
    expect(cpf.validate()).toBe(false);
});

test("Should return false when CPF with more then 11 digits is passed", function () {
    const cpf = new CPF('05997094308881282');
    expect(cpf.validate()).toBe(false);
});


test("Should return false when formatted CPF has invalid verification digit", function () {
    const cpf = new CPF('059.970.933-01');
    expect(cpf.validate()).toBe(false);
});

test("Should return false when CPF has invalid verification digit", function () {
    const cpf = new CPF('05997093301');
    expect(cpf.validate()).toBe(false);
});

test("Should return true when CPF is valid", function () {
    const cpf = new CPF('111.444.777-35');
    expect(cpf.validate()).toBe(true);
});

test("Should return true when a formatted CPF is valid", function () {
    const cpf = new CPF('059.970.943-08');
    expect(cpf.validate()).toBe(true);
});