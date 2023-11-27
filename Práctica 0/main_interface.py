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
        self.title = "Inciso A (Cifrar & Descifrar un archivo .txt)"
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

        # Solicitamos el número de desplazamientos a realizar
        self.displacement = TextInput(hint_text="Escriba el número de desplazamientos")
        layout.add_widget(Label(text="Escriba el número de desplazamientos a realizar o revertir:"))
        layout.add_widget(self.displacement)

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
        displacement = int(self.displacement.text)
        try:
            with open(filename, "r") as file:
                core_name = filename.replace(".txt", "")
                if operation == 'Cifrar':
                    new_filename = f"{core_name}_c.txt"
                    result = self.cifrado(file.read(), displacement)
                else:
                    new_filename = f"{core_name}_d.txt"
                    result = self.descifrado(file.read(), displacement)

                with open(new_filename, "w") as file2:
                    file2.write(result)

                self.result_label.text = f"Operación completada. Nuevo archivo: {new_filename}"
        except FileNotFoundError:
            self.result_label.text = f"El archivo {filename} no se encuentra en este directorio."
        except Exception as e:
            self.result_label.text = f"Ha ocurrido un error: {e}"

    def cifrado(self, text, displacement):
        result = ""
        cleanText = text.replace(" ", "").replace("\n", "")
        for char in cleanText:
            convertedChar = chr(ord(char) - 32)
            if "A" <= convertedChar <= "Z":
                # Recorremos el valor del ascii para cifrar
                rec = ord(convertedChar) + displacement % 25
                # Verificamos si el recorrido supera a la letra Z
                if 65 <= rec <= 90:
                    newChar2 = chr(rec)
                else:
                    rec -= 26
                    newChar2 = chr(rec)
            else:
                newChar2 = char
            result += newChar2
        return result

    def descifrado(self, text, displacement):
        result = ""
        for char in text:
            convertedChar = chr(ord(char) + 32)
            if "a" <= convertedChar <= "z":
                # Recorremos el valor del ascii para descifrar
                rec = ord(convertedChar) - displacement % 25
                # Verificamos si el recorrido deja atrás a la letra a
                if 97 <= rec <= 122:
                    newChar2 = chr(rec)
                else:
                    rec += 26
                    newChar2 = chr(rec)
            else:
                newChar2 = char
            result += newChar2
        return result


if __name__ == '__main__':
    MainApp().run()
