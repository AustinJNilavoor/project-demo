import { useState } from "react";
import { profile, project } from "./data";
import "./App.css";

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.76 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const STATUS_LABELS = {
  live: "Live",
  development: "Development",
  offline: "Offline",
};

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function CopyButton({ value, label = "Copy" }) {
  const [state, setState] = useState("idle"); // idle | copied | error

  const handleCopy = async () => {
    const ok = await copyText(value);
    setState(ok ? "copied" : "error");
    setTimeout(() => setState("idle"), 1500);
  };

  return (
    <button className="btn btn-small" onClick={handleCopy}>
      {state === "copied" ? "Copied ✓" : state === "error" ? "Failed" : label}
    </button>
  );
}

function CredentialCard({ credential }) {
  const [showPassword, setShowPassword] = useState(false);
  const { role, description, email, password } = credential;

  const allText = `Role: ${role}\nEmail: ${email}\nPassword: ${password}`;

  return (
    <div className="credential">
      <div className="credential-head">
        <div>
          <div className="credential-role">{role}</div>
          {description && <div className="credential-desc">{description}</div>}
        </div>
        <CopyButton value={allText} label="Copy all" />
      </div>

      <div className="field">
        <span className="field-label">Email</span>
        <span className="field-value">{email}</span>
        <div className="field-actions">
          <CopyButton value={email} />
        </div>
      </div>

      <div className="field">
        <span className="field-label">Password</span>
        <span className="field-value">
          {showPassword ? password : "••••••••••••"}
        </span>
        <div className="field-actions">
          <button
            className="btn btn-small"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          <CopyButton value={password} />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const {
    name,
    description,
    status,
    technologies,
    links,
    credentials,
    slowLoadWarning,
  } = project;

  return (
    <div className="page">
      <header className="header">
        <div className="header-inner">
          <div>
            <h1 className="title">{profile.title}</h1>
            <p className="subtitle">{profile.subtitle}</p>
          </div>
          {profile.githubUrl && (
            <a
              className="btn"
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Profile <ExternalIcon />
            </a>
          )}
        </div>
      </header>

      <main className="main">
        <section className="card">
          <div className="card-top">
            <h2 className="project-name">{name}</h2>
            {status && (
              <span className={`badge badge-${status}`}>
                {status === "live" && <span className="dot" />}
                {STATUS_LABELS[status] || status}
              </span>
            )}
          </div>

          <p className="description">{description}</p>

          {technologies?.length > 0 && (
            <div className="tags">
              {technologies.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="links">
            {links.frontend && (
              <a className="btn" href={links.frontend} target="_blank" rel="noopener noreferrer">
                <GithubIcon /> Frontend Code <ExternalIcon />
              </a>
            )}
            {links.backend && (
              <a className="btn" href={links.backend} target="_blank" rel="noopener noreferrer">
                <GithubIcon /> Backend Code <ExternalIcon />
              </a>
            )}
            {links.live && (
              <a className="btn btn-primary" href={links.live} target="_blank" rel="noopener noreferrer">
                Live Demo <ExternalIcon />
              </a>
            )}
          </div>

          {slowLoadWarning?.show && (
            <div className="notice" role="note">
              <span className="notice-icon" aria-hidden="true">⚠</span>
              <span>{slowLoadWarning.message}</span>
            </div>
          )}

          {credentials?.length > 0 && (
            <div className="credentials">
              <h3 className="section-title">Demo Credentials</h3>
              <p className="section-sub">
                Use these accounts to explore different roles in the application.
              </p>
              <div className="credential-list">
                {credentials.map((c) => (
                  <CredentialCard key={c.role} credential={c} />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}