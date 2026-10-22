import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect} from "vitest";
import Registro from "../components/Registro";
import "@testing-library/jest-dom/vitest";

describe('Registro', () => {

    it('Debe permitir al usuario escribir su nombre en el campo "Nombre:"', () => {
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        const inputNombre = screen.getByLabelText(/nombre/i);
        fireEvent.change(inputNombre, { target: { value: 'Esteban' } });

        expect(inputNombre).toHaveValue('Esteban');
    });

    it('Debe permitir al usuario escribir su apellido en el campo "Apellido:"', () => {
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        const inputApellido = screen.getByLabelText(/apellido/i);
        fireEvent.change(inputApellido, { target: { value: 'Gonzales' } });

        expect(inputApellido).toHaveValue('Gonzales');
    });

    it('Debe permitir al usuario escribir su rut en el campo "RUT:"', () => {
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        const inputRUT = screen.getByLabelText(/rut/i);
        fireEvent.change(inputRUT, { target: { value: '19187874-4' } });

        expect(inputRUT).toHaveValue('19187874-4');
    });

    it('Debe permitir al usuario escribir su número de teléfono en el campo "Número de Teléfono:"', () => {
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        const inputTelefono = screen.getByLabelText(/número\s+de\s+teléfono/i);
        fireEvent.change(inputTelefono, { target: { value: '+56993139457' } });

        expect(inputTelefono).toHaveValue('+56993139457');
    });

    it('Debe permitir al usuario escribir su dirección en el campo "Dirección:"', () => {
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        const inputDireccion = screen.getByLabelText(/dirección/i);
        fireEvent.change(inputDireccion, { target: { value: 'Domingo Tocornal 781' } });

        expect(inputDireccion).toHaveValue('Domingo Tocornal 781');
    });

    it('Debe permitir al usuario escribir su correo en el campo "Correo:"', () => {
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        const inputCorreo = screen.getByLabelText(/correo/i);
        fireEvent.change(inputCorreo, { target: { value: 'est.gonzales@duocuc.cl' } });

        expect(inputCorreo).toHaveValue('est.gonzales@duocuc.cl');
    });

    it('Debe permitir al usuario escribir su clave en el campo "Clave:"', () => {
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        const inputClave = screen.getByLabelText(/clave/i);
        fireEvent.change(inputClave, { target: { value: 'Este12345Onzales*' } });

        expect(inputClave).toHaveValue('Este12345Onzales*');
    });

});