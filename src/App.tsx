import { useState } from "react";
import { AgendamentoConsultas } from "./components/AgendamentoConsultas";
import { MinhasConsultas } from "./components/MinhasConsultas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Toaster } from "./components/ui/sonner";
import { Calendar, ClipboardList } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("agendamento");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-blue-900">SaúdeJá</h1>
              <p className="text-gray-600 text-sm">
                Protótipo - Módulo de Agendamento de Consultas
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="agendamento" className="gap-2">
              <Calendar className="w-4 h-4" />
              Agendar Consulta
            </TabsTrigger>
            <TabsTrigger value="minhas-consultas" className="gap-2">
              <ClipboardList className="w-4 h-4" />
              Minhas Consultas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agendamento">
            <AgendamentoConsultas />
          </TabsContent>

          <TabsContent value="minhas-consultas">
            <MinhasConsultas />
          </TabsContent>

        </Tabs>
      </main>

      <footer className="mt-16 py-6 border-t bg-white/50">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p className="text-sm">© 2025 SaúdeJá - Protótipo Acadêmico</p>
        </div>
      </footer>
      <Toaster richColors />
    </div>
  );
}
