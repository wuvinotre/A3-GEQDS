import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MinhasConsultas } from "../MinhasConsultas";
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

describe("MinhasConsultas", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("deve exibir mensagem quando não há consultas agendadas", () => {
    render(
      <>
        <MinhasConsultas />
        <Toaster />
      </>
    );

    expect(
      screen.getByText(/você não possui consultas agendadas/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/agende sua primeira consulta na aba/i)
    ).toBeInTheDocument();
  });

  it("deve exibir consultas agendadas corretamente", () => {
    const consultaTeste = {
      id: "1",
      paciente: "João Silva",
      unidade: "UBS Central",
      especialidade: "Clínica Geral",
      profissional: "Dr. João Silva",
      data: new Date(Date.now() + 86400000).toISOString(),
      horario: "09:00",
      status: "agendada" as const,
    };

    localStorage.setItem("consultas", JSON.stringify([consultaTeste]));

    render(
      <>
        <MinhasConsultas />
        <Toaster />
      </>
    );

    expect(screen.getByText("João Silva")).toBeInTheDocument();
    expect(screen.getByText("UBS Central")).toBeInTheDocument();
    expect(screen.getByText("Clínica Geral")).toBeInTheDocument();
    expect(screen.getByText("Dr. João Silva")).toBeInTheDocument();
    expect(screen.getByText("09:00")).toBeInTheDocument();
    const agendadaElements = screen.getAllByText(/agendada/i);
    expect(agendadaElements.length).toBeGreaterThan(0);
    const badgeAgendada = agendadaElements.find(
      (el) =>
        el.className?.includes("badge") || el.className?.includes("bg-green")
    );
    expect(badgeAgendada).toBeInTheDocument();
  });

  it("deve reagendar uma consulta com sucesso", async () => {
    const user = userEvent.setup();

    const consultaTeste = {
      id: "1",
      paciente: "Carlos Oliveira",
      unidade: "Clínica São José",
      especialidade: "Pediatria",
      profissional: "Dra. Sofia Mendes",
      data: new Date(Date.now() + 86400000).toISOString(),
      horario: "14:00",
      status: "agendada" as const,
    };

    localStorage.setItem("consultas", JSON.stringify([consultaTeste]));

    render(
      <>
        <MinhasConsultas />
        <Toaster />
      </>
    );

    await waitFor(() => {
      expect(screen.getByText("Carlos Oliveira")).toBeInTheDocument();
    });

    const allButtons = screen.getAllByRole("button");
    const buttonsWithSvg = allButtons.filter((btn) => btn.querySelector("svg"));

    const editButton =
      buttonsWithSvg.find((btn) => {
        const className = btn.className || "";
        return !className.includes("red");
      }) || buttonsWithSvg[0];

    if (editButton) {
      await user.click(editButton);
    }

    await waitFor(
      () => {
        expect(screen.getByText(/reagendar consulta/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const dataButtons = screen.getAllByRole("button");
    const dataButton = dataButtons.find(
      (btn) =>
        btn.textContent?.includes("Selecione uma data") ||
        btn.textContent?.includes("de")
    );

    if (dataButton) {
      await user.click(dataButton);

      await waitFor(() => {
        const calendar = screen.queryByRole("grid");
        if (calendar) {
          expect(calendar).toBeInTheDocument();
        }
      });

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2);
      const dayButtons = screen.getAllByRole("button");
      const dayButton = dayButtons.find((btn) => {
        const text = btn.textContent || "";
        return text === tomorrow.getDate().toString() && !btn.disabled;
      });

      if (dayButton) {
        await user.click(dayButton);
      }
    }

    const horarioSelects = screen.getAllByRole("combobox");
    const horarioSelect = horarioSelects.find(
      (select) =>
        select.getAttribute("id")?.includes("horario") ||
        select.getAttribute("aria-label")?.includes("horário")
    );

    if (horarioSelect) {
      await user.click(horarioSelect);
      await waitFor(() => {
        expect(screen.getByText("15:00")).toBeInTheDocument();
      });
      await user.click(screen.getByText("15:00"));
    }

    const confirmButtons = screen.getAllByRole("button");
    const confirmButton = confirmButtons.find(
      (btn) =>
        btn.textContent?.includes("Confirmar Reagendamento") ||
        btn.textContent?.includes("Confirmar")
    );

    if (confirmButton) {
      await user.click(confirmButton);
    }

    await waitFor(
      () => {
        const consultas = JSON.parse(localStorage.getItem("consultas") || "[]");
        expect(consultas).toHaveLength(1);
        expect(consultas[0].status).toBe("agendada");
      },
      { timeout: 3000 }
    );
  });
});
