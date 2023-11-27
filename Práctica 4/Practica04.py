# Bibliotecas que usaremos
import tkinter as tk
from tkinter import ttk
import numpy as np  # Manejo de matrices
from fractions import Fraction  # Manejo de fracciones
import sys  # Finalizaciones del código

# Funciones
def cambiarMatriz():
    matriz = m.get()
    if matriz == '2':
        txteC11.config(state="normal") 
        txteC12.config(state="normal") 
        txteC13.config(state="disabled")
        txteC14.config(state="disabled")
        txteC21.config(state="normal") 
        txteC22.config(state="normal") 
        txteC23.config(state="disabled")
        txteC24.config(state="disabled")
        txteC31.config(state="disabled")
        txteC32.config(state="disabled")
        txteC33.config(state="disabled")
        txteC34.config(state="disabled")
        txteC41.config(state="disabled")
        txteC42.config(state="disabled")
        txteC43.config(state="disabled")
        txteC44.config(state="disabled")
    elif matriz == '3':
        txteC11.config(state="normal") 
        txteC12.config(state="normal") 
        txteC13.config(state="normal") 
        txteC14.config(state="disabled")
        txteC21.config(state="normal") 
        txteC22.config(state="normal") 
        txteC23.config(state="normal") 
        txteC24.config(state="disabled")
        txteC31.config(state="normal") 
        txteC32.config(state="normal") 
        txteC33.config(state="normal") 
        txteC34.config(state="disabled")
        txteC41.config(state="disabled") 
        txteC42.config(state="disabled") 
        txteC43.config(state="disabled") 
        txteC44.config(state="disabled")
    elif matriz == '4':
        txteC11.config(state="normal") 
        txteC12.config(state="normal") 
        txteC13.config(state="normal") 
        txteC14.config(state="normal") 
        txteC21.config(state="normal") 
        txteC22.config(state="normal") 
        txteC23.config(state="normal") 
        txteC24.config(state="normal") 
        txteC31.config(state="normal") 
        txteC32.config(state="normal") 
        txteC33.config(state="normal") 
        txteC34.config(state="normal") 
        txteC41.config(state="normal") 
        txteC42.config(state="normal") 
        txteC43.config(state="normal") 
        txteC44.config(state="normal")
         
