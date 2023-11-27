# Indicamos el nombre del archivo
filename = str(input("Escriba el nombre del archivo a cifrar: "))

# Obtenemos cuáles serán los desplazamientos de cada color
displacement_red = int(input("Escriba la cantidad de desplazamientos a realizar en el rojo: "))
displacement_green = int(input("Escriba la cantidad de desplazamientos a realizar en el verde: "))
displacement_blue = int(input("Escriba la cantidad de desplazamientos a realizar en el azul: "))
disp = [displacement_red, displacement_green, displacement_blue]

# Generamos el archivo resultante
coreName = filename.replace(".bmp", "")
newFilename = f"{coreName}_d.bmp"

# Intentamos abrir el primer archivo en modo de lectura binaria
try:
    with open(filename, "rb") as file:
        print("\nPrimer archivo abierto")
        # Obtenemos la cabecera del archivo original
        # (Las cabeceras contienen un total de 54 bytes antes de llegar al contenido)
        og_header = file.read(54)

        # Generamos un archivo nuevo para guardar los cambios
        try:
            with open(newFilename, "wb") as newFile:
                # Pegamos la cabecera original en el nuevo archivo
                newFile.write(og_header)
                print("Segundo archivo abierto")
                # Revisamos el primer archivo píxel por píxel
                while True:
                    # Obtenemos la información RGB del siguiente píxel de la imagen original
                    byteInfo = file.read(3)
                    # Cerramos el ciclo en caso de que ya no se encuentren más bytes
                    if not byteInfo:
                        break
                    # Generamos una tupla de con la información de cada píxel y la descomponemos
                    pixel = list(byteInfo)
                    # print(f"Píxel original: {pixel}.")
                    # Realizamos los desplazamientos de color por cada elemento del RGB
                    if pixel[0] - disp[2] < 0:
                        r = disp[2] % 256
                        r = pixel[0] + 256 - r
                        pixel[0] = r
                    else:
                        pixel[0] = (pixel[0] - disp[2]) % 256
                    if pixel[1] - disp[1] < 0:
                        g = disp[1] % 256
                        g = pixel[1] + 256 - g
                        pixel[1] = g
                    else:
                        pixel[1] = (pixel[1] - disp[1]) % 256
                    if pixel[2] - disp[0] < 0:
                        b = disp[0] % 256
                        b = pixel[2] + 256 - b
                        pixel[2] = b
                    else:
                        pixel[2] = (pixel[2] - disp[0]) % 256
                    # Generamos ahora el píxel modificado para la nueva imagen
                    encrypted_pixel = [pixel[0], pixel[1], pixel[2]]
                    # print(f"Píxel cifrado: {encrypted_pixel}.")
                    newFile.write(bytes(encrypted_pixel))

        # Control y manejo de excepciones para el primer archivo
        except FileNotFoundError:
            print(f"El archivo {newFilename} puede que no se encuentre en este directorio.")
        except Exception as e:
            print(f"Ha ocurrido un error {e}")

# Control y manejo de excepciones para el primer archivo
except FileNotFoundError:
    print(f"El archivo {filename} puede que no se encuentre en este directorio.")
except Exception as e:
    print(f"Ha ocurrido un error {e}")
