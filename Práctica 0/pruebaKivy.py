from kivy.app import App
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.boxlayout import BoxLayout


class MyApp(App):
    def build(self):
        self.title = 'Saludo en Kivy'
        layout = BoxLayout(orientation='vertical', spacing=10, padding=10)

        label = Label(text="Ingresa tu nombre:")
        self.text_input = TextInput()
        button = Button(text="Saludar")
        button.bind(on_press=self.saludar)

        self.message_label = Label()

        layout.add_widget(label)
        layout.add_widget(self.text_input)
        layout.add_widget(button)
        layout.add_widget(self.message_label)

        return layout

    def saludar(self, instance):
        nombre = self.text_input.text
        mensaje = f"Hola, {nombre}!"
        self.message_label.text = mensaje


if __name__ == '__main__':
    MyApp().run()