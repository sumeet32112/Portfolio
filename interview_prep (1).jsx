
import { useState, useRef } from "react";

const RESUME = `Sumeet Kumar Singh — ~3 years SDE experience
Languages: Java, TypeScript, HTML5, SQL
Frameworks: Spring Boot, Spring Cloud, Spring Security, Angular, JUnit 5, Mockito
Messaging: RabbitMQ, REST APIs, API Gateway, Eureka Server (Microservice Architecture)
AI Tools: Claude.ai, GitHub Copilot, ChatGPT, Slingshot AI
DB: MySQL | DevOps: Docker, Git, Maven
CodeChef 1945 (4-star), Codeforces 1665 (Expert)
Education: B.Tech Chemical Engineering, IIT Varanasi (BHU), GPA 8.0
Experience:
- Associate SDE II, Publicis Sapient (Dec 2025–Present): Spring Security+JWT RBAC in multi-tenant enterprise app; SDLC automation with Slingshot Workflow Builder (AI-driven nodes, CI/CD triggers); GitHub Copilot+Claude.ai+ChatGPT daily workflows; formal Prompt Engineering training; enterprise training Java/Spring Boot/Spring Cloud/React/MySQL/Docker
- SDE, Boxfile (Jun 2023–Dec 2025): Hierarchical RBAC Spring Security+JWT; server-side pagination (25% API response improvement); RabbitMQ async email dispatch & long-running jobs (35% faster background processing); Spring Scheduler cron jobs (20% fewer overdue tasks); i18n/L10n 3+ regional markets centralized config server-client; microservice migration (20% coupling reduction via API contracts+async+domain-driven); Claude.ai+Copilot for JUnit5/Mockito tests and documentation
Projects:
- Hotel Rating System: 3 microservices (User/Hotel/Rating), Eureka Server, API Gateway routing+auth, Resilience4j (Circuit Breaker/Retry/Rate Limiter), RestTemplate client-side load balancing
- AI-Assisted Dev Workflow Toolkit: Structured prompt library for code gen/refactoring/unit test scaffolding/API docs; 40%+ boilerplate reduction; enterprise best practices for LLM integration (Claude.ai, Copilot) in Java without compromising security/quality`;

