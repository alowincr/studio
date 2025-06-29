"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { personalizeContent } from "@/ai/flows/personalized-content";

const originalContent = `
Hero:
- Name: Alonso Carbajal
- Role: Ingeniero de Sistemas
- Description: Apasionado por crear soluciones tecnológicas innovadoras. Especializado en desarrollo web full-stack con experiencia en tecnologías modernas y metodologías ágiles.

Projects:
1. Sistema de Gestión de Tareas: Aplicación web completa para gestión de proyectos y tareas con interfaz intuitiva, notificaciones en tiempo real y dashboard analítico. Technologies: React, Node.js, MongoDB, Socket.io.
2. E-commerce Platform: Plataforma de comercio electrónico con sistema de pagos integrado, gestión de inventario y panel administrativo completo. Technologies: Next.js, TypeScript, PostgreSQL, Stripe.
3. Dashboard Analítico: Dashboard interactivo para visualización de datos empresariales con gráficos dinámicos y reportes en tiempo real. Technologies: Vue.js, D3.js, Python, FastAPI.

Skills:
- HTML5: Avanzado
- CSS3: Avanzado
- JavaScript: Avanzado
- React: Intermedio
- Node.js: Intermedio
- Python: Avanzado
- MongoDB: Intermedio
- Git: Avanzado
`;

export default function PersonalizeSection() {
  const [open, setOpen] = useState(false);
  const [visitorProfile, setVisitorProfile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [personalizedContent, setPersonalizedContent] = useState<string | null>(null);

  const handlePersonalize = async () => {
    if (!visitorProfile.trim()) return;

    setIsLoading(true);
    setPersonalizedContent(null);

    try {
      const result = await personalizeContent({
        visitorProfile,
        portfolioContent: originalContent,
      });
      setPersonalizedContent(result.personalizedContent);
    } catch (error) {
      console.error("Error personalizing content:", error);
      setPersonalizedContent("Hubo un error al personalizar el contenido. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-8 left-8 z-50 animate-pulse"
            size="lg"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Personalizar con IA
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Personalizar contenido</DialogTitle>
            <DialogDescription>
              Describe quién eres o qué te interesa (p. ej. "reclutador de backend", "estudiante de frontend") para adaptar el contenido del portafolio para ti.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              id="visitorProfile"
              placeholder="Ej: Soy un reclutador buscando un desarrollador full-stack con experiencia en React y Python."
              value={visitorProfile}
              onChange={(e) => setVisitorProfile(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button onClick={handlePersonalize} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              {isLoading ? "Personalizando..." : "Personalizar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {personalizedContent && (
        <div className="fixed bottom-28 left-8 right-8 z-50 max-w-md">
          <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertTitle>Contenido Personalizado para ti</AlertTitle>
            <AlertDescription className="max-h-48 overflow-y-auto">
              {personalizedContent}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
}
