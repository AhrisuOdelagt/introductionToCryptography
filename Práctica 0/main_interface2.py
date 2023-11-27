import os
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.filechooser import FileChooserListView
from kivy.uix.spinner import Spinner


# Generamos la clase que va a contener al script
class MainApp(App):
    def build(self):
        # Colocamos el título a la aplicación, así como sus dimensiones
        self.title = "Inciso B (Cifrar & Descifrar un archivo .bmp)"
        layout = BoxLayout(orientation='vertical', spacing=10, padding=10)

        # Añadimos el selector de archivo
        current_directory = os.path.abspath(os.path.dirname(__file__))
        self.file_chooser = FileChooserListView(path=current_directory, size_hint=(1, 4))
        layout.add_widget(Label(text="Seleccione el archivo que se va a cifrar/descifrar:"))
        layout.add_widget(self.file_chooser)

        # Añadimos el selector de operaciones
        self.operation_spinner = Spinner(text='Cifrar', values=('Cifrar', 'Descifrar'))
        layout.add_widget(Label(text="Elija la operación:"))
        layout.add_widget(self.operation_spinner)

        # Solicitamos el número de desplazamientos a realizar por cada color
        self.displacementRed = TextInput(hint_text="Escriba el número de desplazamientos en el color Rojo")
        layout.add_widget(Label(text="Escriba el número de desplazamientos a realizar o revertir en el color Rojo:"))
        layout.add_widget(self.displacementRed)

        # Solicitamos el número de desplazamientos a realizar por cada color
        self.displacementGreen = TextInput(hint_text="Escriba el número de desplazamientos en el color Verde")
        layout.add_widget(Label(text="Escriba el número de desplazamientos a realizar o revertir en el color Verde:"))
        layout.add_widget(self.displacementGreen)

        # Solicitamos el número de desplazamientos a realizar por cada color
        self.displacementBlue = TextInput(hint_text="Escriba el número de desplazamientos en el color Azul")
        layout.add_widget(Label(text="Escriba el número de desplazamientos a realizar o revertir en el color Azul:"))
        layout.add_widget(self.displacementBlue)

        # ...
        self.result_label = Label()
        layout.add_widget(self.result_label)

        # Finalizamos con un botón para procesar la solicitud del usuario
        self.process_button = Button(text="Procesar")
        self.process_button.bind(on_press=self.operacion)
        layout.add_widget(self.process_button)

        return layout

    def operacion(self, instance):
        filename = self.file_chooser.selection[0]
        operation = self.operation_spinner.text
        displacement_red = int(self.displacementRed.text)
        displacement_green = int(self.displacementGreen.text)
        displacement_blue = int(self.displacementBlue.text)
        disp = [displacement_red, displacement_green, displacement_blue]
        try:
            with open(filename, "rb") as file:
                core_name = filename.replace(".bmp", "")
                if operation == 'Cifrar':
                    new_filename = f"{core_name}_c.bmp"
                    with open(new_filename, "wb") as file2:
                        header = file.read(54)
                        file2.write(header)
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
                            pixel[0] = (pixel[0] + disp[2]) % 256
                            pixel[1] = (pixel[1] + disp[1]) % 256
                            pixel[2] = (pixel[2] + disp[0]) % 256
                            # Generamos ahora el píxel modificado para la nueva imagen
                            encrypted_pixel = [pixel[0], pixel[1], pixel[2]]
                            # print(f"Píxel cifrado: {encrypted_pixel}.")
                            file2.write(bytes(encrypted_pixel))
                else:
                    new_filename = f"{core_name}_d.bmp"
                    with open(new_filename, "wb") as file2:
                        header = file.read(54)
                        file2.write(header)
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
                            file2.write(bytes(encrypted_pixel))

                self.result_label.text = f"Operación completada. Nuevo archivo: {new_filename}"
        except FileNotFoundError:
            self.result_label.text = f"El archivo {filename} no se encuentra en este directorio."
        except Exception as e:
            self.result_label.text = f"Ha ocurrido un error: {e}"


if __name__ == '__main__':
    MainApp().run()
