const CriptoClasica = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-700 to-indigo-500">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Bienvenid@ {localStorage.getItem("nombre")}</h1>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Criptografía Clásica</h2>
        <div className="formulario p-8 bg-green-500 rounded mt-10">
        <p>La criptografía clásica tiene orígenes ancestrales, se pueden encontrar evidencias de su uso en la antigua Roma y se considera que concluye con la aparición de las computadoras en el siglo XX. Los algoritmos de criptografía clásicos actualmente no se consideran seguros, ya que a través de análisis estadísticos, o bien a través de ataques de fuerza bruta, se pueden llegar a conocer los mensajes cifrados. Sin embargo, es importante conocer sus orígenes debido a que los principios en los que se fundamentan son la base para la criptografía moderna. Los algoritmos de criptografía clásica se clasifican en “cifrados de sustitución” y “cifrados de transposición”.</p>
    
    <h2>Cifrados de Sustitución</h2>
    
    <p>Los algoritmos englobados dentro de esta familia se basan en cambiar por otros los símbolos del mensaje, sin alterar su orden relativo. Cada uno de ellos vendrá definido por el mecanismo concreto empleado para efectuar dicho cambio, pudiendo ser independiente de la posición que ocupa el símbolo en el mensaje (cifrados monoalfabéticos), o venir determinado por ésta (cifrados polialfabéticos).</p>
    
    <h2>Cifrados monoalfabéticos</h2>
    
    <p>Se engloban dentro de este apartado todos los algoritmos criptográficos que, sin desordenar los símbolos dentro del mensaje, establecen una correspondencia única para todos ellos a lo largo del texto. Es decir, si al símbolo A le corresponde el símbolo D, esta correspondencia se mantiene a lo largo de todo el mensaje.</p>
    
    <h2>Algoritmo de César</h2>
    
    <p>El algoritmo de César, llamado así porque es el que empleaba Julio César para enviar mensajes secretos, es uno de los algoritmos criptográficos más simples. Consiste en sumar 3 al número de orden de cada letra. De esta forma a la A le corresponde la D, a la B la E, y así sucesivamente. Si asignamos a cada letra un número (A = 0,B = 1. . . ), y consideramos un alfabeto de 26 letras, la transformación criptográfica sería:</p>
    
    <p><strong>Transformación criptográfica:</strong> C = (M + 3) mod 26</p>
    
    <p>obsérvese que este algoritmo ni siquiera posee clave, puesto que la transformación siempre es la misma. Obviamente, para descifrar basta con restar 3 al número de orden de las letras del criptograma.</p>
    
    <h2>Cifrado Monoalfabético General</h2>
    
    <p>Es el caso más general de cifrado monoalfabético. La sustitución ahora es arbitraria, siendo la clave k precisamente la tabla de sustitución de un símbolo por otro. En este caso tenemos N! posibles claves.</p>
    
    <p><strong>Criptoanálisis de los Métodos de Cifrado Monoalfabéticos:</strong> El cifrado monoalfa- bético constituye la familia de métodos más simple de criptoanalizar, puesto que las propiedades estadísticas del texto claro se conservan en el criptograma. Supongamos que, por ejemplo, la letra que más aparece en Castellano es la A. Parece lógico que la letra más frecuente en el texto codificado sea aquella que corresponde con la A. Emparejando las frecuencias relativas de aparición de cada símbolo en el mensaje ci- frado con el histograma de frecuencias del idioma en el que se supone está el texto claro, podremos averiguar fácilmente la clave.</p>
        </div>
        <h2 className="block mb-2 text-white"><a href="http://localhost:5173/main">Volver al índice</a></h2>
      </div>
    )
}

export default CriptoClasica;
