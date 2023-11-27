const generarID = () => {
    const random = Math.random().toString(32).substring(6);
    const date = Date.now().toString(32).substring(6);
    return random + date;
}

export default generarID;
