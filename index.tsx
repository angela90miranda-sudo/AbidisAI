
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
    const [activeSection, setActiveSection] = useState('home');

    const styles = `
        :root {
            --bg-color: #0a0a1a;
            --primary-color: #007BFF;
            --secondary-color: #1a1a3a;
            --text-color: #e0e0e0;
            --header-height: 70px;
        }

        *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            line-height: 1.6;
            overflow-x: hidden;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Header */
        header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            padding: 0 20px;
            height: var(--header-height);
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(10, 10, 26, 0.8);
            backdrop-filter: blur(10px);
            z-index: 1000;
            transition: top 0.3s;
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            max-width: 1200px;
        }

        .logo {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--primary-color);
            text-decoration: none;
        }

        nav ul {
            display: flex;
            list-style: none;
        }

        nav a {
            color: var(--text-color);
            text-decoration: none;
            margin-left: 30px;
            font-weight: 600;
            position: relative;
            transition: color 0.3s ease;
        }
        
        nav a::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--primary-color);
            transition: width 0.3s ease;
        }
        
        nav a:hover, nav a.active {
            color: var(--primary-color);
        }
        
        nav a:hover::after, nav a.active::after {
            width: 100%;
        }

        /* Hero Section */
        #home {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding-top: var(--header-height);
            background: radial-gradient(circle, rgba(26, 26, 58, 0.7) 0%, rgba(10, 10, 26, 0.95) 80%), url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop');
            background-size: cover;
            background-position: center;
            position: relative;
            overflow: hidden;
        }
        
        .hero-content {
            animation: fadeIn 1s ease-in-out;
        }

        #home h1 {
            font-size: 3.5rem;
            margin-bottom: 20px;
            font-weight: 700;
            line-height: 1.2;
        }

        #home h1 span {
            color: var(--primary-color);
        }

        #home p {
            font-size: 1.2rem;
            max-width: 700px;
            margin: 0 auto 30px;
            font-weight: 300;
        }

        .cta-button {
            display: inline-block;
            background-color: var(--primary-color);
            color: white;
            padding: 15px 35px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0, 123, 255, 0.3);
        }

        /* Section styles */
        .section {
            padding: 100px 0;
        }

        .section-title {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 60px;
            font-weight: 700;
            position: relative;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            width: 80px;
            height: 4px;
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--primary-color);
            border-radius: 2px;
        }

        /* Services */
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }

        .service-card {
            background: var(--secondary-color);
            padding: 40px;
            border-radius: 10px;
            text-align: center;
            transition: transform 0.3s, box-shadow 0.3s;
            border: 1px solid transparent;
        }

        .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
            border-color: var(--primary-color);
        }

        .service-icon {
            font-size: 3rem;
            color: var(--primary-color);
            margin-bottom: 20px;
        }
        
        .service-card h3 {
            font-size: 1.5rem;
            margin-bottom: 15px;
        }

        .service-card p {
            font-weight: 300;
        }
        
        /* Footer */
        footer {
            background-color: var(--secondary-color);
            text-align: center;
            padding: 40px 20px;
            margin-top: 100px;
        }
        
        footer p {
            font-weight: 300;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Mobile menu */
        .menu-toggle {
            display: none;
            flex-direction: column;
            cursor: pointer;
        }

        .bar {
            width: 25px;
            height: 3px;
            background-color: var(--text-color);
            margin: 4px 0;
            transition: 0.4s;
        }

        @media (max-width: 768px) {
            #home h1 {
                font-size: 2.5rem;
            }
            nav ul {
                position: absolute;
                top: var(--header-height);
                left: 0;
                width: 100%;
                background: var(--bg-color);
                flex-direction: column;
                align-items: center;
                transform: translateY(-150%);
                transition: transform 0.3s ease-in-out;
            }
            nav ul.active {
                transform: translateY(0);
            }
            nav li {
                padding: 15px 0;
            }
            nav a {
                margin-left: 0;
            }
            .menu-toggle {
                display: flex;
            }
            .menu-toggle.open .bar:nth-child(1) {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            .menu-toggle.open .bar:nth-child(2) {
                opacity: 0;
            }
            .menu-toggle.open .bar:nth-child(3) {
                transform: rotate(45deg) translate(-5px, -6px);
            }
        }
    `;

    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        const sections = document.querySelectorAll('.section, #home');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { rootMargin: '-30% 0px -70% 0px' });

        sections.forEach(section => observer.observe(section));

        return () => {
            document.head.removeChild(styleSheet);
            sections.forEach(section => observer.unobserve(section));
        };
    }, [styles]);

    const services = [
        {
            icon: '⚙️',
            title: 'Softwares de Gestão',
            description: 'Programas personalizados para gerir entregas, stock, tarefas e otimizar o dia-a-dia da sua empresa.'
        },
        {
            icon: '📱',
            title: 'Apps de Atendimento',
            description: 'Criação de aplicações móveis intuitivas para melhorar a comunicação e o suporte ao cliente inbound e outbound'
        },
        {
            icon: '🤖',
            title: 'Assistentes Virtuais',
            description: 'Desenvolvimento de chatbots e assistentes virtuais para Whatsapp, Shopify, websites e outras plataformas.'
        },
        {
            icon: '🧠',
            title: 'Implementação de IA',
            description: 'Integramos inteligência artificial em sistemas existentes para automatizar processos rotineiros.'
        }
    ];
    
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { href: '#home', label: 'Início' },
        { href: '#services', label: 'Serviços' },
        { href: '#about', label: 'Sobre Nós' },
        { href: '#contact', label: 'Contato' },
    ];


    return (
        <>
            <header>
                <div className="header-content">
                    <a href="#home" className="logo">AbidisAI</a>
                    <nav>
                         <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                        <ul className={menuOpen ? 'active' : ''}>
                           {navLinks.map(link => (
                               <li key={link.href}>
                                   <a 
                                       href={link.href} 
                                       className={activeSection === link.href.substring(1) ? 'active' : ''}
                                       onClick={() => setMenuOpen(false)}
                                    >
                                       {link.label}
                                   </a>
                               </li>
                           ))}
                        </ul>
                    </nav>
                </div>
            </header>

            <main>
                <section id="home">
                    <div className="container hero-content">
                        <h1>Inovação e Tecnologia para o <span>Futuro do Seu Negócio</span></h1>
                        <p>Transformamos ideias em soluções digitais inteligentes que impulsionam o crescimento e a eficiência da sua empresa.</p>
                        <a href="#services" className="cta-button">Conheça os nossos Serviços</a>
                    </div>
                </section>

                <section id="services" className="section">
                    <div className="container">
                        <h2 className="section-title">... os nossos Serviços</h2>
                        <div className="services-grid">
                            {services.map((service, index) => (
                                <div className="service-card" key={index}>
                                    <div className="service-icon">{service.icon}</div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="about" className="section" style={{ backgroundColor: 'var(--secondary-color)' }}>
                    <div className="container" style={{textAlign: 'center', maxWidth: '900px'}}>
                        <h2 className="section-title">Sobre Nós</h2>
                        <p>Na AbidisAI, somos apaixonados por tecnologia e inovação. Nossa missão é fornecer soluções de software sob medida que resolvam problemas reais e complexos, permitindo que nossos clientes se concentrem no que fazem de melhor: gerir seus negócios. Combinamos criatividade, expertise técnica e um profundo entendimento das necessidades do mercado para entregar produtos de excelência.</p>
                    </div>
                </section>

                <section id="contact" className="section">
                    <div className="container" style={{textAlign: 'center'}}>
                        <h2 className="section-title">Entre em Contato</h2>
                        <p>Pronto para levar sua empresa para o próximo nível? Vamos conversar!</p>
                        <br/>
                        <a href="tel:938948779" className="cta-button">938948779</a>
                        <div style={{marginTop: '60px'}}>
                             <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.959918732747!2d-9.26053368465403!3d38.74088997959531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1ec8f1e5821c97%3A0x6e09029e0a811a19!2sR.%20Francisco%20Franco%2042%2C%202745-109%20Queluz!5e0!3m2!1sen!2spt" 
                                width="100%" 
                                height="450" 
                                style={{ border: 0, borderRadius: '10px', maxWidth: '800px', margin: '0 auto' }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Localização da AbidisAI no Google Maps"
                             ></iframe>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} AbidisAI. Todos os direitos reservados.</p>
                </div>
            </footer>
        </>
    );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