const TOPICS = [
  { id: "java-core", name: "Java Core", icon: "☕", cat: "Language", ctx: "OOP pillars (inheritance, polymorphism, encapsulation, abstraction), interfaces vs abstract classes, generics, Java Collections Framework (ArrayList vs LinkedList internals, HashMap internals — hashing, collision, load factor, rehashing, TreeMap, HashSet), Streams API, Lambda, Optional, functional interfaces, String pool/interning, equals/hashCode contract, Comparable vs Comparator, var keyword, records, sealed classes, Java 8–17 features, autoboxing pitfalls, immutability, pass-by-value vs reference." },
  { id: "jvm-gc", name: "JVM & GC", icon: "🖥️", cat: "Language", ctx: "Class loading (bootstrap/extension/application classloaders, delegation model), bytecode, JIT compilation (C1/C2 compiler, tiered compilation), HotSpot optimization, heap regions (Eden/S0/S1/Old Gen/Metaspace), GC algorithms (Serial, Parallel, G1GC phases, ZGC, Shenandoah), GC tuning (-Xms/-Xmx/-XX:+UseG1GC, GC logs), memory leaks (common causes, detection), heap dumps (jmap, analysis), Java Memory Model, happens-before ordering, volatile semantics, safe publication, OutOfMemoryError types." },
  { id: "multithreading", name: "Multithreading", icon: "⚡", cat: "Language", ctx: "Thread lifecycle, Runnable vs Callable vs Future, synchronized keyword (object vs class-level lock), volatile keyword (visibility, not atomicity), AtomicInteger/AtomicReference/LongAdder, java.util.concurrent: ExecutorService, ThreadPoolExecutor (corePoolSize/maxPoolSize/queue/rejectionPolicy), ScheduledExecutorService, CompletableFuture (thenApply/thenCompose/allOf/anyOf), CountDownLatch, CyclicBarrier, Semaphore, BlockingQueue (ArrayBlocking vs LinkedBlocking), ConcurrentHashMap internals, ReentrantLock vs synchronized, ReadWriteLock, StampedLock, deadlock detection and prevention, ThreadLocal, ForkJoinPool, virtual threads Java 21." },
  { id: "spring-boot", name: "Spring Boot", icon: "🌱", cat: "Framework", ctx: "IoC container, DI types (constructor preferred — why, setter, field), Bean lifecycle (instantiation, populate, postConstruct, destroy), Bean scopes (singleton/prototype/request/session — when to use each), @Conditional/@ConditionalOnProperty, auto-configuration mechanics (spring.factories, @EnableAutoConfiguration, @Import), Spring Data JPA (SimpleJpaRepository, custom queries, @Query, JPQL, native), Spring MVC request lifecycle (DispatcherServlet → HandlerMapping → HandlerAdapter → ViewResolver), filters vs interceptors vs @Aspect AOP, @Transactional (propagation: REQUIRED/REQUIRES_NEW/NESTED; isolation levels), Spring Actuator (/health, /metrics, /env), profiles (@Profile, spring.profiles.active), @ConfigurationProperties binding, @SpringBootTest vs @WebMvcTest vs @DataJpaTest." },
  { id: "spring-security", name: "Spring Security", icon: "🔒", cat: "Framework", ctx: "Sumeet implemented JWT+RBAC at Boxfile and Publicis Sapient. Cover: SecurityFilterChain configuration chain, how authentication flows (UsernamePasswordAuthenticationFilter → AuthenticationManager → AuthenticationProvider → UserDetailsService), JWT structure (header.payload.signature, signing algorithms HS256 vs RS256), token parsing/validation in OncePerRequestFilter, refresh token strategy (rotation, storage), RBAC implementation (@PreAuthorize expressions, @Secured, method security), CSRF (when to disable, why for stateless), CORS configuration, PasswordEncoder (BCrypt cost factor), multi-tenancy (tenant per schema vs per DB vs discriminator column), OAuth2 resource server, common attacks (JWT tampering, privilege escalation, token theft)." },
  { id: "microservices", name: "Microservices", icon: "🔗", cat: "Architecture", ctx: "Sumeet did microservice migration at Boxfile (20% coupling reduction) and built Hotel Rating System (3 services). Cover: decomposition patterns (by business capability, by subdomain, strangler fig), service discovery with Eureka (heartbeat, eviction, self-preservation mode, client-side vs server-side load balancing), API Gateway (routing, auth enforcement, rate limiting, request aggregation, Spring Cloud Gateway filters), inter-service communication (sync RestTemplate/OpenFeign vs async RabbitMQ — tradeoffs), saga pattern (choreography vs orchestration, compensating transactions), two-phase commit vs eventual consistency, distributed tracing (Sleuth+Zipkin), 12-factor app, Docker containerization, health endpoints, bulkhead to prevent cascade failures." },
  { id: "rabbitmq", name: "RabbitMQ", icon: "🐇", cat: "Messaging", ctx: "Sumeet integrated RabbitMQ at Boxfile for email dispatch and long-running jobs — 35% faster background processing. Cover: AMQP protocol, exchange types (direct: exact routing key match; topic: wildcard */#; fanout: broadcasts all; headers: header-based routing), queue declarations (durable/exclusive/auto-delete), message acknowledgment modes (auto vs manual ack/nack/reject, requeue behavior), dead letter exchange (DLX) and DLQ configuration, message TTL (per-message vs per-queue), prefetch count (QoS — prevent consumer overload), publisher confirms (async confirms, mandatory flag), consumer concurrency (concurrentConsumers, maxConcurrentConsumers in Spring AMQP), priority queues, RabbitMQ clustering (disk vs RAM nodes), HA policies (all/exactly/nodes), at-least-once delivery and idempotent consumers, @RabbitListener with @RabbitHandler." },
  { id: "resilience4j", name: "Resilience4j", icon: "🛡️", cat: "Architecture", ctx: "Sumeet implemented Resilience4j in Hotel Rating System (Circuit Breaker + Retry + Rate Limiter). Cover in depth: Circuit Breaker — CLOSED/OPEN/HALF_OPEN states and transitions, failure rate threshold (failureRateThreshold), slow call rate threshold (slowCallRateThreshold, slowCallDurationThreshold), sliding window types (COUNT_BASED vs TIME_BASED), permitted calls in half-open (permittedNumberOfCallsInHalfOpenState), waitDurationInOpenState; Retry — maxAttempts, waitDuration, exponential backoff (multiplier), randomized wait (jitter to avoid thundering herd), retryOnException vs retryOnResult; RateLimiter — limitForPeriod, limitRefreshPeriod, timeoutDuration, SemaphoreBased vs AtomicBased; Bulkhead — SemaphoreBased (maxConcurrentCalls) vs ThreadPoolBulkhead (maxThreadPoolSize, queueCapacity); TimeLimiter; @CircuitBreaker @Retry annotations; fallback methods; combining decorators; comparing with Hystrix (why Hystrix deprecated)." },
  { id: "database", name: "Database & SQL", icon: "🗄️", cat: "Database", ctx: "Sumeet used MySQL throughout. Cover: B-tree index structure (leaf nodes, internal nodes, why B-tree not binary tree), composite indexes (column order matters — leftmost prefix rule), covering indexes (index-only scans), index selectivity and cardinality, EXPLAIN plan (type: ALL/ref/range/const — what each means, key_len, rows, Extra: Using index / Using filesort / Using temporary), slow query optimization techniques, ACID (atomicity — undo log; consistency; isolation — MVCC in InnoDB; durability — redo log, WAL), isolation levels and phenomena (dirty read, non-repeatable read, phantom read), row-level locking (shared vs exclusive lock, intention locks), InnoDB deadlock detection, N+1 problem (how it happens in JPA lazy loading, solutions: JOIN FETCH, @EntityGraph, batch size), database normalization (1NF/2NF/3NF/BCNF with examples), sharding (horizontal partitioning, shard key selection), replication (master-slave lag, read replicas), HikariCP connection pool tuning." },
  { id: "rest-api", name: "REST API Design", icon: "🔌", cat: "Architecture", ctx: "Sumeet implemented server-side pagination (25% API improvement) and worked with API Gateway. Cover: REST constraints (stateless, uniform interface, layered, cacheable), HTTP methods (GET/POST/PUT/PATCH/DELETE — idempotency matrix, safe vs unsafe), status codes (201 vs 200 for POST, 204 vs 200 for DELETE, 400 vs 422, 401 vs 403, 409 conflict), API versioning strategies (URI /v1/ vs Accept header vs custom header — tradeoffs, backwards compatibility), pagination: cursor-based (stable, works with real-time data, opaque cursor design) vs offset-based (simple but unstable under inserts — explain the problem), HATEOAS (Richardson maturity model levels), error response format (RFC 7807 Problem Details — type/title/status/detail/instance), OpenAPI/Swagger annotations, idempotency keys for POST, ETag for conditional requests, rate limiting headers (X-RateLimit-Limit, Retry-After), content negotiation (Accept/Content-Type), API contract first design." },
  { id: "system-design", name: "System Design", icon: "🏗️", cat: "Architecture", ctx: "Cover scalability fundamentals: horizontal vs vertical scaling (when each; stateless services scale horizontally), load balancing algorithms (round-robin, least connections, IP hash for session affinity, consistent hashing for distributed cache), caching (L1 in-process Caffeine, L2 distributed Redis — data structures, eviction policies LRU/LFU/TTL, cache-aside vs write-through vs write-behind vs read-through, cache stampede problem and solutions, CDN for static assets), database read replicas and write scaling, CAP theorem (examples: CP=HBase/Zookeeper, AP=Cassandra/DynamoDB, CA=MySQL single-node), BASE properties, message queues for async decoupling (when to use), rate limiting algorithms (token bucket — bursty traffic allowed; leaky bucket — smooth output; sliding window log; sliding window counter), observability pillars (metrics/logs/distributed traces — what each tells you), designing: notification service (like Boxfile email reminders at scale), hotel booking like Hotel Rating System at scale, URL shortener (consistent hashing, 301 vs 302)." },
  { id: "proj-hotel", name: "Hotel Rating System", icon: "🏨", cat: "Project", ctx: "Deep dive into Sumeet's Hotel Rating System project: 3 independent microservices (User service handles auth/profiles, Hotel service handles hotel CRUD, Rating service handles ratings/reviews), Eureka Server for service discovery (how services register, heartbeat, what happens when a service goes down), API Gateway for centralized routing and auth enforcement (how JWT validation at gateway level works, what routes to which service), Resilience4j Circuit Breaker protects Rating service calls (what happens when Rating service is slow/down — fallback response, how circuit opens), Retry (how retries are configured, exponential backoff, what is retried), Rate Limiter (protecting individual endpoints from overload), RestTemplate with client-side load balancing (Ribbon/Spring Cloud LoadBalancer — how it picks instance from Eureka registry). Deep questions: why 3 services not 2 or 4? data consistency across services (eventual consistency)? how do you join User+Hotel+Rating data (API composition pattern)? what if Rating service is down when user submits rating? how to scale this? how to test microservices? what would you add next?" },
  { id: "proj-ai-toolkit", name: "AI Dev Toolkit", icon: "🤖", cat: "Project", ctx: "Deep dive into Sumeet's AI-Assisted Dev Workflow Toolkit project: structured prompt library for backend Java development covering (1) code generation prompts — how to prompt for Spring Boot REST endpoints, service classes, repository layer; (2) refactoring prompts — asking AI to improve code quality, extract methods, apply design patterns; (3) unit test scaffolding — prompting JUnit5+Mockito test generation for service/repository/controller layers; (4) API documentation — generating OpenAPI/Swagger docs. Achieved 40%+ boilerplate reduction. Documented enterprise-grade best practices for safely integrating Claude.ai and Copilot into Java development cycles without compromising code quality or security (no secrets in prompts, reviewing AI output critically, hallucination handling). Questions: what makes a prompt effective for code generation? how do you handle AI hallucinations in enterprise? how did you measure 40% reduction? what prompt patterns worked best? security considerations? limitations encountered? where do AI tools fail for backend dev?" },
  { id: "exp-boxfile", name: "Boxfile Work", icon: "📦", cat: "Experience", ctx: "Deep interview on Sumeet's Boxfile experience (Jun 2023 – Dec 2025): (1) RBAC system — hierarchical role structure, how Spring Security integrates with JWT for RBAC, how fine-grained permission management works, how roles are stored and resolved; (2) Pagination — why server-side not client-side, how he implemented it in Spring Data (Pageable, Page<T>), how Angular consumed it, what 25% improvement was measured against and how; (3) RabbitMQ integration — architecture of email dispatch workflow, why async vs sync, how failures/retries handled, how 35% improvement measured; (4) Spring Scheduler — cron expression design, how email reminders triggered, idempotency of scheduled jobs, what 20% improvement means; (5) i18n/L10n — centralized config server design, how locale detection works, how client fetches translations, supporting 3+ regional markets (what challenges arose); (6) Microservice migration — what was migrated from (monolith?), how domain boundaries decided, how 20% coupling reduction measured, challenges in migration; (7) AI-assisted delivery — concrete examples of using Claude.ai for test generation." },
  { id: "exp-pubsap", name: "Publicis Sapient", icon: "🏢", cat: "Experience", ctx: "Deep interview on Sumeet's Publicis Sapient role (Dec 2025–Present): (1) Multi-tenant Spring Security + JWT — how multi-tenancy is implemented (tenant isolation strategies: schema per tenant vs DB per tenant vs discriminator column), how JWT carries tenant context (custom claims), how Spring Security filters extract and enforce tenant; (2) Slingshot Workflow Builder SDLC automation — what is Slingshot AI, how AI-driven nodes work in a workflow builder, how he configured auto-generation of user stories/code scaffolds/test cases, how event-driven CI/CD triggers integrate with backend services (webhooks? message queues?), challenges in automating SDLC; (3) AI integration at enterprise scale — how GitHub Copilot, Claude.ai, ChatGPT are integrated into team workflows, formal Prompt Engineering training details (techniques learned: chain-of-thought, few-shot, role prompting, output formatting), enterprise governance for AI tools; (4) Enterprise training — how he approaches learning large new codebases, Agile sprint ceremonies (daily standups, sprint planning, retrospectives, demos), Git workflows in large teams (trunk-based vs feature branches, PR review process)." },
];

