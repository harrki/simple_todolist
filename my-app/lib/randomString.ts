const randomString = (length: number) => {
    const allStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let str = Array.from(Array(length)).map(() => allStr[Math.floor(Math.random() * allStr.length)]).join('');
    return str;
}

export default randomString;