def aplicar():
    matriz = m.get()
    digits = []
    ext = []
    N = entry_n.get()
    n=int(N)
    NC11=txteC11.get()
    NC12=txteC12.get()
    NC13=txteC13.get()
    NC14=txteC14.get()
    NC21=txteC21.get()
    NC22=txteC22.get()
    NC23=txteC23.get()
    NC24=txteC24.get()
    NC31=txteC31.get()
    NC32=txteC32.get()
    NC33=txteC33.get()
    NC34=txteC34.get()
    NC41=txteC41.get()
    NC42=txteC42.get()
    NC43=txteC43.get()
    NC44=txteC44.get()        
        
    if matriz == '2':
        C11 = float(NC11)
        C12 = float(NC12)
        C21 = float(NC21)
        C22 = float(NC22)
        ext=[C11, C12, C21, C22]
        digits.extend(ext)
        matrix = [[digits[i], digits[i + 1]] for i in range(0, len(digits), 2)]
        
        
    elif matriz == '3':
        C11 = float(NC11)
        C12 = float(NC12)
        C13 = float(NC13)
        C21 = float(NC21)
        C22 = float(NC22)
        C23 = float(NC23)
        C31 = float(NC31)
        C32 = float(NC32)
        C33 = float(NC33)
        ext=[C11, C12, C13, C21, C22, C23, C31, C32, C33]
        digits.extend(ext)
        matrix = [[digits[i], digits[i + 1], digits[i + 2]] for i in range(0, len(digits), 3)]
        
        
    elif matriz == '4':
        C11 = float(NC11)
        C12 = float(NC12)
        C13 = float(NC13)
        C14 = float(NC14)
        C21 = float(NC21)
        C22 = float(NC22)
        C23 = float(NC23)
        C24 = float(NC24)
        C31 = float(NC31)
        C32 = float(NC32)
        C33 = float(NC33)
        C34 = float(NC34)
        C41 = float(NC41)
        C42 = float(NC42)
        C43 = float(NC43)
        C44 = float(NC44)
        ext=[C11, C12, C13, C14, C21, C22, C23, C24, C31, C32, C33, C34, C41, C42, C43, C44]
        digits.extend(ext)
        matrix = [[digits[i], digits[i + 1], digits[i + 2], digits[i + 3]] for i in range(0, len(digits), 4)]
        
    
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
        mensajeMod.config(text='')
        print(f"{modules[0]} y {modules[1]} son coprimos. Continuando...")
        # Calculamos el inverso de la matriz
        inv_matrix = np.linalg.inv(npMatrix)
        print(inv_matrix)
        fraction_matrix = np.array([[Fraction(elemento).limit_denominator() for elemento in fila] for fila in inv_matrix])
        print(fraction_matrix)
        
        mensajeN.config(text=(f'{n}='))
        
        if matriz == '2':
            txteI11.config(text=fraction_matrix[0,0])
            txteI12.config(text=fraction_matrix[0,1])
            txteI21.config(text=fraction_matrix[1,0])
            txteI22.config(text=fraction_matrix[1,1])
        elif matriz == '3':
            txteI11.config(text=fraction_matrix[0,0])
            txteI12.config(text=fraction_matrix[0,1])
            txteI13.config(text=fraction_matrix[0,2])
            txteI21.config(text=fraction_matrix[1,0])
            txteI22.config(text=fraction_matrix[1,1])
            txteI23.config(text=fraction_matrix[1,2])
            txteI31.config(text=fraction_matrix[2,0])
            txteI32.config(text=fraction_matrix[2,1])
            txteI33.config(text=fraction_matrix[2,2])
        elif matriz == '4':
            txteI11.config(text=fraction_matrix[0,0])
            txteI12.config(text=fraction_matrix[0,1])
            txteI13.config(text=fraction_matrix[0,2])
            txteI14.config(text=fraction_matrix[0,3])
            txteI21.config(text=fraction_matrix[1,0])
            txteI22.config(text=fraction_matrix[1,1])
            txteI23.config(text=fraction_matrix[1,2])
            txteI24.config(text=fraction_matrix[1,3])
            txteI31.config(text=fraction_matrix[2,0])
            txteI32.config(text=fraction_matrix[2,1])
            txteI33.config(text=fraction_matrix[2,2])
            txteI34.config(text=fraction_matrix[2,3])
            txteI41.config(text=fraction_matrix[3,0])
            txteI42.config(text=fraction_matrix[3,1])
            txteI43.config(text=fraction_matrix[3,2])
            txteI44.config(text=fraction_matrix[3,3])
        
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
                
        if matriz == '2':
            matrix_modN = [[matrix_modN_list[i], matrix_modN_list[i + 1]] for i in range(0, len(matrix_modN_list), 2)]
            txteM11.config(text=matrix_modN[0][0])
            txteM12.config(text=matrix_modN[0][1])
            txteM13.config(text='')
            txteM14.config(text='')
            txteM21.config(text=matrix_modN[1][0])
            txteM22.config(text=matrix_modN[1][1])
            txteM23.config(text='')
            txteM24.config(text='')
            txteM31.config(text='')
            txteM32.config(text='')
            txteM33.config(text='')
            txteM34.config(text='')
            txteM41.config(text='')
            txteM42.config(text='')
            txteM43.config(text='')
            txteM44.config(text='')
            
        elif matriz == '3':
            matrix_modN = [[matrix_modN_list[i], matrix_modN_list[i + 1], matrix_modN_list[i + 2]] for i in range(0, len(matrix_modN_list), 3)]
            print (matrix_modN)
            txteM11.config(text=matrix_modN[0][0])
            txteM12.config(text=matrix_modN[0][1])
            txteM13.config(text=matrix_modN[0][2])
            txteM14.config(text='')
            txteM21.config(text=matrix_modN[1][0])
            txteM22.config(text=matrix_modN[1][1])
            txteM23.config(text=matrix_modN[1][2])
            txteM24.config(text='')
            txteM31.config(text=matrix_modN[2][0])
            txteM32.config(text=matrix_modN[2][1])
            txteM33.config(text=matrix_modN[2][2])
            txteM34.config(text='')
            txteM41.config(text='')
            txteM42.config(text='')
            txteM43.config(text='')
            txteM44.config(text='') 
        elif matriz == '4':
            matrix_modN = [[matrix_modN_list[i], matrix_modN_list[i + 1], matrix_modN_list[i + 2], matrix_modN_list[i + 3]] for i in range(0, len(matrix_modN_list), 4)]
            txteM11.config(text=matrix_modN[0][0])
            txteM12.config(text=matrix_modN[0][1])
            txteM13.config(text=matrix_modN[0][2])
            txteM14.config(text=matrix_modN[0][3])
            txteM21.config(text=matrix_modN[1][0])
            txteM22.config(text=matrix_modN[1][1])
            txteM23.config(text=matrix_modN[1][2])
            txteM24.config(text=matrix_modN[1][3])
            txteM31.config(text=matrix_modN[2][0])
            txteM32.config(text=matrix_modN[2][1])
            txteM33.config(text=matrix_modN[2][2])
            txteM34.config(text=matrix_modN[2][3])
            txteM41.config(text=matrix_modN[3][0])
            txteM42.config(text=matrix_modN[3][1])
            txteM43.config(text=matrix_modN[3][2])
            txteM44.config(text=matrix_modN[3][3])
    else:
        mensajeMod.config(text=f'{modules[0]} y {modules[1]} no son coprimos.')
        print(f"{modules[0]} y {modules[1]} no son coprimos.")          
            
