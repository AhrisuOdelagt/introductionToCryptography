# Práctica 2
# Prueba 5

# Definimos la lista que almacenará los residuos y resultados de las divisiones naturales
modules = []
naturalDiv = []
# Definimos los arreglos que almacenarán a las ecuaciones
equations1 = []
equations2 = []
equations3 = []

# Solicitamos los valores n, alpha & beta al usuario
n = int(input("Digite el valor de n:    "))
while True:
    alpha = int(input("Digite el valor de la variable alpha:    "))
    if 0 < alpha < n:
        break
    else:
        print("El valor de alpha no pertenece al rango de n. Intente nuevamente.\n")
while True:
    beta = int(input("Digite el valor de la variable beta:    "))
    if 0 < beta < n:
        break
    else:
        print("El valor de beta no pertenece al rango de n. Intente nuevamente.\n")

# Aplicamos el Algoritmo de Euclides para detectar si los números son o no coprimos
i = 0
modules.append(n)
modules.append(alpha)
print(f"\nRealizamos: gdc({modules[i + 1]}, {modules[i]})\n")
while 0 not in modules:
    naturalDiv.append(modules[i] // modules[i + 1])
    modules.append(modules[i] % modules[i + 1])
    equations1.append(f"{modules[i]} = {modules[i + 1]}({naturalDiv[i]}) + {modules[i + 2]}")
    equations2.append(f"{modules[i + 2]} = {modules[i]} - {modules[i + 1]}({naturalDiv[i]})")
    i += 1

# Imprimimos las ecuaciones desarrolladas a lo largo del algoritmo
for ecuacion in equations1:
    print(ecuacion)

print(f"Finalmente:  gdc({modules[0]}, {modules[1]}) = {modules[len(modules) - 2]}\n")

# Revisamos los números son o no coprimos
if modules[len(modules) - 2] == 1:
    print(f"{modules[0]} y {modules[1]} son coprimos. Generando fórmula de cifrado...")
    # Calculamos la fórmula del cifrado
    ek = f"C = {alpha}p + {beta} mod {n}\n"

    # Preparamos las ecuaciones para el algoritmo extendido de Euclides
    print("Preparamos las ecuaciones para aplicar el algoritmo extendido: \n")
    for ecuacion in equations2[:-1]:
        print(ecuacion)

    # Realizamos el algoritmo extendido de Euclides
    alpha_copy, n_copy = alpha, n
    x = [1, 0]
    y = [0, 1]

    while n_copy != 0:
        quotient = alpha_copy // n_copy
        alpha_copy, n_copy = n_copy, alpha_copy % n_copy
        x[0], x[1] = x[1], x[0] - quotient * x[1]
        y[0], y[1] = y[1], y[0] - quotient * y[1]
    
    # Aislamos los valores de los coeficientes x & y
    x_final, y_final = x[0], y[0]

    # Imprimir los coeficientes x y y en la ecuación ax + by = 1
    print(f"\nLos coeficientes finales de 'x' y 'y' son: \nx = {x_final}\ny = {y_final}\n")
    print(f"Por lo tanto, la ecuación final tiene la forma: 1 = {alpha}({x_final}) + {n}({y_final})\n")

    # Convertimos de enteros negativos a enteros positivos módulo n, de presentarse el caso
    if x_final < 0:
        x_alt = -x_final
        x_alt = x_alt % n
        alpha_inv = n - x_alt
    else:
        alpha_inv = x_final % n
    # Comprobamos que alpha y alpha_inv verdaderamente sean inversos
    comp = (alpha * alpha_inv) % n
    if comp == 1:
        print(f"Comprobación: {alpha}({alpha_inv}) mod {n} = {comp}\n")

        # Calculamos el inverso aditivo de beta
        beta_inv = n - beta

        # Calculamos la función de descifrado
        dk1 = f"p = {alpha_inv}[C + {beta_inv}] mod {n}"
        new_beta = (alpha_inv * beta_inv) % n
        dk2 = f"p = {alpha_inv}C + {new_beta} mod {n}"

        # Imprimimos las ecuaciones de cifrado y descifrado
        print(f"\nFunción de Cifrado: {ek}")
        print("Funciones de Descifrado:")
        print(f"{dk1}\n{dk2}\n")
    else:
        print("Hubo un error.")
else:
    print(f"{modules[0]} y {modules[1]} no son coprimos.")
