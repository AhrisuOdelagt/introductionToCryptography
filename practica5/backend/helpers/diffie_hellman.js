// Implementación del secreto Diffie-Hellman
import crypto from "crypto"
import bigInt from "big-integer"

// Generar un número primo
function generatePrime(bits) {
    const maxAttempts = 1000; // Número máximo de intentos para generar un número primo
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        // Generar un número aleatorio de 128 bits
        const randomBytes = crypto.randomBytes(Math.ceil(bits / 8));
        const randomNumber = bigInt(randomBytes.toString('hex'), 16);

        // Asegurarse de que el número sea impar
        const candidate = randomNumber.or(1);

        // Verificar si el número es primo
        if (candidate.isProbablePrime()) {
            return candidate;
        }
    }

    throw new Error(`No se pudo generar un número primo después de ${maxAttempts} intentos.`);
}

// Calcular raíz primitiva (no hay función para calcularla directamente y todo intento jamás concluyó)
const roots = [2, 3, 5, 6, 7, 8, 9];
function findPrimitiveRoot(roots) {
    // Verificar si el arreglo no está vacío
    if (roots.length === 0) {
        console.error("Arreglo vacío por alguna razón.");
        return null;
    }

    // Obtener un índice aleatorio dentro del rango del arreglo
    const root = Math.floor(Math.random() * roots.length);

    // Devolver el número en la posición aleatoria
    return roots[root];
}

// Generar parámetros públicos
const generarParametros_DH = () => {
    const n = generatePrime(128);
    console.log("n generado.");
    const g = findPrimitiveRoot(roots);
    console.log("g generado.");
    return [n, g]
};

// Generar secretos
const generarSecretos_DH = (p) => {
    // Generamos el secreto
    const randomBytes = crypto.randomBytes(Math.ceil(16));
    const randomNumber = bigInt(randomBytes.toString('hex'), 16);
    const result = randomNumber.mod(p);

    return result;
};

// Generar claves públicas
const generatePublicKeys_DH = (n, g, secret) => {
    const public_key = bigInt(g).modPow(secret, n);
    return public_key;
};

// Generar claves compartidas
const generateSharedKeys_DH = (n, secret, publicKey) => {
    const shared_key = bigInt(publicKey).modPow(secret, n);
    const hexString = shared_key.toString(16);
    return hexString.padStart(32, "f");
};

// Pruebas
/*const publicas = generarParametros_DH();
console.log("Valores públicos:");
console.log("n: ", publicas[0].toString());
console.log("g: ", publicas[1].toString());
// Calculamos n - 2
console.log(typeof(publicas[0]));
const p = publicas[0].subtract(BigInt(2));
const a1 = generarSecretos_DH(p);
const a2 = generarSecretos_DH(p);
const b1 = generarSecretos_DH(p);
const b2 = generarSecretos_DH(p);
console.log("Secretos Generados: ")
console.log("a1: ", a1.toString());
console.log("a2: ", a2.toString());
console.log("b1: ", b1.toString());
console.log("b2: ", b2.toString());
// Generamos dos claves publicas
const ka1 = generatePublicKeys_DH(publicas[0], publicas[1], a1);
const ka2 = generatePublicKeys_DH(publicas[0], publicas[1], a2);
const kb1 = generatePublicKeys_DH(publicas[0], publicas[1], b1);
const kb2 = generatePublicKeys_DH(publicas[0], publicas[1], b2);
console.log("Claves públicas generadas: ")
console.log("ka1: ", ka1.toString());
console.log("ka2: ", ka2.toString());
console.log("kb1: ", kb1.toString());
console.log("kb2: ", kb2.toString());
console.log("Claves compartidas generadas (con a1 y b1): ")
const k1_0 = generateSharedKeys_DH(publicas[0], a1, kb1);
const k1_1 = generateSharedKeys_DH(publicas[0], b1, ka1);
console.log("k1: ", k1_0);
console.log("k1: ", k1_1);
console.log("Claves compartidas generadas (con a2 y b2): ")
const k2_0 = generateSharedKeys_DH(publicas[0], a2, kb2);
const k2_1 = generateSharedKeys_DH(publicas[0], b2, ka2);
console.log("k2: ", k2_0);
console.log("k2: ", k2_1);*/

export {
    generarParametros_DH,
    generarSecretos_DH,
    generatePublicKeys_DH,
    generateSharedKeys_DH
};
