# Indicamos el nombre del archivo
filename = str(input("Escriba el nombre del archivo a cifrar: "))
displacement = int(input("Escriba la cantidad de desplazamientos a realizar: "))

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
                    print(line4)
                    file2.write(f"{line4}")
        except FileNotFoundError:
            print(f"El archivo {filename} puede que no se encuentre en este directorio.")
        except Exception as e:
            print(f"Ha ocurrido un error {e}")

except FileNotFoundError:
    print(f"El archivo {filename} puede que no se encuentre en este directorio.")
except Exception as e:
    print(f"Ha ocurrido un error {e}")
