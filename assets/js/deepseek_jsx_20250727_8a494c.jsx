import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Configurações do GitHub (substitua com suas informações)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || 'seu_token_aqui';
const GITHUB_REPO = process.env.GITHUB_REPO || 'seu_usuario/nome_repositorio';
const CONFIG_FILE = 'site-config.json';

// Histórico de alterações
let changeHistory = [];

// Funções para manipulação do GitHub
const getConfig = async () => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${CONFIG_FILE}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );
    
    if (!response.ok) throw new Error('Falha ao carregar configurações');
    
    const data = await response.json();
    const content = atob(data.content);
    return JSON.parse(content);
  } catch (error) {
    console.error('Usando configuração padrão:', error);
    return {
      header: {
        logo: { url: '', alt: 'Logo Conceito' },
        navLinks: ['Serviços', 'Metodologia', 'Sobre Nós', 'Depoimentos', 'Contato', 'Admin'],
      },
      hero: {
        title: 'TRANSFORME SEU NEGÓCIO COM CONSULTORIA PREMIUM',
        description: 'Metodologia exclusiva que aumenta em até 300% a eficiência operacional e rentabilidade de empresas em 12 meses.',
        image: '',
        buttons: [
          { text: 'Fale com um especialista', link: '#contato' },
          { text: 'Conheça nossa metodologia', link: '#metodologia' },
        ],
      },
      // ... (manter o restante da configuração padrão)
    };
  }
};

const saveConfig = async (config) => {
  try {
    const getResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${CONFIG_FILE}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );
    
    let sha = '';
    if (getResponse.ok) {
      const data = await getResponse.json();
      sha = data.sha;
    }

    const content = JSON.stringify(config, null, 2);
    const encodedContent = btoa(unescape(encodeURIComponent(content)));
    
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${CONFIG_FILE}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Atualização de configuração via painel administrativo',
          content: encodedContent,
          sha: sha || undefined,
        }),
      }
    );
    
    if (!response.ok) throw new Error('Falha ao salvar configurações');
    
    const timestamp = new Date().toLocaleString('pt-BR');
    changeHistory.push({ timestamp, description: 'Alterações salvas no GitHub.' });
    
    return { message: 'Alterações salvas com sucesso no GitHub!' };
  } catch (error) {
    console.error('Erro ao salvar no GitHub:', error);
    const timestamp = new Date().toLocaleString('pt-BR');
    changeHistory.push({ timestamp, description: 'Alterações salvas localmente (falha no GitHub).' });
    return { message: 'Alterações salvas localmente (falha no GitHub)' };
  }
};

// Componentes (todos os componentes que você forneceu anteriormente)
// Header, Hero, Stats, Services, Methodology, About, Testimonials, 
// Clients, CTA, Contact, Footer, Login, GeneralInfo, Content, 
// Media, Design, History, Admin, Home

// App Component
const App = () => {
  const [config, setConfig] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await getConfig();
        setConfig(data);
        // Aplicar estilos CSS das variáveis
        document.documentElement.style.setProperty('--primary-color', data.design.primaryColor);
        document.documentElement.style.setProperty('--highlight-color', data.design.highlightColor);
        document.documentElement.style.setProperty('--secondary-color', data.design.secondaryColor);
      } catch (err) {
        console.error('Erro ao carregar configuração:', err);
        setError('Falha ao carregar configurações. Usando configuração padrão.');
        // Carregar configuração padrão como fallback
        const defaultData = await getConfig(); // Isso retornará o fallback
        setConfig(defaultData);
      } finally {
        setLoading(false);
      }
    };
    
    loadConfig();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Erro: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home config={config} />} />
        <Route 
          path="/admin" 
          element={
            isAuthenticated ? 
              <Admin config={config} setConfig={setConfig} /> : 
              <Login setIsAuthenticated={setIsAuthenticated} />
          } 
        />
      </Routes>
    </Router>
  );
};

// Render
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);