const CAT_COLOR = {
  Language: { bg: "#EEEDFE", text: "#3C3489", border: "#AFA9EC" },
  Framework: { bg: "#E1F5EE", text: "#085041", border: "#5DCAA5" },
  Architecture: { bg: "#E6F1FB", text: "#0C447C", border: "#85B7EB" },
  Messaging: { bg: "#FAEEDA", text: "#633806", border: "#EF9F27" },
  Database: { bg: "#FAECE7", text: "#712B13", border: "#F0997B" },
  Project: { bg: "#FBEAF0", text: "#72243E", border: "#ED93B1" },
  Experience: { bg: "#EAF3DE", text: "#27500A", border: "#97C459" },
};

const LVL_STYLE = {
  basic: { bg: "#EAF3DE", color: "#27500A" },
  intermediate: { bg: "#FAEEDA", color: "#633806" },
  advanced: { bg: "#FCEBEB", color: "#791F1F" },
};

function repairJSON(raw) {
  let s = raw.replace(/```json|```/g, "").trim();
  // Try clean parse first
  try { return JSON.parse(s); } catch (_) {}
  // Find last complete question object by counting complete closing braces
  // Strategy: truncate after last fully-closed question object
  const qStart = s.indexOf('"questions"');
  if (qStart === -1) throw new Error("No questions array found");
  // Try to close any open strings/objects/arrays gracefully
  // Find last occurrence of a complete question: ends with }]},  or }]} for last
  const lastComplete = Math.max(
    s.lastIndexOf('}]}'),
    s.lastIndexOf('}]},')
  );
  if (lastComplete !== -1) {
    const trimmed = s.slice(0, lastComplete + 3) + (s[lastComplete + 3] === ',' ? '' : '') + ']}';
    try { return JSON.parse(trimmed); } catch (_) {}
  }
  // Last resort: extract individual question objects via regex
  const matches = [...s.matchAll(/\{"level"\s*:\s*"[^"]+"\s*,\s*"question"\s*:\s*"(?:[^"\\]|\\.)*"\s*,\s*"answer"\s*:\s*"(?:[^"\\]|\\.)*"\s*,\s*"followups"\s*:\s*\[[\s\S]*?\]\s*\}/g)];
  if (matches.length > 0) return { questions: matches.map(m => JSON.parse(m[0])) };
  throw new Error("Could not repair JSON");
}

async function generateTopic(topic) {
  const prompt = `You are a senior technical interviewer at a top tech company. Candidate:\n${RESUME}\n\nGenerate exactly 4 interview questions about: ${topic.name}\nTopic scope: ${topic.ctx}\n\nMix: 1 basic, 2 intermediate, 1 advanced.\nFor each question keep answers concise but precise (max 120 words per answer). Include exactly 2 short follow-up questions with brief answers (max 60 words each).\nReference candidate's real experience/projects where relevant.\n\nCRITICAL: Return ONLY minified valid JSON, no markdown, no backticks, no newlines inside strings — escape all newlines as \\n:\n{"questions":[{"level":"basic","question":"...","answer":"...","followups":[{"question":"...","answer":"..."},{"question":"...","answer":"..."}]}]}`;
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 4000, messages: [{ role: "user", content: prompt }] }),
  });
  const data = await resp.json();
  if (data.error) throw new Error(data.error.message);
  const raw = data.content.map((b) => b.text || "").join("");
  const parsed = repairJSON(raw);
  return parsed.questions;
}

