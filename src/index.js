export default {
  async fetch(request, env, ctx) {
    // Get the response from ASSETS binding
    let response = await env.ASSETS.fetch(request);

    // Only inject CSS into HTML responses
    if (response.headers.get('content-type')?.includes('text/html')) {
      let html = await response.text();

      // CSS to inject
      const injectedCSS = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: #f5f3ee;
          color: #171717;
          line-height: 1.6;
        }

        .page-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Header */
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 6vw;
          background: #fff;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .brand {
          font-size: 1.4rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .topbar nav {
          display: flex;
          gap: 32px;
        }

        .topbar nav a {
          text-decoration: none;
          color: #555;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.2s;
        }

        .topbar nav a:hover {
          color: #000;
        }

        /* Hero Section */
        .hero {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 40px;
          align-items: center;
          padding: 80px 6vw;
          background: #fff;
        }

        .eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 12px;
          font-weight: 700;
          color: #6b5e4f;
          margin-bottom: 12px;
        }

        .hero-copy h1 {
          font-size: clamp(2.5rem, 5vw, 5rem);
          line-height: 1.1;
          margin: 0 0 18px;
          font-weight: 800;
          letter-spacing: -0.01em;
        }

        .lead {
          font-size: 1.1rem;
          line-height: 1.7;
          max-width: 620px;
          color: #3d3d3d;
          margin-bottom: 24px;
        }

        .meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
        }

        .meta-row span {
          background: #e7dfd4;
          color: #1f1f1f;
          padding: 10px 14px;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .cta-row {
          display: flex;
          gap: 16px;
          margin-top: 32px;
        }

        .btn {
          display: inline-block;
          padding: 12px 28px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
        }

        .btn.primary {
          background: #1f1f1f;
          color: #fff;
        }

        .btn.primary:hover {
          background: #000;
          transform: translateY(-2px);
        }

        .btn.secondary {
          background: transparent;
          color: #1f1f1f;
          border: 2px solid #1f1f1f;
        }

        .btn.secondary:hover {
          background: #f5f3ee;
        }

        .profile-card {
          background: #fff;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .profile-card img {
          display: block;
          width: 100%;
          height: 420px;
          object-fit: cover;
        }

        .profile-details {
          padding: 22px 24px 28px;
        }

        .profile-details h2 {
          margin: 0 0 8px;
          font-size: 2rem;
          font-weight: 700;
        }

        .profile-details p {
          margin: 0;
          color: #555;
          font-size: 0.95rem;
        }

        /* Section Heading */
        .section-heading {
          max-width: 760px;
          margin-bottom: 40px;
        }

        .section-heading h2 {
          font-size: clamp(2rem, 4vw, 3.4rem);
          margin: 10px 0 14px;
          font-weight: 800;
          letter-spacing: -0.01em;
        }

        .section-heading p {
          color: #444;
          line-height: 1.7;
          font-size: 1.05rem;
        }

        .link-highlight {
          color: #1f1f1f;
          text-decoration: none;
          font-weight: 600;
          border-bottom: 2px solid #1f1f1f;
          transition: all 0.2s;
        }

        .link-highlight:hover {
          color: #555;
          border-bottom-color: #555;
        }

        /* Recommendations Section */
        .recommendations-section {
          padding: 80px 6vw;
          background: #f5f3ee;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }

        .testimonial-card {
          background: #fff;
          border-radius: 16px;
          padding: 28px;
          border: 1px solid rgba(0, 0, 0, 0.04);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
        }

        .quote {
          font-size: 0.95rem;
          line-height: 1.8;
          color: #2a2a2a;
          font-weight: 500;
          margin-bottom: 20px;
          flex-grow: 1;
        }

        .quote::before {
          content: '"';
          font-size: 2rem;
          color: #d0c8be;
          margin-right: 4px;
        }

        .testimonial-footer {
          border-top: 1px solid #eae5da;
          padding-top: 16px;
        }

        .author {
          margin: 0;
          font-weight: 700;
          font-size: 0.95rem;
          color: #1f1f1f;
        }

        .role {
          margin: 4px 0 0;
          font-size: 0.85rem;
          color: #7b7b7b;
        }

        /* Work Section */
        .work-section {
          padding: 80px 6vw;
          background: #fff;
        }

        .work-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 22px;
        }

        .case-card {
          background: #f0ece7;
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 24px;
          padding: 26px;
          min-height: 220px;
          transition: all 0.3s;
          cursor: pointer;
        }

        .case-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
          background: #e7dfd4;
        }

        .case-number {
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          color: #7b685b;
          font-weight: 700;
          margin-bottom: 18px;
        }

        .case-card h3 {
          font-size: 1.9rem;
          margin: 0 0 12px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .case-label {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 700;
          color: #6b5e4f;
          margin-bottom: 14px;
        }

        .case-card p:last-child {
          margin: 0;
          font-size: 1.1rem;
          color: #1d1d1d;
          font-weight: 600;
        }

        /* Footer */
        .footer {
          background: #1f1f1f;
          color: #fff;
          padding: 60px 6vw;
          text-align: center;
          margin-top: auto;
        }

        .footer p {
          margin: 0 0 16px;
          font-size: 1.1rem;
          line-height: 1.7;
        }

        .footer a {
          color: #fff;
          text-decoration: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.4);
          transition: border-color 0.2s;
        }

        .footer a:hover {
          border-bottom-color: #fff;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero {
            grid-template-columns: 1fr;
            padding: 50px 5vw;
          }

          .topbar {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .topbar nav {
            gap: 20px;
            font-size: 0.9rem;
          }

          .work-grid,
          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .cta-row {
            flex-direction: column;
          }

          .btn {
            width: 100%;
            text-align: center;
          }

          .profile-card img {
            height: 300px;
          }
        }
      </style>
      `;

      // Inject CSS before closing head tag
      html = html.replace('</head>', injectedCSS + '</head>');

      // Return new response with injected CSS
      return new Response(html, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers),
      });
    }

    // Return non-HTML responses as-is
    return response;
  },
};
