import { useState, useEffect, useRef } from "react";


// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const D = {
  bg: "#04080f",
  surface: "#080d18",
  surface2: "#0d1525",
  surface3: "#111d30",
  cyan: "#00d4ff",
  cyanDim: "#0099cc",
  cyanGlow: "rgba(0,212,255,0.15)",
  orange: "#ff6b2b",
  orangeGlow: "rgba(255,107,43,0.12)",
  purple: "#9b64ff",
  green: "#3ecf8e",
  red: "#f05f5f",
  text: "#e8edf5",
  muted: "#6b7a94",
  border: "#1a2540",
  borderHi: "#2a3a5a",
};

// ─── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const GlobalStyle = () => {
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: ${D.bg}; color: ${D.text}; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
      ::-webkit-scrollbar { width: 4px; } 
      ::-webkit-scrollbar-track { background: ${D.bg}; }
      ::-webkit-scrollbar-thumb { background: ${D.border}; border-radius: 4px; }
      input, textarea { font-family: 'DM Sans', sans-serif; }
      input::placeholder, textarea::placeholder { color: ${D.muted}; }
      input:focus, textarea:focus { outline: none; }
      button { cursor: pointer; font-family: 'DM Sans', sans-serif; }
      @keyframes fadeUp   { from { opacity:0; transform:translateY(16px);} to { opacity:1; transform:translateY(0);} }
      @keyframes pulse    { 0%,100%{box-shadow:0 0 0 0 rgba(0,212,255,.45);} 50%{box-shadow:0 0 0 5px rgba(0,212,255,0);} }
      @keyframes pulseG   { 0%,100%{box-shadow:0 0 0 0 rgba(62,207,142,.45);} 50%{box-shadow:0 0 0 5px rgba(62,207,142,0);} }
      @keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes shimmer  { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
      @keyframes codeGlow { 0%,100%{border-color:rgba(0,212,255,0.3);} 50%{border-color:rgba(0,212,255,0.65);} }
      .anim-fadein { animation: fadeUp .5s ease both; }
      .code-glow   { animation: codeGlow 3s ease infinite; }
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);
  return null;
};

// ─── PARTICLE CANVAS ───────────────────────────────────────────────────────────
const ParticleCanvas = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let W,
      H,
      pts = [],
      raf;
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    class P {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.28;
        this.vy = (Math.random() - 0.5) * 0.28;
        this.r = Math.random() * 1.3 + 0.3;
        this.a = Math.random() * 0.4 + 0.1;
        this.c = Math.random() > 0.75;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.c
          ? `rgba(0,212,255,${this.a})`
          : `rgba(255,107,43,${this.a * 0.5})`;
        ctx.fill();
      }
    }
    for (let i = 0; i < 70; i++) pts.push(new P());
    const go = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x,
            dy = pts[i].y - pts[j].y,
            d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${0.055 * (1 - d / 110)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
      pts.forEach((p) => {
        p.update();
        p.draw();
      });
      raf = requestAnimationFrame(go);
    };
    go();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity: 0.35,
        pointerEvents: "none",
      }}
    />
  );
};

// ─── SMALL ICON HELPERS ────────────────────────────────────────────────────────
const Ic = ({ d, size = 16, color = D.cyan, sw = 1.5, fill = "none" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={fill}
    style={{ flexShrink: 0 }}>
    <path
      d={d}
      stroke={color}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const CopyIcon = ({ size = 15, color = D.muted }) => (
  <Ic
    size={size}
    color={color}
    d="M7 4H4a1 1 0 00-1 1v11a1 1 0 001 1h11a1 1 0 001-1v-3M7 4h9a1 1 0 011 1v9M7 4a1 1 0 011-1h2a1 1 0 011 1v1H8V4z"
  />
);
const CheckIc = ({ size = 14, color = D.green }) => (
  <Ic size={size} color={color} sw={2} d="M3 10l4 4L17 6" />
);
const CrossIc = ({ size = 14, color = D.red }) => (
  <Ic size={size} color={color} sw={2} d="M4 4l12 12M16 4L4 16" />
);
const PlusIc = ({ size = 16, color = D.cyan }) => (
  <Ic size={size} color={color} d="M10 3v14M3 10h14" />
);
const TrashIc = ({ size = 15, color = D.red }) => (
  <Ic
    size={size}
    color={color}
    d="M4 6h12M9 6V4h2v2M5 6l.8 10a1 1 0 001 .9h6.4a1 1 0 001-.9L15 6"
  />
);
const EditIc = ({ size = 15, color = D.cyan }) => (
  <Ic size={size} color={color} d="M14.5 2.5l3 3L6 17H3v-3L14.5 2.5z" />
);
const UploadIc = ({ size = 18, color = D.cyan }) => (
  <Ic size={size} color={color} d="M10 14V4M5 9l5-5 5 5M3 17h14" />
);
const FlowIc = ({ size = 16, color = D.purple }) => (
  <Ic size={size} color={color} d="M3 10h4M9 10h4M15 10h2M7 6v8M13 6v8" />
);
const BotIc = ({ size = 16, color = D.cyan }) => (
  <Ic
    size={size}
    color={color}
    d="M9 3H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V8l-6-5z"
  />
);
const KeyIc = ({ size = 16, color = D.orange }) => (
  <Ic
    size={size}
    color={color}
    d="M8 11a4 4 0 100-8 4 4 0 000 8zm0 0l8 8M14 17l2-2"
  />
);
const MsgIc = ({ size = 16, color = D.green }) => (
  <Ic size={size} color={color} d="M2 4h16v11H2zM2 4l8 7 8-7" />
);
const ProdIc = ({ size = 16, color = D.orange }) => (
  <Ic size={size} color={color} d="M3 6l7-3 7 3v8l-7 3-7-3V6z" />
);
const StoreIc = ({ size = 16, color = D.cyan }) => (
  <Ic size={size} color={color} d="M2 7h16l-1.5 9H3.5L2 7zm2-3h12l1 3H3L5 4z" />
);
const NotifIc = ({ size = 16, color = D.muted }) => (
  <Ic
    size={size}
    color={color}
    d="M10 2a6 6 0 016 6v3l1.5 2.5H2.5L4 11V8a6 6 0 016-6zm-1.5 14h3"
  />
);
const LogoutIc = ({ size = 16, color = D.muted }) => (
  <Ic
    size={size}
    color={color}
    d="M13 10H3M10 7l3 3-3 3M7 4H4a1 1 0 00-1 1v10a1 1 0 001 1h3"
  />
);

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
const CLIENT = {
  name: "Issam Boutique",
  email: "issam@boutique.dz",
  plan: "Growth",
  planColor: D.cyan,
  useCode: "ECA-G7X2-9KMN-4QPR",
  codeStatus: "active",
  group: "Group Beta",
  groupColor: D.orange,
  workflow: "Make Workflow #2",
  metaApp: "Meta App B",
  groupSlot: "9 / 15",
  renewal: "Jun 15, 2025",
  msgsUsed: 8420,
  msgsLimit: 15000,
  joinedAt: "Mar 4, 2025",
};

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Summer Kaftan Collection",
    price: "2,400 DA",
    category: "Fashion",
    status: "active",
    desc: "Premium cotton kaftans with hand-embroidered detailing. Available in 8 colors. Fast delivery across Algeria.",
    aiGenerated: false,
    img: "👗",
  },
  {
    id: 2,
    name: "Leather Handbag Set",
    price: "4,800 DA",
    category: "Accessories",
    status: "active",
    desc: "Genuine leather handbags in 4 styles. Includes shoulder strap. Express 24h delivery in Algiers.",
    aiGenerated: true,
    img: "👜",
  },
  {
    id: 3,
    name: "Kids Sportswear Bundle",
    price: "1,950 DA",
    category: "Kids",
    status: "draft",
    desc: "",
    aiGenerated: false,
    img: "👕",
  },
];

