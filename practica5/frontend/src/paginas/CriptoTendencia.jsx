const CriptoTendencia = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-700 to-indigo-500">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Bienvenid@ {localStorage.getItem("nombre")}</h1>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Criptografía Tendencia</h2>
      <div className="formulario p-8 bg-green-500 rounded mt-10">
      <p>En los próximos años, escucharemos hablar mucho de la “criptografía de grilla”, una tecnología que logra adelantarse a los objetivos de los ciberdelincuentes mediante la ocultación de datos de los usuarios dentro de estructuras algebraicas complejas</p>
    
    <h2>Metaverso:</h2>
    
    <p>Se sostiene que el metaverso es como un espacio colectivo compartido en 3D, creado por la convergencia de una realidad física y digital virtualmente mejorada. El metaverso completo será independiente del dispositivo y no será propiedad de un solo proveedor. Tendrá una economía virtual propia, habilitada por monedas digitales y NFT. Para 2027, más del 40% de las grandes organizaciones de todo el mundo usarán una combinación de Web3, realidad aumentada en la nube y gemelos digitales en proyectos de este tipo. </p>
      </div>
      <h2 className="block mb-2 text-white"><a href="http://localhost:5173/main">Volver al índice</a></h2>
    </div>
  )
}

export default CriptoTendencia;
