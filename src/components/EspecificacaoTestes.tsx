import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  FileCheck,
  Bug,
  Zap,
  Shield,
  Users,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ClipboardCheck,
} from "lucide-react";

export function EspecificacaoTestes() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <FileCheck className="w-8 h-8" />
            Especificação de Testes - Sistema SaúdeJá
          </CardTitle>
          <CardDescription className="text-blue-50">
            Documento de Especificação de Testes do Módulo de Agendamento de
            Consultas
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>1. Informações Gerais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Sistema:</p>
              <p>SaúdeJá - Plataforma de Agendamento de Consultas</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Módulo Testado:</p>
              <p>
                Módulo de Agendamento, Alteração e Cancelamento de Consultas
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Versão:</p>
              <p>1.0.0 - Protótipo</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Data:</p>
              <p>Novembro de 2025</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 mb-2">Objetivo dos Testes:</p>
            <p>
              Validar o funcionamento correto do módulo de agendamento de
              consultas, garantindo que os usuários possam agendar, alterar e
              cancelar consultas de forma eficiente e sem erros, com
              notificações adequadas e validações de dados.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Tipos de Testes</CardTitle>
          <CardDescription>
            Categorias de testes que serão aplicados ao sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Bug className="w-5 h-5 text-blue-600" />
                <h3 className="text-blue-900">Testes Funcionais</h3>
              </div>
              <p className="text-sm text-gray-600">
                Verificação de funcionalidades principais: agendamento,
                alteração, cancelamento, validações de formulário e persistência
                de dados.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-green-600" />
                <h3 className="text-green-900">Testes de Usabilidade</h3>
              </div>
              <p className="text-sm text-gray-600">
                Avaliação da interface, navegação intuitiva, clareza das
                mensagens e facilidade de uso para diferentes perfis de
                usuários.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <h3 className="text-purple-900">Testes de Validação</h3>
              </div>
              <p className="text-sm text-gray-600">
                Verificação de regras de negócio: campos obrigatórios, formatos
                de dados, datas válidas e prevenção de agendamentos duplicados.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-orange-600" />
                <h3 className="text-orange-900">Testes de Integração</h3>
              </div>
              <p className="text-sm text-gray-600">
                Verificação de integração entre componentes: formulário ↔ lista
                de consultas, persistência de dados e sistema de notificações.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Módulos a Serem Testados</CardTitle>
          <CardDescription>
            Componentes e funcionalidades específicas do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="agendamento" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="agendamento">Agendamento</TabsTrigger>
              <TabsTrigger value="alteracao">Alteração</TabsTrigger>
              <TabsTrigger value="cancelamento">Cancelamento</TabsTrigger>
            </TabsList>

            <TabsContent value="agendamento" className="space-y-4 mt-4">
              <div className="border rounded-lg p-4">
                <h4 className="mb-3 flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-blue-600" />
                  Módulo de Agendamento de Consultas
                </h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Componentes:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-gray-700">
                    <li>Formulário de agendamento</li>
                    <li>Seleção de unidade de saúde</li>
                    <li>Seleção de especialidade e profissional</li>
                    <li>Calendário de datas disponíveis</li>
                    <li>Seleção de horários</li>
                    <li>Sistema de notificações</li>
                    <li>Persistência de dados (localStorage)</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="alteracao" className="space-y-4 mt-4">
              <div className="border rounded-lg p-4">
                <h4 className="mb-3 flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-green-600" />
                  Módulo de Alteração de Consultas
                </h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Componentes:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-gray-700">
                    <li>Listagem de consultas agendadas</li>
                    <li>Modal de reagendamento</li>
                    <li>Seleção de nova data</li>
                    <li>Seleção de novo horário</li>
                    <li>Atualização de dados persistidos</li>
                    <li>Confirmação de alteração</li>
                    <li>Notificação de reagendamento</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cancelamento" className="space-y-4 mt-4">
              <div className="border rounded-lg p-4">
                <h4 className="mb-3 flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-red-600" />
                  Módulo de Cancelamento de Consultas
                </h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Componentes:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-gray-700">
                    <li>Botão de cancelamento</li>
                    <li>Dialog de confirmação</li>
                    <li>Atualização de status da consulta</li>
                    <li>Movimentação para histórico de canceladas</li>
                    <li>Notificação de cancelamento</li>
                    <li>Atualização de dados persistidos</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Casos de Teste Detalhados</CardTitle>
          <CardDescription>
            Especificação detalhada dos cenários de teste
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-blue-900">
                CT-001: Agendamento de Consulta com Sucesso
              </h4>
              <Badge className="bg-blue-600">Funcional</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-600">Objetivo:</p>
                <p>
                  Verificar se o sistema permite agendar uma consulta
                  preenchendo todos os campos corretamente
                </p>
              </div>
              <div>
                <p className="text-gray-600">Pré-condições:</p>
                <p>Sistema carregado e formulário de agendamento visível</p>
              </div>
              <div>
                <p className="text-gray-600">Passos:</p>
                <ol className="list-decimal list-inside ml-2">
                  <li>Preencher nome do paciente</li>
                  <li>Selecionar unidade de saúde</li>
                  <li>Selecionar especialidade</li>
                  <li>Selecionar profissional</li>
                  <li>Selecionar data futura</li>
                  <li>Selecionar horário disponível</li>
                  <li>Clicar em "Confirmar Agendamento"</li>
                </ol>
              </div>
              <div>
                <p className="text-gray-600">Resultado Esperado:</p>
                <div className="flex items-start gap-2 text-green-700">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>
                    Mensagem de sucesso exibida, consulta salva, notificação
                    enviada, formulário limpo
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-red-900">
                CT-002: Tentativa de Agendamento com Campos Vazios
              </h4>
              <Badge variant="destructive">Validação</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-600">Objetivo:</p>
                <p>
                  Verificar se o sistema valida campos obrigatórios e impede
                  agendamento incompleto
                </p>
              </div>
              <div>
                <p className="text-gray-600">Passos:</p>
                <ol className="list-decimal list-inside ml-2">
                  <li>Deixar um ou mais campos em branco</li>
                  <li>Clicar em "Confirmar Agendamento"</li>
                </ol>
              </div>
              <div>
                <p className="text-gray-600">Resultado Esperado:</p>
                <div className="flex items-start gap-2 text-red-700">
                  <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>
                    Mensagem de erro exibida, agendamento não realizado, campos
                    permanecem preenchidos
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-green-900">
                CT-003: Reagendamento de Consulta
              </h4>
              <Badge className="bg-green-600">Funcional</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-600">Objetivo:</p>
                <p>
                  Verificar se o sistema permite alterar data e horário de uma
                  consulta agendada
                </p>
              </div>
              <div>
                <p className="text-gray-600">Pré-condições:</p>
                <p>Pelo menos uma consulta agendada no sistema</p>
              </div>
              <div>
                <p className="text-gray-600">Passos:</p>
                <ol className="list-decimal list-inside ml-2">
                  <li>Navegar para "Minhas Consultas"</li>
                  <li>Clicar no botão de editar em uma consulta</li>
                  <li>Selecionar nova data</li>
                  <li>Selecionar novo horário</li>
                  <li>Confirmar reagendamento</li>
                </ol>
              </div>
              <div>
                <p className="text-gray-600">Resultado Esperado:</p>
                <div className="flex items-start gap-2 text-green-700">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>
                    Consulta atualizada com nova data/horário, mensagem de
                    sucesso, notificação enviada
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-orange-900">
                CT-004: Cancelamento de Consulta
              </h4>
              <Badge className="bg-orange-600">Funcional</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-600">Objetivo:</p>
                <p>
                  Verificar se o sistema permite cancelar uma consulta agendada
                </p>
              </div>
              <div>
                <p className="text-gray-600">Pré-condições:</p>
                <p>Pelo menos uma consulta agendada no sistema</p>
              </div>
              <div>
                <p className="text-gray-600">Passos:</p>
                <ol className="list-decimal list-inside ml-2">
                  <li>Navegar para "Minhas Consultas"</li>
                  <li>Clicar no botão de cancelar em uma consulta</li>
                  <li>Confirmar cancelamento no dialog</li>
                </ol>
              </div>
              <div>
                <p className="text-gray-600">Resultado Esperado:</p>
                <div className="flex items-start gap-2 text-green-700">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>
                    Status alterado para "cancelada", consulta movida para
                    histórico, notificação enviada
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-purple-900">CT-005: Persistência de Dados</h4>
              <Badge className="bg-purple-600">Integração</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-600">Objetivo:</p>
                <p>
                  Verificar se as consultas são persistidas e recuperadas
                  corretamente
                </p>
              </div>
              <div>
                <p className="text-gray-600">Passos:</p>
                <ol className="list-decimal list-inside ml-2">
                  <li>Agendar uma nova consulta</li>
                  <li>Recarregar a página (F5)</li>
                  <li>Navegar para "Minhas Consultas"</li>
                </ol>
              </div>
              <div>
                <p className="text-gray-600">Resultado Esperado:</p>
                <div className="flex items-start gap-2 text-green-700">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>
                    Consulta continua visível na lista com todos os dados
                    corretos
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-yellow-900">
                CT-006: Validação de Data Passada
              </h4>
              <Badge className="bg-yellow-600">Validação</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-600">Objetivo:</p>
                <p>Verificar se o sistema impede seleção de datas no passado</p>
              </div>
              <div>
                <p className="text-gray-600">Passos:</p>
                <ol className="list-decimal list-inside ml-2">
                  <li>Abrir calendário de seleção de data</li>
                  <li>Tentar selecionar uma data anterior à data atual</li>
                </ol>
              </div>
              <div>
                <p className="text-gray-600">Resultado Esperado:</p>
                <div className="flex items-start gap-2 text-green-700">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>
                    Datas passadas desabilitadas/não selecionáveis no calendário
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-pink-500 bg-pink-50 p-4 rounded">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-pink-900">CT-007: Sistema de Notificações</h4>
              <Badge className="bg-pink-600">Funcional</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-600">Objetivo:</p>
                <p>
                  Verificar se notificações são exibidas nas ações principais
                </p>
              </div>
              <div>
                <p className="text-gray-600">Passos:</p>
                <ol className="list-decimal list-inside ml-2">
                  <li>Agendar uma consulta</li>
                  <li>Reagendar uma consulta</li>
                  <li>Cancelar uma consulta</li>
                </ol>
              </div>
              <div>
                <p className="text-gray-600">Resultado Esperado:</p>
                <div className="flex items-start gap-2 text-green-700">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>
                    Toast de confirmação exibido em cada ação + notificação de
                    email simulada
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-indigo-500 bg-indigo-50 p-4 rounded">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-indigo-900">
                CT-008: Seleção Condicional de Profissionais
              </h4>
              <Badge className="bg-indigo-600">Usabilidade</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-600">Objetivo:</p>
                <p>
                  Verificar se a lista de profissionais é filtrada pela
                  especialidade selecionada
                </p>
              </div>
              <div>
                <p className="text-gray-600">Passos:</p>
                <ol className="list-decimal list-inside ml-2">
                  <li>Selecionar uma especialidade (ex: Cardiologia)</li>
                  <li>Abrir o select de profissionais</li>
                  <li>Verificar profissionais listados</li>
                  <li>Mudar para outra especialidade</li>
                  <li>Verificar que a lista de profissionais mudou</li>
                </ol>
              </div>
              <div>
                <p className="text-gray-600">Resultado Esperado:</p>
                <div className="flex items-start gap-2 text-green-700">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>
                    Apenas profissionais da especialidade selecionada são
                    exibidos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Critérios de Aceitação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm">
                <strong>Taxa de Sucesso:</strong> 100% dos casos de teste
                principais (CT-001 a CT-008) devem passar
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm">
                <strong>Validações:</strong> Todos os campos obrigatórios devem
                ser validados corretamente
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm">
                <strong>Notificações:</strong> Sistema deve exibir feedback
                visual para todas as ações do usuário
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm">
                <strong>Persistência:</strong> Dados devem ser mantidos entre
                recarregamentos da página
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm">
                <strong>Usabilidade:</strong> Interface deve ser intuitiva e
                responsiva
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm">
                <strong>Responsividade:</strong> Sistema deve funcionar
                corretamente em diferentes tamanhos de tela
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. Matriz de Rastreabilidade</CardTitle>
          <CardDescription>
            Relação entre requisitos funcionais e casos de teste
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left p-2 bg-gray-50">
                    Requisito Funcional
                  </th>
                  <th className="text-left p-2 bg-gray-50">Casos de Teste</th>
                  <th className="text-left p-2 bg-gray-50">Prioridade</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">RF-01: Agendar consulta</td>
                  <td className="p-2">CT-001, CT-002, CT-005, CT-006</td>
                  <td className="p-2">
                    <Badge className="bg-red-600">Alta</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">RF-02: Alterar consulta</td>
                  <td className="p-2">CT-003, CT-005</td>
                  <td className="p-2">
                    <Badge className="bg-red-600">Alta</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">RF-03: Cancelar consulta</td>
                  <td className="p-2">CT-004, CT-005</td>
                  <td className="p-2">
                    <Badge className="bg-red-600">Alta</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">RF-04: Enviar notificações</td>
                  <td className="p-2">CT-007</td>
                  <td className="p-2">
                    <Badge className="bg-orange-600">Média</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">
                    RF-05: Filtrar profissionais por especialidade
                  </td>
                  <td className="p-2">CT-008</td>
                  <td className="p-2">
                    <Badge className="bg-orange-600">Média</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">RF-06: Validar campos obrigatórios</td>
                  <td className="p-2">CT-002</td>
                  <td className="p-2">
                    <Badge className="bg-red-600">Alta</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">RF-07: Persistir dados</td>
                  <td className="p-2">CT-005</td>
                  <td className="p-2">
                    <Badge className="bg-red-600">Alta</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">RF-08: Impedir datas passadas</td>
                  <td className="p-2">CT-006</td>
                  <td className="p-2">
                    <Badge className="bg-orange-600">Média</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7. Ambiente de Testes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tecnologias:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>React + TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Shadcn/UI Components</li>
                <li>LocalStorage para persistência</li>
              </ul>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Navegadores Suportados:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Google Chrome (última versão)</li>
                <li>Mozilla Firefox (última versão)</li>
                <li>Safari (última versão)</li>
                <li>Microsoft Edge (última versão)</li>
              </ul>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Dispositivos:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Desktop (1920x1080 e superiores)</li>
                <li>Tablet (768x1024)</li>
                <li>Mobile (375x667 e superiores)</li>
              </ul>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Ferramentas de Teste:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>DevTools do navegador</li>
                <li>Testes manuais</li>
                <li>Simulação de diferentes resoluções</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-blue-600" />
            8. Considerações Finais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            <strong>Limitações do Protótipo:</strong> Este protótipo utiliza
            armazenamento local (localStorage) para simular persistência de
            dados. Em um ambiente de produção, seria necessária integração com
            backend e banco de dados.
          </p>
          <p>
            <strong>Próximas Etapas:</strong> Implementação de testes
            automatizados (Jest, Testing Library), testes de carga, integração
            com API real, e testes de segurança.
          </p>
          <p>
            <strong>Observações:</strong> As notificações de email e SMS são
            simuladas neste protótipo. Em produção, seria necessária integração
            com serviços de envio de mensagens.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