function QACard({ q, idx, topicId }) {
  const [open, setOpen] = useState(false);
  const [fuOpen, setFuOpen] = useState({});
  const lvl = LVL_STYLE[q.level] || LVL_STYLE.intermediate;
  return (
    <div style={{ background: "var(--bg-card, #fff)", border: "0.5px solid rgba(0,0,0,0.1)", borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "11px 14px", display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: lvl.bg, color: lvl.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>{q.level}</span>
            <span style={{ fontSize: 11, color: "#888", fontFamily: "monospace" }}>Q{idx + 1}</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.5 }}>{q.question}</div>
        </div>
        <span style={{ fontSize: 14, color: "#aaa", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none", marginTop: 2, flexShrink: 0 }}>▾</span>
      </div>
      {open && (
        <div style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)", padding: 14 }}>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em", color: "#aaa", fontWeight: 600, marginBottom: 7 }}>Answer</div>
          <div style={{ fontSize: 12.5, color: "var(--color-text-primary)", lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{q.answer}</div>
          {q.followups?.length > 0 && (
            <div style={{ marginTop: 14, borderTop: "0.5px solid rgba(0,0,0,0.08)", paddingTop: 12 }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em", color: "#aaa", fontWeight: 600, marginBottom: 9 }}>Follow-up questions — click to reveal</div>
              {q.followups.map((fu, fi) => (
                <div key={fi} style={{ marginBottom: 8 }}>
                  <div onClick={() => setFuOpen(p => ({ ...p, [fi]: !p[fi] }))} style={{ display: "flex", alignItems: "flex-start", gap: 7, padding: "7px 10px", border: "0.5px solid rgba(0,0,0,0.1)", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 600, color: "var(--color-text-primary)" }}>
                    <span style={{ fontSize: 11, color: "#aaa", marginTop: 1, flexShrink: 0 }}>{fuOpen[fi] ? "▾" : "›"}</span>
                    <span>{fu.question}</span>
                  </div>
                  {fuOpen[fi] && (
                    <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.65, padding: "8px 10px 4px", whiteSpace: "pre-wrap" }}>{fu.answer}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TopicSection({ topic, questions, loading, error }) {
  const catStyle = CAT_COLOR[topic.cat] || CAT_COLOR.Language;
  return (
    <div id={`sec-${topic.id}`} style={{ marginBottom: "2.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.75rem", paddingBottom: "0.6rem", borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>
        <span style={{ fontSize: 22 }}>{topic.icon}</span>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: catStyle.bg, color: catStyle.text, border: `0.5px solid ${catStyle.border}`, marginBottom: 3, display: "inline-block" }}>{topic.cat}</span>
          <div style={{ fontSize: 16, fontWeight: 500, color: "var(--color-text-primary)" }}>{topic.name}</div>
        </div>
        <span style={{ fontSize: 11, color: "#aaa", background: "rgba(0,0,0,0.05)", padding: "3px 9px", borderRadius: 999 }}>
          {loading ? "generating..." : error ? "failed" : questions ? `${questions.length} Q` : "—"}
        </span>
      </div>
      {loading && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 0", fontSize: 13, color: "var(--color-text-secondary)" }}>
          <DotPulse /> Generating questions for {topic.name}...
        </div>
      )}
      {error && <div style={{ fontSize: 12, color: "var(--color-text-danger)", padding: "8px 0" }}>Failed to generate — {error}</div>}
      {questions && (
        <div>
          {questions.map((q, i) => <QACard key={i} q={q} idx={i} topicId={topic.id} />)}
        </div>
      )}
    </div>
  );
}

function DotPulse() {
  return (
    <span style={{ display: "inline-flex", gap: 3 }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "currentColor", opacity: 0.4, animation: `pulse 1.2s ${i * 0.2}s infinite` }} />
      ))}
      <style>{`@keyframes pulse{0%,80%,100%{opacity:.2}40%{opacity:.9}}`}</style>
    </span>
  );
}

export default function App() {
  const [state, setState] = useState({});
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0, current: "" });
  const [started, setStarted] = useState(false);
  const activeRef = useRef(null);

  const scrollTo = (id) => {
    const el = document.getElementById(`sec-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const generateAll = async () => {
    if (generating) return;
    setGenerating(true);
    setStarted(true);
    setState({});
    setProgress({ done: 0, total: TOPICS.length, current: "" });

    for (let i = 0; i < TOPICS.length; i++) {
      const topic = TOPICS[i];
      setProgress({ done: i, total: TOPICS.length, current: topic.name });
      setState(p => ({ ...p, [topic.id]: { loading: true } }));
      try {
        const questions = await generateTopic(topic);
        setState(p => ({ ...p, [topic.id]: { questions } }));
      } catch (e) {
        setState(p => ({ ...p, [topic.id]: { error: e.message } }));
      }
    }
    setProgress({ done: TOPICS.length, total: TOPICS.length, current: "" });
    setGenerating(false);
  };

  const pct = progress.total ? Math.round((progress.done / progress.total) * 100) : 0;

  return (
    <div style={{ padding: "1.5rem 0", maxWidth: 680, fontFamily: "var(--font-sans)" }}>
      <div style={{ marginBottom: "1.25rem" }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: "var(--color-text-primary)", margin: 0 }}>Interview Prep — Sumeet Kumar Singh</h1>
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 4 }}>AI-generated Q&A across all 14 topics — Java, Spring, Microservices, Projects & Experience</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.25rem", flexWrap: "wrap" }}>
        <button onClick={generateAll} disabled={generating} style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 8, border: "0.5px solid rgba(0,0,0,0.15)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontSize: 13, fontWeight: 500, cursor: generating ? "not-allowed" : "pointer", opacity: generating ? 0.6 : 1 }}>
          {generating ? <DotPulse /> : "✦"} {started ? "Regenerate All" : "Generate All Topics"} {!generating && "↗"}
        </button>
        {generating && (
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 5 }}>
              <span>{progress.current ? `Generating: ${progress.current}` : "Starting..."}</span>
              <span>{progress.done} / {progress.total}</span>
            </div>
            <div style={{ height: 4, background: "rgba(0,0,0,0.07)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "#378ADD", borderRadius: 2, transition: "width 0.4s ease" }} />
            </div>
          </div>
        )}
        {!generating && started && progress.done === progress.total && (
          <span style={{ fontSize: 12, color: "var(--color-text-success)" }}>✓ All {progress.total} topics complete</span>
        )}
      </div>

      {started && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>
          {TOPICS.map(t => {
            const s = state[t.id];
            const done = s?.questions;
            return (
              <div key={t.id} onClick={() => scrollTo(t.id)} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, padding: "4px 10px", borderRadius: 999, border: "0.5px solid rgba(0,0,0,0.1)", background: done ? "var(--color-background-info)" : "var(--color-background-secondary)", color: done ? "var(--color-text-info)" : "var(--color-text-secondary)", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}>
                {t.icon} {t.name} {done && "✓"}
              </div>
            );
          })}
        </div>
      )}

      {!started && (
        <div style={{ textAlign: "center", padding: "4rem 1rem", color: "var(--color-text-secondary)", fontSize: 13 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📋</div>
          <div style={{ fontWeight: 500, marginBottom: 6 }}>Click <strong>Generate All Topics</strong> to begin</div>
          <div style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>Creates 6 questions × 14 topics = 84 questions with follow-ups across all areas of your resume</div>
        </div>
      )}

      {started && TOPICS.map(topic => {
        const s = state[topic.id];
        return (
          <TopicSection key={topic.id} topic={topic} questions={s?.questions} loading={s?.loading} error={s?.error} />
        );
      })}
    </div>
  );
}
