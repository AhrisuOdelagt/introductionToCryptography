# Indicamos el nombre del archivo
filename = str(input("Escriba el nombre del archivo a descifrar: "))
displacement = int(input("Escriba la cantidad de desplazamientos a revertir: "))

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
                    print(line3)
                    file2.write(f"{line3}")
        except FileNotFoundError:
            print(f"El archivo {filename} puede que no se encuentre en este directorio.")
        except Exception as e:
            print(f"Ha ocurrido un error {e}")

except FileNotFoundError:
    print(f"El archivo {filename} puede que no se encuentre en este directorio.")
except Exception as e:
    print(f"Ha ocurrido un error {e}")