# Bibliotecas que usaremos
import tkinter as tk


def euclides(n,alpha,beta):
    # Definimos la lista que almacenará los residuos y resultados de las divisiones naturales
    modules = []
    naturalDiv = []
    # Definimos los arreglos que almacenarán a las ecuaciones
    equations1 = []
    equations2 = []

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
        etiqueta_valido.config(text=f"{modules[0]} y {modules[1]} son coprimos. Generando fórmula de cifrado...")
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
            etiqueta_cifrado.config(text=f"Función de Cifrado: \n{ek}")
            print("Funciones de Descifrado:")
            print(f"{dk1}\n{dk2}\n")
            etiqueta_descifrado.config(text=f"Funciones de Descifrado:\n{dk1}\n{dk2}")
        else:
            print("Hubo un error.")
    else:
        print(f"{modules[0]} y {modules[1]} no son coprimos.")
        etiqueta_valido.config(text=f"{modules[0]} y {modules[1]} no son coprimos. Prueba con otro valor de alpha.")
        etiqueta_cifrado.config(text=f"")
        etiqueta_descifrado.config(text=f"")

#Funcion para llamar aplicar la función de AE y AEE y pasarle parametros
def aplicar():
    n=int(entry_n.get())
    alpha=int(entry_alpha.get())
    beta=int(entry_beta.get())
    betaM=beta%n 
    
    # Evaluamos si 0 < beta < n and 0< alpha < n.
    while True:
        if  0 < betaM < n and 0< alpha < n:
            etiqueta_alpha.config(text=f"✓")
            etiqueta_beta.config(text=f"✓")
            euclides(n,alpha,betaM)
            break
        else:
            etiqueta_alpha.config(text=f"0 < alpha < n")
            etiqueta_beta.config(text=f"")
            etiqueta_valido.config(text=f"")
            break
            
    

# Codigo para la interfaz
ventana = tk.Tk()
ventana.geometry("1000x400")
ventana.configure(bg="#BDECB6")
ventana.title("Algoritmo de Euclides y Algoritmo de Euclides Extendido")

# Creamos label que muestre un mensaje de bienvenida
mensaje = tk.Label(ventana, text="Bienvenido, ingresa los siguientes valores para generar las funciones de cifrado y descifrado.", bg="#BDECB6",font=12)
mensaje.pack()

# Creamos label que muestre un mensaje para ingresar n
mensaje = tk.Label(ventana, text="Escribe el valor de n:", bg="#BDECB6")
mensaje.place(x=20, y=30)

# Generamos un textField para poner el valor de n
entry_n = tk.Entry(ventana, width=10)
entry_n.place(x=155, y=32)

# Creamos label que muestre un mensaje para ingresar el valor de alpha
mensaje = tk.Label(ventana, text="Escribe el valor de α:", bg="#BDECB6")
mensaje.place(x=20, y=60)

# Generamos un textField para poner el valor de alpha
entry_alpha = tk.Entry(ventana, width=10)
entry_alpha.place(x=155, y=62)

# Mensaje que nos indicará si alpha es válido
etiqueta_alpha = tk.Label(ventana, text="")
etiqueta_alpha.place(x=225, y=62)

# Creamos label que muestre un mensaje para ingresar el valor de beta
mensaje = tk.Label(ventana, text="Escribe el valor de β:", bg="#BDECB6")
mensaje.place(x=20, y=90)

# Generamos un textField para poner el valor de beta
entry_beta = tk.Entry(ventana, width=10)
entry_beta.place(x=155, y=92)

# label para mostrar si beta pertenece al conjunto (0,n]
etiqueta_beta = tk.Label(ventana, text="")
etiqueta_beta.place(x=225, y=92)

# label para mostrar si son coprimos
etiqueta_valido = tk.Label(ventana, text="")
etiqueta_valido.place(x=325, y=32)

# label para mostrar la funcion de cifrado
etiqueta_cifrado = tk.Label(ventana, text="")
etiqueta_cifrado.place(x=325, y=62)

# label para mostrar la función de descifrado
etiqueta_descifrado = tk.Label(ventana, text="")
etiqueta_descifrado.place(x=325, y=102)

# Botón para aplicar la seleccion de opciones
boton_aplicar = tk.Button(ventana, text="Aplicar", command=aplicar)
boton_aplicar.place(x=80, y=122)

# Ejecuta la aplicación (de forma grafica)
ventana.mainloop()

