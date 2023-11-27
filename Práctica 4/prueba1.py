# Importamos bibliotecas
import numpy as np  # Manejo de matrices
from fractions import Fraction  # Manejo de fracciones
import sys  # Finalizaciones del código

# Función para crear la matriz
print("Valor de m")
while True:
    m = int(input("Escriba a continuación el valor de m:   "))
    if 1 < m < 5:
        break
    else:
        print("El valor indicado no es soportado por la aplicación.")

# Elegimos el valor de n
print("\nValor de n")
n = int(input("Escriba a continuación el valor de n:   "))

# Escribimos los números de la matriz
print("Digite los valores de la matriz")
digit_number = pow(m, 2)
digits = []
i = 0
while i < digit_number:
    while True:
        number = int(input("Digite un número para añadirlo a la matriz:    "))
        if 0 < number < n:
            digits.append(number)
            break
        else:
            print(f"El número ingresado no pertenece al rango [0, {n}]. Intente nuevamente.")
    i += 1

# Generamos la matriz a partir de la lista (Siento que esta es la forma más representativa que tendrás):
if m == 2:
    matrix = [[digits[i], digits[i + 1]] for i in range(0, len(digits), 2)]
elif m == 3:
    matrix = [[digits[i], digits[i + 1], digits[i + 2]] for i in range(0, len(digits), 3)]
else:
    matrix = [[digits[i], digits[i + 1], digits[i + 2], digits[i + 3]] for i in range(0, len(digits), 4)]

print(matrix)

# Verificamos que la matriz tenga un inverso en dentro del rango [0, n]
npMatrix = np.array(matrix)
print(npMatrix)
det = int(np.linalg.det(npMatrix))
print(det)

# Aplicamos el módulo n
det_mod = det % n
print(det_mod)

# Calculamos el MCD de ambos números con el Algoritmo de Euclides
modules = []
naturalDiv = []
i = 0
modules.append(n)
modules.append(det_mod)
while 0 not in modules:
    naturalDiv.append(modules[i] // modules[i + 1])
    modules.append(modules[i] % modules[i + 1])
    i += 1

# Verificamos que ambos números sean coprimos
if modules[len(modules) - 2] == 1:
    print(f"{modules[0]} y {modules[1]} son coprimos. Continuando...")
else:
    print(f"{modules[0]} y {modules[1]} no son coprimos.")
    sys.exit()

# Calculamos el inverso de la matriz
inv_matrix = np.linalg.inv(npMatrix)
print(inv_matrix)
fraction_matrix = np.array([[Fraction(elemento).limit_denominator() for elemento in fila] for fila in inv_matrix])
print(fraction_matrix)

# Operamos con numerador y denominador para generar la matriz módulo n:
matrix_modN_list = []
for fila in fraction_matrix:
    for fraccion in fila:
        num = fraccion.numerator
        den = fraccion.denominator

        # Realizamos operaciones con numerador y denominador
        num = num % n
        # Calculamos el inverso multiplicativo del denominador con el AEE
        def AEE(a, b):
            if a == 0:
                return (b, 0, 1)
            else:
                mcd, x, y = AEE(b % a, a)
                return (mcd, y - (b // a) * x, x)

        mcd, x, y = AEE(den, n)
        den = x % n

        # Imprimimos los números que se multiplicarán
        print(num, den)

        # Multiplicamos tanto denominador como numerador
        matrix_modN_list.append((num * den) % n)

# Generamos la matriz inversa módulo n a partir de la lista
# (Siento que esta es la forma más representativa que tendrás):
if m == 2:
    matrix_modN = [[matrix_modN_list[i], matrix_modN_list[i + 1]] for i in range(0, len(matrix_modN_list), 2)]
elif m == 3:
    matrix_modN = [[matrix_modN_list[i], matrix_modN_list[i + 1], matrix_modN_list[i + 2]] for i in range(0, len(matrix_modN_list), 3)]
else:
    matrix_modN = [[matrix_modN_list[i], matrix_modN_list[i + 1], matrix_modN_list[i + 2], matrix_modN_list[i + 3]] for i in range(0, len(matrix_modN_list), 4)]

# Imprimimos la matriz inversa módulo n
print(matrix_modN)
npMatrix_modN = np.array(matrix_modN)
print(npMatrix_modN)
