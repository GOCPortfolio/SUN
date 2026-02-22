        // Default configuration
        const defaultConfig = {
            hero_title: 'Uche Samuel Nwankwo',
            hero_subtitle: 'Cyber Security & Cloud Strategist for Critical Infrastructure',
            hero_tagline: 'Securing Energy Infrastructure. Enabling Enterprise Transformation. Protecting Digital Assets at Scale.',
            executive_bio: 'Uche Samuel Nwankwo is a Cyber Security and Cloud Expert with over 20 years of experience leading enterprise IT and telecommunications strategy within the Oil and Gas industry. He specializes in securing critical infrastructure, driving cloud transformation, and strengthening digital resilience for high-risk environments.',
            philosophy_quote: 'Cybersecurity is not a technical function. It is a business imperative that protects enterprise value, operational continuity, and strategic growth.',
            cta_text: 'Partner with a seasoned cybersecurity strategist to strengthen your organization\'s digital resilience and accelerate secure transformation.',
            background_color: '#0B1C2D',
            surface_color: '#122A42',
            text_color: '#F5F5F5',
            primary_action_color: '#C6A75E',
            secondary_action_color: '#D4B872'
        };
        
        // Page navigation
        function showPage(pageId) {
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            document.getElementById('page-' + pageId).classList.add('active');
            window.scrollTo(0, 0);
            initScrollReveal();
        }
        
        // Mobile menu toggle
        function toggleMobileMenu() {
            document.getElementById('mobileMenu').classList.toggle('open');
        }
        
        // Scroll reveal animation
        function initScrollReveal() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            }, { threshold: 0.1 });
            
            document.querySelectorAll('.scroll-reveal').forEach(el => {
                observer.observe(el);
            });
        }
        
        // Animated counter
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-counter[data-target]');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
            });
        }
        
        // Contact form handler
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const formMessage = document.getElementById('formMessage');
            formMessage.textContent = 'Thank you for your message. I will respond within 48 hours.';
            formMessage.className = 'mt-4 text-center text-sm text-gold';
            this.reset();
        });
        
        // Config change handler
        async function onConfigChange(config) {
            const heroTitle = document.getElementById('heroTitle');
            const heroSubtitle = document.getElementById('heroSubtitle');
            const executiveBio = document.getElementById('executiveBio');
            const philosophyQuote = document.getElementById('philosophyQuote');
            const ctaText = document.getElementById('ctaText');
            
            if (heroTitle) {
                const names = (config.hero_title || defaultConfig.hero_title).split(' ');
                if (names.length >= 2) {
                    heroTitle.innerHTML = names.slice(0, -1).join(' ') + '<br><span class="text-gold-shimmer">' + names[names.length - 1] + '</span>';
                } else {
                    heroTitle.innerHTML = config.hero_title || defaultConfig.hero_title;
                }
            }
            
            if (heroSubtitle) {
                heroSubtitle.textContent = config.hero_tagline || defaultConfig.hero_tagline;
            }
            
            if (executiveBio) {
                executiveBio.textContent = config.executive_bio || defaultConfig.executive_bio;
            }
            
            if (philosophyQuote) {
                philosophyQuote.textContent = config.philosophy_quote || defaultConfig.philosophy_quote;
            }
            
            if (ctaText) {
                ctaText.textContent = config.cta_text || defaultConfig.cta_text;
            }
            
            // Apply colors
            document.documentElement.style.setProperty('--bg-color', config.background_color || defaultConfig.background_color);
            document.documentElement.style.setProperty('--surface-color', config.surface_color || defaultConfig.surface_color);
            document.documentElement.style.setProperty('--text-color', config.text_color || defaultConfig.text_color);
            document.documentElement.style.setProperty('--primary-action', config.primary_action_color || defaultConfig.primary_action_color);
            document.documentElement.style.setProperty('--secondary-action', config.secondary_action_color || defaultConfig.secondary_action_color);
        }
        
        // Map to capabilities
        function mapToCapabilities(config) {
            return {
                recolorables: [
                    {
                        get: () => config.background_color || defaultConfig.background_color,
                        set: (value) => {
                            config.background_color = value;
                            if (window.elementSdk) window.elementSdk.setConfig({ background_color: value });
                        }
                    },
                    {
                        get: () => config.surface_color || defaultConfig.surface_color,
                        set: (value) => {
                            config.surface_color = value;
                            if (window.elementSdk) window.elementSdk.setConfig({ surface_color: value });
                        }
                    },
                    {
                        get: () => config.text_color || defaultConfig.text_color,
                        set: (value) => {
                            config.text_color = value;
                            if (window.elementSdk) window.elementSdk.setConfig({ text_color: value });
                        }
                    },
                    {
                        get: () => config.primary_action_color || defaultConfig.primary_action_color,
                        set: (value) => {
                            config.primary_action_color = value;
                            if (window.elementSdk) window.elementSdk.setConfig({ primary_action_color: value });
                        }
                    },
                    {
                        get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
                        set: (value) => {
                            config.secondary_action_color = value;
                            if (window.elementSdk) window.elementSdk.setConfig({ secondary_action_color: value });
                        }
                    }
                ],
                borderables: [],
                fontEditable: undefined,
                fontSizeable: undefined
            };
        }

        
        // Map to edit panel values
        function mapToEditPanelValues(config) {
            return new Map([
                ['hero_title', config.hero_title || defaultConfig.hero_title],
                ['hero_subtitle', config.hero_subtitle || defaultConfig.hero_subtitle],
                ['hero_tagline', config.hero_tagline || defaultConfig.hero_tagline],
                ['executive_bio', config.executive_bio || defaultConfig.executive_bio],
                ['philosophy_quote', config.philosophy_quote || defaultConfig.philosophy_quote],
                ['cta_text', config.cta_text || defaultConfig.cta_text]
            ]);
        }
        
        // Initialize
        async function init() {
            if (window.elementSdk) {
                await window.elementSdk.init({
                    defaultConfig,
                    onConfigChange,
                    mapToCapabilities,
                    mapToEditPanelValues
                });
            }
            
            initScrollReveal();
            animateCounters();
            onConfigChange(defaultConfig);
        }
        
        init();
  
  
  
  
  
  
  // Initialize EmailJS
  emailjs.init({
  publicKey: "eoh7V8-Wthnm0oLF_",
});

  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_ih2atdm",
      "template_0wxdty2",
      this
    ).then(
      function () {
        formMessage.classList.remove("hidden");
        formMessage.classList.add("text-green-500");
        formMessage.innerText = "Message sent successfully!";
        form.reset();
      },
      function (error) {
        formMessage.classList.remove("hidden");
        formMessage.classList.add("text-red-500");
        formMessage.innerText = "Something went wrong. Please try again.";
        console.error(error);
      }
    );
  });
