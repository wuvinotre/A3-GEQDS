import { useState } from "react";
import type { FormEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { toast } from "sonner";
import {
  Calendar as CalendarIcon,
  MapPin,
  User,
  Stethoscope,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Consulta {
  id: string;
  paciente: string;
  unidade: string;
  especialidade: string;
  profissional: string;
  data: Date;
  horario: string;
  status: "agendada" | "cancelada";
}

const unidades = [
  { id: "1", nome: "UBS Central", endereco: "Rua das Flores, 123" },
  { id: "2", nome: "UBS Norte", endereco: "Av. Principal, 456" },
  { id: "3", nome: "Clínica São José", endereco: "Rua da Saúde, 789" },
  { id: "4", nome: "Hospital Municipal", endereco: "Av. Brasil, 1000" },
];

const especialidades = [
  "Clínica Geral",
  "Cardiologia",
  "Pediatria",
  "Dermatologia",
  "Ortopedia",
  "Ginecologia",
  "Oftalmologia",
  "Odontologia",
];

const profissionais: Record<string, string[]> = {
  "Clínica Geral": [
    "Dr. João Silva",
    "Dra. Maria Santos",
    "Dr. Carlos Oliveira",
  ],
  Cardiologia: ["Dr. Pedro Cardoso", "Dra. Ana Paula Lima"],
  Pediatria: ["Dra. Sofia Mendes", "Dr. Roberto Costa"],
  Dermatologia: ["Dra. Juliana Rocha", "Dr. Fernando Alves"],
  Ortopedia: ["Dr. Marcos Ferreira", "Dra. Paula Gomes"],
  Ginecologia: ["Dra. Beatriz Souza", "Dra. Camila Torres"],
  Oftalmologia: ["Dr. Ricardo Martins", "Dra. Luciana Dias"],
  Odontologia: ["Dr. André Barbosa", "Dra. Patricia Reis"],
};

const horarios = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

export function AgendamentoConsultas() {
  const [paciente, setPaciente] = useState("");
  const [unidade, setUnidade] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [profissional, setProfissional] = useState("");
  const [data, setData] = useState<Date>();
  const [horario, setHorario] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !paciente ||
      !unidade ||
      !especialidade ||
      !profissional ||
      !data ||
      !horario
    ) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    const novaConsulta: Consulta = {
      id: Date.now().toString(),
      paciente,
      unidade: unidades.find((u) => u.id === unidade)?.nome || "",
      especialidade,
      profissional,
      data,
      horario,
      status: "agendada",
    };

    const consultas = JSON.parse(localStorage.getItem("consultas") || "[]");
    consultas.push(novaConsulta);
    localStorage.setItem("consultas", JSON.stringify(consultas));

    toast.success("Consulta agendada com sucesso!", {
      description: `${format(data, "d 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      })} às ${horario}`,
    });

    setTimeout(() => {
      toast.info("📧 Email de confirmação enviado", {
        description: "Você receberá um lembrete 24h antes da consulta",
      });
    }, 1500);

    setPaciente("");
    setUnidade("");
    setEspecialidade("");
    setProfissional("");
    setData(undefined);
    setHorario("");
  };

  const profissionaisDisponiveis = especialidade
    ? profissionais[especialidade] || []
    : [];
  const unidadeSelecionada = unidades.find((u) => u.id === unidade);

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Agendar Nova Consulta</CardTitle>
          <CardDescription>
            Preencha os dados abaixo para agendar sua consulta médica
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="paciente">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nome do Paciente
                </div>
              </Label>
              <Input
                id="paciente"
                placeholder="Digite seu nome completo"
                value={paciente}
                onChange={(e) => setPaciente(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unidade">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Unidade de Saúde
                </div>
              </Label>
              <Select value={unidade} onValueChange={setUnidade}>
                <SelectTrigger id="unidade">
                  <SelectValue placeholder="Selecione uma unidade" />
                </SelectTrigger>
                <SelectContent>
                  {unidades.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {unidadeSelecionada && (
                <p className="text-sm text-gray-600">
                  📍 {unidadeSelecionada.endereco}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="especialidade">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4" />
                  Especialidade
                </div>
              </Label>
              <Select
                value={especialidade}
                onValueChange={(value) => {
                  setEspecialidade(value);
                  setProfissional("");
                }}
              >
                <SelectTrigger id="especialidade">
                  <SelectValue placeholder="Selecione a especialidade" />
                </SelectTrigger>
                <SelectContent>
                  {especialidades.map((esp) => (
                    <SelectItem key={esp} value={esp}>
                      {esp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profissional">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profissional
                </div>
              </Label>
              <Select
                value={profissional}
                onValueChange={setProfissional}
                disabled={!especialidade}
              >
                <SelectTrigger id="profissional">
                  <SelectValue placeholder="Selecione o profissional" />
                </SelectTrigger>
                <SelectContent>
                  {profissionaisDisponiveis.map((prof) => (
                    <SelectItem key={prof} value={prof}>
                      {prof}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Data da Consulta
                </div>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data ? (
                      format(data, "d 'de' MMMM 'de' yyyy", { locale: ptBR })
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={data}
                    onSelect={setData}
                    disabled={(date) => date < new Date()}
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="horario">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Horário
                </div>
              </Label>
              <Select value={horario} onValueChange={setHorario}>
                <SelectTrigger id="horario">
                  <SelectValue placeholder="Selecione o horário" />
                </SelectTrigger>
                <SelectContent>
                  {horarios.map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Confirmar Agendamento
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-6 bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="mb-2 text-blue-900">ℹ️ Informações Importantes</h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Chegue com 15 minutos de antecedência</li>
            <li>• Traga documento com foto e cartão do SUS</li>
            <li>• Você receberá uma confirmação por email e SMS</li>
            <li>
              • Em caso de imprevistos, cancele ou reagende com antecedência
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
