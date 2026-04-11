const blogPosts = [
  {
    id: "phonebook-microservice-orchestration",
    title: "Deployment Specification: Automated Phonebook Microservice Orchestration",
    date: "January 10, 2021",
    readTime: "7 min read",
    excerpt: "A deep dive into automating the deployment of a Phonebook microservice using AWS CloudFormation and Kubernetes, featuring segmented CRUD and Search operations, persistent volumes, and secure environmental configurations.",
    tags: ["Kubernetes", "AWS", "CloudFormation", "Microservices", "Docker"],
    image: "/images/phonebook-architecture.jpeg", // Note: Ensure the image is placed here in the public folder
    sections:[
      {
        heading: "1. Infrastructure Provisioning via AWS CloudFormation",
        body: "Infrastructure as Code (IaC) is the cornerstone of modern cloud architecture, transitioning deployments from manual, error-prone configurations to programmable, repeatable environments. For the Phonebook Microservice application, AWS CloudFormation serves as the primary orchestration engine to provision the underlying compute layer. By automating the setup of Ubuntu 20.04 nodes on EC2, we ensure absolute environment parity between development, staging, and production. This strategy is critical for rapid disaster recovery; in the event of a regional or availability zone failure, the entire infrastructure stack can be redeployed within minutes.\n\nCluster Specifications:\n• Instance Type: t2.medium (Required minimum to handle control plane and container overhead)\n• Operating System: Ubuntu 20.04\n• Cluster Master: 1 Node\n• Worker Node: 1 Node\n\nTo achieve a fully automated \"zero-touch\" setup, the CloudFormation template delivers a User Data script that executes upon node initialisation:\n1. System Preparation: Updates local packages and installs the core Kubernetes stack, including kubeadm, kubectl, and kubelet.\n2. Repository Acquisition: Clones the application source code from the project's GitHub repository to local storage.\n3. Cluster Initialization: Executes kubeadm init on the master node and generates the join token for the worker.\n4. Worker Integration: Automatically joins the worker node to the cluster, establishing the node-to-node overlay network."
      },
      {
        heading: "2. Containerisation Strategy and Microservice Segmentation",
        body: "The Phonebook application architecture is intentionally decoupled into distinct microservices to enhance operational agility. By separating \"Read\" (Search) operations from \"CUD\" (Create, Update, Delete) operations, we move away from monolithic bottlenecks. This segmentation allows for independent development lifecycles; updates to the Gateway/CUD logic can be deployed without introducing downtime to the search interface.\n\nThe application is containerised into two distinct Docker images, both leveraging the Python Flask framework:\n\n• Search Image (Frontend): A read-only service dedicated to querying the database and rendering results to the user.\n• Result/Web Server Image (Backend): The application gateway responsible for the functional logic of creating, updating, and deleting records.\n\nThese services interact with the MySQL database via the internal Kubernetes DNS name provided by the Database Service. This interaction model increases application resilience: if the CUD backend experiences latency during heavy write-intensive transactions, the Search frontend remains responsive."
      },
      {
        heading: "3. Kubernetes Deployment Configuration",
        body: "Kubernetes Deployment controllers maintain the desired state of the microservices, utilising ReplicaSets to ensure high availability. If a pod fails due to resource exhaustion or application errors, the controller immediately schedules a replacement.\n\nCREATE/DELETE/UPDATE (Backend) Deployment\n• Primary Function: Application gateway for all write-heavy and administrative operations.\n• Container Port: 80.\n• Replication: Configured with one or more replicas based on traffic load.\n• Context: Processes POST requests for adding, updating, and deleting records.\n\nSEARCH (Frontend) Deployment\n• Primary Function: User interface for read-only phonebook lookups.\n• Container Port: 80.\n• Context: Dedicated to GET requests and search result rendering.\n\nFrom an architectural standpoint, separating these deployments allows for granular scaling. The Search deployment is typically CPU-bound, while the CUD deployment is I/O-bound, constrained by database transaction speeds."
      },
      {
        heading: "4. Service Discovery and Networking Architecture",
        body: "The Kubernetes networking model provides a tiered approach to accessibility. For this deployment, we utilise a hybrid strategy: NodePort services provide external ingress for end-users, while ClusterIP restricts internal components from public exposure. While NodePort is utilised here for demonstration and testing, a production-grade AWS deployment would typically front these services with an Elastic/Application Load Balancer.\n\nPublic-facing services:\n• CUD Service: Type NodePort, Port 30001 (Target Port 80)\n• Search Service: Type NodePort, Port 30002 (Target Port 80)\n\nTo secure the data layer, the Database Service is configured as follows:\n• Type: ClusterIP (Internal only)\n• Target Port: 3306\n• Security Impact: By using ClusterIP, the MySQL instance is reachable only by the Search and CUD pods via the cluster's internal network. This prevents the database from being attacked from the public internet."
      },
      {
        heading: "5. Persistent Data Layer and Volume Management",
        body: "In a Kubernetes environment, pods are ephemeral; any data stored within a container's writable layer is lost upon pod termination. To ensure the durability of phonebook records, externalised state is required.\n\nThe technical specifications for the persistent layer are:\n• PV & PVC: Capacity 20Gi, Access Mode ReadWriteOnce, Host Path Mapping: /mnt/data.\n• Scheduling Requirement: Since hostPath is used for data storage, the MySQL pod must be pinned to the worker node (via nodeSelector or nodeName) to ensure it always attaches to the physical directory where the data resides.\n\nDATABASE DEPLOYMENT Specification:\n• Image: mysql:5.7\n• Persistence: The PVC is mounted to the MySQL data directory. This ensures that even if the database pod is restarted or moved, the phonebook schema and user records remain intact."
      },
      {
        heading: "6. Environmental Configuration and Security Posture",
        body: "Separating configuration from code is a fundamental security requirement. This deployment utilises Kubernetes Secrets and ConfigMaps to inject environmental variables, preventing sensitive credentials from being leaked within container images or version control.\n\n• Sensitive Data: All database passwords are stored in kubernetes-secrets.\n• Service Discovery: The database host address is managed via a ConfigMap. Crucially, this value points to the Database Service Name (leveraging Kubernetes internal DNS) rather than a static IP address, ensuring connectivity remains stable even if the database pod is rescheduled.\n• Environmental Variables: Both deployments require MYSQL_DATABASE_HOST (from ConfigMap), MYSQL_DATABASE_USER, and MYSQL_DATABASE_PASSWORD (from Secret).\n\nThis comprehensive specification—combining IaC automation, microservice segmentation, and stateful persistence—results in a robust, production-ready orchestration."
      }
    ]
  },
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
  {
    id: 1,
    title: "The Future of GitOps in Public Sector",
    excerpt: "Exploring how automated OpenShift platforms are revolutionizing digital modernization in government agencies.",
    date: "2024-03-15",
    category: "Platform Engineering",
    readTime: "8 min read",
    content: `
      ## Introduction
      Digital modernization in the public sector has long been a challenge...
    `
  },
  {
    id: 2,
    title: "Terraform Best Practices for AWS IoT",
    excerpt: "A deep dive into managing complex IoT architectures using Infrastructure as Code and modular Terraform patterns.",
    date: "2024-02-28",
    category: "Cloud & IaC",
    readTime: "12 min read",
    content: `
      ## The IoT Challenge
      Managing IoT infrastructure at scale requires a robust approach...
    `
  }
];

export default blogPosts;
