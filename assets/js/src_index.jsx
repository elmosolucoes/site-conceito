import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './styles/input.css'; // Importa o CSS gerado pelo Tailwind

// Simulação de Netlify Functions (getConfig)
const getConfig = async () => ({
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
  stats: [
    { value: '+0', label: 'Clientes atendidos' },
    { value: '+0%', label: 'Crescimento médio' },
    { value: '0+', label: 'Anos de experiência' },
    { value: 'R$0M+', label: 'Gerados para clientes' },
  ],
  services: [
    { title: 'Estratégia Empresarial', description: 'Desenvolvimento de estratégias de crescimento com plano de ação detalhado para alcançar resultados extraordinários.', icon: 'fa-chart-line' },
    { title: 'Otimização de Processos', description: 'Redesenho de processos operacionais para eliminar desperdícios e aumentar produtividade em até 200%.', icon: 'fa-cogs' },
    { title: 'Gestão de Equipes', description: 'Metodologia exclusiva para desenvolvimento de lideranças e alta performance de equipes.', icon: 'fa-users' },
  ],
  methodology: [
    { step: 'Diagnóstico Estratégico', description: 'Análise profunda de todos os aspectos do negócio para identificar oportunidades de melhoria e pontos críticos.', number: '1' },
    { step: 'Planejamento Personalizado', description: 'Desenvolvimento de um plano estratégico exclusivo para seu negócio com metas claras e indicadores de desempenho.', number: '2' },
    { step: 'Implementação com Suporte', description: 'Execução do plano com acompanhamento próximo de nossos consultores para garantir os resultados esperados.', number: '3' },
    { step: 'Resultados e Escalabilidade', description: 'Consolidação dos resultados e preparação da empresa para o próximo nível de crescimento e expansão.', number: '4' },
  ],
  about: {
    title: 'SOBRE A CONCEITO',
    description1: 'Fundada em 2005, a CONCEITO se consolidou como uma das principais consultorias empresariais do Brasil, com atuação em todo o território nacional e clientes em mais de 15 países.',
    description2: 'Nossa equipe é composta por especialistas com experiência prática em gestão empresarial, muitos deles ex-executivos de grandes corporações que decidiram dedicar seu conhecimento a transformar empresas de todos os portes.',
    stats: [
      { value: '100%', label: 'Foco em resultados' },
      { value: '24/7', label: 'Suporte dedicado' },
      { value: '100+', label: 'Especialistas' },
    ],
    team: 'Profissionais altamente qualificados com experiência prática em diversas indústrias e mercados.',
  },
  testimonials: [
    { name: 'Carlos Silva', role: 'CEO, Indústria ABC', testimonial: 'A CONCEITO transformou completamente nosso negócio. Em 8 meses aumentamos nossa receita em 150% e reduzimos custos em 30%. Recomendo sem dúvidas!', photoUrl: '' },
    { name: 'Ana Oliveira', role: 'Diretora, TechStart', testimonial: 'O trabalho da CONCEITO foi fundamental para nossa expansão internacional. Eles não só criaram a estratégia, como nos acompanharam em todo o processo.', photoUrl: '' },
    { name: 'Roberto Santos', role: 'Presidente, Grupo XYZ', testimonial: 'Depois de anos tentando melhorar nossos processos internos, a CONCEITO conseguiu em 3 meses o que não tínhamos conseguido em 5 anos. Incrível!', photoUrl: '' },
  ],
  clients: [{ url: '' }, { url: '' }, { url: '' }, { url: '' }, { url: '' }],
  cta: {
    title: 'PRONTO PARA TRANSFORMAR SEU NEGÓCIO?',
    description: 'Agende uma consultoria gratuita com nossos especialistas e descubra como podemos ajudar sua empresa a alcançar novos patamares.',
    button: { text: 'Agendar Consultoria', link: '#contato' },
  },
burgo
  contact: {
    title: 'FALE CONOSCO',
    description: 'Entre em contato com nossa equipe para saber mais sobre nossos serviços e como podemos ajudar seu negócio a crescer.',
    info: [
      { label: 'Endereço', value: 'Av. Paulista, 1000 - São Paulo/SP' },
      { label: 'Telefone', value: '(11) 9999-9999' },
      { label: 'Email', value: 'contato@conceito.com.br' },
      { label: 'Horário de Atendimento', value: 'Segunda a Sexta, das 9h às 18h' },
    ],
  },
  footer: {
    title: 'CONCEITO',
    description: 'Consultoria empresarial premium com foco em resultados extraordinários.',
    socialLinks: [{ platform: 'Instagram', url: '@consultoria_conceitorh' }],
    quickLinks: ['Serviços', 'Metodologia', 'Sobre Nós', 'Depoimentos', 'Contato'],
    servicesLinks: ['Estratégia Empresarial', 'Otimização de Processos', 'Gestão de Equipes', 'Consultoria Financeira', 'Expansão de Mercado'],
    legalLinks: ['Termos de Uso', 'Política de Privacidade', 'Cookies', 'FAQ'],
  },
  company: { name: 'CONCEITO', whatsapp: '(11) 9999-9999', logoSize: 'Médio' },
  design: { primaryColor: '#1A3C5A', highlightColor: '#FFD700', secondaryColor: '#00B7EB' },
  gallery: [],
});

