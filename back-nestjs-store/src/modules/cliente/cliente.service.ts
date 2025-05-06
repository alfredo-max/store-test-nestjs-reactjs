import { Injectable } from '@nestjs/common';

@Injectable()
export class ClienteService {
    
    obtenerClientes() {
        return [
        { id: 1, nombre: 'Juan', apellido: 'Pérez' },
        { id: 2, nombre: 'María', apellido: 'Gómez' },
        { id: 3, nombre: 'Pedro', apellido: 'López' },
        ];
    }
}
