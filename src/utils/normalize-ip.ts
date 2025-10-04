export const normalizeIp = (ip: string) => {
    if (!ip) 
        return ip;
    
    if (ip.startsWith('::ffff:')) 
        return ip.substring(7);

    if (ip === '::1') 
        return '127.0.0.1';

    return ip;
}