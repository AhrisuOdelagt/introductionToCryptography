# Implementación del algoritmo Diffie-Hellman

# Importamos los módulos requeridos
# Requiere instalación del módulo pycryptodome
from Crypto.Util.number import getPrime # Genera un primo con la cantidad de bits indicados
from Crypto.Random import get_random_bytes  # Genera bytes aleatorios
import tkinter as tk # Para la interfaz
from tkinter import ttk
from sympy import primerange, primitive_root
from cryptography.hazmat.primitives.asymmetric import dh
import sys  # Para cerrar el programa

# Función para generar los parámetros generales de Diffie-Hellman
def encontrar_raiz_g(p):
    primitive = primitive_root(p)
    return primitive

def crear_parametros():
    p = getPrime(256)
    g = encontrar_raiz_g(p)   # Puede modificarse
    return p, g

def calcular_clave_publica(g, privado, p):
    public_key = pow(g, privado, p)
    return public_key

def calcular_clave_compartida(private, public, p):
    shared_key = pow(public, private, p)
    AES_key = hex(shared_key)
    print(shared_key)
    return AES_key

def valor_secret(p):
    privada = int.from_bytes(get_random_bytes(16), byteorder='big') % (p - 2)
    return privada

def aplicarOp():
    seleccion = var.get()

    if seleccion == "op2":
        entry_g.config(state="normal")
        entry_opPublic.config(state="disabled")
        entry_p.config(state="normal")
        entry_secret.config(state="normal")
    elif seleccion == "op3":
        entry_g.config(state="disabled")
        entry_opPublic.config(state="normal")
        entry_p.config(state="normal")
        entry_secret.config(state="normal")
    elif seleccion == "op4":
        entry_g.config(state="disabled")
        entry_opPublic.config(state="disabled")
        entry_p.config(state="normal")
        entry_secret.config(state="disabled")

def aplicar():
    seleccion = var.get()
    
    if seleccion == "op1":
        p, g = crear_parametros()
        etiqueta_p.config(text=f"{p}")
        etiqueta_g.config(text=f"{g}")
        
        with open('Parametros.txt', 'w') as archivo_a:
            archivo_a.write("\nValor de p: "+str(p))
            archivo_a.write("\nValor de g: "+str(g))
    
    elif seleccion == "op2":
        my_g = int(entry_g.get())
        my_priv = int(entry_secret.get())
        my_p = int(entry_p.get())
         
        my_key = calcular_clave_publica(my_g, my_priv, my_p)
        etiqueta_publicKey.config(text=f"{my_key}")
        
        with open('Llave_Publica.txt', 'w') as archivo_public:
            archivo_public.write(str(my_key))
        
    elif seleccion == "op3":
        my_opPublic = int(entry_opPublic.get())
        my_priv = int(entry_secret.get())
        my_p = int(entry_p.get())
        
        my_shared_key = calcular_clave_compartida(my_priv, my_opPublic, my_p)
        etiqueta_sharedKey.config(text=f"{my_shared_key}")

        with open('Llave_Compartida.txt', 'w') as archivo_shared:
            archivo_shared.write(str(my_shared_key))
    
    elif seleccion == "op4":
        my_p = int(entry_p.get())
        
        priv = valor_secret(my_p)
        with open('Valor_secreto.txt', 'w') as archivo_priv:
            archivo_priv.write(str(priv))
        
        
    
# Codigo para la interfaz
ventana = tk.Tk()
ventana.geometry("1080x360")
ventana.configure(bg="#BDECB6")
ventana.title("Implementación del algoritmo Diffie-Hellman")

# Creamos label que muestre un mensaje de bienvenida
mensaje = tk.Label(ventana, text="Bienvenido, selecciona una opción para comenzar con el algortimo de Diffie-Hellman.", bg="#BDECB6",font=14)
mensaje.pack()

# Creamos label que muestre un mensaje para ingresar la opcion que queremos
mensaje = tk.Label(ventana, text="Selecciona que deseas hacer:", bg="#BDECB6")
mensaje.place(x=40, y=25)

# Crear una variable para almacenar la selección del botón de radio
var = tk.StringVar()

# Crear los botones de radio con las opciones
op1 = ttk.Radiobutton(ventana, text="Generar aleatoriamente los parámetros del algoritmo.", variable=var, value="op1")
op2 = ttk.Radiobutton(ventana, text="Calcular la clave pública dados tus parámetros privados.", variable=var, value="op2")
op3 = ttk.Radiobutton(ventana, text="Calcular la clave compartida dadas las claves públicas.", variable=var, value="op3")
op4 = ttk.Radiobutton(ventana, text="Calcular valor secreto.", variable=var, value="op4")
op1.place(x=40, y=50)
op2.place(x=40, y=80)
op3.place(x=40, y=110)
op4.place(x=40, y=140)

mensaje = tk.Label(ventana, text="Valor de p:", bg="#BDECB6")
mensaje.place(x=420, y=50)
mensaje = tk.Label(ventana, text="Valor de g:", bg="#BDECB6")
mensaje.place(x=420, y=80)

etiqueta_p = tk.Label(ventana, text="")
etiqueta_p.place(x=500, y=50)
etiqueta_g = tk.Label(ventana, text="")
etiqueta_g.place(x=500, y=80)

mensaje = tk.Label(ventana, text="Escribe el valor de p:", bg="#BDECB6")
mensaje.place(x=420, y=110)
mensaje = tk.Label(ventana, text="Escribe el valor de g:", bg="#BDECB6")
mensaje.place(x=420, y=140)
mensaje = tk.Label(ventana, text="Escribe tu valor secreto:", bg="#BDECB6")
mensaje.place(x=420, y=170)

entry_p = tk.Entry(ventana, width=50)
entry_p.place(x=550, y=110)
entry_g = tk.Entry(ventana, width=50)
entry_g.place(x=550, y=140)
entry_secret = tk.Entry(ventana, width=50)
entry_secret.place(x=550, y=170)

mensaje = tk.Label(ventana, text="Valor de Llave Pública:", bg="#BDECB6")
mensaje.place(x=420, y=200)
etiqueta_publicKey = tk.Label(ventana, text="")
etiqueta_publicKey.place(x=550, y=200)

mensaje = tk.Label(ventana, text="Escribe el valor de la llave pública opuesta:", bg="#BDECB6")
mensaje.place(x=420, y=230)
entry_opPublic = tk.Entry(ventana, width=50)
entry_opPublic.place(x=650, y=230)

mensaje = tk.Label(ventana, text="Valor de Llave compartida:", bg="#BDECB6")
mensaje.place(x=420, y=260)
etiqueta_sharedKey = tk.Label(ventana, text="")
etiqueta_sharedKey.place(x=570, y=260)

entry_g.config(state="disabled")
entry_opPublic.config(state="disabled")
entry_p.config(state="disabled")
entry_secret.config(state="disabled")

# Botón para aplicar la seleccion de opciones
boton_aplicar = tk.Button(ventana, text="Aplicar opcion", command=aplicarOp)
boton_aplicar.place(x=80, y=170)

# Botón para aplicar la seleccion final
boton_aplicar = tk.Button(ventana, text="Aplicar", command=aplicar)
boton_aplicar.place(x=580, y=290)

# Ejecuta la aplicación (de forma grafica)
ventana.mainloop()

