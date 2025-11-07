import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
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
  Clock,
  MapPin,
  Stethoscope,
  User,
  Edit,
  Trash2,
  AlertCircle,
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

export function MinhasConsultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [consultaParaCancelar, setConsultaParaCancelar] = useState<
    string | null
  >(null);
  const [consultaParaEditar, setConsultaParaEditar] = useState<Consulta | null>(
    null
  );
  const [novaData, setNovaData] = useState<Date>();
  const [novoHorario, setNovoHorario] = useState("");

  useEffect(() => {
    carregarConsultas();
  }, []);

  const carregarConsultas = () => {
    const consultasSalvas = localStorage.getItem("consultas");
    if (consultasSalvas) {
      const consultasParsed = JSON.parse(consultasSalvas).map(
        (c: Consulta) => ({
          ...c,
          data: new Date(c.data),
        })
      );
      setConsultas(consultasParsed);
    }
  };

  const handleCancelar = (id: string) => {
    const consultasAtualizadas = consultas.map((c) =>
      c.id === id ? { ...c, status: "cancelada" as const } : c
    );
    setConsultas(consultasAtualizadas);
    localStorage.setItem("consultas", JSON.stringify(consultasAtualizadas));
    setConsultaParaCancelar(null);

    toast.success("Consulta cancelada com sucesso", {
      description: "Você receberá uma confirmação do cancelamento",
    });

    setTimeout(() => {
      toast.info("📧 Email de cancelamento enviado");
    }, 1000);
  };

  const handleEditar = () => {
    if (!consultaParaEditar || !novaData || !novoHorario) {
      toast.error("Por favor, selecione uma nova data e horário");
      return;
    }

    const consultasAtualizadas = consultas.map((c) =>
      c.id === consultaParaEditar.id
        ? { ...c, data: novaData, horario: novoHorario }
        : c
    );
    setConsultas(consultasAtualizadas);
    localStorage.setItem("consultas", JSON.stringify(consultasAtualizadas));

    toast.success("Consulta reagendada com sucesso!", {
      description: `Nova data: ${format(novaData, "d 'de' MMMM", {
        locale: ptBR,
      })} às ${novoHorario}`,
    });

    setTimeout(() => {
      toast.info("📧 Email de confirmação enviado");
    }, 1000);

    setConsultaParaEditar(null);
    setNovaData(undefined);
    setNovoHorario("");
  };

  const iniciarEdicao = (consulta: Consulta) => {
    setConsultaParaEditar(consulta);
    setNovaData(consulta.data);
    setNovoHorario(consulta.horario);
  };

  const consultasAgendadas = consultas.filter((c) => c.status === "agendada");
  const consultasCanceladas = consultas.filter((c) => c.status === "cancelada");

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Consultas Agendadas</CardTitle>
          <CardDescription>
            Visualize, reagende ou cancele suas consultas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {consultasAgendadas.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Você não possui consultas agendadas</p>
              <p className="text-sm mt-1">
                Agende sua primeira consulta na aba "Agendar Consulta"
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {consultasAgendadas.map((consulta) => (
                <div
                  key={consulta.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="bg-green-600">
                          Agendada
                        </Badge>
                        <Badge variant="outline">
                          {consulta.especialidade}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <User className="w-4 h-4" />
                          <span>{consulta.paciente}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Stethoscope className="w-4 h-4" />
                          <span>{consulta.profissional}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4" />
                          <span>{consulta.unidade}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <CalendarIcon className="w-4 h-4" />
                          <span>
                            {format(consulta.data, "d 'de' MMMM 'de' yyyy", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock className="w-4 h-4" />
                          <span>{consulta.horario}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => iniciarEdicao(consulta)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setConsultaParaCancelar(consulta.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {consultasCanceladas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Consultas Canceladas</CardTitle>
            <CardDescription>Histórico de consultas canceladas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {consultasCanceladas.map((consulta) => (
                <div
                  key={consulta.id}
                  className="border rounded-lg p-4 bg-gray-50 opacity-75"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Cancelada</Badge>
                        <Badge variant="outline">
                          {consulta.especialidade}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{consulta.paciente}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Stethoscope className="w-4 h-4" />
                          <span>{consulta.profissional}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          <span>
                            {format(consulta.data, "d 'de' MMMM 'de' yyyy", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{consulta.horario}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <AlertDialog
        open={consultaParaCancelar !== null}
        onOpenChange={(open) => !open && setConsultaParaCancelar(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Confirmar Cancelamento
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar esta consulta? Esta ação não pode
              ser desfeita. Você receberá um email de confirmação do
              cancelamento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                consultaParaCancelar && handleCancelar(consultaParaCancelar)
              }
              className="bg-red-600 hover:bg-red-700"
            >
              Confirmar Cancelamento
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={consultaParaEditar !== null}
        onOpenChange={(open) => {
          if (!open) {
            setConsultaParaEditar(null);
            setNovaData(undefined);
            setNovoHorario("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reagendar Consulta</DialogTitle>
            <DialogDescription>
              Selecione uma nova data e horário para sua consulta
            </DialogDescription>
          </DialogHeader>

          {consultaParaEditar && (
            <div className="space-y-4 py-4">
              <div className="p-3 bg-blue-50 rounded-lg space-y-1 text-sm">
                <p>
                  <strong>Paciente:</strong> {consultaParaEditar.paciente}
                </p>
                <p>
                  <strong>Especialidade:</strong>{" "}
                  {consultaParaEditar.especialidade}
                </p>
                <p>
                  <strong>Profissional:</strong>{" "}
                  {consultaParaEditar.profissional}
                </p>
                <p>
                  <strong>Unidade:</strong> {consultaParaEditar.unidade}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Nova Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {novaData ? (
                        format(novaData, "d 'de' MMMM 'de' yyyy", {
                          locale: ptBR,
                        })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={novaData}
                      onSelect={setNovaData}
                      disabled={(date) => date < new Date()}
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Novo Horário</Label>
                <Select value={novoHorario} onValueChange={setNovoHorario}>
                  <SelectTrigger>
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
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setConsultaParaEditar(null);
                setNovaData(undefined);
                setNovoHorario("");
              }}
            >
              Cancelar
            </Button>
            <Button onClick={handleEditar}>Confirmar Reagendamento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