// Simulação de Netlify Functions (saveConfig) e Histórico
let savedConfig = null;
let changeHistory = [];
const saveConfig = async (config) => {
  savedConfig = config;
  const timestamp = new Date().toLocaleString('pt-BR');
  changeHistory.push({ timestamp, description: 'Alterações salvas no painel administrativo.' });
  return { message: 'Alterações salvas com sucesso!' };
};

// Validação de URL do YouTube
const isValidYouTubeUrl = (url) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return youtubeRegex.test(url);
};

// Validação de arquivo de imagem
const isValidImage = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  return file && validTypes.includes(file.type) && file.size <= 5 * 1024 * 1024; // Máx 5MB
};

// Componente Header
const Header = ({ header, company }) => (
  <header className="bg-white shadow-md py-4 sticky top-0 z-10">
    <div className="container mx-auto flex justify-between items-center">
      {header.logo.url ? (
        <img
          src={header.logo.url}
          alt={header.logo.alt}
          className={`h-${company.logoSize === 'Pequeno' ? '8' : company.logoSize === 'Médio' ? '12' : '16'}`}
        />
      ) : (
        <h1 className="text-2xl font-bold text-primary">{company.name}</h1>
      )}
      <nav className="flex gap-4">
        {header.navLinks.map((link, index) => (
          <a key={index} href={link === 'Admin' ? '/admin' : `#${link.toLowerCase().replace(' ', '-')}`} className="text-gray-600 hover:text-primary">
            {link}
          </a>
        ))}
      </nav>
    </div>
  </header>
);

// Componente Hero
const Hero = ({ hero }) => (
  <section className="bg-gray-100 py-20">
    <motion.div
      className="container mx-auto text-center"
      initial={{ y: -50 }}
      animate={{ y: 50 }}
      transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
    >
      <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">{hero.title}</h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8">{hero.description}</p>
      {hero.image && (
        <motion.img
          src={hero.image}
          alt="Hero Image"
          className="mx-auto mb-8 max-w-md"
          initial={{ y: -20 }}
          animate={{ y: 20 }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 3 }}
        />
      )}
      <div className="flex justify-center gap-4">
        {hero.buttons.map((button, index) => (
          <a key={index} href={button.link} className="btn-primary px-6 py-3 rounded-md">
            {button.text}
          </a>
        ))}
      </div>
    </motion.div>
  </section>
);

// Componente Stats
const Stats = ({ stats }) => (
  <section className="py-16 bg-white">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.2 }}
        >
          <h3 className="text-3xl font-bold text-highlight">{stat.value}</h3>
          <p className="text-gray-600">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

// Componente Services
const Services = ({ services }) => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold text-primary mb-4">NOSSOS SERVIÇOS</h2>
      <p className="text-lg text-gray-600 mb-8">Soluções personalizadas para cada etapa do crescimento do seu negócio</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <i className={`fas ${service.icon} text-4xl text-primary mb-4`}></i>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <a href="#contato" className="text-primary hover:underline">Saiba mais</a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Componente Methodology