# Codigo para la interfaz
ventana = tk.Tk()
ventana.geometry("1010x390")
ventana.configure(bg="#BDECB6")
ventana.title("Calculadora de matrices")


# Creamos label que muestre un mensaje de bienvenida
mensaje = tk.Label(ventana, text="Bienvenido a la calculadora de matrices.", bg="#BDECB6",font=16)
mensaje.pack()

# Creamos label que muestre un mensaje 
mensaje = tk.Label(ventana, text="Selecciona el valor de m (tamaño de la matriz):", bg="#BDECB6")
mensaje.pack()

# Crear una variable para almacenar la selección del botón de radio
m = tk.StringVar()

# Crear los botones de radio con las opciones de cifrar y descifrar
op1 = ttk.Radiobutton(ventana, text="2x2", variable=m, value="2")
op2 = ttk.Radiobutton(ventana, text="3x3", variable=m, value="3")
op3 = ttk.Radiobutton(ventana, text="4x4", variable=m, value="4")
op1.place(x=420, y=45)
op2.pack()
op3.place(x=545, y=45)

# Creamos label que muestre un mensaje 
mensaje = tk.Label(ventana, text="Escribe el valor de n (modulo a trabajar):", bg="#BDECB6")
mensaje.pack()

# Creamos label que muestre un mensaje 
mensajeMod = tk.Label(ventana)
mensajeMod.place(x=645, y=85)

# Generamos un textField para poner el valor
entry_n = tk.Entry(ventana, width=20)
entry_n.pack()

ValN=entry_n.get()

toggle_button = tk.Button(ventana, text="Cambiar Matriz", command=cambiarMatriz)
toggle_button.place(x=460, y =110)

mensaje = tk.Label(ventana, text="-1", bg="#BDECB6")
mensaje.place(x=400, y =165)

mensaje = tk.Label(ventana, text="=", bg="#BDECB6")
mensaje.place(x=425, y =235)

mensaje = tk.Label(ventana, text="mod", bg="#BDECB6")
mensaje.place(x=680, y =240)

mensajeN = tk.Label(ventana, bg="#BDECB6")
mensajeN.place(x=715, y =240)

txteC11 = tk.Entry(ventana, width=5)
txteC11.place(x=240, y=180)

txteC12 = tk.Entry(ventana, width=5)
txteC12.place(x=280, y=180)

txteC13 = tk.Entry(ventana, width=5)
txteC13.place(x=320, y=180)

txteC14 = tk.Entry(ventana, width=5)
txteC14.place(x=360, y=180)

