const blogPosts = [
  {
    id: "spring-petclinic-microservices",
    title: "Spring Petclinic Microservices Project",
    date: "February 7, 2021",
    readTime: "8 min read",
    excerpt: "Transitioning from monolithic applications to microservices is a rite of passage for any DevOps engineer. A deep dive into building and deploying a distributed version of the classic Spring PetClinic application.",
    tags:["Microservices", "Docker", "Kubernetes", "Spring Cloud"],
    image: "/spring-petclinic-architecture.png", // Ensure the PNG is in your public folder
    sections:[
      {
        heading: "My Journey into Microservices: Building a Distributed PetClinic with Docker and Kubernetes",
        body: "Transitioning from monolithic applications to microservices is a rite of passage for any DevOps engineer. During my time in the DevOps Cloud Bootcamp, my colleagues and I tackled a demo project that brought together the best of Spring Cloud, Docker, and Kubernetes. Here's a breakdown of how we built and deployed a distributed version of the classic Spring PetClinic application."
      },
      {
        heading: "The Architectural Design",
        body: "The core of this project is built on the Spring Cloud Netflix technology stack. Instead of one giant application, we split the functionality into specialised services that communicate with each other.\n\nKey Components:\n• Service Discovery (Eureka): Acts as the phone book for our services.\n• API Gateway (Zuul): The single entry point for the frontend, handling routing and reverse proxying.\n• Config Server: Centralizes all configurations across different environments.\n• Resilience (Hystrix): Implements the Circuit Breaker pattern to ensure system stability.\n• Observability: We used Zipkin for distributed tracing, and Prometheus and Grafana to monitor metrics."
      },
      {
        heading: "Deployment: From Docker to the Cloud",
        body: "To ensure environment consistency, we used Docker Images. To build our environment, we used a specialized Maven profile:\n\n./mvnw clean install -PbuildDocker\n\nThis command packages the applications into Docker images. While we initially used docker-compose for local testing, the real power came from deploying these images to a Kubernetes cluster managed by Rancher and hosted on AWS."
      },
      {
        heading: "Essential Code Snippets",
        body: "1. Database Integration with Docker\nWe didn't need to install MySQL locally; we ran it as a container:\n\ndocker run -e MYSQL_ROOT_PASSWORD=petclinic -e MYSQL_DATABASE=petclinic -p 3306:3306 mysql:5.7.8\n\nThen, we configured our services to use the MySQL profile by setting an environment variable in the Dockerfile:\n\nENV SPRING_PROFILES_ACTIVE docker,mysql\n\n2. Custom Metrics with Micrometer\nWe used the @Timed annotation to track how long specific operations took, such as managing owner records in the customers-service:\n\n@Timed(\"petclinic.owner\")\npublic class OwnerResource { ... }"
      },
      {
        heading: "What I Got Most Out of This Project",
        body: "The biggest takeaway for me was the shift in mindset toward system reliability and automation.\n\n• Decoupling: Understanding that services like visits-service and vets-service can scale independently.\n• Automation: Using the included Jenkins and Ansible configurations to automate the delivery pipeline.\n• Visibility: Learning to use the Hystrix Dashboard and Grafana to visualize system health was invaluable."
      },
      {
        heading: "Architectural Design of the PetClinic Microservices Project",
        body: "1. Project Overview and Distributed System Goals\nThe PetClinic Microservices project is a distributed evolution of the classic Spring PetClinic Sample Application. This architecture serves as a premier reference for transitioning from a monolithic codebase to a decoupled, microservices-oriented system. By leveraging the Spring Cloud Netflix technology stack, the project demonstrates how to decompose business logic into independent, scalable units.\n\nThis document is designed for learners in DevOps, Docker, and Kubernetes. The primary objective is to illustrate the practical implementation of service discovery, centralised configuration, API routing, and resilient communication within a containerised ecosystem."
      },
      {
        heading: "Distributed Architecture and Spring Cloud Components",
        body: "The system is partitioned into specialised services categorised into infrastructure and business logic. An AngularJS frontend interacts with the backend through an API Gateway, which handles routing to the appropriate microservice.\n\nCore Spring Cloud Infrastructure:\n• Config Server: Centralizes external configuration. Supports a local profile (http://localhost:8888).\n• Discovery Server (Eureka): Manages service registration and discovery (http://localhost:8761).\n• API Gateway (Zuul): Acts as the reverse proxy and single entry point for the frontend (http://localhost:8080).\n• Circuit Breaker (Hystrix): Ensures system resilience by preventing cascading failures (Dashboard: http://localhost:7979).\n\nBusiness Microservices:\n• customers-service: Handles owner and pet management.\n• vets-service: Manages veterinarian data.\n• visits-service: Tracks pet visit history."
      },
      {
        heading: "Database Configuration and Persistence",
        body: "By default, the application utilises HSQLDB, an in-memory database ideal for rapid development.\n\nFor persistent storage, the project includes support for MySQL.\n• Docker Implementation: docker run -e MYSQL_ROOT_PASSWORD=petclinic -e MYSQL_DATABASE=petclinic -p 3306:3306 mysql:5.7.8\n• Profile Activation: Activate the MySQL profile by passing the program argument: --spring.profiles.active=mysql.\n• Docker Deployment: For containerized environments, the profile is set via an environment variable in the Dockerfile: ENV SPRING_PROFILES_ACTIVE docker,mysql."
      },
      {
        heading: "Containerisation and Deployment Strategy",
        body: "The project emphasises consistency across environments through strict containerisation.\n\n• Build Process: Images are generated via the Maven wrapper: ./mvnw clean install -PbuildDocker.\n• Orchestration: Use docker-compose up to launch the infrastructure.\n• Startup Coordination: Container startup order is managed via a dedicated dockerize script, ensuring infrastructure readiness before business services attempt to connect.\n\nNote to Learners: On Windows or MacOS, the Docker VM requires significant memory allocation. Insufficient RAM will cause the docker-compose up process to be exceptionally slow or fail."
      },
      {
        heading: "Observability and Monitoring Setup",
        body: "The application uses MicroMeter and Spring Boot Actuator for instrumentation. Key business metrics are captured via the @Timed annotation on controllers (e.g., petclinic.owner).\n\nMonitoring Stack:\n• Prometheus: Scrapes and stores metrics from the microservices (http://localhost:9091).\n• Grafana: Provides the visualization layer with pre-configured dashboards (http://localhost:3000).\n• Admin Server: A Spring Boot Admin instance provides a management UI (http://localhost:9090).\n• Distributed Tracing: Zipkin is used to track request flows across services (http://localhost:9411/zipkin/)."
      },
      {
        heading: "Project Takeaways and Best Practices",
        body: "• Startup Sequencing: Always start the Config Server and Discovery Server first. These are prerequisite dependencies for the business microservices.\n• Resource Allocation: Multi-container environments demand high memory overhead. Monitor your host resources to avoid startup bottlenecks.\n• Service Readiness: Do not rely solely on the console log for service availability. Use the Eureka Dashboard to verify that a service is registered and available to the API Gateway.\n• Profile-Based Configuration: Leverage Spring Profiles (local, docker, mysql) to switch between environment-specific behaviors without code changes."
      }
    ]
  },
  {
    id: "gitops-argocd-openshift",
    title: "Zero-Downtime Deployments with GitOps: Lessons from OpenShift Production",
    date: "March 15, 2024",
    readTime: "7 min read",
    excerpt:
      "After building and operating GitOps-based OpenShift platforms for public sector clients, I share the patterns, pitfalls, and practices that made the difference between reliable and chaotic deployments.",
    tags: ["GitOps", "ArgoCD", "OpenShift", "Helm"],
    sections: [
      {
        heading: "Why GitOps Changed How I Think About Deployments",
        body: "Before GitOps, deployments were a source of anxiety: SSH into servers, run scripts, and hope nothing broke in ways you couldn't trace. GitOps flips this model entirely. The Git repository becomes the single source of truth, and the cluster continuously reconciles itself toward that declared desired state.\n\nIn practice, working with Argo CD on OpenShift transformed how my team operated. Every configuration change goes through a pull request. Every deployment is fully traceable. And when something breaks — which it will — you have a clear rollback path: just revert the Git commit. That auditability alone is worth the initial setup effort, especially in regulated public sector environments.",
      },
      {
        heading: "The Argo CD Setup That Actually Works in Enterprise",
        body: "The App of Apps pattern is essential for managing multiple environments at scale. Instead of one monolithic Argo CD Application, you have a parent Application that manages child Applications — one per microservice or platform component. This gives you fine-grained sync control without losing the global overview in the Argo CD UI.\n\nFor production environments, I configure Argo CD with automated sync for non-production (dev, staging) and manual sync gates for production. Combined with health checks on Deployments, Services, and custom OpenShift resources (like Routes and Operators), you get drift detection and controlled promotion without sacrificing speed in lower environments. Automated rollbacks on failed sync hooks have saved us more than once.",
      },
      {
        heading: "Handling Secrets: The Gap GitOps Doesn't Solve by Default",
        body: "The biggest gap in a naive GitOps setup is secrets management. You cannot commit plaintext secrets to Git — yet your cluster needs them. The solution I've used successfully at scale is Sealed Secrets: secrets are encrypted with a cluster-specific public key and committed as SealedSecret objects. Only the cluster can decrypt them, so the encrypted blob is safe in Git.\n\nFor larger setups, HashiCorp Vault with the Vault Agent Injector or the Secrets Store CSI Driver integrates well with OpenShift. The principle stays the same: Git holds references and encrypted blobs, never plaintext credentials. Combining this with namespace-level RBAC ensures that a compromised application namespace cannot access secrets from another team's namespace.",
      },
    ],
  },
  {
    id: "terraform-production-patterns",
    title: "Infrastructure as Code That Scales: Terraform Patterns from Real Projects",
    date: "January 22, 2024",
    readTime: "6 min read",
    excerpt:
      "From AWS IoT architectures to Azure-based enterprise platforms, these Terraform patterns have saved me from painful refactors and team conflicts.",
    tags: ["Terraform", "IaC", "AWS", "Azure"],
    sections: [
      {
        heading: "Module Structure: Invest Early or Pay Later",
        body: "The most common Terraform mistake I've seen — and made — is starting with a flat structure that seems convenient at first. Within months, you have a 2000-line main.tf that nobody wants to touch. The fix is to go modular from day one.\n\nI organize Terraform code in three layers: infrastructure modules (VPC, EKS/AKS, databases — generic building blocks), service modules (application-specific resources that compose infrastructure modules), and environment compositions (dev/staging/prod directories that call modules with environment-specific variable files). This separation makes code reuse natural and environment-specific changes safe without duplication.",
      },
      {
        heading: "Remote State and Locking: Non-Negotiable in Teams",
        body: "Local state files are fine for tutorials. For real projects with multiple engineers, remote state with locking is mandatory. On AWS I use S3 with DynamoDB locking; on Azure, the azurerm backend with blob storage and automatic state locking works seamlessly.\n\nOne pattern I always enforce: separate state files per environment. Never share state between dev and production. When a dev environment state gets corrupted (and eventually it will), it should be completely isolated from production. I also keep separate state for the foundational infrastructure (networking, IAM) vs. application-level resources — this minimizes blast radius when running plans.",
      },
      {
        heading: "Testing Before You Apply: Linting, Plans, and Policy Gates",
        body: "Terraform's plan output is good but not sufficient for catching logical errors before they reach production. I integrate several validation layers into CI/CD: terraform validate and tflint run on every PR to catch syntax and provider-level issues early. The plan output is saved and posted as a PR comment so reviewers see the exact diff before approving.\n\nFor policy enforcement, OPA with Conftest checks plans against organizational policies (required tags, approved instance types, no public S3 buckets) before apply. This is far more reliable than code review alone for compliance-sensitive environments. On merge to main, terraform apply runs automatically for dev; production requires a manual pipeline trigger after the plan is reviewed.",
      },
    ],
  },
  {
    id: "gitlab-cicd-platform-engineering",
    title: "Building Production-Grade CI/CD Pipelines in GitLab",
    date: "November 8, 2023",
    readTime: "5 min read",
    excerpt:
      "A platform engineer's guide to GitLab CI/CD: pipeline architecture, caching strategies, and security scans that won't kill your build times.",
    tags: ["GitLab", "CI/CD", "DevOps", "Pipeline"],
    sections: [
      {
        heading: "Pipeline Architecture: Think in Stages, Not Jobs",
        body: "A common anti-pattern is one giant pipeline stage called 'build' that does everything. When it fails after 20 minutes, you don't know if it was a lint error, a test failure, or a build issue.\n\nThe pipeline structure I've landed on for most GitLab projects: validate (lint, static analysis) → build (compile, Docker image) → test (unit, integration) → security (SAST, container scanning) → deploy-staging → deploy-production. Each stage runs jobs in parallel where possible. Failures in early stages cancel later ones immediately, preserving runner minutes and giving developers instant feedback on cheap checks before expensive ones run.",
      },
      {
        heading: "Caching and Artifacts: Where Most Pipeline Time Is Lost",
        body: "The difference between a 5-minute and a 25-minute pipeline is almost always caching. GitLab's cache is key-based per branch and per runner; get the cache key wrong and you're downloading node_modules or Maven dependencies on every single run.\n\nFor Docker builds, I use Kaniko or BuildKit with registry caching enabled. The build job pulls the previous image as a cache source (--cache-from) and pushes layer cache back to the registry. On a large Java Spring microservice project, this optimization cut build times from 18 minutes to under 4 minutes — a change that visibly improved team velocity and morale.",
      },
      {
        heading: "Security Scanning Without Slowing Your Team Down",
        body: "Security scanning that blocks every PR leads to developers finding workarounds or ignoring results entirely. The key is making scans fast and actionable. SAST with GitLab's built-in analyzers adds roughly 90 seconds and produces inline MR comments that developers can address without leaving the review UI. Container scanning with Trivy runs in parallel with deployment, so it never blocks the critical path.\n\nFor vulnerability policy enforcement, I use GitLab's Security Policies to auto-block merges with high-severity findings, but only for production-destined branches. Feature branches get warning annotations, not hard blocks. This keeps development velocity high while ensuring that nothing with a critical CVE reaches production unreviewed.",
      },
    ],
  },
];

export default blogPosts;