const Methodology = ({ methodology }) => (
  <section className="py-16 bg-white">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold text-primary mb-4">METODOLOGIA EXCLUSIVA</h2>
      <p className="text-lg text-gray-600 mb-8">Processo comprovado que já transformou centenas de empresas</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {methodology.map((step, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow-md relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="absolute top-0 left-0 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">{step.number}</div>
            <h3 className="text-xl font-semibold mb-2 mt-8">{step.step}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Componente About
const About = ({ about }) => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-primary mb-4">{about.title}</h2>
      <p className="text-lg text-gray-600 mb-4">{about.description1}</p>
      <p className="text-lg text-gray-600 mb-8">{about.description2}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {about.stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <h3 className="text-2xl font-bold text-highlight">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-2">Nossa Equipe</h3>
        <p className="text-gray-600">{about.team}</p>
      </motion.div>
    </div>
  </section>
);

// Componente Testimonials
const Testimonials = ({ testimonials }) => (
  <section className="py-16 bg-white">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold text-primary mb-4">DEPOIMENTOS DE CLIENTES</h2>
      <p className="text-lg text-gray-600 mb-8">Veja o que nossos clientes dizem sobre nossos serviços</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {testimonial.photoUrl && <img src={testimonial.photoUrl} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto mb-4" />}
            <p className="text-gray-600 mb-4">{testimonial.testimonial}</p>
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-gray-500">{testimonial.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Componente Clients
const Clients = ({ clients }) => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold text-primary mb-4">Alguns de nossos clientes</h2>
      <div className="flex justify-center gap-8 flex-wrap">
        {clients.map((client, index) => (
          client.url && (
            <motion.img
              key={index}
              src={client.url}
              alt="Cliente"
              className="h-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            />
          )
        ))}
      </div>
    </div>
  </section>
);

// Componente CTA
const CTA = ({ cta }) => (
  <section className="py-16 bg-secondary text-white">
    <div className="container mx-auto text-center">
      <motion.h2
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {cta.title}
      </motion.h2>
      <p className="text-lg mb-8">{cta.description}</p>
      <a href={cta.button.link} className="bg-white text-primary px-6 py-3 rounded-md hover:bg-gray-200">
        {cta.button.text}
      </a>
    </div>
  </section>
);

// Componente Contact
const Contact = ({ contact }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Nome é obrigatório';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email inválido';
    if (!formData.phone) errors.phone = 'Telefone é obrigatório';
    if (!formData.message) errors.message = 'Mensagem é obrigatória';
    return errors;
  };
  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      alert('Mensagem enviada com sucesso!');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } else {
      setFormErrors(errors);
    }
  };
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">{contact.title}</h2>
        <p className="text-lg text-gray-600 text-center mb-8">{contact.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {contact.info.map((item, index) => (
              <div key={index} className="mb-4 flex items-center">
                <i className={`fas ${item.label === 'Endereço' ? 'fa-map-marker-alt' : item.label === 'Telefone' ? 'fa-phone' : item.label === 'Email' ? 'fa-envelope' : 'fa-clock'} text-primary mr-2`}></i>
                <div>
                  <h3 className="font-semibold">{item.label}</h3>
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome Completo"
              className={`border p-2 w-full mb-4 rounded ${formErrors.name ? 'border-red-500' : ''}`}
            />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`border p-2 w-full mb-4 rounded ${formErrors.email ? 'border-red-500' : ''}`}
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Telefone"
              className={`border p-2 w-full mb-4 rounded ${formErrors.phone ? 'border-red-500' : ''}`}
            />
            {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Empresa"
              className="border p-2 w-full mb-4 rounded"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Mensagem"
              className={`border p-2 w-full mb-4 rounded ${formErrors.message ? 'border-red-500' : ''}`}
            />
            {formErrors.message && <p className="text-red-500 text-sm">{formErrors.message}</p>}
            <button onClick={handleSubmit} className="btn-primary px-6 py-3 rounded-md w-full">
              Enviar Mensagem
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Componente Footer
const Footer = ({ footer }) => (
  <footer className="bg-gray-800 text-white py-16">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">{footer.title}</h3>
        <p className="text-gray-400 mb-4">{footer.description}</p>
        <div className="flex gap-4">
          {footer.socialLinks.map((link, index) => (
            <a key={index} href={link.url} className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
          ))}
        </div>
        <p className="mt-4">contato@conceito.com.br</p>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
        <ul>
          {footer.quickLinks.map((link, index) => (
            <li key={index}>
              <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4">Serviços</h4>
        <ul>
          {footer.servicesLinks.map((link, index) => (
            <li key={index}>
              <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4">Legal</h4>
        <ul>
          {footer.legalLinks.map((link, index) => (
            <li key={index}>
              <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="text-center mt-8 text-gray-400">
      © 2023 CONCEITO Consultoria Empresarial. Todos os direitos reservados.
    </div>
  </footer>
);

// Componente Login
const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      navigate('/admin');
    } else {
      setError('Usuário ou senha inválidos.');
    }
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto max-w-md">
        <h2 className="text-2xl font-bold text-primary mb-4">Painel Administrativo</h2>
        <p className="text-gray-600 mb-4">Acesso restrito à equipe autorizada</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuário"
          className="border p-2 w-full mb-4 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="border p-2 w-full mb-4 rounded"
        />
        <button onClick={handleLogin} className="btn-primary px-6 py-3 rounded-md w-full">
          Acessar Painel
        </button>
      </div>
    </section>
  );
};

// Componente GeneralInfo
const GeneralInfo = ({ config, setConfig, isEditing }) => {
  const [localConfig, setLocalConfig] = useState(config);
  const [errors, setErrors] = useState({});

  const handleChange = (section, field, value) => {
    const newErrors = { ...errors };
    if (section === 'company' && field === 'name' && !value) {
      newErrors[field] = 'Nome da empresa é obrigatório';
    } else if (section === 'company' && field === 'whatsapp' && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(value)) {
      newErrors[field] = 'Formato de WhatsApp inválido';
    } else {
      delete newErrors[field];
    }
    setErrors(newErrors);
    setLocalConfig((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
    if (isEditing) {
      setConfig((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    }
  };

  const addService = () => {
    setLocalConfig((prev) => ({
      ...prev,
      services: [...prev.services, { title: '', description: '', icon: '' }],
    }));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-primary mb-4">Informações da Empresa</h3>
      <input
        type="text"
        value={localConfig.company.name}
        onChange={(e) => handleChange('company', 'name', e.target.value)}
        placeholder="Nome da Empresa"
        className={`border p-2 w-full mb-4 rounded ${errors.name ? 'border-red-500' : ''}`}
        disabled={!isEditing}
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      <input
        type="text"
        value={localConfig.company.whatsapp}
        onChange={(e) => handleChange('company', 'whatsapp', e.target.value)}
        placeholder="Número do WhatsApp"
        className={`border p-2 w-full mb-4 rounded ${errors.whatsapp ? 'border-red-500' : ''}`}
        disabled={!isEditing}
      />
      {errors.whatsapp && <p className="text-red-500 text-sm">{errors.whatsapp}</p>}
      <h3 className="text-xl font-semibold text-primary mb-4">Logotipo da Empresa</h3>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (isValidImage(file)) {
            handleChange('header', 'logo', { url: URL.createObjectURL(file), alt: 'Logo Conceito' });
          } else {
            alert('Por favor, envie uma imagem válida (JPEG/PNG/GIF, máx. 5MB).');
          }
        }}
        className="mb-4"
        disabled={!isEditing}
      />
      <select
        value={localConfig.company.logoSize}
        onChange={(e) => handleChange('company', 'logoSize', e.target.value)}
        className="border p-2 w-full mb-4 rounded"
        disabled={!isEditing}
      >
        <option value="Pequeno">Pequeno</option>
        <option value="Médio">Médio</option>
        <option value="Grande">Grande</option>
      </select>
      <button
        onClick={() => handleChange('header', 'logo', { url: '', alt: '' })}
        className="bg-red-600 text-white px-4 py-2 rounded-md mb-4"
        disabled={!isEditing}
      >
        Remover Logotipo
      </button>
      <h3 className="text-xl font-semibold text-primary mb-4">Gerenciar Serviços</h3>
      {localConfig.services.map((service, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            value={service.title}
            onChange={(e) => {
              const newServices = [...localConfig.services];
              newServices[index].title = e.target.value;
              setLocalConfig({ ...localConfig, services: newServices });
              if (isEditing) {
                setConfig((prev) => ({ ...prev, services: newServices }));
              }
            }}
            placeholder="Título do Serviço"
            className="border p-2 w-full mb-2 rounded"
            disabled={!isEditing}
          />
          <textarea
            value={service.description}
            onChange={(e) => {
              const newServices = [...localConfig.services];
              newServices[index].description = e.target.value;
              setLocalConfig({ ...localConfig, services: newServices });
              if (isEditing) {
                setConfig((prev) => ({ ...prev, services: newServices }));
              }
            }}
            placeholder="Descrição do Serviço"
            className="border p-2 w-full mb-2 rounded"
            disabled={!isEditing}
          />
          <input
            type="text"
            value={service.icon}
            onChange={(e) => {
              const newServices = [...localConfig.services];
              newServices[index].icon = e.target.value;
              setLocalConfig({ ...localConfig, services: newServices });
              if (isEditing) {
                setConfig((prev) => ({ ...prev, services: newServices }));
              }
            }}
            placeholder="Ícone (Classe Font Awesome)"
            className="border p-2 w-full mb-2 rounded"
            disabled={!isEditing}
          />
        </div>
      ))}
      <button onClick={addService} className="btn-primary px-4 py-2 rounded-md" disabled={!isEditing}>
        Adicionar Serviço
      </button>
    </div>
  );
};

// Componente Content
const Content = ({ config, setConfig, isEditing }) => {
  const [localConfig, setLocalConfig] = useState(config);
  const [errors, setErrors] = useState({});

  const handleChange = (section, field, value) => {
    const newErrors = { ...errors };
    if ((section === 'hero' || section === 'cta') && field === 'title' && !value) {
      newErrors[`${section}.title`] = 'Título é obrigatório';
    } else {
      delete newErrors[`${section}.title`];
    }
    setErrors(newErrors);
    setLocalConfig((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
    if (isEditing) {
      setConfig((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    }
  };

  const addMethodologyStep = () => {
    setLocalConfig((prev) => ({
      ...prev,
      methodology: [...prev.methodology, { step: '', description: '', number: String(prev.methodology.length + 1) }],
    }));
  };

  const addTestimonial = () => {
    setLocalConfig((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, { name: '', role: '', testimonial: '', photoUrl: '' }],
    }));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-primary mb-4">Seção Herói</h3>
      <input
        type="text"
        value={localConfig.hero.title}
        onChange={(e) => handleChange('hero', 'title', e.target.value)}
        placeholder="Título Principal"
        className={`border p-2 w-full mb-4 rounded ${errors['hero.title'] ? 'border-red-500' : ''}`}
        disabled={!isEditing}
      />
      {errors['hero.title'] && <p className="text-red-500 text-sm">{errors['hero.title']}</p>}
      <textarea
        value={localConfig.hero.description}
        onChange={(e) => handleChange('hero', 'description', e.target.value)}
        placeholder="Descrição"
        className="border p-2 w-full mb-4 rounded"
        disabled={!isEditing}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (isValidImage(file)) {
            handleChange('hero', 'image', URL.createObjectURL(file));
          } else {
            alert('Por favor, envie uma imagem válida (JPEG/PNG/GIF, máx. 5MB).');
          }
        }}
        className="mb-4"
        disabled={!isEditing}
      />
      <h3 className="text-xl font-semibold text-primary mb-4">Seção Sobre</h3>
      <textarea
        value={localConfig.about.description1}
        onChange={(e) => handleChange('about', 'description1', e.target.value)}
        placeholder="Descrição 1"
        className="border p-2 w-full mb-4 rounded"
        disabled={!isEditing}
      />
      <textarea
        value={localConfig.about.description2}
        onChange={(e) => handleChange('about', 'description2', e.target.value)}
        placeholder="Descrição 2"
        className="border p-2 w-full mb-4 rounded"
        disabled={!isEditing}
      />
      <textarea
        value={localConfig.about.team}
        onChange={(e) => handleChange('about', 'team', e.target.value)}
        placeholder="Sobre a Equipe"
        className="border p-2 w-full mb-4 rounded"
        disabled={!isEditing}
      />
      <h3 className="text-xl font-semibold text-primary mb-4">Estatísticas</h3>
      {localConfig.stats.map((stat, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            value={stat.value}
            onChange={(e) => {
              const newStats = [...localConfig.stats];
              newStats[index].value = e.target.value;
              setLocalConfig({ ...localConfig, stats: newStats });
              if (isEditing) {
                setConfig((prev) => ({ ...prev, stats: newStats }));
              }
            }}
            placeholder="Valor"
            className="border p-2 w-full mb-2 rounded"
            disabled={!isEditing}
          />
          <input
            type="text"
            value={stat.label}
            onChange={(e) => {
              const newStats = [...localConfig.stats];
              newStats[index].label = e.target.value;
              setLocalConfig({ ...localConfig, stats: newStats });
              if (isEditing) {
                setConfig((prev) => ({ ...prev, stats: newStats }));
              }
            }}
            placeholder="Rótulo"
            className="border p-2 w-full mb-2 rounded"
            disabled={!isEditing}
          />
        </div>
      ))}
      <h3 className="text-xl font-semibold text-primary mb-4">Metodologia</h3>
      {localConfig.methodology.map((step, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            value={step.step}
            onChange={(e) => {
              const newSteps = [...localConfig.methodology];
              newSteps[index].step = e.target.value;
              setLocalConfig({ ...localConfig, methodology: newSteps });
              if (isEditing) {
                setConfig((prev) => ({ ...prev, methodology: newSteps }));
              }
            }}
            placeholder="Título da Etapa"
            className="border p-2 w-full mb-2 rounded"
            disabled={!isEditing}
          />
          <textarea
            value={step.description}
            onChange={(e) => {
              const newSteps = [...localConfig.methodology];
              newSteps[index].description = e.target.value;
              setLocalConfig({ ...localConfig, methodology: newSteps });
              if (isEditing) {
                setConfig((prev) => ({ ...prev, methodology: newSteps }));
              }
            }}
            placeholder="Descrição"
            className="border p-2 w-full mb-2 rounded"
            disabled={!isEditing}
          />
          <input
            type="text"
            value={step.number}
            onChange={(e) => {
              const newSteps = [...localConfig.methodology];
              newSteps[index].number = e.target.value;
              setLocalConfig({ ...localConfig, methodology: newSteps });
              if (isEditing) {
                setConfig((prev) => ({ ...prev, methodology: newSteps }));
              }
            }}
            placeholder="Número"
            className="border p-2 w-full mb-2 rounded"
            disabled={!isEditing}
          />
        </div>
      ))}
      <button onClick={addMethodologyStep} className="btn-primary px-4 py-2 rounded-md mb-4" disabled={!isEditing}>
        Adicionar Etapa
      </button>
      <h3 className="text-xl font-semibold text-primary mb-4">Depoimentos</h3>
      {localConfig.testimonials.map((testimonial, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            value={testimonial.name}
            onChange={(e) => {
              const newTestimonials = [...localConfig.testimonials];
              newTestimonials[index].name = e.target.value;
              setLocalConfig({ ...localConfig, testimonials: newTestimonials });
              if (isEditing) {
                setConfig((prev) => ({ ...prev, testimonials: newTestimonials }));
              }
            }}
            placeholder="Nome"
            className="border p-2 w-full mb-2 rounded"
            disabled={!isEditing}
          />
          <input
            type="text"
            value={testimonial.role}
            onChange={(e) => {
              const newTestimonials = [...localConfig.testimonials];
              newTestimonials[index].role = e.target.value;
              setLocalConfig({ ...localConfig, testimonials: newTestimonials });
              if (isEditing) {
                setConfig((prev) => ({ ...prev, testimonials: newTestimonials }));
              }
            }}
            placeholder="Cargo"
            className="border p-2 w-full mb-2 rounded"
            disabled={!isEditing}
          />
          <textarea
            value={testimonial.testimonial}
            onChange={(e) => {
              const newTestimonials = [...localConfig.testimonials];
              newTestimonials[index].testimonial = e.target.value;
              setLocalConfig({ ...localConfig, testimonials: newTestimonials });
              if (isEditing) {
                setConfig((prev) => ({ ...prev, testimonials: newTestimonials }));
              }
            }}
            placeholder="Depoimento"
            className="border p-2 w-full mb-2 rounded"
            disabled={!isEditing}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (isValidImage(file)) {
                const newTestimonials = [...localConfig.testimonials];
                newTestimonials[index].photoUrl = URL.createObjectURL(file);
                setLocalConfig({ ...localConfig, testimonials: newTestimonials });
                if (isEditing) {
                  setConfig((prev) => ({ ...prev, testimonials: newTestimonials }));
                }
              } else {
                alert('Por favor, envie uma imagem válida (JPEG/PNG/GIF, máx. 5MB).');
              }
            }}
            className="mb-2"
            disabled={!isEditing}
          />
        </div>
      ))}
      <button onClick={addTestimonial} className="btn-primary px-4 py-2 rounded-md" disabled={!isEditing}>
        Adicionar Depoimento
      </button>
      <h3 className="text-xl font-semibold text-primary mb-4">Seção CTA</h3>
      <input
        type="text"
        value={localConfig.cta.title}
        onChange={(e) => handleChange('cta', 'title', e.target.value)}
        placeholder="Título"
        className={`border p-2 w-full mb-4 rounded ${errors['cta.title'] ? 'border-red-500' : ''}`}
        disabled={!isEditing}
      />
      {errors['cta.title'] && <p className="text-red-500 text-sm">{errors['cta.title']}</p>}
      <textarea
        value={localConfig.cta.description}
        onChange={(e) => handleChange('cta', 'description', e.target.value)}
        placeholder="Descrição"
        className="border p-2 w-full mb-4 rounded"
        disabled={!isEditing}
      />
      <h3 className="text-xl font-semibold text-primary mb-4">Seção Contato</h3>
      {localConfig.contact.info.map((info, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            value={info.label}
            onChange={(e) => {
              const newInfo = [...localConfig.contact.info];
              newInfo[index].label = e.target.value;
              setLocalConfig({ ...localConfig, contact: { ...localConfig.contact, info: newInfo });
              if (isEditing) {
                setConfig((prev) => ({ ...prev, contact: { ...prev.contact, info: newInfo }));
              }
            }}
            placeholder="Rótulo"
            className="border p-2 w-full mb-2 rounded"
            disabled={!isEditing}
          />
          <input
            type="text"
            value={info.value}
            onChange={(e) => {
              const newInfo = [...localConfig.contact.info];
              newInfo[index].value = e.target.value;
              setLocalConfig({ ...localConfig, contact: { ...localConfig.contact, info: newInfo });
              if (isEditing) {
                setConfig((prev) => ({ ...prev, contact: { ...prev.contact, info: newInfo }));
              }
            }}
            placeholder="Valor"
            className="border p-2 w-full mb-2 rounded"
            disabled={!isEditing}
          />
        </div>
      ))}
      <h3 className="text-xl font-semibold text-primary mb-4">Footer</h3>
      <textarea
        value={localConfig.footer.description}
        onChange={(e) => handleChange('footer', 'description', e.target.value)}
        placeholder="Descrição"
        className="border p-2 w-full mb-4 rounded"
        disabled={!isEditing}
      />
    </div>
  );
};

// Componente Media
const Media = ({ config, setConfig, isEditing }) => {
  const [localConfig, setLocalConfig] = useState(config);
  const [errors, setErrors] = useState({});

  const addGalleryItem = (type) => {
    setLocalConfig((prev) => ({
      ...prev,
      gallery: [...prev.gallery, { url: '', type }],
    }));
  };

  const addClientLogo = () => {
    setLocalConfig((prev) => ({
      ...prev,
      clients: [...prev.clients, { url: '' }],
    }));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-primary mb-4">Galeria de Mídia</h3>
      {localConfig.gallery && localConfig.gallery.map((item, index) => (
        <div key={index} className="mb-4">
          {item.type === 'image' ? (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (isValidImage(file)) {
                  const newGallery = [...localConfig.gallery];
                  newGallery[index].url = URL.createObjectURL(file);
                  setLocalConfig({ ...localConfig, gallery: newGallery });
                  if (isEditing) {
                    setConfig((prev) => ({ ...prev, gallery: newGallery }));
                  }
                } else {
                  setErrors({ ...errors, [`gallery${index}`]: 'Por favor, envie uma imagem válida (JPEG/PNG/GIF, máx. 5MB).' });
                }
              }}
              className="mb-2"
              disabled={!isEditing}
            />
          ) : (
            <input
              type="text"
              value={item.url}
              onChange={(e) => {
                const newUrl = e.target.value;
                const newErrors = { ...errors };
                if (newUrl && !isValidYouTubeUrl(newUrl)) {
                  newErrors[`gallery${index}`] = 'URL do YouTube inválida';
                } else {
                  delete newErrors[`gallery${index}`];
                }
                setErrors(newErrors);
                const newGallery = [...localConfig.gallery];
                newGallery[index].url = newUrl;
                setLocalConfig({ ...localConfig, gallery: newGallery });
                if (isEditing) {
                  setConfig((prev) => ({ ...prev, gallery: newGallery }));
                }
              }}
              placeholder="URL do YouTube"
              className={`border p-2 w-full mb-2 rounded ${errors[`gallery${index}`] ? 'border-red-500' : ''}`}
              disabled={!isEditing}
            />
          )}
          {errors[`gallery${index}`] && <p className="text-red-500 text-sm">{errors[`gallery${index}`]}</p>}
        </div>
      ))}
      <button onClick={() => addGalleryItem('image')} className="btn-primary px-4 py-2 rounded-md mr-2" disabled={!isEditing}>
        Adicionar Imagem
      </button>
      <button onClick={() => addGalleryItem('video')} className="btn-primary px-4 py-2 rounded-md" disabled={!isEditing}>
        Adicionar Vídeo
      </button>
      <h3 className="text-xl font-semibold text-primary mb-4 mt-8">Logos de Clientes</h3>
      {localConfig.clients.map((client, index) => (
        <div key={index} className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (isValidImage(file)) {
                const newClients = [...localConfig.clients];
                newClients[index].url = URL.createObjectURL(file);
                setLocalConfig({ ...localConfig, clients: newClients });
                if (isEditing) {
                  setConfig((prev) => ({ ...prev, clients: newClients }));
                }
              } else {
                setErrors({ ...errors, [`client${index}`]: 'Por favor, envie uma imagem válida (JPEG/PNG/GIF, máx. 5MB).' });
              }
            }}
            className="mb-2"
            disabled={!isEditing}
          />
          {errors[`client${index}`] && <p className="text-red-500 text-sm">{errors[`client${index}`]}</p>}
        </div>
      ))}
      <button onClick={addClientLogo} className="btn-primary px-4 py-2 rounded-md" disabled={!isEditing}>
        Adicionar Logo
      </button>
    </div>
  );
};

// Componente Design
const Design = ({ config, setConfig, isEditing }) => {
  const [localConfig, setLocalConfig] = useState(config);
  const [customCode, setCustomCode] = useState('');

  const handleChange = (field, value) => {
    setLocalConfig((prev) => ({
      ...prev,
      design: { ...prev.design, [field]: value },
    }));
    if (isEditing) {
      setConfig((prev) => ({
        ...prev,
        design: { ...prev.design, [field]: value },
      }));
      document.documentElement.style.setProperty(`--${field.toLowerCase()}`, value);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-primary mb-4">Edição Rápida</h3>
      <input
        type="text"
        value={localConfig.company.name}
        onChange={(e) => handleChange('company', 'name', e.target.value)}
        placeholder="Título do Site"
        className="border p-2 w-full mb-4 rounded"
        disabled={!isEditing}
      />
      <input
        type="color"
        value={localConfig.design.primaryColor}
        onChange={(e) => handleChange('primaryColor', e.target.value)}
        className="border p-2 w-full mb-4 rounded"
        disabled={!isEditing}
      />
      <input
        type="color"
        value={localConfig.design.secondaryColor}
        onChange={(e) => handleChange('secondaryColor', e.target.value)}
        className="border p-2 w-full mb-4 rounded"
        disabled={!isEditing}
      />
      <input
        type="color"
        value={localConfig.design.highlightColor}
        onChange={(e) => handleChange('highlightColor', e.target.value)}
        className="border p-2 w-full mb-4 rounded"
        disabled={!isEditing}
      />
      <h3 className="text-xl font-semibold text-primary mb-4">Editor de Código Misto</h3>
      <textarea
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
        placeholder="Código personalizado (até 3000 caracteres)"
        maxLength={3000}
        className="border p-2 w-full mb-4 rounded"
        disabled={!isEditing}
      />
      <p>{customCode.length}/3000 caracteres</p>
      <button
        onClick={() => alert('Código personalizado aplicado (simulação)')}
        className="btn-primary px-4 py-2 rounded-md"
        disabled={!isEditing}
      >
        Aplicar Código
      </button>
    </div>
  );
};

// Componente History
const History = () => (
  <div>
    <h3 className="text-xl font-semibold text-primary mb-4">Histórico de Alterações</h3>
    {changeHistory.length === 0 ? (
      <p>Nenhuma alteração ainda.</p>
    ) : (
      <ul className="list-disc pl-5">
        {changeHistory.map((entry, index) => (
          <li key={index} className="mb-2">
            {entry.timestamp}: {entry.description}
          </li>
        ))}
      </ul>
    )}
  </div>
);

// Componente Admin
const Admin = ({ config, setConfig }) => {
  const [activeTab, setActiveTab] = useState('Geral');
  const [isEditing, setIsEditing] = useState(false);
  const [originalConfig, setOriginalConfig] = useState(config);
  const navigate = useNavigate();

  useEffect(() => {
    setOriginalConfig(config);
  }, [config]);

  const handleSave = async () => {
    await saveConfig(config);
    setOriginalConfig(config);
    setIsEditing(false);
    alert('Alterações salvas com sucesso!');
  };

  const handleRevert = () => {
    setConfig(originalConfig);
    setIsEditing(false);
    alert('Alterações revertidas.');
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'site-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-4">Painel de Edição</h2>
        <div className="flex gap-4 mb-8">
          {['Geral', 'Conteúdo', 'Mídia', 'Design', 'Histórico'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md ${activeTab === tab ? 'btn-primary' : 'bg-gray-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-primary mb-4">Opções de Edição</h3>
          <div className="flex gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className={`px-4 py-2 rounded-md ${isEditing ? 'bg-gray-400' : 'btn-primary'}`}
              disabled={isEditing}
            >
              Ativar Edição
            </button>
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded-md ${isEditing ? 'btn-primary' : 'bg-gray-400'}`}
              disabled={!isEditing}
            >
              Salvar Alterações
            </button>
            <button
              onClick={handleRevert}
              className={`px-4 py-2 rounded-md ${isEditing ? 'bg-red-600 text-white' : 'bg-gray-400'}`}
              disabled={!isEditing}
            >
              Reverter
            </button>
            <button
              onClick={handleExport}
              className="btn-primary px-4 py-2 rounded-md"
            >
              Exportar Site
            </button>
          </div>
        </div>
        {activeTab === 'Geral' && <GeneralInfo config={config} setConfig={setConfig} isEditing={isEditing} />}
        {activeTab === 'Conteúdo' && <Content config={config} setConfig={setConfig} isEditing={isEditing} />}
        {activeTab === 'Mídia' && <Media config={config} setConfig={setConfig} isEditing={isEditing} />}
        {activeTab === 'Design' && <Design config={config} setConfig={setConfig} isEditing={isEditing} />}
        {activeTab === 'Histórico' && <History />}
        <button
          onClick={async () => {
            await saveConfig(config);
            setOriginalConfig(config);
            setIsEditing(false);
            navigate('/');
            alert('Alterações salvas com sucesso!');
          }}
          className="btn-primary px-6 py-3 rounded-md mt-8"
        >
          Salvar e Sair
        </button>
      </div>
    </section>
  );
};

// Componente Home
const Home = ({ config }) => (
  <div className="font-sans bg-white">
    <Header header={config.header} company={config.company} />
    <Hero hero={config.hero} />
    <Stats stats={config.stats} />
    <Services services={config.services} />
    <Methodology methodology={config.methodology} />
    <About about={config.about} />
    <Testimonials testimonials={config.testimonials} />
    <Clients clients={config.clients} />
    <CTA cta={config.cta} />
    <Contact contact={config.contact} />
    <Footer footer={config.footer} />
  </div>
);

// Componente App
const App = () => {
  const [config, setConfig] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getConfig().then((data) => {
      setConfig(data);
      document.documentElement.style.setProperty('--primary-color', data.design.primaryColor);
      document.documentElement.style.setProperty('--highlight-color', data.design.highlightColor);
      document.documentElement.style.setProperty('--secondary-color', data.design.secondaryColor);
    });
  }, []);

  if (!config) return <div>Carregando...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home config={config} />} />
        <Route path="/admin" element={isAuthenticated ? <Admin config={config} setConfig={setConfig} /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
};

// Renderizar o aplicativo
const root = createRoot(document.getElementById('root'));
root.render(<App />);

/*
  Configurações para Deploy no Netlify e GitHub
  Estrutura de Pastas:
  site-conceito/
  ├── public/
  │   ├── index.html
  │   ├── favicon.ico
  │   └── assets/
  │       ├── css/
  │       ├── images/
  │       └── js/
  ├── src/
  │   ├── components/
  │   │   ├── Login.jsx
  │   │   ├── Header.jsx
  │   │   ├── Hero.jsx
  │   │   ├── Stats.jsx
  │   │   ├── Services.jsx
  │   │   ├── Methodology.jsx
  │   │   ├── About.jsx
  │   │   ├── Testimonials.jsx
  │   │   ├── Clients.jsx
  │   │   ├── CTA.jsx
  │   │   ├── Contact.jsx
  │   │   ├── Footer.jsx
  │   │   └── AdminPanel/
  │   │       ├── GeneralInfo.jsx
  │   │       ├── Content.jsx
  │   │       ├── Media.jsx
  │   │       ├── Design.jsx
  │   │       ├── History.jsx
  │   ├── pages/
  │   │   ├── Home.jsx
  │   │   ├── Admin.jsx
  │   ├── App.jsx
  │   ├── index.jsx
  │   └── styles/
  │       └── input.css
  ├── netlify/
  │   └── functions/
  │       ├── getConfig.js
  │       ├── saveConfig.js
  ├── netlify.toml
  ├── package.json
  ├── vite.config.js
  ├── tailwind.config.js
  ├── postcss.config.js
  ├── .gitignore
  └── README.md

  netlify.toml:
  ```
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  [[redirects]]
    from = "/api/*"
    to = "/.netlify/functions/:splat"
    status = 200
  [build]
    command = "npm run build:css && npm run build"
    publish = "dist"
  ```

  package.json:
  ```json
  {
    "name": "site-conceito",
    "version": "1.0.0",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview",
      "build:css": "tailwindcss -i ./src/styles/input.css -o ./dist/output.css --minify"
    },
    "dependencies": {
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-router-dom": "^6.4.3",
      "framer-motion": "^7.6.1"
    },
    "devDependencies": {
      "vite": "^4.0.0",
      "@vitejs/plugin-react": "^4.0.0",
      "tailwindcss": "^3.2.0",
      "postcss": "^8.4.0",
      "autoprefixer": "^10.4.0"
    }
  }
  ```

  vite.config.js:
  ```javascript
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  export default defineConfig({
    plugins: [react()],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
  });
  ```

  tailwind.config.js:
  ```javascript
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: ['./src/**/*.{js,jsx}', './public/index.html'],
    theme: {
      extend: {
        colors: {
          primary: 'var(--primary-color)',
          highlight: 'var(--highlight-color)',
          secondary: 'var(--secondary-color)',
        },
      },
    },
    plugins: [],
  };
  ```

  postcss.config.js:
  ```javascript
  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };
  ```

  src/styles/input.css:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

  .gitignore:
  ```
  node_modules
  dist
  .env
  ```

  README.md:
  ```markdown
  # Site Conceito
  Site de consultoria empresarial com painel administrativo eficiente.

  ## Pré-requisitos
  - Node.js (v16 ou superior)
  - npm ou yarn

  ## Como Executar
  1. Clone o repositório: `git clone <url>`
  2. Instale as dependências: `npm install`
  3. Compile o CSS do Tailwind: `npm run build:css`
  4. Inicie o servidor de desenvolvimento: `npm run dev`
  5. Para deploy, use: `npm run build` e envie a pasta `dist` para o Netlify.

  ## Estrutura
  - `public/`: Arquivos estáticos, incluindo `index.html`.
  - `src/`: Código-fonte React e estilos Tailwind.
  - `netlify/`: Funções serverless para `getConfig` e `saveConfig`.

  ## Deploy no Netlify
  1. Configure o site no Netlify com a pasta de build `dist` e as funções em `netlify/functions`.
  2. Defina o comando de build como `npm run build:css && npm run build` e o diretório de publicação como `dist`.
  3. Execute `npm run build:css` antes do build para gerar o `dist/output.css`.

  ## Notas
  - O Tailwind CSS é configurado como plugin PostCSS para uso em produção.
  - Certifique-se de executar `npm run build:css` para gerar o arquivo CSS minificado.
  - O JavaScript é servido via Vite para evitar erros de parsing de módulos.
  ```
*/