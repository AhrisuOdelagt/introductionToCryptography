# Indicamos el nombre del archivo a operar
filename = str(input("Escriba el nombre del archivo que se va a trabajar: "))
# Indicamos al usuario si quiere cifrar o descifrar el mensaje
while True:
    crypt = int(input("Escriba 1 para cifrar o 2 para descifrar: "))
    if 0 < crypt < 3:
        break
    else:
        print("Opción incorreta. Intente nuevamente.")
# Le solicitamos al usuario la cantidad de desplazamientos a realizar o revertir
while True:
    if crypt == 1:
        displacement = int(input("Escriba la cantidad de desplazamientos a realizar: "))
    else:
        displacement = int(input("Escriba la cantidad de desplazamientos a revertir: "))
    if 0 < displacement < 26:
        break
    else:
        print("Opción incorreta. Intente nuevamente.")

# Revisamos la elección del usuario y ejecutamos la operación pertinente
if crypt == 1:
    # Generamos un archivo nuevo
    coreName = filename.replace(".txt", "")
    newFilename = f"{coreName}_c.txt"

    # Intentamos abrir el primer archivo en modo de lectura:
    try:
        with open(filename, "r") as file:
            # Abrimos el segundo archivo en modo de escritura
            try:
                with open(newFilename, "w") as file2:
                    for line in file:
                        line2 = line.strip().replace(" ", "")
                        # Pasamos las letras a mayúsculas
                        line3 = ""
                        for char in line2:
                            if "a" <= char <= "z":
                                # Se transforma el caracter en mayúscula
                                newChar = chr(ord(char) - 32)
                            else:
                                newChar = char
                            line3 += newChar
                        # Realizamos el cifrado
                        line4 = ""
                        for char in line3:
                            if "A" <= char <= "Z":
                                # Recorremos el valor del ascii para cifrar
                                rec = ord(char) + displacement % 25
                                # Verificamos si el recorrido supera a la letra Z
                                if 65 <= rec <= 90:
                                    newChar2 = chr(rec)
                                else:
                                    rec -= 26
                                    newChar2 = chr(rec)
                            else:
                                newChar2 = char
                            line4 += newChar2
                        file2.write(f"{line4}")
            except FileNotFoundError:
                print(f"El archivo {filename} puede que no se encuentre en este directorio.")
            except Exception as e:
                print(f"Ha ocurrido un error {e}")

    except FileNotFoundError:
        print(f"El archivo {filename} puede que no se encuentre en este directorio.")
    except Exception as e:
        print(f"Ha ocurrido un error {e}")
else:
    # Generamos un archivo nuevo
    coreName = filename.replace(".txt", "")
    newFilename = f"{coreName}_d.txt"

    # Intentamos abrir el primer archivo en modo de lectura:
    try:
        with open(filename, "r") as file:
            # Abrimos el segundo archivo en modo de escritura
            try:
                with open(newFilename, "w") as file2:
                    for line in file:
                        # Pasamos las letras a minúsculas
                        line2 = ""
                        for char in line:
                            if "A" <= char <= "Z":
                                # Se transforma el caracter en minúscula
                                newChar = chr(ord(char) + 32)
                            else:
                                newChar = char
                            line2 += newChar
                        # Realizamos el descifrado
                        line3 = ""
                        for char in line2:
                            if "a" <= char <= "z":
                                # Recorremos el valor del ascii para descifrar
                                rec = ord(char) - displacement % 25
                                # Verificamos si el recorrido deja atrás a la letra a
                                if 97 <= rec <= 122:
                                    newChar2 = chr(rec)
                                else:
                                    rec += 26
                                    newChar2 = chr(rec)
                            else:
                                newChar2 = char
                            line3 += newChar2
                        file2.write(f"{line3}")
            except FileNotFoundError:
                print(f"El archivo {filename} puede que no se encuentre en este directorio.")
            except Exception as e:
                print(f"Ha ocurrido un error {e}")

    except FileNotFoundError:
        print(f"El archivo {filename} puede que no se encuentre en este directorio.")
    except Exception as e:
        print(f"Ha ocurrido un error {e}")
