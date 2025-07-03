"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Code,
  Mail,
  Github,
  ExternalLink,
  Codepen,
  Palette,
  FileCode,
  Atom,
  Server,
  Database,
  GitMerge,
  Phone,
  Linkedin,
  Twitter,
  Instagram,
  Send,
  Menu,
  X,
  ArrowUp,
  LayoutTemplate,
  ServerCog,
  PenTool,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "./actions";
import ParticlesBackground from "@/components/particles-background";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  subject: z.string().min(5, { message: "El asunto debe tener al menos 5 caracteres." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
});

interface Project {
  id: number;
  image: string;
  aiHint: string;
  title: string;
  description: string | null;
  tech: string[];
  codeLink: string;
  demoLink: string | null;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);
  const [typedSubtitle, setTypedSubtitle] = useState("");
  
  const subtitle = "Ingeniero de Sistemas";
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    const result = await submitContactForm(values);
    if (result.success) {
      toast({
        title: "¡Mensaje Enviado!",
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Error al enviar",
        description: result.message,
      });
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 50);
      setIsScrollTopVisible(window.scrollY > 500);

      let currentSection = "inicio";
      Object.entries(sectionsRef.current).forEach(([id, element]) => {
        if (element && window.scrollY >= element.offsetTop - 100) {
          currentSection = id;
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const typingInterval = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setTypedSubtitle(subtitle.slice(0, i + 1));
        i++;
        if (i === subtitle.length) {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(typingInterval);
  }, []);
  
  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#proyectos", label: "Proyectos" },
    { href: "#habilidades", label: "Habilidades" },
    { href: "#servicios", label: "Servicios" },
    { href: "#contacto", label: "Contacto" },
  ];
  
  const projects: Project[] = [
    {
      id: 1,
      image: "https://placehold.co/600x400.png",
      aiHint: "inventory management system",
      title: "AlmaZen Inventario",
      description: "AlmaZen es una interfaz web para gestionar almacenes, creada con JSP, JavaScript y CSS. Incluye secciones como inventario, empleados y ventas. Proyecto en desarrollo abierto a colaboradores.",
      tech: ["Java"],
      codeLink: "https://github.com/alowincr",
      demoLink: null,
    }
  ];

  const skills = [
    { icon: <Codepen />, name: "HTML", level: "Intermedio" },
    { icon: <Palette />, name: "CSS", level: "Intermedio" },
    { icon: <FileCode />, name: "JavaScript", level: "Intermedio" },
    { icon: <Atom />, name: "React", level: "Intermedio" },
    { icon: <Server />, name: "Node.js", level: "Intermedio" },
    { icon: <Code />, name: "Python", level: "Avanzado" },
    { icon: <Code />, name: "Java", level: "Intermedio" },
    { icon: <GitMerge />, name: "Git", level: "Intermedio" },
  ];
  
  const services = [
    {
      icon: <LayoutTemplate />,
      title: "Desarrollo Frontend",
      description: "Creación de interfaces de usuario interactivas y responsivas con las últimas tecnologías como React y Next.js.",
    },
    {
      icon: <ServerCog />,
      title: "Desarrollo Backend",
      description: "Diseño y construcción de APIs robustas y escalables, y lógica de servidor con Node.js, Python y bases de datos.",
    },
    {
      icon: <PenTool />,
      title: "Diseño UI/UX",
      description: "Enfoque en la experiencia de usuario para crear diseños intuitivos, funcionales y estéticamente agradables.",
    },
  ];

  const socialLinks = [
    { icon: <Github />, href: "https://github.com/alowincr" },
    { icon: <Linkedin />, href: "https://www.linkedin.com/in/alonso-carbajal-b10901212/" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <ParticlesBackground />

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHeaderScrolled ? "bg-background/80 backdrop-blur-sm border-b border-white/10" : "bg-transparent"}`}>
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-20">
            <Link href="#inicio" className="text-2xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Alonso.dev
            </Link>
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === link.href.substring(1) ? "text-white bg-primary/20" : "text-gray-300 hover:text-white hover:bg-white/10"}`}>
                  {link.label}
                </a>
              ))}
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </nav>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className={`block px-4 py-2 rounded-md text-base font-medium transition-colors ${activeSection === link.href.substring(1) ? "text-white bg-primary/20" : "text-gray-300 hover:text-white hover:bg-white/10"}`}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 pt-20">
        <section id="inicio" ref={(el) => (sectionsRef.current["inicio"] = el)} className="min-h-screen flex items-center py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-4 text-center md:text-left">
                <p className="font-code text-accent">👋 Hola, soy</p>
                <h1 className="text-4xl md:text-6xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent leading-tight">
                  Alonso Carbajal
                </h1>
                <h2 className="text-2xl font-semibold text-gray-300 h-8">
                  <span className="font-code">{typedSubtitle}</span>
                  <span className="animate-ping">_</span>
                </h2>
                <p className="text-gray-400 max-w-lg mx-auto md:mx-0">
                  Apasionado por crear soluciones tecnológicas innovadoras. Especializado en desarrollo web full-stack con experiencia en tecnologías modernas y metodologías ágiles.
                </p>
                <div className="flex justify-center md:justify-start space-x-4 pt-4">
                  <Button asChild size="lg">
                    <a href="#proyectos"><Code /> Ver Proyectos</a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href="#contacto"><Mail /> Contáctame</a>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="relative w-72 h-72 md:w-80 md:h-80 group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500"></div>
                    <div className="relative w-full h-full">
                        <Image
                            src="https://placehold.co/320x320.png"
                            data-ai-hint="profile picture"
                            alt="Foto de perfil de Alonso Carbajal"
                            width={320}
                            height={320}
                            className="rounded-full object-cover border-4 border-background"
                        />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="proyectos" ref={(el) => (sectionsRef.current["proyectos"] = el)} className="py-20 bg-background/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-headline">Proyectos Recientes</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                Estos son mis últimos proyectos en GitHub. ¡Siempre estoy trabajando en algo nuevo!
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {projects.map((project) => (
                <Card key={project.id} className="bg-card/80 backdrop-blur-sm border-white/10 overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col max-w-sm mx-auto">
                  <div className="relative aspect-[3/2] w-full">
                    <Image
                      src={project.image}
                      data-ai-hint={project.aiHint}
                      alt={`Imagen del proyecto ${project.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-headline capitalize">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{project.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tech.map(t => <span key={t} className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">{t}</span>)}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex space-x-4 w-full">
                      <Button asChild variant="outline" className="w-full">
                        <a href={project.codeLink} target="_blank" rel="noopener noreferrer"><Github /> Código</a>
                      </Button>
                      {project.demoLink && (
                        <Button asChild className="w-full">
                          <a href={project.demoLink} target="_blank" rel="noopener noreferrer"><ExternalLink /> Demo</a>
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="habilidades" ref={(el) => (sectionsRef.current["habilidades"] = el)} className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-headline">Habilidades Técnicas</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                Tecnologías y herramientas con las que trabajo para crear soluciones digitales de alta calidad.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="text-center p-6 bg-card/80 border border-white/10 rounded-lg transform hover:-translate-y-2 transition-transform duration-300">
                  <div className="flex justify-center text-accent mb-4">
                    {React.cloneElement(skill.icon, {className: "w-12 h-12"})}
                  </div>
                  <h4 className="font-bold text-lg font-headline">{skill.name}</h4>
                  <p className="text-sm text-gray-400">{skill.level}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="servicios" ref={(el) => (sectionsRef.current["servicios"] = el)} className="py-20 bg-background/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-headline">Mis Servicios</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                Ofrezco soluciones integrales para llevar tus ideas del concepto a la realidad digital.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur-sm border-white/10 text-center p-8 transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                  <div className="flex justify-center text-primary mb-6">
                    {React.cloneElement(service.icon, { className: "w-16 h-16" })}
                  </div>
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-grow">
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" ref={(el) => (sectionsRef.current["contacto"] = el)} className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-headline">Contáctame</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                ¿Tienes un proyecto en mente? Me encantaría escuchar sobre él y ver cómo podemos trabajar juntos.
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-8 bg-card/80 border border-white/10 rounded-lg">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo Electrónico</FormLabel>
                      <FormControl>
                        <Input placeholder="tu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="subject" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asunto</FormLabel>
                      <FormControl>
                        <Input placeholder="¿De qué quieres hablar?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensaje</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Cuéntame sobre tu proyecto o idea..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Enviando..." : <><Send className="mr-2 h-4 w-4" /> Enviar Mensaje</>}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <div className="flex justify-center space-x-4 mb-4">
            {socialLinks.map((link, i) => (
              <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-background/50 rounded-full hover:bg-primary hover:text-white transition-colors">
                {link.icon}
              </a>
            ))}
          </div>
          <p>&copy; {new Date().getFullYear()} Alonso Carbajal. Todos los derechos reservados.</p>
        </div>
      </footer>
      
      {isScrollTopVisible && (
        <a href="#inicio" className="fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-accent transition-colors z-50">
          <ArrowUp className="w-6 h-6" />
        </a>
      )}
    </div>
  );
}
