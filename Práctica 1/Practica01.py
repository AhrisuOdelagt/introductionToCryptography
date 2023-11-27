# Bibliotecas que usaremos
import tkinter as tk
from tkinter import filedialog
from tkinter import ttk
from pathlib import Path
# Biblioteca principal para el cifrado y descifrado
from cryptography.fernet import Fernet

# Funciones

# Obtener la ubucación del archivo y guardarla en una variable
def obtener_ruta_archivo():
    archivo = filedialog.askopenfilename(filetypes=[("Archivos de texto", "*.txt")])
    if archivo:
        # Almacena la ubicación del archivo en una variable global
        global ruta_archivo
        ruta_archivo = archivo
        # Etiqueta para mostrar la ubicación del archivo
        etiqueta_archivo.config(text=f"Ubicación del archivo: {archivo}")

# Funcion para aplicar el cifrado y descifrado        
def aplicar():
    seleccion = var.get()
    key=entry_key.get()
    if seleccion == "cifrado":
        encrypt_file(ruta_archivo, key)
        etiqueta_accion.config(text=f"Cifrado correctamente")
    elif seleccion == "descifrado":
        decrypt_file(ruta_archivo, key)
        etiqueta_accion.config(text=f"Descifrado correctamente")
             
# Genera la llave que nos permite cifrar o descifrar, esta llave es diferente en cada proceso
def generate_key():
    return Fernet.generate_key()

# Función de cifrado, toma como parámetros el archivo txt (su ubicacion, para ser más especificos) y la key
def encrypt_file(file_path, key):
    with open(file_path, 'rb') as file:
        data = file.read()

    f = Fernet(key)
    encrypted_data = f.encrypt(data)
    nombre_archivo = Path(file_path).name
    nombre_archivo_sin = Path(nombre_archivo).stem
    nombre_cifrado = f"{nombre_archivo_sin}_c.txt"
    
    with open(nombre_cifrado, 'wb') as file:
        file.write(encrypted_data)

# Funcion de descifrado, recibe como parametros el archivo cifrado y la key
def decrypt_file(file_path, key):
    with open(file_path, 'rb') as file:
        data = file.read()

    f = Fernet(key)
    decrypted_data = f.decrypt(data)
    nombre_archivo = Path(file_path).name
    nombre_archivo_sin = Path(nombre_archivo).stem
    nombre_descifrado = f"{nombre_archivo_sin}_d.txt"

    with open(nombre_descifrado, 'wb') as file:
        file.write(decrypted_data)
               
        
# Generamos una llave para cifrar y descifrar
def GenerarLlave():
    with open('clave.key.txt', 'wb') as clave_file:
        clave_file.write(generate_key())
    
            
# Codigo para la interfaz
ventana = tk.Tk()
ventana.geometry("1000x400")
ventana.configure(bg="#BDECB6")
ventana.title("Cifrado y descifrado de archivos")

#Boton para generar llave
boton_key = tk.Button(ventana, text="Generar Key", command= GenerarLlave)
boton_key.place(x=750, y=40)
#boton_key.pack()

# Creamos label que muestre un mensaje de bienvenida
mensaje = tk.Label(ventana, text="Bienvenido al cifrado y descifrado de archivos\n.txt a través de la biblioteca Fernet.", bg="#BDECB6",font=16)
mensaje.pack()

# Creamos label que muestre un mensaje para ingresar la key generada
mensaje = tk.Label(ventana, text="Escribe la key generada:", bg="#BDECB6")
mensaje.pack()

# Generamos un textField para poner la key generada
entry_key = tk.Entry(ventana, width=50)
entry_key.pack()

# Creamos label que muestre un mensaje para seleccionar el archivo que queremos cifrar/descifrar
etiqueta_archivo = tk.Label(ventana, text="Selecciona un archivo txt", bg="#BDECB6")
etiqueta_archivo.pack()

# Boton para abrir el navegador de archivos y seleccionar nuestro archivo para cifrar/descifrar
boton_crear = tk.Button(ventana, text="Buscar", command= obtener_ruta_archivo)
boton_crear.pack()

# label para mostrar la ubicación del archivo seleccionado
etiqueta_archivo = tk.Label(ventana, text="")
etiqueta_archivo.pack()

# Crear una variable para almacenar la selección del botón de radio
var = tk.StringVar()

# Crear los botones de radio con las opciones de cifrar y descifrar
op1 = ttk.Radiobutton(ventana, text="Cifrar", variable=var, value="cifrado")
op2 = ttk.Radiobutton(ventana, text="Descifrar", variable=var, value="descifrado")
op1.pack()
op2.pack()

etiqueta_accion = tk.Label(ventana, text="")
etiqueta_accion.pack()

# Botón para aplicar la seleccon de opciones
boton_seleccionar = tk.Button(ventana, text="Aplicar", command=aplicar)
boton_seleccionar.pack()

# Almacena la ubicación del archivo en una variable global
ruta_archivo = None

# Ejecuta la aplicación (de forma grafica)
ventana.mainloop()
