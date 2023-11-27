# Bibliotecas que usaremos
import tkinter as tk
from tkinter import filedialog
from tkinter import ttk
from pathlib import Path
# Importamos las primitivas criptográficas de la biblioteca Cryptography
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
# Importamos la biblioteca para generar una clave y vector de inicialización
import random
import string
# Bibliotecas auxiliares
import sys


# Funciones

# Obtener la ubucación del archivo y guardarla en una variable
def obtener_ruta_archivo():
    archivo = filedialog.askopenfilename(filetypes=[("Imagenes BMP", "*.bmp")])
    if archivo:
        # Almacena la ubicación del archivo en una variable global
        global ruta_archivo
        ruta_archivo = archivo
        # Etiqueta para mostrar la ubicación del archivo
        etiqueta_archivo.config(text=f"Ubicación del archivo: {archivo}")

# Funcion para aplicar el cifrado y descifrado        
def aplicar():
    seleccion = var.get()
    key = entry_key.get()
    IniVcetor = entry_vector.get()
    metodo = met.get()
    
    if seleccion == "cifrado":
        if metodo == "ECB":
            encrypt_file(ruta_archivo, key, IniVcetor, metodo)
            etiqueta_accion.config(text=f"Cifrado correctamente")
        elif metodo == "CBC":
            encrypt_file(ruta_archivo, key, IniVcetor, metodo)
            etiqueta_accion.config(text=f"Cifrado correctamente")
        elif metodo == "CFB":
            encrypt_file(ruta_archivo, key, IniVcetor, metodo)
            etiqueta_accion.config(text=f"Cifrado correctamente")
        elif metodo == "OFB":
            encrypt_file(ruta_archivo, key, IniVcetor, metodo)
            etiqueta_accion.config(text=f"Cifrado correctamente")
            
    elif seleccion == "descifrado":
        if metodo == "ECB":
            decrypt_file(ruta_archivo, key, IniVcetor, metodo)
            etiqueta_accion.config(text=f"Descifrado correctamente")
        elif metodo == "CBC":
            decrypt_file(ruta_archivo, key, IniVcetor, metodo)
            etiqueta_accion.config(text=f"Descifrado correctamente")
        elif metodo == "CFB":
            decrypt_file(ruta_archivo, key, IniVcetor, metodo)
            etiqueta_accion.config(text=f"Descifrado correctamente")
        elif metodo == "OFB":
            decrypt_file(ruta_archivo, key, IniVcetor, metodo)
            etiqueta_accion.config(text=f"Descifrado correctamente")
             
# Genera la llave que nos permite cifrar o descifrar, esta llave es diferente en cada proceso
def generate_key():
    n=16
    char = string.ascii_letters + string.digits
    key = ''.join(random.choice(char) for _ in range(n))
    init_vector = ''.join(random.choice(char) for _ in range(n))
    with open("claves.txt", "w", encoding='utf-8') as keyFile:
        keyFile.write(f"Llave: {key}")
        keyFile.write("\n")
        keyFile.write(f"Vector de Inicialización: {init_vector}")

# Función de cifrado, toma como parámetros el archivo txt (su ubicacion, para ser más especificos) y la key
def encrypt_file(file_path, key, vector, met):
    with open(file_path, "rb") as file:
        content = file.read()
    # Separamos la cabecera del resto del archivo
    header = content[:54]
    fileContent = content[54:]
    # Codficamos la clave y el Vector como bytes puros (Usados por los cifradores para funcionar correctamente)
    key_encoded = key.encode("utf-8")
    init_vector_encoded = vector.encode("utf-8")
    back = default_backend()
    size = len(fileContent)
    filler = 16 - (size % 16)
    fileContent += b'\x00' * filler
    if met == "ECB":
        cryptos = Cipher(algorithms.AES(key_encoded), modes.ECB(), backend=back)
        cifrador = cryptos.encryptor()
        # Elegimos el nombre del archivo resultante
        core_name = file_path.replace(".bmp", "")
        new_Filename = f"{core_name}_eECB.bmp"
        # Ciframos
        newFileContent = cifrador.update(fileContent) + cifrador.finalize()
        # Guardamos el archivo cifrado
        with open(new_Filename, "wb") as file:
            file.write(header)
            file.write(newFileContent)
        print("El archivo ha sido cifrado exitosamente.")
        print("Al usarse ECB, no se utilizó el Vector de Inicialización.\n")
    else:
        mode_name = met  # Asigna el nombre del modo a una variable
        mode_class = getattr(modes, mode_name)
        print(str(mode_class))
        cryptos = Cipher(algorithms.AES(key_encoded), mode_class(init_vector_encoded), backend=back)
        cifrador = cryptos.encryptor()
        # Elegimos el nombre del archivo resultante
        core_name = file_path.replace(".bmp", "")
        new_Filename = f"{core_name}_e"+met+".bmp"
        # Ciframos
        newFileContent = cifrador.update(fileContent) + cifrador.finalize()
        # Guardamos el archivo cifrado
        with open(new_Filename, "wb") as file:
            file.write(header)
            file.write(newFileContent)
        print("El archivo ha sido cifrado exitosamente.\n")
        


