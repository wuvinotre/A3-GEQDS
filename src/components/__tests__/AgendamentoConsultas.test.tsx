import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AgendamentoConsultas } from "../AgendamentoConsultas";
import { Toaster } from "../ui/sonner";

vi.mock("sonner", async () => {
  const actual = await vi.importActual("sonner");
  return {
    ...actual,
    toast: {
      success: vi.fn(),
      error: vi.fn(),
      info: vi.fn(),
    },
  };
});

describe("AgendamentoConsultas", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("deve validar que todos os campos são obrigatórios ao tentar agendar", async () => {
    const user = userEvent.setup();
    render(
      <>
        <AgendamentoConsultas />
        <Toaster />
      </>
    );

    const submitButton = screen.getByRole("button", {
      name: /confirmar agendamento/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      const consultas = localStorage.getItem("consultas");
      expect(consultas).toBeNull();
    });
  });

  it("deve limpar o campo de paciente após reset", async () => {
    const user = userEvent.setup();
    render(
      <>
        <AgendamentoConsultas />
        <Toaster />
      </>
    );

    const pacienteInput = screen.getByPlaceholderText(
      /digite seu nome completo/i
    );
    await user.type(pacienteInput, "Maria Santos");
    expect(pacienteInput).toHaveValue("Maria Santos");

    await user.clear(pacienteInput);
    expect(pacienteInput).toHaveValue("");
  });
});
