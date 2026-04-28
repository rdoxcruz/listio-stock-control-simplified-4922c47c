const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const refPath = 'C:/Users/rodol/Listio-old/referencia/index.html';
const htmlContent = fs.readFileSync(refPath, 'utf8');

const dom = new JSDOM(htmlContent);
const doc = dom.window.document;

// Find the main container in Framer structure
const mainDiv = doc.querySelector('#main');
if (!mainDiv) {
    console.error('Could not find #main div');
    process.exit(1);
}

// In the reference, inside #main, there's usually a main layout wrapper '.framer-KL3q8'
const layoutWrapper = mainDiv.querySelector('.framer-KL3q8');

if (layoutWrapper) {
    // Keep nav and backgrounds, remove siblings that are sections
    // Backgrounds: framer-1jzkc48 (glow), framer-bda1u6-container (grid)
    // Nav: framer-1bn53kh-container
    const children = Array.from(layoutWrapper.children);
    children.forEach(child => {
        if (!child.classList.contains('framer-bda1u6-container') &&
            !child.classList.contains('framer-1bn53kh-container') &&
            !child.classList.contains('framer-1jzkc48') &&
            !child.querySelector('.framer-1jzkc48')) {
            child.remove();
        }
    });

    // Generate Design System HTML
    const dsHtml = `
    <!-- DESIGN SYSTEM MAIN CONTAINER -->
    <div style="width: 100%; max-width: 1200px; margin: 120px auto 100px; position: relative; z-index: 10; display: flex; flex-direction: column; gap: 80px; padding: 0 40px; font-family: 'Inter', sans-serif;">
        
        <!-- 1. HERO FOLD -->
        <section id="ds-hero" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 30px; min-height: 70vh;">
            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 100px; padding: 8px 20px; display: inline-flex; align-items: center; gap: 10px; backdrop-filter: blur(10px);">
                <span style="display: block; width: 8px; height: 8px; border-radius: 50%; background: #CCFC7E; box-shadow: 0 0 10px #CCFC7E;"></span>
                <span style="color: #fff; font-size: 14px; font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase;">Listio Design System</span>
            </div>
            <h1 style="color: #fff; font-size: clamp(48px, 6vw, 85px); font-weight: 600; line-height: 1.1; margin: 0; letter-spacing: -2px;">
                O novo padrão.<br/>
                <span style="color: #CCFC7E;">Beleza em cada pixel.</span>
            </h1>
            <p style="color: rgba(255,255,255,0.7); font-size: 20px; max-width: 600px; line-height: 1.5; margin: 0;">
                Documentação oficial de tokens, tipografia, cores e componentes da plataforma Listio, inspirada na fluidez do Saasleek.
            </p>
            <div style="margin-top: 20px; display: flex; gap: 20px;">
                <a href="#typography" style="background: #CCFC7E; color: #000; padding: 16px 32px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 0 20px rgba(204, 252, 126, 0.4);" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 0 30px rgba(204, 252, 126, 0.6)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 0 20px rgba(204, 252, 126, 0.4)'">Explorar Componentes</a>
                <a href="#" style="background: rgba(255,255,255,0.1); color: #fff; padding: 16px 32px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px); transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">Ver Referência</a>
            </div>
        </section>

        <!-- 2. TYPOGRAPHY -->
        <section id="typography" style="display: flex; flex-direction: column; gap: 40px;">
            <div>
                <h2 style="color: #fff; font-size: 36px; font-weight: 600; margin: 0 0 10px 0; letter-spacing: -1px;">Tipografia</h2>
                <p style="color: rgba(255,255,255,0.6); font-size: 16px; margin: 0;">Famílias, escala e funções semânticas.</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                <div style="background: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 30px;">
                    <h3 style="color: #fff; font-family: 'Inter', sans-serif; font-size: 48px; font-weight: 600; margin: 0 0 10px 0;">Inter</h3>
                    <p style="color: #CCFC7E; font-size: 14px; margin: 0 0 20px 0; text-transform: uppercase; font-weight: 600;">Main Font Family (Sans-serif)</p>
                    <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0; line-height: 1.5;">Usada para títulos, parágrafos, botões e interfaces. Carregada via Google/Framer fonts. Fallback: sans-serif.</p>
                </div>
                <div style="background: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 30px;">
                    <h3 style="color: #fff; font-family: 'Fragment Mono', monospace; font-size: 48px; font-weight: 400; margin: 0 0 10px 0;">Fragment</h3>
                    <p style="color: #CCFC7E; font-size: 14px; margin: 0 0 20px 0; text-transform: uppercase; font-weight: 600;">Monospace Font Family</p>
                    <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0; line-height: 1.5;">Usada para códigos, labels técnicos de sistema, badges e dados tabulares.</p>
                </div>
            </div>

            <div style="background: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 30px; display: flex; flex-direction: column; gap: 30px;">
                <div style="display: grid; grid-template-columns: 1fr 3fr; gap: 20px; align-items: baseline; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 20px;">
                    <div style="color: rgba(255,255,255,0.5); font-family: 'Fragment Mono'; font-size: 12px;">H1 Display<br/>85px / W500 / LS -6.5px</div>
                    <div style="color: #fff; font-size: 85px; font-weight: 600; letter-spacing: -6.5px; line-height: 1;">Impacto Máximo</div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 3fr; gap: 20px; align-items: baseline; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 20px;">
                    <div style="color: rgba(255,255,255,0.5); font-family: 'Fragment Mono'; font-size: 12px;">H2 Section<br/>48px / W600 / LS -2px</div>
                    <div style="color: #fff; font-size: 48px; font-weight: 600; letter-spacing: -2px; line-height: 1.1;">Título de Seção</div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 3fr; gap: 20px; align-items: baseline; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 20px;">
                    <div style="color: rgba(255,255,255,0.5); font-family: 'Fragment Mono'; font-size: 12px;">H3 CardTitle<br/>24px / W600 / LS -1px</div>
                    <div style="color: #fff; font-size: 24px; font-weight: 600; letter-spacing: -1px; line-height: 1.2;">Título de Componente</div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 3fr; gap: 20px; align-items: baseline; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 20px;">
                    <div style="color: rgba(255,255,255,0.5); font-family: 'Fragment Mono'; font-size: 12px;">body-lg<br/>20px / W400 / LS 0</div>
                    <div style="color: rgba(255,255,255,0.7); font-size: 20px; font-weight: 400; line-height: 1.5;">O texto de subtítulo e descrições grandes para seções principais.</div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 3fr; gap: 20px; align-items: baseline; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 20px;">
                    <div style="color: rgba(255,255,255,0.5); font-family: 'Fragment Mono'; font-size: 12px;">body<br/>16px / W400 / LS 0</div>
                    <div style="color: rgba(255,255,255,0.6); font-size: 16px; font-weight: 400; line-height: 1.6;">O corpo de texto padrão utilizado na maior parte dos parágrafos, cards de funcionalidades e elementos textuais da interface.</div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 3fr; gap: 20px; align-items: baseline;">
                    <div style="color: rgba(255,255,255,0.5); font-family: 'Fragment Mono'; font-size: 12px;">body-sm<br/>14px / W500 / CAPS</div>
                    <div style="color: #CCFC7E; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Legendas, Tags e Dicas</div>
                </div>
            </div>
        </section>

        <!-- 3. COLORS -->
        <section id="colors" style="display: flex; flex-direction: column; gap: 40px;">
            <div>
                <h2 style="color: #fff; font-size: 36px; font-weight: 600; margin: 0 0 10px 0; letter-spacing: -1px;">Sistema de Cores</h2>
                <p style="color: rgba(255,255,255,0.6); font-size: 16px; margin: 0;">Paleta cromática e designações semânticas.</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                <!-- Primary -->
                <div style="background: #000; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden;">
                    <div style="height: 120px; background: #CCFC7E; padding: 20px; display: flex; align-items: flex-end;"></div>
                    <div style="padding: 20px;">
                        <h4 style="color: #fff; margin: 0 0 5px 0; font-size: 18px;">Lime Primary</h4>
                        <p style="color: rgba(255,255,255,0.5); margin: 0 0 10px 0; font-family: monospace; font-size: 12px;">#CCFC7E | RGB 204, 252, 126</p>
                        <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 0;">Botões CTAs primários, destaques, highlights em textos e gradientes. AAA contrast with dark bg.</p>
                    </div>
                </div>
                <!-- Surface -->
                <div style="background: #000; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden;">
                    <div style="height: 120px; background: #0a0a0a; border-bottom: 1px solid rgba(255,255,255,0.05); padding: 20px; display: flex; align-items: flex-end;"></div>
                    <div style="padding: 20px;">
                        <h4 style="color: #fff; margin: 0 0 5px 0; font-size: 18px;">Dark Surface</h4>
                        <p style="color: rgba(255,255,255,0.5); margin: 0 0 10px 0; font-family: monospace; font-size: 12px;">#0A0A0A | RGB 10, 10, 10</p>
                        <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 0;">Fundo principal de toda a aplicação e das áreas de conteúdo.</p>
                    </div>
                </div>
                <!-- Card Surface -->
                <div style="background: #000; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden;">
                    <div style="height: 120px; background: rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); padding: 20px; display: flex; align-items: flex-end;"></div>
                    <div style="padding: 20px;">
                        <h4 style="color: #fff; margin: 0 0 5px 0; font-size: 18px;">Glass Card</h4>
                        <p style="color: rgba(255,255,255,0.5); margin: 0 0 10px 0; font-family: monospace; font-size: 12px;">rgba(255, 255, 255, 0.05)</p>
                        <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 0;">Usado em cards flutuantes, tooltips, modais com backdrop filter blur.</p>
                    </div>
                </div>
                <!-- Borders -->
                <div style="background: #000; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden;">
                    <div style="height: 120px; background: rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.05); padding: 20px; display: flex; align-items: flex-end;"></div>
                    <div style="padding: 20px;">
                        <h4 style="color: #fff; margin: 0 0 5px 0; font-size: 18px;">Borders / Lines</h4>
                        <p style="color: rgba(255,255,255,0.5); margin: 0 0 10px 0; font-family: monospace; font-size: 12px;">rgba(255, 255, 255, 0.1)</p>
                        <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 0;">Strokes sutis, separadores e delineaçao de cards e navbars.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 4. UI COMPONENTS -->
        <section id="components" style="display: flex; flex-direction: column; gap: 40px;">
            <div>
                <h2 style="color: #fff; font-size: 36px; font-weight: 600; margin: 0 0 10px 0; letter-spacing: -1px;">Componentes UI</h2>
                <p style="color: rgba(255,255,255,0.6); font-size: 16px; margin: 0;">Elementos reutilizáveis com animações nativas.</p>
            </div>
            
            <!-- Cards Row -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <!-- Glass Card Example -->
                <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 30px; padding: 40px; display: flex; flex-direction: column; gap: 20px; backdrop-filter: blur(12px); box-shadow: 0 20px 40px rgba(0,0,0,0.5); transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="width: 50px; height: 50px; border-radius: 15px; background: rgba(204, 252, 126, 0.1); border: 1px solid rgba(204, 252, 126, 0.2); display: flex; align-items: center; justify-content: center; color: #CCFC7E;">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                    </div>
                    <h3 style="color: #fff; font-size: 24px; font-weight: 600; margin: 0;">Glassmorph Card</h3>
                    <p style="color: rgba(255,255,255,0.6); font-size: 16px; margin: 0; line-height: 1.5;">Card padrão de features, utilizando bordas em 10% de opacidade e fundo com blur.</p>
                </div>
                
                <!-- Active/Solid Card -->
                <div style="background: #111; border: 1px solid rgba(204,252,126,0.3); border-radius: 30px; padding: 40px; display: flex; flex-direction: column; gap: 20px; position: relative; overflow: hidden; transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: #CCFC7E; filter: blur(60px); opacity: 0.3;"></div>
                    <span style="position: absolute; top: 20px; right: 20px; background: rgba(204,252,126,0.1); color: #CCFC7E; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">Recomendado</span>
                    <h3 style="color: #fff; font-size: 24px; font-weight: 600; margin: 0;">Solid Active Card</h3>
                    <p style="color: rgba(255,255,255,0.6); font-size: 16px; margin: 0; line-height: 1.5;">Variante ativa para destaques, plans de preços ou cards selecionados, com subtle glow lime no fundo.</p>
                </div>
            </div>

            <!-- Buttons & Inputs Row -->
            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 30px; padding: 40px; display: flex; flex-direction: column; gap: 40px;">
                <h3 style="color: #fff; font-size: 24px; font-weight: 600; margin: 0;">Interações Rápidas</h3>
                
                <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: center;">
                    <a href="#" style="background: #CCFC7E; color: #000; padding: 14px 28px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px; transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 5px 15px rgba(204, 252, 126, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">Button Primary</a>
                    
                    <a href="#" style="background: transparent; color: #fff; padding: 14px 28px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px; border: 1px solid rgba(255,255,255,0.2); transition: all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">Button Secondary</a>
                    
                    <a href="#" style="background: rgba(255,255,255,0.05); color: #CCFC7E; padding: 14px 28px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px; border: 1px solid rgba(204,252,126,0.3); transition: all 0.2s;" onmouseover="this.style.background='rgba(204,252,126,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">Botão Suave (Accent)</a>
                </div>

                <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: center;">
                    <div style="position: relative; width: 300px;">
                        <input type="text" placeholder="Entre com seu email" style="width: 100%; padding: 16px 20px; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; font-size: 16px; font-family: Inter, sans-serif; outline: none; transition: border 0.3s;" onfocus="this.style.borderColor='#CCFC7E'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'">
                    </div>
                </div>
            </div>

            <!-- Badges & Tooltips -->
            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 30px; padding: 40px; display: flex; flex-direction: column; gap: 40px;">
                <h3 style="color: #fff; font-size: 24px; font-weight: 600; margin: 0;">Badges e Status</h3>
                
                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                    <span style="background: rgba(204,252,126,0.1); border: 1px solid rgba(204,252,126,0.2); color: #CCFC7E; padding: 6px 14px; border-radius: 20px; font-size: 14px; font-weight: 500;">Success / Active</span>
                    <span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); padding: 6px 14px; border-radius: 20px; font-size: 14px; font-weight: 500;">Neutral Label</span>
                    <span style="background: rgba(255, 60, 60, 0.1); border: 1px solid rgba(255, 60, 60, 0.2); color: #ff6b6b; padding: 6px 14px; border-radius: 20px; font-size: 14px; font-weight: 500;">Warning / Error</span>
                </div>
            </div>
        </section>

        <!-- 5. ICONS & ANIMATIONS OVERVIEW -->
        <section id="icons-animations" style="display: flex; flex-direction: column; gap: 40px;">
            <div>
                <h2 style="color: #fff; font-size: 36px; font-weight: 600; margin: 0 0 10px 0; letter-spacing: -1px;">Ícones & Animações</h2>
                <p style="color: rgba(255,255,255,0.6); font-size: 16px; margin: 0;">Biblioteca base e guias de movimento mecânico.</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <div style="background: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 30px;">
                    <h3 style="color: #fff; font-size: 20px; font-weight: 600; margin: 0 0 20px 0;">Lucide Icons (Rounded)</h3>
                    <div style="display: flex; gap: 20px; color: rgba(255,255,255,0.8);">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    </div>
                </div>
                
                <div style="background: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 30px;">
                    <h3 style="color: #fff; font-size: 20px; font-weight: 600; margin: 0 0 10px 0;">Mecânicas de Movimento</h3>
                    <ul style="color: rgba(255,255,255,0.6); list-style: none; padding: 0; margin: 0; font-size: 14px; line-height: 1.8; font-family: 'Fragment Mono';">
                        <li>Hover Button: <span style="color: #CCFC7E;">Translação Y -2px / Box-shadow Soft</span></li>
                        <li>Hover Card: <span style="color: #CCFC7E;">Translação Y -5px / Box-shadow Deep</span></li>
                        <li>Surgimento: <span style="color: #CCFC7E;">Fade-in + Y 20px / Duração 0.6s / Cubic-bezier(0.2, 0.8, 0.2, 1)</span></li>
                        <li>Background: <span style="color: #CCFC7E;">Movimento radial e de grid passivo infinito</span></li>
                    </ul>
                </div>
            </div>
        </section>
        
    </div>
    `;

    // Create a wrapper div to inject the DS HTML
    const dsWrapper = doc.createElement('div');
    dsWrapper.innerHTML = dsHtml;

    // Append it
    layoutWrapper.appendChild(dsWrapper);

    // Save to @assets/design_system.html
    const outDir = path.join('C:/Users/rodol/Listio-old', '@assets');
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
    }
    
    fs.writeFileSync(path.join(outDir, 'design_system.html'), dom.serialize());
    console.log('Successfully created design_system.html in @assets');

} else {
    console.error('Could not find .framer-KL3q8 layout wrapper');
    process.exit(1);
}