const MOCK_CONVOS = [
  {
    id: 1,
    sender: "+213 770 *** 421",
    msg: "كم سعر الكافطان الأزرق؟",
    time: "2m ago",
    status: "replied",
    replies: 3,
  },
  {
    id: 2,
    sender: "+213 555 *** 089",
    msg: "هل توجد توصيل لولاية قسنطينة؟",
    time: "14m ago",
    status: "replied",
    replies: 5,
  },
  {
    id: 3,
    sender: "+213 661 *** 334",
    msg: "What colors are available?",
    time: "1h ago",
    status: "replied",
    replies: 2,
  },
  {
    id: 4,
    sender: "+213 792 *** 710",
    msg: "هل يمكن الدفع عند الاستلام؟",
    time: "3h ago",
    status: "replied",
    replies: 4,
  },
  {
    id: 5,
    sender: "+213 540 *** 118",
    msg: "I want to order 2 pieces",
    time: "5h ago",
    status: "replied",
    replies: 6,
  },
];

const MOCK_ACTIVITY = [
  {
    type: "conv",
    text: "New conversation from +213 770 *** 421 — AI replied in 1.2s",
    time: "2m ago",
    color: D.cyan,
  },
  {
    type: "prod",
    text: "Product 'Leather Handbag Set' description generated by AI",
    time: "18m ago",
    color: D.orange,
  },
  {
    type: "conv",
    text: "5-turn conversation completed — customer confirmed order",
    time: "1h ago",
    color: D.green,
  },
  {
    type: "code",
    text: "Use code ECA-G7X2 verified by Make Workflow #2",
    time: "3h ago",
    color: D.purple,
  },
  {
    type: "conv",
    text: "New conversation from +213 661 *** 334 — AI replied in 0.8s",
    time: "3h ago",
    color: D.cyan,
  },
  {
    type: "sys",
    text: "Workflow Group Beta at 9/15 capacity — 6 slots remaining",
    time: "6h ago",
    color: D.muted,
  },
];

// ─── STAT CARD ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, color, icon, delay = "0s" }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: D.surface,
        border: `1px solid ${hov ? D.borderHi : D.border}`,
        borderRadius: 14,
        padding: "1.25rem 1.4rem",
        position: "relative",
        overflow: "hidden",
        transition: "all .25s",
        transform: hov ? "translateY(-3px)" : "none",
        animation: `fadeUp .6s ${delay} ease both`,
      }}>
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          background: `radial-gradient(circle,rgba(${color === D.cyan ? "0,212,255" : color === D.orange ? "255,107,43" : color === D.green ? "62,207,142" : color === D.purple ? "155,100,255" : "240,95,95"},0.1),transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: ".9rem",
        }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 9,
            background: `rgba(${color === D.cyan ? "0,212,255" : color === D.orange ? "255,107,43" : color === D.green ? "62,207,142" : color === D.purple ? "155,100,255" : "240,95,95"},0.12)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {icon}
        </div>
        <span
          style={{
            fontSize: ".68rem",
            color: D.muted,
            fontWeight: 500,
            letterSpacing: ".05em",
            textTransform: "uppercase",
          }}>
          {label}
        </span>
      </div>
      <div
        style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: "2rem",
          fontWeight: 800,
          color,
          letterSpacing: "-.03em",
          lineHeight: 1,
        }}>
        {value}
      </div>
      {sub && (
        <div
          style={{
            fontSize: ".75rem",
            color: D.muted,
            marginTop: ".35rem",
            fontWeight: 300,
          }}>
          {sub}
        </div>
      )}
    </div>
  );
};

// ─── SECTION HEADER ────────────────────────────────────────────────────────────
const SectionHead = ({ icon, title, action }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "1.2rem",
    }}>
    <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
      {icon}
      <span
        style={{
          fontFamily: "'Syne',sans-serif",
          fontWeight: 700,
          fontSize: ".95rem",
          color: D.text,
        }}>
        {title}
      </span>
    </div>
    {action}
  </div>
);

// ─── BADGE ─────────────────────────────────────────────────────────────────────
const Badge = ({ label, color = D.cyan, bg }) => (
  <span
    style={{
      background:
        bg ||
        `rgba(${color === D.cyan ? "0,212,255" : color === D.orange ? "255,107,43" : color === D.green ? "62,207,142" : color === D.red ? "240,95,95" : color === D.purple ? "155,100,255" : "107,122,148"},0.1)`,
      color,
      border: `1px solid rgba(${color === D.cyan ? "0,212,255" : color === D.orange ? "255,107,43" : color === D.green ? "62,207,142" : color === D.red ? "240,95,95" : color === D.purple ? "155,100,255" : "107,122,148"},0.2)`,
      borderRadius: 100,
      padding: ".18rem .6rem",
      fontSize: ".68rem",
      fontWeight: 700,
      letterSpacing: ".04em",
      flexShrink: 0,
    }}>
    {label}
  </span>
);

// ─── PRODUCT MODAL ─────────────────────────────────────────────────────────────
const ProductModal = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [generating, setGenerating] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [imgName, setImgName] = useState(null);

  const fakeGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setDesc(
        `Premium quality ${name || "product"} available for fast delivery across Algeria. Competitive pricing at ${price || "contact us for price"}. Order via WhatsApp — our AI assistant handles inquiries 24/7.`,
      );
      setGenerating(false);
    }, 1800);
  };

  const inputStyle = {
    width: "100%",
    background: D.surface2,
    border: `1px solid ${D.border}`,
    borderRadius: 8,
    padding: ".7rem 1rem",
    color: D.text,
    fontSize: ".88rem",
    transition: "border-color .2s",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(4,8,15,0.82)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}>
      <div
        style={{
          background: D.surface,
          border: `1px solid ${D.border}`,
          borderRadius: 20,
          width: "100%",
          maxWidth: 520,
          padding: "2rem",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
          animation: "fadeUp .35s ease",
        }}
        onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.8rem",
          }}>
          <div>
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: "1.1rem",
                color: D.text,
              }}>
              Add Product
            </div>
            <div
              style={{
                fontSize: ".78rem",
                color: D.muted,
                marginTop: ".2rem",
                fontWeight: 300,
              }}>
              AI will use this to answer customer questions
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: D.surface2,
              border: `1px solid ${D.border}`,
              borderRadius: 8,
              padding: ".4rem .55rem",
              color: D.muted,
              transition: "all .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = D.red;
              e.currentTarget.style.color = D.red;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = D.border;
              e.currentTarget.style.color = D.muted;
            }}>
            <CrossIc size={14} color="currentColor" />
          </button>
        </div>

        {/* Image Upload */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files[0];
            if (f) setImgName(f.name);
          }}
          style={{
            border: `2px dashed ${dragging ? D.cyan : D.border}`,
            borderRadius: 12,
            padding: "1.5rem",
            textAlign: "center",
            marginBottom: "1.2rem",
            cursor: "pointer",
            transition: "all .2s",
            background: dragging ? "rgba(0,212,255,0.04)" : D.surface2,
          }}>
          {imgName ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".6rem",
                justifyContent: "center",
              }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "rgba(0,212,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <UploadIc size={16} />
              </div>
              <span style={{ fontSize: ".82rem", color: D.cyan }}>
                {imgName}
              </span>
            </div>
          ) : (
            <>
              <UploadIc size={24} color={D.muted} />
              <div
                style={{
                  fontSize: ".82rem",
                  color: D.muted,
                  marginTop: ".5rem",
                  fontWeight: 300,
                }}>
                Drag product image or{" "}
                <span style={{ color: D.cyan, cursor: "pointer" }}>browse</span>
              </div>
              <div
                style={{
                  fontSize: ".72rem",
                  color: "rgba(107,122,148,0.6)",
                  marginTop: ".25rem",
                }}>
                PNG, JPG up to 5MB — AI will generate description
              </div>
            </>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".9rem",
            marginBottom: "1.2rem",
          }}>
          <div>
            <label
              style={{
                fontSize: ".75rem",
                color: D.muted,
                fontWeight: 500,
                letterSpacing: ".05em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: ".4rem",
              }}>
              Product Name *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Summer Kaftan Collection"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = D.cyan)}
              onBlur={(e) => (e.target.style.borderColor = D.border)}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: ".8rem",
            }}>
            <div>
              <label
                style={{
                  fontSize: ".75rem",
                  color: D.muted,
                  fontWeight: 500,
                  letterSpacing: ".05em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: ".4rem",
                }}>
                Price
              </label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 2,400 DA"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = D.cyan)}
                onBlur={(e) => (e.target.style.borderColor = D.border)}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: ".75rem",
                  color: D.muted,
                  fontWeight: 500,
                  letterSpacing: ".05em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: ".4rem",
                }}>
                Category
              </label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Fashion"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = D.cyan)}
                onBlur={(e) => (e.target.style.borderColor = D.border)}
              />
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: ".4rem",
              }}>
              <label
                style={{
                  fontSize: ".75rem",
                  color: D.muted,
                  fontWeight: 500,
                  letterSpacing: ".05em",
                  textTransform: "uppercase",
                }}>
                AI Description
              </label>
              <button
                onClick={fakeGenerate}
                disabled={generating || !name}
                style={{
                  background: "rgba(0,212,255,0.08)",
                  border: `1px solid rgba(0,212,255,0.2)`,
                  borderRadius: 6,
                  padding: ".25rem .7rem",
                  color: generating || !name ? D.muted : D.cyan,
                  fontSize: ".72rem",
                  fontWeight: 600,
                  letterSpacing: ".03em",
                  transition: "all .2s",
                  cursor: generating || !name ? "not-allowed" : "pointer",
                }}>
                {generating ? "Generating..." : "✦ Generate with AI"}
              </button>
            </div>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              placeholder="Describe your product — or let AI generate it from the name and image above"
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              onFocus={(e) => (e.target.style.borderColor = D.cyan)}
              onBlur={(e) => (e.target.style.borderColor = D.border)}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: ".8rem" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: "transparent",
              border: `1px solid ${D.border}`,
              borderRadius: 9,
              padding: ".75rem",
              color: D.muted,
              fontSize: ".88rem",
              fontWeight: 500,
              transition: "all .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = D.borderHi;
              e.currentTarget.style.color = D.text;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = D.border;
              e.currentTarget.style.color = D.muted;
            }}>
            Cancel
          </button>
          <button
            onClick={() =>
              onSave({
                name,
                price,
                category,
                desc,
                aiGenerated: generating === false && desc.includes("AI"),
              })
            }
            style={{
              flex: 2,
              background: `linear-gradient(135deg,${D.cyan},${D.cyanDim})`,
              border: "none",
              borderRadius: 9,
              padding: ".75rem",
              color: D.bg,
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: ".88rem",
              boxShadow: "0 0 20px rgba(0,212,255,0.25)",
              transition: "all .2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 32px rgba(0,212,255,0.4)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 20px rgba(0,212,255,0.25)")
            }>
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── SIDEBAR ───────────────────────────────────────────────────────────────────
const SIDEBAR_ITEMS = [
  { id: "overview", label: "Overview", icon: <StoreIc size={16} /> },
  { id: "products", label: "My Products", icon: <ProdIc size={16} /> },
  { id: "conversations", label: "Conversations", icon: <MsgIc size={16} /> },
  { id: "usecode", label: "Use Code", icon: <KeyIc size={16} /> },
  { id: "workflow", label: "Workflow", icon: <FlowIc size={16} /> },
];

