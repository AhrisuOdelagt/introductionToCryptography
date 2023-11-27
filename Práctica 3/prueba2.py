# Importamos las primitivas criptográficas de la biblioteca Cryptography
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
# Importamos la biblioteca para generar una clave y vector de inicialización
import random
import string
# Bibliotecas auxiliares
import sys

# Generador de llaves y vectores
def genRandom(l):
    char = string.ascii_letters + string.digits
    return ''.join(random.choice(char) for _ in range(l))

# Abrimos y almacenamos el archivo .bmp
filename = "Práctica 3\corazon_eOFB.bmp"
with open(filename, "rb") as file:
    content = file.read()
# Separamos la cabecera del resto del archivo
header = content[:54]
fileContent = content[54:]

# Escribimos un menú para trabajar el cifrado y descifrado
while True:
    print("Digite 1 para cifrar o 2 para descifrar")
    ed_choice = int(input("Escriba su elección aquí:    "))
    if 0 < ed_choice < 3:
        break
    else:
        print("Opción incorrecta. Intente nuevamente.\n")

# Seleccionamos el tipo de cifrado/descifrado que se va a ejecutar:
print("\nEl cifrado que se está utilizando es AES.")
while True:
    print("Digite un número para elegir una de las siguientes acciones: ")
    print("1 para usar ECB.")
    print("2 para usar CBC.")
    print("3 para usar CFB.")
    print("4 para usar OFB.")
    print("5 para generar una clave y vector de inicialización aleatorios.")
    print("6 para salir.")
    mode_choice = int(input("Escriba su elección aquí:    "))
    if mode_choice == 1:    # ECB
        break
    if mode_choice == 2:    # CBC
        break
    if mode_choice == 3:    # CFB
        break
    if mode_choice == 4:    # OFB
        break
    if mode_choice == 5:
        key = genRandom(16)
        init_vector = genRandom(16)
        with open("claves.txt", "w", encoding='utf-8') as keyFile:
            keyFile.write(f"Clave: {key}")
            keyFile.write("\n")
            keyFile.write(f"Vector de Inicialización: {init_vector}")
        print("Se ha generado un archivo con su clave y Vector de Inicialización; manéjelos con cuidado.\n")
    elif mode_choice == 6:
        sys.exit()
    else:
        print("Opción incorrecta. Intente nuevamente.\n")

print("Ingrese la llave y el Vector de Inicialización: ")
user_key = str(input("Llave:    "))
user_init_vector = str(input("Vector de Inicialización:    "))
print("\n")

# Codficamos la clave y el Vector como bytes puros (Usados por los cifradores para funcionar correctamente)
key_encoded = user_key.encode("utf-8")
init_vector_encoded = user_init_vector.encode("utf-8")

# ---Ciframos o desciframos según el modo elegido---
# Preparamos el Backend
back = default_backend()
if mode_choice == 1:    # ECB
    # Aseguramos que el tamaño del archivo coincida con el de los bloques
    size = len(fileContent)
    filler = 16 - (size % 16)
    fileContent += b'\x00' * filler
    cryptos = Cipher(algorithms.AES(key_encoded), modes.ECB(), backend=back)
    # Cifrar
    if ed_choice == 1:
        cifrador = cryptos.encryptor()
        # Elegimos el nombre del archivo resultante
        core_name = filename.replace(".bmp", "")
        new_Filename = f"{core_name}_eECB.bmp"
        # Ciframos
        newFileContent = cifrador.update(fileContent) + cifrador.finalize()
        # Guardamos el archivo cifrado
        with open(new_Filename, "wb") as file:
            file.write(header)
            file.write(newFileContent)
        print("El archivo ha sido cifrado exitosamente.")
        print("Al usarse ECB, no se utilizó el Vector de Inicialización.\n")
    # Descifrar
    else:
        descifrador = cryptos.decryptor()
        # Elegimos el nombre del archivo resultante
        core_name = filename.replace(".bmp", "")
        new_Filename = f"{core_name}_dECB.bmp"
        # Desciframos
        newFileContent = descifrador.update(fileContent) + descifrador.finalize()
        # Guardamos el archivo descifrado
        with open(new_Filename, "wb") as file:
            file.write(header)
            file.write(newFileContent)
        print("El archivo ha sido descifrado exitosamente.")
        print("Al usarse ECB, no se utilizó el Vector de Inicialización.\n")
