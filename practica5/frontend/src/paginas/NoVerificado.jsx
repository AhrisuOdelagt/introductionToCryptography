const NoVerificado = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-700 to-indigo-500">
        <div className="flex flex-col md:flex-row items-center">
        <div className="w-60 h-60 overflow-hidden"></div>
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-8">FLIDER</h1>
            <img
              className="w-full h-full object-cover"
              src="./src/paginas/logo.jpeg"
              alt="Descripción de la imagen"
            />
          </div>
          <div className="w-60 h-60 overflow-hidden"></div>
          <div className="bg-purple-700 rounded p-8 w-full md:w-1/2">
            <h1 className="text-2xl mb-4 font-bold text-gray-800">La verificación arrojó resultados negativos. La firma no cuadra con el contenido.</h1>
            <br />
            <h2 className="block mb-2 text-white"><a href="http://localhost:5173/main">Volver al índice</a></h2>
          </div>
          <div className="w-60 h-60 overflow-hidden"></div>
        </div>
      </div>
    )
}

export default NoVerificado;