const Sidebar = ({ active, onChange }) => {
  const msgsUsedPct = Math.round((CLIENT.msgsUsed / CLIENT.msgsLimit) * 100);
  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        background: D.surface,
        borderRight: `1px solid ${D.border}`,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflow: "hidden",
      }}>
      {/* Logo */}
      <div
        style={{
          padding: "1.4rem 1.4rem 1rem",
          borderBottom: `1px solid ${D.border}`,
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
          <svg width={28} height={28} viewBox="0 0 32 32" fill="none">
            <rect width={32} height={32} rx={8} fill="rgba(0,212,255,0.08)" />
            <path
              d="M8 16L14 10L20 16L26 10"
              stroke={D.cyan}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 22L14 16L20 22L26 16"
              stroke={D.orange}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx={16} cy={16} r={2.5} fill={D.cyan} />
          </svg>
          <span
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: D.text,
            }}>
            Ecom<span style={{ color: D.cyan }}>Auto</span>
          </span>
        </div>
        {/* Client pill */}
        <div
          style={{
            marginTop: "1rem",
            background: D.surface2,
            border: `1px solid ${D.border}`,
            borderRadius: 10,
            padding: ".65rem .85rem",
            display: "flex",
            alignItems: "center",
            gap: ".7rem",
          }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "rgba(0,212,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: ".75rem",
              color: D.cyan,
              flexShrink: 0,
            }}>
            {CLIENT.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                fontSize: ".82rem",
                fontWeight: 500,
                color: D.text,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
              {CLIENT.name}
            </div>
            <Badge label={CLIENT.plan} color={CLIENT.planColor} />
          </div>
        </div>
      </div>

      {/* Nav */}
      <div
        role="navigation"
        aria-label="Dashboard"
        style={{
          flex: 1,
          padding: "1rem .75rem",
          display: "flex",
          flexDirection: "column",
          gap: ".25rem",
          overflowY: "auto",
        }}>
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".75rem",
                padding: ".7rem .85rem",
                borderRadius: 9,
                background: isActive ? `rgba(0,212,255,0.08)` : "transparent",
                border: `1px solid ${isActive ? "rgba(0,212,255,0.2)" : "transparent"}`,
                color: isActive ? D.cyan : D.muted,
                fontWeight: isActive ? 500 : 400,
                fontSize: ".88rem",
                transition: "all .2s",
                textAlign: "left",
                width: "100%",
              }}>
              {item.icon}
              {item.label}
              {item.id === "conversations" && (
                <span
                  style={{
                    marginLeft: "auto",
                    background: "rgba(0,212,255,0.1)",
                    color: D.cyan,
                    borderRadius: 100,
                    padding: ".1rem .45rem",
                    fontSize: ".65rem",
                    fontWeight: 700,
                  }}>
                  5
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Usage bar */}
      <div
        style={{ padding: "1rem 1.2rem", borderTop: `1px solid ${D.border}` }}>
        <div
          style={{
            background: D.surface2,
            border: `1px solid ${D.border}`,
            borderRadius: 10,
            padding: ".85rem",
          }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: ".5rem",
            }}>
            <span
              style={{ fontSize: ".72rem", color: D.muted, fontWeight: 500 }}>
              AI Messages
            </span>
            <span
              style={{ fontSize: ".72rem", color: D.cyan, fontWeight: 700 }}>
              {msgsUsedPct}%
            </span>
          </div>
          <div
            style={{
              height: 4,
              background: D.border,
              borderRadius: 2,
              overflow: "hidden",
              marginBottom: ".5rem",
            }}>
            <div
              style={{
                height: "100%",
                borderRadius: 2,
                width: `${msgsUsedPct}%`,
                background: msgsUsedPct > 85 ? D.orange : D.cyan,
                transition: "width .6s ease",
              }}
            />
          </div>
          <div style={{ fontSize: ".7rem", color: D.muted, fontWeight: 300 }}>
            {CLIENT.msgsUsed.toLocaleString()} /{" "}
            {CLIENT.msgsLimit.toLocaleString()} used
          </div>
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".6rem",
            padding: ".65rem .85rem",
            borderRadius: 9,
            background: "transparent",
            border: "none",
            color: D.muted,
            fontSize: ".85rem",
            width: "100%",
            marginTop: ".4rem",
            transition: "color .2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = D.text)}
          onMouseLeave={(e) => (e.currentTarget.style.color = D.muted)}>
          <LogoutIc /> Sign Out
        </button>
      </div>
    </aside>
  );
};