if mode_choice == 2:    # CBC
    # Aseguramos que el tamaño del archivo coincida con el de los bloques
    size = len(fileContent)
    filler = 16 - (size % 16)
    fileContent += b'\x00' * filler
    cryptos = Cipher(algorithms.AES(key_encoded), modes.CBC(init_vector_encoded), backend=back)
    # Cifrar
    if ed_choice == 1:
        cifrador = cryptos.encryptor()
        # Elegimos el nombre del archivo resultante
        core_name = filename.replace(".bmp", "")
        new_Filename = f"{core_name}_eCBC.bmp"
        # Ciframos
        newFileContent = cifrador.update(fileContent) + cifrador.finalize()
        # Guardamos el archivo cifrado
        with open(new_Filename, "wb") as file:
            file.write(header)
            file.write(newFileContent)
        print("El archivo ha sido cifrado exitosamente.\n")
    # Descifrar
    else:
        descifrador = cryptos.decryptor()
        # Elegimos el nombre del archivo resultante
        core_name = filename.replace(".bmp", "")
        new_Filename = f"{core_name}_dCBC.bmp"
        # Desciframos
        newFileContent = descifrador.update(fileContent) + descifrador.finalize()
        # Guardamos el archivo descifrado
        with open(new_Filename, "wb") as file:
            file.write(header)
            file.write(newFileContent)
        print("El archivo ha sido descifrado exitosamente.")
if mode_choice == 3:    # CFB
    # Aseguramos que el tamaño del archivo coincida con el de los bloques
    size = len(fileContent)
    filler = 16 - (size % 16)
    fileContent += b'\x00' * filler
    cryptos = Cipher(algorithms.AES(key_encoded), modes.CFB(init_vector_encoded), backend=back)
    # Cifrar
    if ed_choice == 1:
        cifrador = cryptos.encryptor()
        # Elegimos el nombre del archivo resultante
        core_name = filename.replace(".bmp", "")
        new_Filename = f"{core_name}_eCFB.bmp"
        # Ciframos
        newFileContent = cifrador.update(fileContent) + cifrador.finalize()
        # Guardamos el archivo cifrado
        with open(new_Filename, "wb") as file:
            file.write(header)
            file.write(newFileContent)
        print("El archivo ha sido cifrado exitosamente.\n")
    # Descifrar
    else:
        descifrador = cryptos.decryptor()
        # Elegimos el nombre del archivo resultante
        core_name = filename.replace(".bmp", "")
        new_Filename = f"{core_name}_dCFB.bmp"
        # Desciframos
        newFileContent = descifrador.update(fileContent) + descifrador.finalize()
        # Guardamos el archivo descifrado
        with open(new_Filename, "wb") as file:
            file.write(header)
            file.write(newFileContent)
        print("El archivo ha sido descifrado exitosamente.")
if mode_choice == 4:    # OFB
    # Aseguramos que el tamaño del archivo coincida con el de los bloques
    size = len(fileContent)
    filler = 16 - (size % 16)
    fileContent += b'\x00' * filler
    cryptos = Cipher(algorithms.AES(key_encoded), modes.OFB(init_vector_encoded), backend=back)
    # Cifrar
    if ed_choice == 1:
        cifrador = cryptos.encryptor()
        # Elegimos el nombre del archivo resultante
        core_name = filename.replace(".bmp", "")
        new_Filename = f"{core_name}_eOFB.bmp"
        # Ciframos
        newFileContent = cifrador.update(fileContent) + cifrador.finalize()
        # Guardamos el archivo cifrado
        with open(new_Filename, "wb") as file:
            file.write(header)
            file.write(newFileContent)
        print("El archivo ha sido cifrado exitosamente.\n")
    # Descifrar
    else:
        descifrador = cryptos.decryptor()
        # Elegimos el nombre del archivo resultante
        core_name = filename.replace(".bmp", "")
        new_Filename = f"{core_name}_dOFB.bmp"
        # Desciframos
        newFileContent = descifrador.update(fileContent) + descifrador.finalize()
        # Guardamos el archivo descifrado
        with open(new_Filename, "wb") as file:
            file.write(header)
            file.write(newFileContent)
        print("El archivo ha sido descifrado exitosamente.")
