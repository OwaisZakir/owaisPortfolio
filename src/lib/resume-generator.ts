export const generateResumeHTML = () => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Owais Zakir - Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px;
        }
        .header {
            border-bottom: 3px solid #00eeff;
            margin-bottom: 30px;
            padding-bottom: 20px;
        }
        .name {
            font-size: 32px;
            font-weight: bold;
            color: #000;
            margin-bottom: 5px;
        }
        .title {
            font-size: 16px;
            color: #00eeff;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .contact {
            font-size: 12px;
            color: #666;
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }
        .contact-item {
            display: flex;
            align-items: center;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 14px;
            font-weight: bold;
            color: #00eeff;
            text-transform: uppercase;
            border-bottom: 2px solid #00eeff;
            padding-bottom: 8px;
            margin-bottom: 15px;
            letter-spacing: 1px;
        }
        .entry {
            margin-bottom: 15px;
        }
        .entry-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 5px;
        }
        .entry-title {
            font-weight: 600;
            font-size: 13px;
            color: #000;
        }
        .entry-subtitle {
            font-size: 12px;
            color: #00eeff;
            font-weight: 600;
        }
        .entry-period {
            font-size: 11px;
            color: #999;
        }
        .entry-description {
            font-size: 12px;
            color: #555;
            margin: 5px 0;
        }
        .entry-location {
            font-size: 11px;
            color: #999;
            font-style: italic;
        }
        .achievements {
            list-style: none;
            margin: 8px 0 0 0;
            font-size: 11px;
            color: #555;
        }
        .achievements li {
            padding-left: 15px;
            position: relative;
            margin-bottom: 3px;
        }
        .achievements li:before {
            content: "▸";
            position: absolute;
            left: 0;
            color: #00eeff;
        }
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            font-size: 12px;
        }
        .skill-category {
            margin-bottom: 10px;
        }
        .skill-category-title {
            font-weight: 600;
            color: #333;
            margin-bottom: 5px;
        }
        .skill-items {
            color: #666;
            font-size: 11px;
        }
        .summary {
            font-size: 12px;
            color: #555;
            line-height: 1.7;
            margin-bottom: 15px;
        }
        @media print {
            body {
                background: white;
            }
            .container {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="name">OWAIS ZAKIR</div>
            <div class="title">MERN Stack Developer | Full-Stack Engineer</div>
            <div class="contact">
                <div class="contact-item">📧 owaiszakir88@gmail.com</div>
                <div class="contact-item">📍 Karachi, Pakistan</div>
                <div class="contact-item">🔗 github.com/OwaisZakir</div>
                <div class="contact-item">💼 linkedin.com/in/owaiszakir</div>
            </div>
        </div>

        <!-- Professional Summary -->
        <div class="section">
            <div class="section-title">Professional Summary</div>
            <div class="summary">
                Full-Stack Engineer (MERN Stack) passionate about helping businesses and startups transform operations through ERP, POS, and automation solutions. Experienced in designing and building scalable systems with focus on creating fast, stable, production-ready software aligned with real-world business needs. Skilled in blending technical precision with business-first mindset.
            </div>
        </div>

        <!-- Experience -->
        <div class="section">
            <div class="section-title">Professional Experience</div>
            
            <div class="entry">
                <div class="entry-header">
                    <div>
                        <div class="entry-title">Full-Stack Developer</div>
                        <div class="entry-subtitle">Suffah Tech</div>
                    </div>
                    <div class="entry-period">Sep 2025 - Present</div>
                </div>
                <div class="entry-location">Karachi, Pakistan</div>
                <div class="entry-description">Building full-stack applications with React, Node.js, MongoDB, and Express. Developing ERP/POS systems and scalable architectures using TypeScript and modern technologies.</div>
                <ul class="achievements">
                    <li>Architected scalable MERN applications</li>
                    <li>Google Gemini & TypeScript integration</li>
                    <li>Production-ready system design</li>
                </ul>
            </div>

            <div class="entry">
                <div class="entry-header">
                    <div>
                        <div class="entry-title">Frontend Developer (Internship)</div>
                        <div class="entry-subtitle">Suffah Tech</div>
                    </div>
                    <div class="entry-period">May 2025 - Nov 2025</div>
                </div>
                <div class="entry-location">Karachi, Pakistan</div>
                <div class="entry-description">Developed responsive web interfaces and integrated backend services using React and REST APIs.</div>
                <ul class="achievements">
                    <li>Front-End Design & Development</li>
                    <li>REST API Integration</li>
                    <li>Responsive Web Design Implementation</li>
                </ul>
            </div>
        </div>

        <!-- Education -->
        <div class="section">
            <div class="section-title">Education</div>
            
            <div class="entry">
                <div class="entry-header">
                    <div>
                        <div class="entry-title">Master of Computer Applications (MCA)</div>
                        <div class="entry-subtitle">Suffah Institute of Technology</div>
                    </div>
                    <div class="entry-period">Jun 2024 - Dec 2026</div>
                </div>
                <div class="entry-description">Specialization: Computer Software Engineering</div>
                <ul class="achievements">
                    <li>TypeScript & Vite mastery</li>
                    <li>MERN Stack expertise</li>
                    <li>33+ Technical skills developed</li>
                </ul>
            </div>
        </div>

        <!-- Certifications -->
        <div class="section">
            <div class="section-title">Certifications & Licenses</div>
            <ul class="achievements">
                <li><strong>Introduction to Cybersecurity</strong> - Cisco (Dec 2025)</li>
                <li><strong>Responsive Web Design</strong> - Suffah Institute of Technology (Dec 2024)</li>
                <li><strong>Frontend CSS Course</strong> - Great Learning (Nov 2024)</li>
                <li><strong>Frontend HTML Course</strong> - Great Learning (Nov 2024)</li>
                <li><strong>Responsive Web Design</strong> - freeCodeCamp (Nov 2024)</li>
            </ul>
        </div>

        <!-- Skills -->
        <div class="section">
            <div class="section-title">Technical Skills</div>
            <div class="skills-grid">
                <div class="skill-category">
                    <div class="skill-category-title">Frontend</div>
                    <div class="skill-items">React.js • TypeScript • Tailwind CSS • Next.js • Redux.js • Vite • GSAP • Framer Motion</div>
                </div>
                <div class="skill-category">
                    <div class="skill-category-title">Backend</div>
                    <div class="skill-items">Node.js • Express.js • MongoDB • GraphQL • REST APIs • JWT • PostgreSQL</div>
                </div>
                <div class="skill-category">
                    <div class="skill-category-title">Security</div>
                    <div class="skill-items">Network Security • Threat Detection • Kali Linux • Penetration Testing • Cyber Best Practices</div>
                </div>
                <div class="skill-category">
                    <div class="skill-category-title">Tools & Others</div>
                    <div class="skill-items">Git • Docker • Postman • Figma • ChatGPT • Google Gemini • Agile</div>
                </div>
            </div>
        </div>

        <!-- Notable Projects -->
        <div class="section">
            <div class="section-title">Notable Projects</div>
            
            <div class="entry">
                <div class="entry-title">StackWisdom - AI/Full-Stack Dev Platform</div>
                <div class="entry-description">Next.js platform for articles and teaching content with multi-role auth, admin panel, MDX support, and i18n.</div>
                <div class="skill-items">Technologies: Next.js, React, Tailwind CSS, Framer Motion</div>
            </div>

            <div class="entry">
                <div class="entry-title">Bahar-e-Madinah ERP System</div>
                <div class="entry-description">Comprehensive ERP for educational institutions with student/class management, exams, and attendance.</div>
                <div class="skill-items">Technologies: React, Vite, Redux Toolkit, Ant Design</div>
            </div>

            <div class="entry">
                <div class="entry-title">School Management System Backend</div>
                <div class="entry-description">Scalable backend for multi-role educational management with role-based access control.</div>
                <div class="skill-items">Technologies: Node.js, Express.js, MongoDB, JWT</div>
            </div>

            <div class="entry">
                <div class="entry-title">Auth System Boilerplate</div>
                <div class="entry-description">Production-ready JWT authentication API with secure registration and protected routes.</div>
                <div class="skill-items">Technologies: Node.js, Express, MongoDB, bcrypt</div>
            </div>
        </div>

        <!-- Languages -->
        <div class="section">
            <div class="section-title">Languages</div>
            <ul class="achievements">
                <li><strong>English</strong> - Professional Working Proficiency</li>
                <li><strong>Urdu</strong> - Native / Bilingual Proficiency</li>
                <li><strong>Arabic</strong> - Limited Working Proficiency</li>
            </ul>
        </div>

        <!-- Key Metrics -->
        <div class="section">
            <div class="section-title">Key Metrics & Achievements</div>
            <ul class="achievements">
                <li>65+ GitHub repositories with diverse tech stack projects</li>
                <li>500+ LinkedIn professional connections</li>
                <li>9 months professional experience at Suffah Tech</li>
                <li>5 industry certifications and course completions</li>
                <li>Specialized expertise in MERN Stack and ERP/POS systems</li>
                <li>Certified in Cybersecurity by Cisco</li>
            </ul>
        </div>
    </div>
</body>
</html>
  `;
};

export const downloadResume = async (format: 'html' | 'pdf' = 'pdf') => {
  try {
    if (format === 'html') {
      const htmlContent = generateResumeHTML();
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Owais_Zakir_Resume.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      // Dynamic import to avoid bundle bloat if not used
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      // Create temporary container with resume HTML
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = generateResumeHTML();
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.width = '900px';
      tempContainer.style.padding = '40px';
      document.body.appendChild(tempContainer);

      // Get content div
      const contentDiv = tempContainer.querySelector('.container') as HTMLElement;
      if (!contentDiv) {
        document.body.removeChild(tempContainer);
        throw new Error('Resume content not found');
      }

      // Convert HTML to canvas
      const canvas = await html2canvas(contentDiv, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add pages to PDF
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Owais_Zakir_Resume.pdf');

      // Cleanup
      document.body.removeChild(tempContainer);
    }
  } catch (error) {
    console.error('Resume download failed:', error);
    // Fallback to HTML
    const htmlContent = generateResumeHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Owais_Zakir_Resume.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
