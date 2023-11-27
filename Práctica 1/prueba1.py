# Importamos las bibliotecas necesarias
from cryptography.fernet import Fernet

def generate_key():
    return Fernet.generate_key()

def encrypt_file(file_path, key):
    with open(file_path, 'rb') as file:
        data = file.read()

    f = Fernet(key)
    encrypted_data = f.encrypt(data)

    with open("encrypted.txt", 'wb') as file:
        file.write(encrypted_data)

def decrypt_file(file_path, key):
    with open(file_path, 'rb') as file:
        data = file.read()

    f = Fernet(key)
    decrypted_data = f.decrypt(data)

    with open("decrypted.txt", 'wb') as file:
        file.write(decrypted_data)

# Generamos una llave para cifrar y descifrar
with open('clave.key.txt', 'wb') as clave_file:
    clave_file.write(generate_key())
key = input("Escriba su llave: ")

path = str(input("Digite el nombre del archivo a cifrar: "))
while True:
    choice = int(input("Escriba 1 para cifrar o 2 para descifrar: "))
    if choice == 1:
        encrypt_file(path, key)
        break
    elif choice == 2:
        decrypt_file(path, key)
        break
    else:
        print("Número equivocado. Intente nuevamente.\n")