txteC21 = tk.Entry(ventana, width=5)
txteC21.place(x=240, y=220)

txteC22 = tk.Entry(ventana, width=5)
txteC22.place(x=280, y=220)

txteC23 = tk.Entry(ventana, width=5)
txteC23.place(x=320, y=220)

txteC24 = tk.Entry(ventana, width=5)
txteC24.place(x=360, y=220)

txteC31 = tk.Entry(ventana, width=5)
txteC31.place(x=240, y=260)

txteC32 = tk.Entry(ventana, width=5)
txteC32.place(x=280, y=260)

txteC33 = tk.Entry(ventana, width=5)
txteC33.place(x=320, y=260)

txteC34 = tk.Entry(ventana, width=5)
txteC34.place(x=360, y=260)

txteC41 = tk.Entry(ventana, width=5)
txteC41.place(x=240, y=300)

txteC42 = tk.Entry(ventana, width=5)
txteC42.place(x=280, y=300)

txteC43 = tk.Entry(ventana, width=5)
txteC43.place(x=320, y=300)

txteC44 = tk.Entry(ventana, width=5)
txteC44.place(x=360, y=300)

#---------------------------------------------------------------

txteI11 = tk.Label(ventana)
txteI11.place(x=470, y=180)

txteI12 = tk.Label(ventana)
txteI12.place(x=530, y=180)

txteI13 = tk.Label(ventana)
txteI13.place(x=590, y=180)

txteI14 = tk.Label(ventana)
txteI14.place(x=650, y=180)

txteI21 = tk.Label(ventana)
txteI21.place(x=470, y=220)

txteI22 = tk.Label(ventana)
txteI22.place(x=530, y=220)

txteI23 = tk.Label(ventana)
txteI23.place(x=590, y=220)

txteI24 = tk.Label(ventana)
txteI24.place(x=650, y=220)

txteI31 = tk.Label(ventana)
txteI31.place(x=470, y=260)

txteI32 = tk.Label(ventana)
txteI32.place(x=530, y=260)

txteI33 = tk.Label(ventana)
txteI33.place(x=590, y=260)

txteI34 = tk.Label(ventana)
txteI34.place(x=650, y=260)

txteI41 = tk.Label(ventana)
txteI41.place(x=470, y=300)

txteI42 = tk.Label(ventana)
txteI42.place(x=530, y=300)

txteI43 = tk.Label(ventana)
txteI43.place(x=590, y=300)

txteI44 = tk.Label(ventana)
txteI44.place(x=650, y=300)

#----------------------------------------------------------------

txteM11 = tk.Label(ventana)
txteM11.place(x=760, y=180)

txteM12 = tk.Label(ventana)
txteM12.place(x=800, y=180)

txteM13 = tk.Label(ventana)
txteM13.place(x=840, y=180)

txteM14 = tk.Label(ventana)
txteM14.place(x=880, y=180)

txteM21 = tk.Label(ventana)
txteM21.place(x=760, y=220)

txteM22 = tk.Label(ventana)
txteM22.place(x=800, y=220)

txteM23 = tk.Label(ventana)
txteM23.place(x=840, y=220)

txteM24 = tk.Label(ventana)
txteM24.place(x=880, y=220)

txteM31 = tk.Label(ventana)
txteM31.place(x=760, y=260)

txteM32 = tk.Label(ventana)
txteM32.place(x=800, y=260)

txteM33 = tk.Label(ventana)
txteM33.place(x=840, y=260)

txteM34 = tk.Label(ventana)
txteM34.place(x=880, y=260)

txteM41 = tk.Label(ventana)
txteM41.place(x=760, y=300)

txteM42 = tk.Label(ventana)
txteM42.place(x=800, y=300)

txteM43 = tk.Label(ventana)
txteM43.place(x=840, y=300)

txteM44 = tk.Label(ventana)
txteM44.place(x=880, y=300)

#Botón para aplicar la seleccon de opciones
boton_seleccionar = tk.Button(ventana, text="Calcular", command=aplicar)
boton_seleccionar.place(x=910, y=340)

# Ejecuta la aplicación (de forma grafica)
ventana.mainloop()