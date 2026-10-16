/**
 * Seeder - Existing jobs data ko MongoDB mein import karta hai
 * Run: node seeder.js
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Job = require("./models/Job");

dotenv.config();

const seedJobs = [
  {
    title: "Senior Java Developer",
    company: "Tech Solutions",
    location: "Chandigarh",
    type: "Full-time",
    salary: "₹12 - ₹18 LPA",
    experience: "3-5 Years",
    category: "Java",
    description: "We are seeking an experienced Senior Java Developer to lead our enterprise cloud migration and scalable backend services. You will design, develop, and maintain high-performance, fault-tolerant REST APIs and microservices serving over 2 million users.",
    requirements: [
      "Architect and implement robust backend services using Java 17+ and Spring Boot 3.",
      "Design relational and NoSQL database schemas with high concurrency and optimization.",
      "Collaborate with DevOps team for automated CI/CD deployment pipelines on AWS.",
      "Conduct thorough code reviews and mentor junior engineering team members."
    ],
    skills: ["Java", "Spring Boot", "Microservices", "Kafka", "PostgreSQL", "Docker", "AWS"],
    isActive: true,
  },
  {
    title: "Lead React & Frontend Engineer",
    company: "Digital Labs",
    location: "Mohali",
    type: "Remote",
    salary: "₹14 - ₹22 LPA",
    experience: "4-7 Years",
    category: "React",
    description: "Digital Labs is looking for a passionate Lead React Engineer to spearhead our next-generation SaaS analytics dashboard. You will own client-side architecture, performance optimization, and delight users with buttery-smooth interactive components.",
    requirements: [
      "Build modular, responsive web applications using React, Next.js, and TypeScript.",
      "Optimize web vital metrics, asset loading, and bundle size for instant page loads.",
      "Collaborate closely with UI/UX designers to translate Figma tokens into reusable design systems.",
      "Implement robust automated unit and integration tests using Vitest and Cypress."
    ],
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL", "Performance"],
    isActive: true,
  },
  {
    title: "Full Stack Web Developer",
    company: "WebWorks",
    location: "Remote",
    type: "Full-time",
    salary: "₹8 - ₹14 LPA",
    experience: "2-4 Years",
    category: "Frontend",
    description: "WebWorks is hiring a versatile Full Stack Developer to build end-to-end features for our digital commerce and workflow products. Ideal candidate enjoys working across both frontend UI and backend services.",
    requirements: [
      "Develop responsive and accessible web interfaces in modern React.",
      "Build secure RESTful APIs using Node.js and Express.",
      "Maintain databases and write performant queries in MongoDB and Redis.",
      "Coordinate with product managers to scope and deliver sprint objectives."
    ],
    skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript", "Git"],
    isActive: true,
  },
  {
    title: "Senior Backend Developer (Go / Python)",
    company: "CodeTech",
    location: "Bangalore",
    type: "Full-time",
    salary: "₹18 - ₹28 LPA",
    experience: "4-6 Years",
    category: "Backend",
    description: "CodeTech builds high-throughput distributed infrastructure. We are searching for an experienced Backend Engineer to scale our transactional processing engine processing tens of thousands of requests per second.",
    requirements: [
      "Build ultra-low latency microservices with Go and Python.",
      "Design fault-tolerant event streaming pipelines with Apache Kafka and RabbitMQ.",
      "Deploy and manage services on Kubernetes clusters across multi-cloud environments.",
      "Participate in on-call rotation and triage production incidents effectively."
    ],
    skills: ["Go", "Python", "PostgreSQL", "Kafka", "Kubernetes", "gRPC"],
    isActive: true,
  },
  {
    title: "Senior Product & UI/UX Designer",
    company: "Creative Studio",
    location: "Delhi",
    type: "Full-time",
    salary: "₹10 - ₹16 LPA",
    experience: "3-5 Years",
    category: "UI/UX",
    description: "Join Creative Studio to shape visually breathtaking, intuitive digital experiences. You will lead UI/UX design from user research and wireframing up to high-fidelity prototypes and design systems.",
    requirements: [
      "Create high-fidelity interactive prototypes in Figma.",
      "Conduct qualitative user interviews and usability tests.",
      "Maintain a unified multi-brand design system with tokens.",
      "Work closely with engineering during design handover and QA."
    ],
    skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Micro-animations"],
    isActive: true,
  },
  {
    title: "Cloud & DevOps Engineer",
    company: "InnovateTech",
    location: "Pune",
    type: "Full-time",
    salary: "₹15 - ₹24 LPA",
    experience: "3-6 Years",
    category: "Software Engineer",
    description: "InnovateTech is searching for a Cloud Infrastructure & DevOps Engineer to automate cloud infrastructure, monitor system reliability, and safeguard application uptime.",
    requirements: [
      "Manage AWS infrastructure using Terraform Infrastructure as Code (IaC).",
      "Optimize Kubernetes cluster sizing, auto-scaling, and security policies.",
      "Implement observability and alerting dashboards with Prometheus and Grafana.",
      "Enforce DevSecOps compliance and automated vulnerability scanning."
    ],
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux"],
    isActive: true,
  },
  {
    title: "AI / Machine Learning Engineer",
    company: "NextGen AI",
    location: "Bangalore",
    type: "Full-time",
    salary: "₹20 - ₹35 LPA",
    experience: "2-5 Years",
    category: "Backend",
    description: "NextGen AI is engineering enterprise AI solutions using generative foundation models. We're looking for an ML Engineer passionate about fine-tuning LLMs, retrieval-augmented generation (RAG), and scalable model inference.",
    requirements: [
      "Build RAG pipelines utilizing Qdrant, Pinecone, and LangChain.",
      "Deploy high-throughput inference APIs with FastAPI and Triton.",
      "Fine-tune open-weights models (Llama 3, Mistral) for domain-specific tasks.",
      "Monitor latency, accuracy benchmarks, and hallucination guardrails."
    ],
    skills: ["Python", "PyTorch", "LLMs", "FastAPI", "Docker", "Vector DB"],
    isActive: true,
  },
  {
    title: "Junior Frontend Developer (Internship / Fresher)",
    company: "CodeCraft Studios",
    location: "Chandigarh",
    type: "Internship",
    salary: "₹25,000 - ₹35,000 / mo",
    experience: "Fresher / 0-1 Year",
    category: "Frontend",
    description: "A great launchpad for passionate freshers! Join our fast-paced frontend team to learn modern web development, React hooks, component architecture, and responsive styling.",
    requirements: [
      "Convert HTML/CSS designs into reusable React components.",
      "Fix responsive layout bugs across modern mobile and tablet devices.",
      "Learn and apply best practices in clean code and Git branching."
    ],
    skills: ["JavaScript", "HTML", "CSS", "React basics", "Git"],
    isActive: true,
  },
  {
    title: "Mobile App Developer (React Native / Flutter)",
    company: "Appify Mobile",
    location: "Remote",
    type: "Part-time",
    salary: "₹5 - ₹8 LPA",
    experience: "1-3 Years",
    category: "React",
    description: "Appify Mobile is looking for a creative Mobile Developer to build cross-platform consumer apps. You will collaborate on iOS and Android releases with smooth 60fps animations.",
    requirements: [
      "Build cross-platform mobile apps using React Native and TypeScript.",
      "Integrate native modules and native device hardware APIs.",
      "Manage app store deployment pipelines for TestFlight and Play Store."
    ],
    skills: ["React Native", "TypeScript", "iOS", "Android", "REST APIs"],
    isActive: true,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected for seeding...");

    // Clear existing jobs
    await Job.deleteMany();
    console.log("🗑️  Old jobs cleared");

    // Insert seed data
    const inserted = await Job.insertMany(seedJobs);
    console.log(`✅ ${inserted.length} jobs seeded successfully!`);

    mongoose.disconnect();
    console.log("✅ DB disconnected. Seeding complete!\n");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seedDB();
