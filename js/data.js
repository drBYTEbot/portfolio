/*
 * data.js — Single source of truth for the entire portfolio.
 * Both the interactive brain and the accessible "traditional view"
 * are rendered from this data so no content is ever lost or duplicated.
 */
window.PORTFOLIO = {
  meta: {
    name: "Saria Malik",
    title: "Saria Malik — Engineer • AI • Cognitive Science",
    description:
      "Interactive portfolio of Saria Malik: cognitive science & writing seminars at Johns Hopkins, AI engineering, research, and creative technology. Explore my mind.",
    github: "https://github.com/drBYTEbot",
    linkedin: "https://linkedin.com/in/sariamalik",
    email: "saria@aiand.com"
  },

  /* Conceptual brain regions (artistic information architecture, not neuroscience claims) */
  regions: {
    frontal:   { name: "Frontal Lobe",   theme: "Engineering · Building",        color: "#E8C860", anchor: { x: 250, y: 150 }, desc: "This is where I build." },
    temporal:  { name: "Temporal Lobe",  theme: "Experience · Memory · Journey", color: "#7FB2D9", anchor: { x: 150, y: 250 }, desc: "This is where experiences become part of the story." },
    parietal:  { name: "Parietal Lobe",  theme: "Learning · Skills · Knowledge", color: "#9D8CD4", anchor: { x: 350, y: 230 }, desc: "This is what I have learned." },
    occipital: { name: "Occipital Lobe", theme: "Creativity · Visualization · Design", color: "#E08DA0", anchor: { x: 250, y: 320 }, desc: "This is how I see and create." },
    cerebellum:{ name: "Cerebellum",     theme: "Precision · Execution · Details", color: "#6FCF97", anchor: { x: 360, y: 330 }, desc: "This is how I turn ideas into execution." },
    brainstem: { name: "Brainstem",      theme: "Foundation · Identity · Connection", color: "#D4AF37", anchor: { x: 250, y: 360 }, desc: "This is what connects everything." }
  },

  /* Each section becomes a clickable neuron in the brain AND a block in the traditional view */
  sections: [
    {
      id: "about", region: "brainstem", title: "About Me", type: "about",
      body: `
        <button type="button" class="tts-btn" data-tts>&#9836; Read aloud</button>
        <a class="link-btn" href="https://www.sutori.com/en/story/self-study--8HqVuRdrdvJMp161T3FaPfx6" target="_blank" rel="noopener">&#128218; Self-Study</a>
        <div class="about-intro">
        <p>I'm <strong>Saria Malik</strong> &mdash; a cognitive science and writing seminars double major at the
        <strong>Johns Hopkins Whiting School of Engineering</strong>, driven by the belief that the most powerful
        technology lives at the intersection of logic and creativity.</p>
        <p>My work spans cognitive science, writing, programming, and robotics. I'm passionate about research, team
        leadership, and engineering that's infused with curiosity and craft. I'm also a
        <strong>U.S. Congressional App Challenge winner</strong> (Maryland's 2nd District, 2023&ndash;2024), a
        <strong>Clark Scholars Peer Leader</strong> at JHU, a <strong>Cummings Scholars Student Leadership Board Member</strong>,
        and a proud WISE program alum.</p>
        <p>Whether I'm developing software at <strong>nVeris Tech</strong> or <strong>ai&amp;</strong>, leading workshops for
        incoming scholars, or exploring performing arts, I bring the same principle to everything:
        <em>the engineer builds what the artist imagines.</em></p>
        </div>
        <ul class="kv">
          <li><span>Major</span><span>CogSci &amp; Writing Seminars</span></li>
          <li><span>School</span><span>Johns Hopkins University</span></li>
          <li><span>Location</span><span>Baltimore, MD</span></li>
          <li><span>Focus</span><span>Artificial Intelligence</span></li>
          <li><span>Grad</span><span>2028</span></li>
        </ul>`
    },
    {
      id: "experience", region: "temporal", title: "Experience", type: "timeline",
      body: `
        <div class="timeline">
          <div class="tl"><span class="tl-d">Jun&ndash;Aug 2026</span><h4>AI Engineering Intern &mdash; ai&amp;</h4><p>Built and deployed production AI systems including multi-model LLM routing, real-time streaming, and per-project process isolation. Led auth, database persistence, and analytics on a 3-person team over 8 weeks.</p></div>
          <div class="tl"><span class="tl-d">Jul&ndash;Aug 2025</span><h4>Software Development Intern &mdash; nVeris Tech</h4><p>Contributed to Pulse, an AI-enhanced platform for customer experience managers. Developed surveys, AI summaries, and data visualizations with Ruby on Rails, JavaScript, and HTML in an agile environment.</p></div>
          <div class="tl"><span class="tl-d">Feb 2024&ndash;Jul 2025</span><h4>Shift Lead &mdash; Walgreens</h4><p>Managed schedules, led performance reviews, resolved conflicts, oversaw cash flow and compliance.</p></div>
          <div class="tl"><span class="tl-d">2025&ndash;Present</span><h4>Student Leadership Board &mdash; Cummings &amp; Clark Scholars, JHU</h4><p>Mentoring incoming scholars, leading orientation and academic prep, fostering community excellence.</p></div>
          <div class="tl"><span class="tl-d">Summer 2024</span><h4>STEM Lab Tech Intern &mdash; Divaneering Impact Lab</h4><p>Led STEM lessons in physics, chemistry, and engineering. Promoted female participation in STEM through hands-on projects.</p></div>
          <div class="tl"><span class="tl-d">Summer 2024</span><h4>Surgical Pathology Lab Intern &mdash; JHU</h4><p>Completed EPIC training, processed tissue samples, coordinated deliveries, ensured quality control.</p></div>
          <div class="tl"><span class="tl-d">Aug 2023&ndash;Present</span><h4>Anna Deavere Smith Teen Pipeline</h4><p>Ongoing intensive exploring storytelling through movement, voice, and lived experience.</p></div>
          <div class="tl"><span class="tl-d">2023&ndash;2024</span><h4>Congressional App Challenge Winner &mdash; MD-02</h4><p>Won for the Patrol App, a public-safety tool. Presented to congressional leaders.</p></div>
          <div class="tl"><span class="tl-d">Summer 2023</span><h4>Theoretical Computer Science Intern &mdash; JHU</h4><p>Researched and implemented optimization algorithms (greedy, shortest path) in Python via Google Colab.</p></div>
          <div class="tl"><span class="tl-d">Spring 2023</span><h4>Psychological &amp; Brain Sciences Intern &mdash; JHU</h4><p>Designed a miniature robot for cognitive science research; developed Python algorithms for behavioral studies.</p></div>
          <div class="tl"><span class="tl-d">2022&ndash;2024</span><h4>Sales Associate &mdash; Foot Locker</h4><p>Operated POS systems, optimized inventory, delivered customer service.</p></div>
          <div class="tl"><span class="tl-d">Summer 2022</span><h4>Environmental Engineering Intern &mdash; JHU</h4><p>Researched Baltimore greenhouse-gas emissions, built Excel dashboards, presented findings.</p></div>
          <div class="tl"><span class="tl-d">2024&ndash;2028</span><h4>B.A. Cognitive Science &amp; Writing Seminars &mdash; JHU</h4><p>Exploring mind, language, and technology through cognitive science and creative writing.</p></div>
        </div>`
    },
    {
      id: "skills", region: "parietal", title: "Skills & Tools", type: "skills",
      body: `
        <div class="skill-cluster"><h4>Core</h4><span>Cross-disciplinary</span><span>Applied Problem Solving</span><span>Technical Communication</span><span>Rapid Learning</span><span>Self-directed</span><span>Adaptable</span></div>
        <div class="skill-cluster"><h4>Specialized</h4><span>Full-stack Development</span><span>Optimization Algorithms</span><span>Algorithm Implementation</span><span>Performance Trade-off Analysis</span><span>Object-Oriented Programming</span><span>UI/UX</span><span>Data Visualization</span><span>LLM Agent Integration</span><span>Multi-model AI Routing (7+ models)</span><span>Real-time Streaming (WebSockets/SSE)</span><span>Multi-Tenant Architecture</span><span>Process Isolation</span><span>Auth Systems (JWT)</span><span>3D Printing Prototyping</span><span>Autodesk Fusion (CAD)</span><span>Technical Writing</span></div>
        <div class="skill-cluster"><h4>Languages</h4><span>Python</span><span>TypeScript</span><span>JavaScript</span><span>Java</span><span>Ruby</span><span>SQL</span><span>Shell</span><span>HTML/CSS</span></div>
        <div class="skill-cluster"><h4>Frameworks &amp; Tools</h4><span>Docker</span><span>Jira</span><span>Bitbucket</span><span>Git/GitHub</span><span>VS Code</span><span>IntelliJ IDEA</span><span>OpenCode</span><span>Flask</span><span>gevent</span><span>Next.js</span><span>React</span><span>Tailwind CSS</span><span>Postgres / Supabase</span><span>Framer Motion</span><span>Linux</span><span>systemd</span><span>Deployment Pipelines</span><span>Process / Container Management</span></div>
        <div class="skill-cluster"><h4>LLMs</h4><span>deepseek-v4-flash</span><span>deepseek-v4-pro</span><span>glm-5.2</span><span>kimi-k3</span><span>kimi-k2.7-code</span><span>qwen3.6-27b</span><span>gemma-4-31b-it</span><span>gpt-oss-120b</span></div>
        <div class="skill-cluster"><h4>Engineering &amp; Design</h4><span>3D Printing Prototyping</span><span>Autodesk Fusion (CAD)</span><span>Prototyping</span><span>Technical Research</span><span>Computer Ethics</span></div>`
    },
    {
      id: "coursework", region: "parietal", title: "Coursework", type: "coursework",
      body: `
        <div class="course-grid">
          <div><h4>Johns Hopkins University</h4>
            <ul><li>Gateway Java <i>2024</i></li><li>Calculus I (Engineering) <i>2024</i></li><li>Calculus II (Engineering) <i>2025</i></li><li>Physics I (Engineering) <i>2024</i></li><li>Physics I Lab (Engineering) <i>2024</i></li><li>Computer Ethics <i>2025</i></li><li>Language, Media &amp; AI Lab <i>2026</i></li><li>Engineering Design I <i>2024</i></li><li>Engineering Design II <i>2025</i></li><li>Engineering Design III (Chile) <i>2026</i></li></ul>
          </div>
          <div><h4>Western High School</h4>
            <ul><li>AP Computer Science Principles <i>2021&ndash;2022</i></li><li>Computer Science Essentials <i>2020&ndash;2021</i></li><li>Application Development 1 <i>2023&ndash;2024</i></li><li>Application Development 2 <i>2023&ndash;2024</i></li><li>Foundations of Computer Science <i>2023&ndash;2024</i></li><li>AP Computer Science A <i>2022&ndash;2023</i></li></ul>
          </div>
        </div>`
    },
    {
      id: "projects", region: "frontal", title: "Projects", type: "projects",
      body: `
        <div class="proj-grid">
          <div class="proj"><h4>Pulse</h4><p>AI-enhanced platform for customer experience managers: auto-generated surveys, AI summaries, data visualizations.</p><span class="tag">Ruby on Rails</span><span class="tag">JavaScript</span><span class="tag">Docker</span></div>
          <div class="proj"><h4>Patrol App</h4><p>Congressional App Challenge winning public-safety tool.</p><span class="tag">Python</span><span class="tag">Public Safety</span><span class="tag">UI/UX</span><div class="plinks"><a href="https://www.congressionalappchallenge.us/23-md02/" target="_blank" rel="noopener">View</a></div></div>
          <div class="proj"><h4>ArcAIdia</h4><p>Immersive office-themed arcade for the 2026 Japan Hackathon: mini-games + claw-machine shop, all procedurally generated.</p><span class="tag">JavaScript</span><span class="tag">Game AI</span><span class="tag">Canvas</span><div class="plinks"><a href="https://github.com/drBYTEbot/2026-japan-hackathon" target="_blank" rel="noopener">Code</a></div></div>
          <div class="proj"><h4>Somora</h4><p>Animated AI-education universe &mdash; a 12-module learning ecosystem built with Next.js and React.</p><span class="tag">TypeScript</span><span class="tag">Next.js</span><span class="tag">AI/ML</span><div class="plinks"><a href="https://github.com/drBYTEbot/somora" target="_blank" rel="noopener">Code</a></div></div>
          <div class="proj"><h4>Autonomous AI Agent</h4><p>Deployment config for an autonomous AI agent with Slack integration via OpenAI-compatible API.</p><span class="tag">LLM</span><span class="tag">Shell</span><span class="tag">Automation</span><div class="plinks"><a href="https://github.com/drBYTEbot/hermes-agent-vm" target="_blank" rel="noopener">Code</a></div></div>
          <div class="proj"><h4>Mother &amp; Bloom</h4><p>Premium motherhood app prototype: 20 screens, full design system, integrated AI assistant.</p><span class="tag">React</span><span class="tag">TypeScript</span><span class="tag">Design System</span><div class="plinks"><a href="https://github.com/aiandsaria/mother-and-bloom" target="_blank" rel="noopener">Code</a></div></div>
          <div class="proj"><h4>AI&amp; Studio</h4><p>AI-powered web app built at ai&amp;: frontend, backend, UI/UX, API integration, deployment on a 3-person team.</p><span class="tag">Python</span><span class="tag">Frontend</span><span class="tag">Backend</span><span class="tag">UI/UX</span><span class="tag">APIs</span></div>
          <div class="proj"><h4>Surgical Pathology Lab Research</h4><p>JHU internship: tissue samples, deliveries, quality control, EPIC training.</p><span class="tag">Pathology</span><span class="tag">Lab Work</span></div>
          <div class="proj"><h4>STEM Education &amp; Outreach</h4><p>Led STEM lessons at Divaneering Impact Lab; promoted female participation in STEM.</p><span class="tag">STEM Education</span><span class="tag">Teaching</span></div>
          <div class="proj"><h4>Optimization Algorithms Research</h4><p>Greedy &amp; shortest-path implementations in Python via Google Colab.</p><span class="tag">Python</span><span class="tag">Algorithms</span></div>
          <div class="proj"><h4>Cognitive Robotics Research</h4><p>Miniature robot for cognitive science research; Python algorithms for behavioral studies.</p><span class="tag">Python</span><span class="tag">Robotics</span></div>
        </div>`
    },
    {
      id: "leadership", region: "cerebellum", title: "Leadership", type: "leadership",
      body: `
        <div class="lead-grid">
          <div class="lead"><h4>Robotics Team Leader</h4><p>Active member since 2017, serving as team leader. Led builds, mentored members, competed regionally.</p></div>
          <div class="lead"><h4>NHS Treasurer</h4><p>Managed chapter finances, coordinated community service initiatives, oversaw fundraising.</p></div>
          <div class="lead"><h4>Drum Major</h4><p>Baltimore Twilighters Marching Band since 2016; competitive dancer; Executive Board roles.</p></div>
          <div class="lead"><h4>Music Director &mdash; JHU Dance Team</h4><p>Music selection, audio editing, choreography synchronization.</p></div>
          <div class="lead"><h4>Clark Scholars Cohort Leader</h4><p>Cohort Leader for JHU Clark Scholars Class of 2028; peer mentorship and orientation.</p></div>
          <div class="lead"><h4>Cummings Scholars Board</h4><p>Student Leadership Board Member; shaping program initiatives and community engagement.</p></div>
          <div class="lead"><h4>AI Product Leadership &mdash; ai&amp;</h4><p>Led a 3-person intern team with 258 commits on a production AI platform.</p></div>
          <div class="lead"><h4>"Be the Bridge" Ambassador</h4><p>Ambassador for Code in the Schools, Baltimore; bridging youth and technology education.</p></div>
        </div>`
    },
    {
      id: "community", region: "brainstem", title: "Community & Volunteer", type: "community",
      body: `
        <h4>2026 Volunteer Events</h4>
        <ul class="com-list"><li>STEM Grade School Engineering Event &mdash; Watershed Activity Center</li><li>Cummings Scholars Banquet &mdash; setup &amp; awards</li><li>CTY / Baltimore Emerging Scholars Ceremony &mdash; panelist &amp; speaker</li><li>Project X / Boast Campus Visit &mdash; STEM demo</li><li>BFSA Juneteenth Event &mdash; STEM elementary demo</li></ul>
        <h4>Ongoing &amp; Past Work</h4>
        <ul class="com-list"><li>Volunteered with Amazon &amp; local shelters to distribute essentials.</li><li>Connected NICU families at GBMC via "Bonding Hearts."</li><li>Formulated toiletry kits for the Ronald McDonald House.</li><li>Packaged over 60,000 diapers in Durham, NC.</li><li>Planted green-life for a pocket forest in Santiago, Chile.</li><li>Organized peer tutoring, cleanups, and charity events in high school.</li></ul>`
    },
    {
      id: "research", region: "occipital", title: "AI & Research", type: "research",
      body: `
        <div class="res-grid">
          <div class="res"><h4>Artificial Intelligence</h4><p>Interested in ML, NLP, and ethical AI development &mdash; how models understand and augment humans.</p></div>
          <div class="res"><h4>Robotics</h4><p>Passionate about embodied AI and autonomous systems bridging perception, planning, and action.</p></div>
          <div class="res"><h4>PhD Aspirations</h4><p>Planning a PhD at the intersection of cognitive science, AI, and robotics.</p></div>
          <div class="res"><h4>STEM Advocacy</h4><p>Committed to increasing women's representation in AI and STEM through mentorship.</p></div>
        </div>`
    },
    {
      id: "dino", region: "occipital", title: "The Game That Started It All", type: "game",
      body: `
        <p class="game-blurb">The Chrome Dinosaur Game was more than a time-killer. It was my first encounter with procedural
        generation, reaction-based mechanics, and the magic of something from nothing &mdash; a T-Rex running across an endless
        desert taught me that the best technology feels invisible.</p>
        <div class="game" id="dinoGame">
          <div class="game-score">Score: <span id="score">0</span></div>
          <div class="game-highscore">Best: <span id="highscore">0</span></div>
          <canvas id="gameCanvas" width="600" height="200"></canvas>
          <button class="game-start-btn" id="gameStart">Play Game</button>
          <p class="game-hint">Press <kbd>Space</kbd> or tap to jump</p>
        </div>`
    },
    {
      id: "connect", region: "brainstem", title: "Connect", type: "contact",
      body: `
        <div class="contact-links">
          <button type="button" class="cl copy-mail" data-mail="sariam830@gmail.com"><span>&#9993;</span> sariam830@gmail.com <em class="hint">click to copy</em></button>
          <a href="https://github.com/drBYTEbot" target="_blank" rel="noopener" class="cl"><span>&lt;/&gt;</span> github.com/drBYTEbot</a>
          <a href="https://linkedin.com/in/sariamalik" target="_blank" rel="noopener" class="cl"><span>&#8855;</span> linkedin.com/in/sariamalik</a>
          <a href="https://sariamalik.my.canva.site" target="_blank" rel="noopener" class="cl"><span>&#9671;</span> sariamalik.my.canva.site</a>
        </div>
        <p class="contact-msg">Always open to collaborating on interesting projects, research ideas, and conversations at the
        intersection of art and engineering.</p>`
    }
  ],

  // Floating-background content (books = memories, planets = skills)
  memories: [
    "Congressional App Challenge Winner",
    "Built AI at ai& — 258 commits",
    "ArcAIdia claw-machine shop",
    "nVeris Pulse platform",
    "Somora: 12-module universe",
    "Mother & Bloom — 20 screens",
    "Hermes autonomous agent",
    "JHU CogSci & Writing",
    "Clark Scholars Leader",
    "Drum Major, Twilighters",
    "Robotics Team Leader",
    "Patrol App for public safety",
    "Cognitive robotics research",
    "STEM outreach teacher",
    "Japan Hackathon 2026",
    "AI& production platform"
  ],
  skillTags: [
    "Python", "TypeScript", "JavaScript", "Java", "Ruby", "SQL", "Shell",
    "HTML/CSS", "React", "Next.js", "Docker", "Git/GitHub", "Flask",
    "Postgres / Supabase", "LLM Routing", "JWT Auth", "WebSockets / SSE",
    "Multi-Tenant", "Process Isolation", "3D Printing", "Autodesk Fusion",
    "Framer Motion", "Linux", "systemd", "DeepSeek", "Kimi", "GLM", "Qwen",
    "Gemma", "GPT-OSS", "UI/UX", "Data Visualization"
  ]
};
