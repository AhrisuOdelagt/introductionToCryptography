const CriptoModerna = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-700 to-indigo-500">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Bienvenid@ {localStorage.getItem("nombre")}</h1>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Criptografía Moderna</h2>
      <div className="formulario p-8 bg-green-500 rounded mt-10">
      <p>La criptografía está estrechamente relacionada con las disciplinas de la criptología y el criptoanálisis. No obstante, en el mundo actual centrado en la informática, la criptografía se asocia con mayor frecuencia con la codificación de texto sin formato (texto sin cifrar) en texto cifrado y nuevo. Las personas que están inmersas en este campo se conocen como criptógrafos.</p>
    
    <h2>La criptografía moderna se preocupa por los siguientes cuatro objetivos:</h2>
    
    <p><strong>Confidencialidad:</strong> la información solo puede ser entendida por quienes estén autorizados a ello.</p>

    <p><strong>Integridad:</strong> la información no se puede alterar en el almacenamiento o tránsito entre el remitente y el destinatario previsto sin que se detecte la alteración.</p>

    <p><strong>No repudio:</strong> el creador/remitente de la información no puede negar en una etapa posterior sus intenciones en la creación o transmisión de la información.</p>

    <p><strong>Autenticación:</strong> el remitente y el receptor pueden confirmar la identidad del otro y el origen/destino de la información.</p>
    
    <p>Los procedimientos y protocolos que cumplen con algunos o todos los criterios anteriores se conocen como criptosistemas. A menudo, se cree que los criptosistemas se refieren solo a procedimientos matemáticos y programas informáticos, sin embargo, también incluyen la regulación del comportamiento humano como, por ejemplo, elegir contraseñas difíciles de adivinar, cerrar la sesión de sistemas no utilizados y no discutir procedimientos sensibles con personas externas.</p>
      </div>
      <h2 className="block mb-2 text-white"><a href="http://localhost:5173/main">Volver al índice</a></h2>
    </div>
  )
}

export default CriptoModerna;