# Funcion de descifrado, recibe como parametros el archivo cifrado y la key
def decrypt_file(file_path, key, vector, met):
    with open(file_path, "rb") as file:
        content = file.read()
    # Separamos la cabecera del resto del archivo
    header = content[:54]
    fileContent = content[54:]
    # Codficamos la clave y el Vector como bytes puros (Usados por los cifradores para funcionar correctamente)
    key_encoded = key.encode("utf-8")
    init_vector_encoded = vector.encode("utf-8")
    back = default_backend()
    size = len(fileContent)
    filler = 16 - (size % 16)
    fileContent += b'\x00' * filler
    if met == "ECB":
        cryptos = Cipher(algorithms.AES(key_encoded), modes.ECB(), backend=back)
        descifrador = cryptos.decryptor()
        # Elegimos el nombre del archivo resultante
        core_name = file_path.replace(".bmp", "")
        new_Filename = f"{core_name}_dECB.bmp"
        # Desciframos
        newFileContent = descifrador.update(fileContent) + descifrador.finalize()
        # Guardamos el archivo descifrado
        with open(new_Filename, "wb") as file:
            file.write(header)
            file.write(newFileContent)
        print("El archivo ha sido descifrado exitosamente.")
        print("Al usarse ECB, no se utilizó el Vector de Inicialización.\n")
    else:
        mode_name = met  # Asigna el nombre del modo a una variable
        mode_class = getattr(modes, mode_name)
        cryptos = Cipher(algorithms.AES(key_encoded), mode_class(init_vector_encoded), backend=back)
        descifrador = cryptos.decryptor()
        # Elegimos el nombre del archivo resultante
        core_name = file_path.replace(".bmp", "")
        new_Filename = f"{core_name}_d"+met+".bmp"
        # Desciframos
        newFileContent = descifrador.update(fileContent) + descifrador.finalize()
        # Guardamos el archivo descifrado
        with open(new_Filename, "wb") as file:
            file.write(header)
            file.write(newFileContent)
        print("El archivo ha sido descifrado exitosamente.")         

    
            
# Codigo para la interfaz
ventana = tk.Tk()
ventana.geometry("980x360")
ventana.configure(bg="#BDECB6")
ventana.title("Cifrador por bloques AES")

#Boton para generar llave
boton_key = tk.Button(ventana, text="Generar llave y vector de inicialización", command= generate_key)
boton_key.place(x=650, y=58)
#boton_key.pack()

# Creamos label que muestre un mensaje de bienvenida
mensaje = tk.Label(ventana, text="Bienvenido al cifrado por bloques (AES) de imágenes BMP.", bg="#BDECB6",font=16)
mensaje.pack()

# Creamos label que muestre un mensaje para ingresar la key generada
mensaje = tk.Label(ventana, text="Escribe la llave:", bg="#BDECB6")
mensaje.pack()

# Generamos un textField para poner la key generada
entry_key = tk.Entry(ventana, width=50)
entry_key.pack()

# Creamos label que muestre un mensaje para ingresar la key generada
mensaje = tk.Label(ventana, text="Escribe el vector de inicialización C0:", bg="#BDECB6")
mensaje.pack()

# Generamos un textField para poner el vector generado
entry_vector = tk.Entry(ventana, width=50)
entry_vector.pack()

# Creamos label que muestre un mensaje para seleccionar el archivo que queremos cifrar/descifrar
etiqueta_archivo = tk.Label(ventana, text="\nSelecciona una imagen *.bmp", bg="#BDECB6")
etiqueta_archivo.pack()

# label para mostrar la ubicación del archivo seleccionado
etiqueta_archivo = tk.Label(ventana, text="")
etiqueta_archivo.pack()

# Boton para abrir el navegador de archivos y seleccionar nuestro archivo para cifrar/descifrar
boton_crear = tk.Button(ventana, text="Buscar", command= obtener_ruta_archivo)
boton_crear.pack()

# Crear una variable para almacenar la selección del botón de radio
var = tk.StringVar()
met = tk.StringVar()

# Creamos label que muestre un mensaje para ingresar la key generada
mensaje = tk.Label(ventana, text="Selecciona que deseas hacer:", bg="#BDECB6")
mensaje.place(x=200, y=200)

# Crear los botones de radio con las opciones de cifrar y descifrar
op1 = ttk.Radiobutton(ventana, text="Cifrar", variable=var, value="cifrado")
op2 = ttk.Radiobutton(ventana, text="Descifrar", variable=var, value="descifrado")
op1.place(x=240, y=230)
op2.place(x=240, y=260)

mensaje = tk.Label(ventana, text="Selecciona el método que deseas utilizar:", bg="#BDECB6")
mensaje.place(x=400, y=200)

# Crear los botones de radio con las opciones de cifrar y descifrar
varECB = ttk.Radiobutton(ventana, text="ECB (Electronic Codebook)", variable=met, value="ECB")
varCBC = ttk.Radiobutton(ventana, text="CBC (Cipher-Block Chaining)", variable=met, value="CBC")
varCFB = ttk.Radiobutton(ventana, text="CFB (Cipher Feedback)", variable=met, value="CFB")
varOFB = ttk.Radiobutton(ventana, text="OFB (Output Feedback)", variable=met, value="OFB")
varECB.place(x=430, y=230)
varCBC.place(x=430, y=260)
varCFB.place(x=430, y=290)
varOFB.place(x=430, y=320)

etiqueta_accion = tk.Label(ventana, text="")
etiqueta_accion.place(x=750, y=235)

# Botón para aplicar la seleccon de opciones
boton_seleccionar = tk.Button(ventana, text="Aplicar", command=aplicar)
boton_seleccionar.place(x=790, y=200)

# Almacena la ubicación del archivo en una variable global
ruta_archivo = None

# Ejecuta la aplicación (de forma grafica)
ventana.mainloop()