// ─── TOP BAR ───────────────────────────────────────────────────────────────────
const TopBar = ({ pageTitle, pageSubtitle }) => (
  <div
    style={{
      padding: "1.2rem 2rem",
      borderBottom: `1px solid ${D.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "rgba(4,8,15,0.6)",
      backdropFilter: "blur(12px)",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
    <div>
      <div
        style={{
          fontFamily: "'Syne',sans-serif",
          fontWeight: 800,
          fontSize: "1.1rem",
          color: D.text,
          letterSpacing: "-.01em",
        }}>
        {pageTitle}
      </div>
      <div
        style={{
          fontSize: ".78rem",
          color: D.muted,
          fontWeight: 300,
          marginTop: ".1rem",
        }}>
        {pageSubtitle}
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: ".8rem" }}>
      <button
        style={{
          width: 36,
          height: 36,
          borderRadius: 9,
          background: D.surface2,
          border: `1px solid ${D.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all .2s",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = D.cyan;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = D.border;
        }}>
        <NotifIc />
        <span
          style={{
            position: "absolute",
            top: 7,
            right: 7,
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: D.cyan,
            animation: "pulse 2s infinite",
          }}
        />
      </button>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 9,
          background: "rgba(0,212,255,0.1)",
          border: `1px solid rgba(0,212,255,0.2)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Syne',sans-serif",
          fontWeight: 800,
          fontSize: ".75rem",
          color: D.cyan,
        }}>
        {CLIENT.name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)}
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// ─── VIEWS ────────────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

// ─── OVERVIEW VIEW ─────────────────────────────────────────────────────────────
const OverviewView = ({ setActiveTab }) => {
  const [copied, setCopied] = useState(false);
  const copyCode = () => {
    navigator.clipboard?.writeText(CLIENT.useCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const card = {
    background: D.surface,
    border: `1px solid ${D.border}`,
    borderRadius: 16,
    padding: "1.4rem 1.6rem",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        animation: "fadeUp .5s ease",
      }}>
      {/* Welcome banner */}
      <div
        style={{
          background: D.surface,
          border: `1px solid ${D.border}`,
          borderRadius: 16,
          padding: "1.6rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          position: "relative",
          overflow: "hidden",
        }}>
        <div
          style={{
            position: "absolute",
            top: -60,
            right: 80,
            width: 250,
            height: 250,
            background:
              "radial-gradient(circle,rgba(0,212,255,0.06),transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            right: -40,
            width: 200,
            height: 200,
            background:
              "radial-gradient(circle,rgba(255,107,43,0.05),transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div>
          <div
            style={{
              fontSize: ".78rem",
              color: D.muted,
              fontWeight: 300,
              marginBottom: ".3rem",
            }}>
            Welcome back,
          </div>
          <div
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "1.5rem",
              color: D.text,
              letterSpacing: "-.02em",
            }}>
            {CLIENT.name}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".6rem",
              marginTop: ".5rem",
              flexWrap: "wrap",
            }}>
            <Badge label={`Plan: ${CLIENT.plan}`} color={D.cyan} />
            <Badge label={CLIENT.group} color={D.orange} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".3rem",
                fontSize: ".72rem",
                color: D.muted,
              }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: D.green,
                  display: "inline-block",
                  animation: "pulseG 2s infinite",
                }}
              />
              Automation Active
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: ".8rem" }}>
          <button
            onClick={() => setActiveTab("products")}
            style={{
              background: `rgba(255,107,43,0.1)`,
              border: `1px solid rgba(255,107,43,0.25)`,
              borderRadius: 9,
              padding: ".6rem 1.1rem",
              color: D.orange,
              fontSize: ".82rem",
              fontWeight: 600,
              transition: "all .2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,107,43,0.18)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,107,43,0.1)")
            }>
            + Add Product
          </button>
          <button
            onClick={() => setActiveTab("conversations")}
            style={{
              background: `linear-gradient(135deg,${D.cyan},${D.cyanDim})`,
              border: "none",
              borderRadius: 9,
              padding: ".6rem 1.1rem",
              color: D.bg,
              fontSize: ".82rem",
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              boxShadow: "0 0 18px rgba(0,212,255,0.25)",
              transition: "all .2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 28px rgba(0,212,255,0.4)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 18px rgba(0,212,255,0.25)")
            }>
            View Conversations
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "1rem",
        }}>
        <StatCard
          label="AI Conversations"
          value="127"
          sub="This month"
          color={D.cyan}
          delay=".05s"
          icon={<MsgIc size={16} />}
        />
        <StatCard
          label="Messages Sent"
          value={CLIENT.msgsUsed.toLocaleString()}
          sub={`of ${CLIENT.msgsLimit.toLocaleString()} limit`}
          color={D.orange}
          delay=".1s"
          icon={<BotIc size={16} color={D.orange} />}
        />
        <StatCard
          label="Products Listed"
          value={MOCK_PRODUCTS.filter(
            (p) => p.status === "active",
          ).length.toString()}
          sub="Active in AI responses"
          color={D.green}
          delay=".15s"
          icon={<ProdIc size={16} color={D.green} />}
        />
        <StatCard
          label="Avg. Reply Time"
          value="1.4s"
          sub="AI response latency"
          color={D.purple}
          delay=".2s"
          icon={<FlowIc size={16} color={D.purple} />}
        />
      </div>

      {/* USE CODE + WORKFLOW row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: "1.2rem",
        }}>
        {/* Use Code */}
        <div style={{ ...card }} className="code-glow">
          <SectionHead
            icon={<KeyIc size={16} color={D.orange} />}
            title="Your Use Code"
            action={<Badge label="Active" color={D.green} />}
          />
          <div
            style={{
              fontSize: ".78rem",
              color: D.muted,
              fontWeight: 300,
              marginBottom: ".9rem",
              lineHeight: 1.6,
            }}>
            This code authenticates your Make.com workflow. Keep it private —
            deactivating it pauses all your automations immediately.
          </div>
          <div
            style={{
              background: D.surface2,
              border: `1px solid ${D.border}`,
              borderRadius: 10,
              padding: ".9rem 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: ".8rem",
              marginBottom: ".9rem",
            }}>
            <code
              style={{
                fontFamily: "'Courier New',monospace",
                fontSize: "1rem",
                fontWeight: 700,
                color: D.orange,
                letterSpacing: ".12em",
                wordBreak: "break-all",
              }}>
              {CLIENT.useCode}
            </code>
            <button
              onClick={copyCode}
              style={{
                background: "rgba(0,212,255,0.08)",
                border: `1px solid rgba(0,212,255,0.18)`,
                borderRadius: 7,
                padding: ".45rem .65rem",
                display: "flex",
                alignItems: "center",
                gap: ".4rem",
                flexShrink: 0,
                color: copied ? D.green : D.cyan,
                fontSize: ".75rem",
                fontWeight: 600,
                transition: "all .2s",
              }}>
              {copied ? (
                <>
                  <CheckIc size={13} color={D.green} /> Copied!
                </>
              ) : (
                <>
                  <CopyIcon size={13} /> Copy
                </>
              )}
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: ".7rem",
            }}>
            {[
              { label: "Plan", val: CLIENT.plan, c: D.cyan },
              { label: "Renewal", val: CLIENT.renewal, c: D.text },
              { label: "Status", val: "Active", c: D.green },
              { label: "Joined", val: CLIENT.joinedAt, c: D.text },
            ].map(({ label, val, c }) => (
              <div
                key={label}
                style={{
                  background: D.surface2,
                  borderRadius: 8,
                  padding: ".55rem .75rem",
                }}>
                <div
                  style={{
                    fontSize: ".65rem",
                    color: D.muted,
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                    marginBottom: ".2rem",
                  }}>
                  {label}
                </div>
                <div style={{ fontSize: ".82rem", fontWeight: 600, color: c }}>
                  {val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Assignment */}
        <div style={card}>
          <SectionHead
            icon={<FlowIc size={16} color={D.purple} />}
            title="Workflow Assignment"
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
            {[
              {
                label: "Group",
                val: CLIENT.group,
                color: D.orange,
                icon: (
                  <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                    <rect
                      x={1}
                      y={1}
                      width={5}
                      height={5}
                      rx={1.5}
                      stroke={D.orange}
                      strokeWidth={1.4}
                    />
                    <rect
                      x={8}
                      y={1}
                      width={5}
                      height={5}
                      rx={1.5}
                      stroke={D.orange}
                      strokeWidth={1.4}
                    />
                    <rect
                      x={1}
                      y={8}
                      width={5}
                      height={5}
                      rx={1.5}
                      stroke={D.orange}
                      strokeWidth={1.4}
                    />
                    <rect
                      x={8}
                      y={8}
                      width={5}
                      height={5}
                      rx={1.5}
                      stroke={D.orange}
                      strokeWidth={1.4}
                    />
                  </svg>
                ),
              },
              {
                label: "Make Workflow",
                val: CLIENT.workflow,
                color: D.purple,
                icon: <FlowIc size={14} color={D.purple} />,
              },
              {
                label: "Meta App",
                val: CLIENT.metaApp,
                color: D.cyan,
                icon: (
                  <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                    <circle
                      cx={7}
                      cy={7}
                      r={5.5}
                      stroke={D.cyan}
                      strokeWidth={1.4}
                    />
                    <path
                      d="M4 7h6M7 4v6"
                      stroke={D.cyan}
                      strokeWidth={1.4}
                      strokeLinecap="round"
                    />
                  </svg>
                ),
              },
              {
                label: "Capacity",
                val: CLIENT.groupSlot,
                color: D.text,
                icon: (
                  <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                    <rect
                      x={1}
                      y={8}
                      width={12}
                      height={5}
                      rx={1.5}
                      stroke={D.green}
                      strokeWidth={1.4}
                    />
                    <rect
                      x={1}
                      y={1}
                      width={8}
                      height={5}
                      rx={1.5}
                      fill="rgba(62,207,142,0.15)"
                      stroke={D.green}
                      strokeWidth={1.4}
                    />
                  </svg>
                ),
              },
            ].map(({ label, val, color, icon }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: ".55rem .8rem",
                  background: D.surface2,
                  border: `1px solid ${D.border}`,
                  borderRadius: 9,
                }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".55rem",
                    color: D.muted,
                    fontSize: ".8rem",
                  }}>
                  {icon} {label}
                </div>
                <span style={{ fontSize: ".82rem", fontWeight: 600, color }}>
                  {val}
                </span>
              </div>
            ))}
          </div>
          {/* Group capacity bar */}
          <div style={{ marginTop: "1rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: ".4rem",
              }}>
              <span style={{ fontSize: ".7rem", color: D.muted }}>
                Group capacity
              </span>
              <span
                style={{ fontSize: ".7rem", color: D.orange, fontWeight: 600 }}>
                9 / 15 clients
              </span>
            </div>
            <div
              style={{
                height: 5,
                background: D.border,
                borderRadius: 3,
                overflow: "hidden",
              }}>
              <div
                style={{
                  height: "100%",
                  width: "60%",
                  background: D.orange,
                  borderRadius: 3,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Activity feed */}
      <div style={card}>
        <SectionHead
          icon={
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <circle
                cx={8}
                cy={8}
                r={2.5}
                stroke={D.green}
                strokeWidth={1.4}
              />
              <path
                d="M8 1v3M8 12v3M1 8h3M12 8h3"
                stroke={D.green}
                strokeWidth={1.4}
                strokeLinecap="round"
              />
            </svg>
          }
          title="Recent Activity"
          action={
            <button
              onClick={() => setActiveTab("conversations")}
              style={{
                background: "none",
                border: "none",
                color: D.cyan,
                fontSize: ".78rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: ".3rem",
              }}>
              View all →
            </button>
          }
        />
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          {MOCK_ACTIVITY.map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: ".75rem",
                padding: ".55rem .7rem",
                borderRadius: 9,
                transition: "background .15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = D.surface2)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: a.color,
                  marginTop: ".45rem",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: ".82rem",
                  color: D.text,
                  fontWeight: 300,
                  flex: 1,
                  lineHeight: 1.55,
                }}>
                {a.text}
              </span>
              <span
                style={{
                  fontSize: ".72rem",
                  color: D.muted,
                  flexShrink: 0,
                  marginTop: ".05rem",
                }}>
                {a.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── PRODUCTS VIEW ─────────────────────────────────────────────────────────────
const ProductsView = () => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSave = (data) => {
    setProducts((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...data,
        status: "active",
        img: "📦",
      },
    ]);
    setShowModal(false);
  };

  const toggleStatus = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "active" ? "draft" : "active" }
          : p,
      ),
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.4rem",
        animation: "fadeUp .5s ease",
      }}>
      {showModal && (
        <ProductModal onClose={() => setShowModal(false)} onSave={handleSave} />
      )}

      {/* Info banner */}
      <div
        style={{
          background: "rgba(0,212,255,0.04)",
          border: `1px solid rgba(0,212,255,0.15)`,
          borderRadius: 12,
          padding: "1rem 1.3rem",
          display: "flex",
          alignItems: "center",
          gap: ".9rem",
        }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "rgba(0,212,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
          <BotIc size={16} />
        </div>
        <div>
          <div
            style={{
              fontSize: ".85rem",
              fontWeight: 500,
              color: D.text,
              marginBottom: ".15rem",
            }}>
            How the AI uses your products
          </div>
          <div
            style={{
              fontSize: ".78rem",
              color: D.muted,
              fontWeight: 300,
              lineHeight: 1.5,
            }}>
            Before every AI response, the workflow fetches your active products
            and uses them to answer customer questions about price, delivery,
            colors, and availability.
          </div>
        </div>
      </div>

      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
        <div style={{ position: "relative" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            style={{
              background: D.surface,
              border: `1px solid ${D.border}`,
              borderRadius: 9,
              padding: ".65rem 1rem .65rem 2.4rem",
              color: D.text,
              fontSize: ".88rem",
              width: 260,
              transition: "border-color .2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = D.cyan)}
            onBlur={(e) => (e.target.style.borderColor = D.border)}
          />
          <svg
            width={14}
            height={14}
            viewBox="0 0 14 14"
            fill="none"
            style={{
              position: "absolute",
              left: ".75rem",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}>
            <circle cx={6} cy={6} r={4.5} stroke={D.muted} strokeWidth={1.4} />
            <path
              d="M10 10l2.5 2.5"
              stroke={D.muted}
              strokeWidth={1.4}
              strokeLinecap="round"
            />
          </svg>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            background: `linear-gradient(135deg,${D.cyan},${D.cyanDim})`,
            border: "none",
            borderRadius: 9,
            padding: ".65rem 1.3rem",
            color: D.bg,
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            fontSize: ".85rem",
            boxShadow: "0 0 18px rgba(0,212,255,0.22)",
            transition: "all .2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 28px rgba(0,212,255,0.38)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 18px rgba(0,212,255,0.22)")
          }>
          <PlusIc size={16} color={D.bg} /> Add Product
        </button>
      </div>

      {/* Product cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          gap: "1.1rem",
        }}>
        {filtered.map((p, i) => (
          <div
            key={p.id}
            style={{
              background: D.surface,
              border: `1px solid ${p.status === "active" ? D.border : D.border}`,
              borderRadius: 14,
              padding: "1.3rem",
              display: "flex",
              flexDirection: "column",
              gap: ".85rem",
              transition: "all .25s",
              animation: `fadeUp .5s ${i * 0.08}s ease both`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = D.borderHi)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = D.border)
            }>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: ".6rem",
              }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: ".8rem" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: "rgba(255,107,43,0.08)",
                    border: `1px solid rgba(255,107,43,0.15)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.4rem",
                    flexShrink: 0,
                  }}>
                  {p.img}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontWeight: 700,
                      fontSize: ".92rem",
                      color: D.text,
                      marginBottom: ".25rem",
                    }}>
                    {p.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: ".4rem",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}>
                    <Badge label={p.category} color={D.muted} />
                    {p.aiGenerated && (
                      <Badge label="AI Generated" color={D.purple} />
                    )}
                  </div>
                </div>
              </div>
              <Badge
                label={p.status === "active" ? "Active" : "Draft"}
                color={p.status === "active" ? D.green : D.muted}
              />
            </div>

            <div
              style={{
                fontSize: ".82rem",
                color: p.desc ? D.muted : D.border,
                fontWeight: 300,
                lineHeight: 1.65,
                minHeight: "2.5rem",
              }}>
              {p.desc || (
                <span style={{ color: D.border, fontStyle: "italic" }}>
                  No description — AI cannot answer questions about this product
                </span>
              )}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: ".6rem",
                borderTop: `1px solid ${D.border}`,
              }}>
              <span
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: "1rem",
                  color: D.orange,
                }}>
                {p.price || "—"}
              </span>
              <div style={{ display: "flex", gap: ".5rem" }}>
                <button
                  onClick={() => toggleStatus(p.id)}
                  style={{
                    background: `rgba(${p.status === "active" ? "62,207,142" : "107,122,148"},0.08)`,
                    border: `1px solid rgba(${p.status === "active" ? "62,207,142" : "107,122,148"},0.2)`,
                    borderRadius: 7,
                    padding: ".35rem .65rem",
                    color: p.status === "active" ? D.green : D.muted,
                    fontSize: ".72rem",
                    fontWeight: 600,
                    transition: "all .2s",
                  }}>
                  {p.status === "active" ? "Pause" : "Activate"}
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  style={{
                    background: "transparent",
                    border: `1px solid ${D.border}`,
                    borderRadius: 7,
                    padding: ".35rem .5rem",
                    transition: "all .2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = D.red;
                    e.currentTarget.style.background = "rgba(240,95,95,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = D.border;
                    e.currentTarget.style.background = "transparent";
                  }}>
                  <TrashIc size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty add card */}
        <div
          onClick={() => setShowModal(true)}
          style={{
            background: "transparent",
            border: `2px dashed ${D.border}`,
            borderRadius: 14,
            padding: "1.3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: ".6rem",
            cursor: "pointer",
            transition: "all .2s",
            minHeight: 180,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = D.cyan;
            e.currentTarget.style.background = "rgba(0,212,255,0.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = D.border;
            e.currentTarget.style.background = "transparent";
          }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "rgba(0,212,255,0.08)",
              border: `1px solid rgba(0,212,255,0.15)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <PlusIc size={18} />
          </div>
          <span style={{ fontSize: ".82rem", color: D.muted, fontWeight: 300 }}>
            Add another product
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── CONVERSATIONS VIEW ────────────────────────────────────────────────────────
const ConversationsView = () => {
  const [selected, setSelected] = useState(MOCK_CONVOS[0]);

  const TURNS = [
    { role: "customer", msg: "كم سعر الكافطان الأزرق؟", time: "10:42 AM" },
    {
      role: "ai",
      msg: "مرحباً! سعر الكافطان الأزرق من مجموعة صيف 2025 هو 2,400 دج. متوفر بـ 8 ألوان. هل تريدين التوصيل إلى مدينتك؟",
      time: "10:42 AM",
    },
    { role: "customer", msg: "نعم، هل يوجد توصيل لوهران؟", time: "10:44 AM" },
    {
      role: "ai",
      msg: "بالتأكيد! التوصيل لوهران خلال 3-5 أيام بتكلفة 350 دج. هل تريدين إتمام الطلب؟",
      time: "10:44 AM",
    },
    {
      role: "customer",
      msg: "نعم أريد واحد باللون الأزرق مقاس M",
      time: "10:46 AM",
    },
    {
      role: "ai",
      msg: "تم تسجيل طلبك! كافطان أزرق مقاس M. سيتواصل معك فريقنا لتأكيد التفاصيل. شكراً! 🙏",
      time: "10:46 AM",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "320px 1fr",
        gap: "1.2rem",
        height: "calc(100vh - 140px)",
        animation: "fadeUp .5s ease",
      }}>
      {/* Conversation list */}
      <div
        style={{
          background: D.surface,
          border: `1px solid ${D.border}`,
          borderRadius: 16,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}>
        <div
          style={{
            padding: "1rem 1.2rem",
            borderBottom: `1px solid ${D.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <span
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: ".9rem",
              color: D.text,
            }}>
            Conversations
          </span>
          <Badge label={`${MOCK_CONVOS.length} total`} color={D.muted} />
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>
          {MOCK_CONVOS.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelected(c)}
              style={{
                padding: ".9rem 1.2rem",
                borderBottom: `1px solid rgba(26,37,64,0.5)`,
                cursor: "pointer",
                background:
                  selected?.id === c.id
                    ? "rgba(0,212,255,0.05)"
                    : "transparent",
                transition: "background .15s",
              }}
              onMouseEnter={(e) => {
                if (selected?.id !== c.id)
                  e.currentTarget.style.background = D.surface2;
              }}
              onMouseLeave={(e) => {
                if (selected?.id !== c.id)
                  e.currentTarget.style.background = "transparent";
              }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: ".3rem",
                }}>
                <span
                  style={{
                    fontSize: ".82rem",
                    fontWeight: 500,
                    color: selected?.id === c.id ? D.cyan : D.text,
                  }}>
                  {c.sender}
                </span>
                <span style={{ fontSize: ".68rem", color: D.muted }}>
                  {c.time}
                </span>
              </div>
              <div
                style={{
                  fontSize: ".78rem",
                  color: D.muted,
                  fontWeight: 300,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  marginBottom: ".35rem",
                }}>
                {c.msg}
              </div>
              <div style={{ display: "flex", gap: ".4rem" }}>
                <Badge label="AI Replied" color={D.green} />
                <span style={{ fontSize: ".68rem", color: D.muted }}>
                  {c.replies} turns
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation thread */}
      <div
        style={{
          background: D.surface,
          border: `1px solid ${D.border}`,
          borderRadius: 16,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}>
        {/* header */}
        <div
          style={{
            padding: "1rem 1.4rem",
            borderBottom: `1px solid ${D.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <div>
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: ".9rem",
                color: D.text,
              }}>
              {selected?.sender}
            </div>
            <div
              style={{
                fontSize: ".72rem",
                color: D.muted,
                marginTop: ".1rem",
              }}>
              via WhatsApp · {selected?.time}
            </div>
          </div>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <Badge label="AI Handled" color={D.cyan} />
            <Badge label="Resolved" color={D.green} />
          </div>
        </div>

        {/* messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1.2rem",
            display: "flex",
            flexDirection: "column",
            gap: ".85rem",
          }}>
          {TURNS.map((t, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: ".7rem",
                flexDirection: t.role === "ai" ? "row" : "row-reverse",
              }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  flexShrink: 0,
                  background:
                    t.role === "ai"
                      ? "rgba(0,212,255,0.1)"
                      : "rgba(255,107,43,0.1)",
                  border: `1px solid rgba(${t.role === "ai" ? "0,212,255" : "255,107,43"},0.2)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: ".65rem",
                  fontWeight: 700,
                  color: t.role === "ai" ? D.cyan : D.orange,
                }}>
                {t.role === "ai" ? "AI" : "C"}
              </div>
              <div style={{ maxWidth: "68%" }}>
                <div
                  style={{
                    background:
                      t.role === "ai" ? D.surface2 : "rgba(255,107,43,0.08)",
                    border: `1px solid rgba(${t.role === "ai" ? "26,37,64" : "255,107,43"},${t.role === "ai" ? 1 : 0.15})`,
                    borderRadius:
                      t.role === "ai"
                        ? "4px 12px 12px 12px"
                        : "12px 4px 12px 12px",
                    padding: ".65rem .85rem",
                  }}>
                  <div
                    style={{
                      fontSize: ".85rem",
                      color: D.text,
                      lineHeight: 1.6,
                      fontWeight: 300,
                    }}>
                    {t.msg}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: ".68rem",
                    color: D.muted,
                    marginTop: ".25rem",
                    textAlign: t.role === "ai" ? "left" : "right",
                  }}>
                  {t.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div
          style={{
            padding: ".8rem 1.4rem",
            borderTop: `1px solid ${D.border}`,
            background: "rgba(0,212,255,0.02)",
            display: "flex",
            alignItems: "center",
            gap: ".6rem",
          }}>
          <BotIc size={14} />
          <span style={{ fontSize: ".75rem", color: D.muted, fontWeight: 300 }}>
            All replies in this conversation were generated by the AI.
            Conversation stored in Postgres DB with full history (capped at 20
            turns).
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── USE CODE VIEW ─────────────────────────────────────────────────────────────
const UseCodeView = () => {
  const [copied, setCopied] = useState(false);
  const [codeActive, setCodeActive] = useState(true);
  const copyCode = () => {
    navigator.clipboard?.writeText(CLIENT.useCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const card = {
    background: D.surface,
    border: `1px solid ${D.border}`,
    borderRadius: 16,
    padding: "1.6rem 1.8rem",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.4rem",
        maxWidth: 700,
        animation: "fadeUp .5s ease",
      }}>
      {/* Main code card */}
      <div
        style={{
          ...card,
          border: `1px solid ${codeActive ? "rgba(0,212,255,0.3)" : D.border}`,
        }}
        className={codeActive ? "code-glow" : ""}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".8rem" }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: "rgba(255,107,43,0.1)",
                border: `1px solid rgba(255,107,43,0.2)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <KeyIc size={20} color={D.orange} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  color: D.text,
                }}>
                Your Use Code
              </div>
              <div
                style={{ fontSize: ".75rem", color: D.muted, fontWeight: 300 }}>
                Generated on {CLIENT.joinedAt}
              </div>
            </div>
          </div>
          {/* Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
            <span style={{ fontSize: ".82rem", color: D.muted }}>
              {codeActive ? "Active" : "Paused"}
            </span>
            <button
              onClick={() => setCodeActive(!codeActive)}
              style={{
                width: 52,
                height: 28,
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                background: codeActive ? D.green : "rgba(107,122,148,0.2)",
                position: "relative",
                transition: "background .3s",
              }}>
              <div
                style={{
                  position: "absolute",
                  top: 3,
                  left: codeActive ? 27 : 3,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: codeActive ? D.bg : D.muted,
                  transition: "left .3s",
                  boxShadow: "0 1px 4px rgba(0,0,0,.5)",
                }}
              />
            </button>
          </div>
        </div>

        {/* The code itself */}
        <div
          style={{
            background: D.bg,
            border: `1px solid ${D.border}`,
            borderRadius: 12,
            padding: "1.2rem 1.4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "1.4rem",
          }}>
          <code
            style={{
              fontFamily: "'Courier New',monospace",
              fontSize: "1.2rem",
              fontWeight: 700,
              color: codeActive ? D.orange : "rgba(107,122,148,0.7)",
              letterSpacing: ".14em",
              wordBreak: "break-all",
              flex: 1,
            }}>
            {codeActive ? CLIENT.useCode : "●●●●-●●●●-●●●●-●●●●"}
          </code>
          <button
            onClick={copyCode}
            disabled={!codeActive}
            style={{
              background: "rgba(0,212,255,0.08)",
              border: `1px solid rgba(0,212,255,0.2)`,
              borderRadius: 9,
              padding: ".55rem .9rem",
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              color: copied ? D.green : codeActive ? D.cyan : D.muted,
              fontSize: ".82rem",
              fontWeight: 600,
              transition: "all .2s",
              cursor: codeActive ? "pointer" : "not-allowed",
              flexShrink: 0,
            }}>
            {copied ? (
              <>
                <CheckIc size={14} color={D.green} /> Copied!
              </>
            ) : (
              <>
                <CopyIcon size={14} color="currentColor" /> Copy
              </>
            )}
          </button>
        </div>

        {!codeActive && (
          <div
            style={{
              background: "rgba(240,95,95,0.06)",
              border: `1px solid rgba(240,95,95,0.2)`,
              borderRadius: 10,
              padding: ".85rem 1rem",
              marginBottom: "1.2rem",
              display: "flex",
              gap: ".6rem",
              alignItems: "flex-start",
            }}>
            <CrossIc size={15} color={D.red} />
            <span
              style={{
                fontSize: ".82rem",
                color: D.red,
                fontWeight: 400,
                lineHeight: 1.55,
              }}>
              Your Use Code is paused. Make.com workflow will reject all
              requests from your Meta App until you reactivate it.
            </span>
          </div>
        )}

        {/* How it works */}
        <div
          style={{
            fontSize: ".8rem",
            fontWeight: 700,
            color: D.muted,
            letterSpacing: ".06em",
            textTransform: "uppercase",
            marginBottom: ".8rem",
          }}>
          How it works
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
          {[
            {
              step: "1",
              text: "Client sponsors a Facebook ad with Click-to-WhatsApp CTA",
              c: D.cyan,
            },
            {
              step: "2",
              text: "Customer clicks → redirected to your AI-powered WhatsApp number",
              c: D.cyan,
            },
            {
              step: "3",
              text: "Meta sends the message to Make.com webhook — workflow validates your Use Code",
              c: D.orange,
            },
            {
              step: "4",
              text: "If code is active & valid → AI fetches your product data and generates a reply",
              c: D.orange,
            },
            {
              step: "5",
              text: "Conversation is stored in Postgres DB (last 20 turns kept per customer)",
              c: D.green,
            },
            {
              step: "6",
              text: "If code is paused or invalid → workflow returns 401 Unauthorized",
              c: D.red,
            },
          ].map(({ step, text, c }) => (
            <div
              key={step}
              style={{
                display: "flex",
                gap: ".8rem",
                alignItems: "flex-start",
              }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: `rgba(${c === D.cyan ? "0,212,255" : c === D.orange ? "255,107,43" : c === D.green ? "62,207,142" : "240,95,95"},0.1)`,
                  border: `1px solid rgba(${c === D.cyan ? "0,212,255" : c === D.orange ? "255,107,43" : c === D.green ? "62,207,142" : "240,95,95"},0.2)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: ".65rem",
                  fontWeight: 800,
                  color: c,
                  flexShrink: 0,
                }}>
                {step}
              </div>
              <span
                style={{
                  fontSize: ".82rem",
                  color: D.muted,
                  fontWeight: 300,
                  lineHeight: 1.6,
                  paddingTop: ".15rem",
                }}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Plan & limits */}
      <div style={card}>
        <SectionHead
          icon={<StoreIc size={16} color={D.cyan} />}
          title="Plan Details"
          action={
            <button
              style={{
                background: "rgba(0,212,255,0.08)",
                border: `1px solid rgba(0,212,255,0.2)`,
                borderRadius: 7,
                padding: ".3rem .8rem",
                color: D.cyan,
                fontSize: ".75rem",
                fontWeight: 600,
              }}>
              Upgrade
            </button>
          }
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: ".8rem",
          }}>
          {[
            { label: "Plan", val: CLIENT.plan, c: D.cyan },
            { label: "Group", val: CLIENT.group, c: D.orange },
            { label: "Make Workflow", val: CLIENT.workflow, c: D.purple },
            { label: "Meta App", val: CLIENT.metaApp, c: D.cyan },
            {
              label: "AI Messages",
              val: `${CLIENT.msgsUsed.toLocaleString()} / ${CLIENT.msgsLimit.toLocaleString()}`,
              c: D.text,
            },
            { label: "Renewal", val: CLIENT.renewal, c: D.text },
          ].map(({ label, val, c }) => (
            <div
              key={label}
              style={{
                background: D.surface2,
                border: `1px solid ${D.border}`,
                borderRadius: 9,
                padding: ".7rem .9rem",
              }}>
              <div
                style={{
                  fontSize: ".65rem",
                  color: D.muted,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                  marginBottom: ".25rem",
                }}>
                {label}
              </div>
              <div style={{ fontSize: ".88rem", fontWeight: 600, color: c }}>
                {val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── WORKFLOW VIEW ─────────────────────────────────────────────────────────────
const WorkflowView = () => {
  const card = {
    background: D.surface,
    border: `1px solid ${D.border}`,
    borderRadius: 16,
    padding: "1.4rem 1.6rem",
  };

  const FLOW_STEPS = [
    {
      label: "Facebook Ad",
      sub: "Click-to-WhatsApp CTA",
      color: D.cyan,
      active: true,
      icon: "📘",
    },
    {
      label: "Customer Click",
      sub: "Redirected to AI WhatsApp",
      color: D.cyan,
      active: true,
      icon: "👆",
    },
    {
      label: "Meta Webhook",
      sub: "POST to Make.com",
      color: D.orange,
      active: true,
      icon: "🔗",
    },
    {
      label: "Code Validation",
      sub: "Use Code check",
      color: D.orange,
      active: true,
      icon: "🔑",
    },
    {
      label: "Fetch Products",
      sub: "API call to dashboard",
      color: D.purple,
      active: true,
      icon: "📦",
    },
    {
      label: "AI Generate",
      sub: "Claude / Gemini reply",
      color: D.purple,
      active: true,
      icon: "🤖",
    },
    {
      label: "Store in DB",
      sub: "Postgres conversation log",
      color: D.green,
      active: true,
      icon: "💾",
    },
    {
      label: "Send to Customer",
      sub: "Meta Graph API",
      color: D.green,
      active: true,
      icon: "✅",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.4rem",
        animation: "fadeUp .5s ease",
      }}>
      {/* Assignment card */}
      <div style={{ ...card, border: `1px solid rgba(155,100,255,0.2)` }}>
        <SectionHead
          icon={<FlowIc size={16} color={D.purple} />}
          title="Your Workflow Assignment"
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1rem",
            marginBottom: "1.2rem",
          }}>
          {[
            { label: "Group", val: CLIENT.group, color: D.orange },
            { label: "Make Workflow", val: "#2 — Active", color: D.purple },
            {
              label: "Meta App",
              val: CLIENT.metaApp + " · Live",
              color: D.cyan,
            },
          ].map(({ label, val, color }) => (
            <div
              key={label}
              style={{
                background: D.surface2,
                border: `1px solid ${D.border}`,
                borderRadius: 10,
                padding: "1rem 1.1rem",
                textAlign: "center",
              }}>
              <div
                style={{
                  fontSize: ".65rem",
                  color: D.muted,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                  marginBottom: ".4rem",
                }}>
                {label}
              </div>
              <div
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color,
                }}>
                {val}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: ".5rem",
          }}>
          <span style={{ fontSize: ".78rem", color: D.muted }}>
            Group capacity: {CLIENT.groupSlot} clients
          </span>
          <span
            style={{ fontSize: ".78rem", color: D.orange, fontWeight: 600 }}>
            60% full
          </span>
        </div>
        <div
          style={{
            height: 5,
            background: D.border,
            borderRadius: 3,
            overflow: "hidden",
          }}>
          <div
            style={{
              height: "100%",
              width: "60%",
              background: D.orange,
              borderRadius: 3,
            }}
          />
        </div>
      </div>

      {/* Flow diagram */}
      <div style={card}>
        <SectionHead
          icon={<BotIc size={16} />}
          title="Complete Automation Flow"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".55rem",
            marginTop: ".5rem",
          }}>
          {FLOW_STEPS.map((step, i) => (
            <div key={i}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: ".8rem 1rem",
                  background: D.surface2,
                  border: `1px solid rgba(${step.color === D.cyan ? "0,212,255" : step.color === D.orange ? "255,107,43" : step.color === D.green ? "62,207,142" : "155,100,255"},0.12)`,
                  borderRadius: 10,
                  transition: "all .2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = `rgba(${step.color === D.cyan ? "0,212,255" : step.color === D.orange ? "255,107,43" : step.color === D.green ? "62,207,142" : "155,100,255"},0.06)`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = D.surface2)
                }>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: `rgba(${step.color === D.cyan ? "0,212,255" : step.color === D.orange ? "255,107,43" : step.color === D.green ? "62,207,142" : "155,100,255"},0.1)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: ".95rem",
                    flexShrink: 0,
                  }}>
                  {step.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontWeight: 700,
                      fontSize: ".88rem",
                      color: D.text,
                    }}>
                    {step.label}
                  </div>
                  <div
                    style={{
                      fontSize: ".75rem",
                      color: D.muted,
                      fontWeight: 300,
                      marginTop: ".1rem",
                    }}>
                    {step.sub}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".4rem",
                  }}>
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: step.color,
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      fontSize: ".72rem",
                      color: step.color,
                      fontWeight: 600,
                    }}>
                    OK
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 800,
                    fontSize: ".75rem",
                    color: D.border,
                  }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              {i < FLOW_STEPS.length - 1 && (
                <div
                  style={{
                    width: 1,
                    height: 12,
                    background: `linear-gradient(to bottom,${step.color},${FLOW_STEPS[i + 1].color})`,
                    marginLeft: 26,
                    opacity: 0.4,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* DB & Memory card */}
      <div style={{ ...card, border: `1px solid rgba(62,207,142,0.2)` }}>
        <SectionHead
          icon={
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <ellipse
                cx={8}
                cy={4}
                rx={5}
                ry={2}
                stroke={D.green}
                strokeWidth={1.4}
              />
              <path
                d="M3 4v4c0 1.1 2.24 2 5 2s5-.9 5-2V4"
                stroke={D.green}
                strokeWidth={1.4}
              />
              <path
                d="M3 8v4c0 1.1 2.24 2 5 2s5-.9 5-2V8"
                stroke={D.green}
                strokeWidth={1.4}
              />
            </svg>
          }
          title="Conversation Memory (Postgres)"
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1rem",
            marginBottom: "1.2rem",
          }}>
          {[
            { label: "Stored Convos", val: "127", c: D.green },
            { label: "Max Turns Kept", val: "20", c: D.cyan },
            { label: "DB Status", val: "Live", c: D.green },
          ].map(({ label, val, c }) => (
            <div
              key={label}
              style={{
                background: D.surface2,
                border: `1px solid ${D.border}`,
                borderRadius: 10,
                padding: ".8rem",
                textAlign: "center",
              }}>
              <div
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: "1.4rem",
                  color: c,
                  letterSpacing: "-.02em",
                }}>
                {val}
              </div>
              <div
                style={{
                  fontSize: ".7rem",
                  color: D.muted,
                  marginTop: ".2rem",
                }}>
                {label}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: D.bg,
            border: `1px solid ${D.border}`,
            borderRadius: 10,
            padding: "1rem 1.2rem",
            fontFamily: "'Courier New',monospace",
            fontSize: ".78rem",
            color: D.muted,
            lineHeight: 1.8,
          }}>
          <span style={{ color: D.cyan }}>CREATE TABLE</span> conversations (
          <br />
          {"  "}
          <span style={{ color: D.orange }}>sender_id</span> TEXT PRIMARY KEY,
          <br />
          {"  "}
          <span style={{ color: D.orange }}>history</span> JSONB NOT NULL
          DEFAULT <span style={{ color: D.green }}>'[]'</span>,<br />
          {"  "}
          <span style={{ color: D.orange }}>updated_at</span> TIMESTAMP DEFAULT
          NOW()
          <br />
          );
        </div>
      </div>
    </div>
  );
};

// ─── MAIN DASHBOARD PAGE ─────────────────────────────────────────────────────
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const PAGE_META = {
    overview: {
      title: "Dashboard Overview",
      sub: `Welcome back, ${CLIENT.name} · ${CLIENT.plan} Plan`,
    },
    products: {
      title: "My Products",
      sub: "Products the AI uses to answer customer questions",
    },
    conversations: {
      title: "Customer Conversations",
      sub: "AI-handled WhatsApp & Messenger conversations",
    },
    usecode: { title: "Use Code", sub: "Your automation authentication key" },
    workflow: {
      title: "Workflow & DB",
      sub: "Make.com pipeline, Meta App, and conversation memory",
    },
  };

  return (
      <>
      <GlobalStyle />
      <ParticleCanvas />

      {/* noise overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0.5,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          position: "relative",
          zIndex: 2,
        }}>
        <Sidebar active={activeTab} onChange={setActiveTab} />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            overflowX: "hidden",
          }}>
          <TopBar
            pageTitle={PAGE_META[activeTab].title}
            pageSubtitle={PAGE_META[activeTab].sub}
          />
          <div style={{ flex: 1, padding: "1.8rem 2rem", overflowY: "auto" }}>
            {activeTab === "overview" && (
              <OverviewView setActiveTab={setActiveTab} />
            )}
            {activeTab === "products" && <ProductsView />}
            {activeTab === "conversations" && <ConversationsView />}
            {activeTab === "usecode" && <UseCodeView />}
            {activeTab === "workflow" && <WorkflowView />}
          </div>
        </div>
      </div>
    </>
  );
}
