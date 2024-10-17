// no se ejecuta :V

// Ejemplo de simulación del Event Loop en Node.js usando TypeScript


// Utility types para manipulación de objetos
interface Task {
    id: number;
    description: string;
    completed: boolean;
}

type TaskPreview = Pick<Task, "id" | "description">;
type PartialTask = Partial<Task>;
type ReadonlyTask = Readonly<Task>;
type OmitTask = Omit<Task, "completed">;

// Clase que encapsula las tareas
class AsyncTask implements Task {
    id: number;
    description: string;
    completed: boolean = false;

    constructor(id: number, description: string) {
        this.id = id;
        this.description = description;
    }

    // Método asíncrono que simula una operación con Promesas
    async executeAsync(): Promise<void> {
        console.log(`Comenzando tarea ${this.id}: ${this.description}`);
        return new Promise((resolve) => {
        setTimeout(() => {
            this.completed = true;
            console.log(`Tarea ${this.id} completada!`);
            resolve();
        }, 1000); // Simula un retraso de 1 segundo
        });
    }
}

// Fase de microtarea: process.nextTick y Promesas
const microTaskDemo = () => {
    console.log("Microtarea: Iniciando...");

    // Process.nextTick se ejecuta antes que cualquier otro callback
    process.nextTick(() => {
        console.log("process.nextTick ejecutado");
    });

    // Las promesas van después de nextTick en la cola de microtareas
    Promise.resolve().then(() => {
        console.log("Promesa resuelta");
    });

    console.log("Microtarea: Terminada.");
};

// Fase de macrotarea: setTimeout y setImmediate
const macroTaskDemo = () => {
    console.log("Macrotarea: Iniciando...");

    // setTimeout se ejecuta como una macrotarea en la siguiente vuelta del Event Loop
    setTimeout(() => {
        console.log("setTimeout ejecutado");
    }, 0);

    // setImmediate se ejecuta después de las macrotareas que ya estaban en la cola
    setImmediate(() => {
        console.log("setImmediate ejecutado");
    });

    console.log("Macrotarea: Terminada.");
};

// Función para mostrar el ciclo de vida de una tarea asíncrona
const asyncTaskDemo = async () => {
    console.log("Demostración de tareas asíncronas con async/await");

    const task1 = new AsyncTask(1, "Simular tarea 1");
    const task2 = new AsyncTask(2, "Simular tarea 2");

    // Ejecutar las tareas usando async/await
    await task1.executeAsync();
    await task2.executeAsync();

    console.log("Tareas asíncronas completadas.");
};

// Demostración de uso de callbacks
const callbackDemo = () => {
    console.log("Demostración de uso de callbacks");

    // Simulación de una operación asíncrona con un callback
    const asyncOperation = (callback: (result: string) => void) => {
        setTimeout(() => {
        callback("Resultado de operación asíncrona");
        }, 1000);
    };

    asyncOperation((result) => {
        console.log(result); // Se ejecuta después del setTimeout
    });
};

// Demostración de herencia y polimorfismo
class BaseTask {
    constructor(public name: string) {}

    execute() {
        console.log(`${this.name} ejecutada`);
    }
}

class AdvancedTask extends BaseTask {
    constructor(name: string, public priority: number) {
        super(name);
    }

    execute() {
        console.log(`${this.name} con prioridad ${this.priority} ejecutada`);
    }
}

const polymorphismDemo = () => {
    const tasks: BaseTask[] = [
        new BaseTask("Tarea base"),
        new AdvancedTask("Tarea avanzada", 10),
    ];

    tasks.forEach((task) => task.execute());
};

// Función principal para ejecutar todas las demostraciones
const main = async () => {
    console.log("Inicio de la simulación del Event Loop en Node.js");

    // Microtareas y macrotareas
    microTaskDemo();
    macroTaskDemo();

    // Tareas asíncronas
    await asyncTaskDemo();

    // Demostración de callbacks
    callbackDemo();

    // Herencia y polimorfismo
    polymorphismDemo();

    console.log("Fin de la simulación del Event Loop");
};

// Ejecutar el script principal
main().catch((err) => console.error("Error en la simulación:", err));
