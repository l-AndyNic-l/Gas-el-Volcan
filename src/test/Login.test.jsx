import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect} from "vitest";
import Login from "../components/Login" 
import "@testing-library/jest-dom/vitest";

describe('Login', () => {

    it('Debe permitir al usuario escribir su correo en el campo "Correo:"', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const inputCorreo = screen.getByLabelText(/correo/i);
        fireEvent.change(inputCorreo, { target: { value: 'cliente@gaselvolcan.cl' } });

        expect(inputCorreo).toHaveValue('cliente@gaselvolcan.cl');
    });

    it('Debe permitir al usuario escribir su clave en el campo "Clave:"', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const inputClave = screen.getByLabelText(/clave/i);
        fireEvent.change(inputClave, { target: { value: 'Cliente1234' } });

        expect(inputClave).toHaveValue('Cliente1234');
    });

    it('Debe permitir al admin iniciar sesión con su cuenta', () => {

        localStorage.clear();

        render(
            <MemoryRouter initialEntries={["/login"]}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<h1>Panel de Administración</h1>} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/correo/i), {
            target: { value: "admin@gaselvolcan.cl" },
        });

        fireEvent.change(screen.getByLabelText(/clave/i), {
            target: { value: "Admin1234" },
        });

        fireEvent.click(
            screen.getByRole("button", { name: /iniciar\s+sesión/i })
        );
        
        expect(screen.getByText("Panel de Administración")).toBeInTheDocument();
    });

});