# Implementación del algoritmo Diffie-Hellman

# Importamos los módulos requeridos
# Requiere instalación del módulo pycryptodome
from Crypto.Util.number import getPrime # Genera un primo con la cantidad de bits indicados
from Crypto.Random import get_random_bytes  # Genera bytes aleatorios
import sys  # Para cerrar el programa

# Función para generar los parámetros generales de Diffie-Hellman
def crear_parametros():
    p = getPrime(128)
    g = 3   # Puede modificarse
    privada_alice = int.from_bytes(get_random_bytes(16), byteorder='big') % (p - 2)
    privada_bob = int.from_bytes(get_random_bytes(16), byteorder='big') % (p - 2)
    return privada_alice, privada_bob, p, g

def calcular_clave_publica(g, privado, p):
    public_key = pow(g, privado, p)
    return public_key

def calcular_clave_compartida(private, public, p):
    shared_key = pow(public, private, p)
    AES_key = hex(shared_key)
    return AES_key

def main():
    print("Aplicación del algoritmo Diffie-Hellman")
    while True:
        print("Digite un número para elegir una de las siguientes opciones:")
        print("Digite 1 para generar aleatoriamente los parámetros del algoritmo.")
        print("Digite 2 para calcular la clave pública dados tus parámetros privados.")
        print("Digite 3 para calcular la clave compartida dadas las claves públicas.")
        print("Digite 4 para salir del programa.")

        # Procesamos la elección del usuario
        choice = int(input("\nEscriba su elección:    "))
        if choice == 1:
            print("Generando parámetros aleatorios...")
            priv_a, priv_b, p, g = crear_parametros()
            print(f"Valor de p: {p}")
            print(f"Valor de g: {g}")
            print(f"Dato secreto a: {priv_a}")
            print(f"Dato secreto b: {priv_b}")
            sys.exit()
        elif choice == 2:
            my_g = int(input("Escriba su valor de g:    "))
            my_priv = int(input("Escriba su valor de su dato secreto:    "))
            my_p = int(input("Escriba su valor de p:    "))
            my_key = calcular_clave_publica(my_g, my_priv, my_p)
            print("Calculando tu clave pública...")
            print(f"Su llave pública es: {my_key}")
            sys.exit()
        elif choice == 3:
            my_priv = int(input("Escriba su valor de su dato secreto:    "))
            my_public_key = int(input("Escriba su valor de la llave pública opuesta:    "))
            my_p = int(input("Escriba su valor de p:    "))
            my_shared_key = calcular_clave_compartida(my_priv, my_public_key, my_p)
            print("Calculando tu clave compartida...")
            print(f"Su llave compartida es: {my_shared_key}")
            sys.exit()
        elif choice == 4:
            print("Saliendo del programa...")
            sys.exit()
        else:
            print("Opción incorrecta. Intente nuevamente.\n")

# Ejecución de la función main
if __name__ == "__main__":
    main()
