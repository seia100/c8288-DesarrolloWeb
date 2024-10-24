// Logger.ts - 
// Utilidad para registrar operaciones de la cache

export class Logger {
    // Registra un mensaje en la consola
    // @param message - El mensaje a registrar
    public log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }
    
    // Registra un error en la consola
    // @param message - El mensaje de error a registrar
    public error(message: string): void {
        console.error(`[ERROR]: ${message}`);
    }

    // Registra una advertencia en la consola
    // @param message - El mensaje de advertencia a registrar
    public warn(message: string): void {
        console.warn(`[WARNING]: ${message}`);
    }

    // Registra un mensaje informativo en la consola
    // @param message - El mensaje informativo a registrar
    public info(message: string): void {
        console.info(`[INFO]: ${message}`);
    }
}