import { useState, useEffect, useRef } from "react";

const TEAM = [
  {
    id: "wilson",
    name: "Wilson CARTAYE",
    role: "Gérant",
    emoji: "🎯",
    color: "#ff6b35",
    missions: [
      "Définir la vision et la stratégie globale de l'entreprise",
      "Prendre les décisions stratégiques et valider les projets majeurs",
      "Représenter l'entreprise auprès des partenaires et institutions",
    ],
    forInterns: "C'est lui qui valide ton stage et qui peut répondre à tes questions sur la vision de l'entreprise. N'hésite pas à te présenter en début de stage !",
    badge: "BOSS FINAL",
  },
  {
    id: "julie",
    name: "Julie CARTAYE",
    role: "Assistante de direction",
    emoji: "📋",
    color: "#e74c3c",
    missions: [
      "Coordonner les agendas et organiser les réunions de direction",
      "Gérer le courrier, les appels et la communication interne",
      "Assurer le suivi administratif des dossiers et projets",
    ],
    forInterns: "Ta personne de référence pour toute question administrative : convention de stage, absences, fournitures, accès aux locaux. C'est par elle que tout passe !",
    badge: "TOUR DE CONTRÔLE",
  },
  {
    id: "rh",
    name: "[Nom à compléter]",
    role: "Responsable RH",
    emoji: "👥",
    color: "#9b59b6",
    missions: [
      "Recruter et intégrer les nouveaux collaborateurs et stagiaires",
      "Gérer la paie, les congés et le suivi administratif du personnel",
      "Accompagner le développement des compétences et la formation",
    ],
    forInterns: "C'est ton premier contact avant et pendant le stage. Contrat, planning, évaluations, soucis perso au travail… les RH sont là pour toi.",
    badge: "GARDIEN DES TALENTS",
  },
  {
    id: "tech",
    name: "[Nom à compléter]",
    role: "Responsable Technique",
    emoji: "🔧",
    color: "#f39c12",
    missions: [
      "Planifier et superviser les interventions techniques sur le terrain",
      "Assurer la maintenance préventive et curative des équipements",
      "Garantir le respect des normes de sécurité et de qualité",
    ],
    forInterns: "Si tu es en stage technique, c'est ton tuteur terrain. Il t'expliquera les procédures, les outils et les règles de sécurité à respecter.",
    badge: "MAÎTRE DES MACHINES",
  },
  {
    id: "it",
    name: "[Nom à compléter]",
    role: "Responsable IT / Informatique",
    emoji: "💻",
    color: "#00cc88",
    missions: [
      "Administrer l'infrastructure réseau et les systèmes informatiques",
      "Assurer la cybersécurité et la protection des données",
      "Déployer et maintenir les outils numériques de l'entreprise",
    ],
    forInterns: "Ton sauveur du premier jour : il configure ton poste, tes accès mail et tes identifiants. En cas de bug, c'est lui qu'on appelle !",
    badge: "HÉROS DU RÉSEAU",
  },
  {
    id: "commercial",
    name: "[Nom à compléter]",
    role: "Commercial(e)",
    emoji: "📊",
    color: "#3498db",
    missions: [
      "Prospecter et développer le portefeuille clients",
      "Négocier les offres commerciales et suivre les contrats",
      "Analyser le marché et remonter les besoins clients",
    ],
    forInterns: "Si tu es en stage commercial, tu l'accompagneras en rendez-vous client. Il t'apprendra les techniques de vente et la relation client.",
    badge: "CHASSEUR DE DEALS",
  },
  {
    id: "compta",
    name: "[Nom à compléter]",
    role: "Comptable",
    emoji: "💰",
    color: "#2ecc71",
    missions: [
      "Gérer la comptabilité générale et les déclarations fiscales",
      "Suivre la trésorerie et préparer les bilans financiers",
      "Traiter les factures fournisseurs et le suivi des paiements",
    ],
    forInterns: "Pour tes notes de frais, tes indemnités de stage ou toute question sur la facturation, c'est la bonne personne à contacter.",
    badge: "GARDIEN DU TRÉSOR",
  },
  {
    id: "comm",
    name: "[Nom à compléter]",
    role: "Chargé(e) de Communication",
    emoji: "📢",
    color: "#e91e63",
    missions: [
      "Animer les réseaux sociaux et gérer l'image de marque",
      "Concevoir les supports de communication (print et digital)",
      "Organiser les événements internes et externes",
    ],
    forInterns: "Si tu touches au marketing ou à la com', c'est ton binôme créatif. Il peut aussi t'aider à valoriser ton expérience de stage sur LinkedIn !",
    badge: "VOIX DE L'ENTREPRISE",
  },
];

function AvatarUploader({ personId, color, emoji, avatar, onUpload }) {
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onUpload(personId, ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div
      onClick={() => fileRef.current?.click()}
      style={{
        width: "72px",
        height: "72px",
        borderRadius: "18px",
        overflow: "hidden",
        cursor: "pointer",
        flexShrink: 0,
        position: "relative",
        border: `2px solid ${color}55`,
        background: avatar ? "#000" : `${color}15`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.06)";
        e.currentTarget.style.boxShadow = `0 0 20px ${color}33`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {avatar ? (
        <img src={avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
          <span style={{ fontSize: "28px" }}>{emoji}</span>
          <span style={{ fontSize: "8px", color: "#888", fontFamily: "'Chakra Petch', sans-serif", fontWeight: 600, letterSpacing: "0.5px" }}>+ PHOTO</span>
        </div>
      )}
      {/* Hover overlay */}
      <div
        className="avatar-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
          transition: "opacity 0.2s",
          borderRadius: "16px",
          fontSize: "20px",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
      >
        📷
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
    </div>
  );
}

function Card({ person, index, isOpen, onToggle, avatar, onUpload }) {
  return (
    <div style={{ animation: `cardSlideIn 0.5s ease both`, animationDelay: `${index * 0.07}s` }}>
      <div
        onClick={onToggle}
        style={{
          background: "#111125",
          borderRadius: isOpen ? "20px 20px 0 0" : "20px",
          border: `2px solid ${isOpen ? person.color : "#1e1e3a"}`,
          cursor: "pointer",
          transition: "all 0.3s ease",
          overflow: "hidden",
        }}
      >
        <div style={{ height: "4px", background: `linear-gradient(90deg, ${person.color}, ${person.color}44)`, borderRadius: "20px 20px 0 0" }} />
        <div style={{ padding: "14px 18px 12px", display: "flex", alignItems: "center", gap: "14px" }}>
          <div onClick={(e) => e.stopPropagation()}>
            <AvatarUploader personId={person.id} color={person.color} emoji={person.emoji} avatar={avatar} onUpload={onUpload} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Bangers', cursive", fontSize: "20px", color: "#f0f0f0", letterSpacing: "1px", lineHeight: 1.2 }}>
              {person.name}
            </div>
            <div style={{ fontSize: "12px", color: person.color, fontFamily: "'Chakra Petch', sans-serif", fontWeight: 600, marginTop: "3px", textTransform: "uppercase", letterSpacing: "1.5px" }}>
              {person.role}
            </div>
            <div style={{ display: "inline-block", marginTop: "6px", background: `${person.color}20`, border: `1px solid ${person.color}44`, borderRadius: "6px", padding: "2px 8px", fontSize: "9px", fontFamily: "'Bangers', cursive", color: person.color, letterSpacing: "1px" }}>
              {person.badge}
            </div>
          </div>
          <div style={{ fontSize: "18px", color: "#555", transition: "transform 0.3s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>▾</div>
        </div>
      </div>

      {/* Expanded */}
      <div style={{ maxHeight: isOpen ? "800px" : "0", overflow: "hidden", transition: "max-height 0.4s ease" }}>
        <div style={{ background: "#0d0d20", border: `2px solid ${person.color}`, borderTop: "none", borderRadius: "0 0 20px 20px", padding: "0 22px 22px" }}>

          {/* Big avatar */}
          {avatar && (
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "18px" }}>
              <div style={{ width: "160px", height: "160px", borderRadius: "24px", overflow: "hidden", border: `3px solid ${person.color}55`, boxShadow: `0 4px 30px ${person.color}20` }}>
                <img src={avatar} alt={person.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          )}

          {/* Missions */}
          <div style={{ marginTop: "18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: `${person.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>🎯</div>
              <span style={{ fontFamily: "'Bangers', cursive", fontSize: "15px", color: person.color, letterSpacing: "1px" }}>SES MISSIONS</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px", paddingLeft: "4px" }}>
              {person.missions.map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "#bbb", lineHeight: 1.55, fontFamily: "'Chakra Petch', sans-serif" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "2px", background: person.color, marginTop: "7px", flexShrink: 0 }} />
                  {m}
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${person.color}33, transparent)`, margin: "16px 0" }} />

          {/* For interns */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#f1c40f22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>🎓</div>
              <span style={{ fontFamily: "'Bangers', cursive", fontSize: "15px", color: "#f1c40f", letterSpacing: "1px" }}>POUR TOI, STAGIAIRE</span>
            </div>
            <div style={{ background: "#f1c40f08", border: "1px solid #f1c40f22", borderRadius: "12px", padding: "14px 16px", fontSize: "13px", color: "#ddd", lineHeight: 1.7, fontFamily: "'Chakra Petch', sans-serif" }}>
              {person.forInterns}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamDirectory() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [avatars, setAvatars] = useState({});
  const [glitch, setGlitch] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get("team-avatars");
        if (result?.value) setAvatars(JSON.parse(result.value));
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try { await window.storage.set("team-avatars", JSON.stringify(avatars)); } catch (e) {}
    })();
  }, [avatars, loaded]);

  useEffect(() => {
    const id = setInterval(() => { setGlitch(true); setTimeout(() => setGlitch(false), 120); }, 6000);
    return () => clearInterval(id);
  }, []);

  const handleUpload = (personId, dataUrl) => setAvatars((prev) => ({ ...prev, [personId]: dataUrl }));

  const filtered = TEAM.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const avatarCount = Object.keys(avatars).length;

  return (
    <div style={{ minHeight: "100vh", background: "#08081a", color: "#eee", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Chakra+Petch:wght@400;600&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes cardSlideIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
      `}</style>

      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(0,255,100,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,100,0.025) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.15), transparent)", animation: "scanline 4s linear infinite", pointerEvents: "none", zIndex: 10 }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "700px", margin: "0 auto", padding: "32px 16px 48px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#00ff8812", border: "1px solid #00ff8833", borderRadius: "20px", padding: "6px 16px", fontSize: "11px", fontFamily: "'Chakra Petch', sans-serif", fontWeight: 600, color: "#00ff88", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "14px" }}>
            <span style={{ animation: "pulse 2s ease infinite", fontSize: "8px" }}>●</span>
            DOSSIER CONFIDENTIEL — ONBOARDING
          </div>
          <h1 style={{ fontFamily: "'Bangers', cursive", fontSize: "clamp(30px, 6vw, 50px)", margin: 0, letterSpacing: "2px", lineHeight: 1.1, color: "#f0f0f0", textShadow: glitch ? "3px 0 #ff0055, -3px 0 #00aaff" : "none", transition: "text-shadow 0.1s" }}>
            QUI FAIT QUOI <span style={{ color: "#00ff88" }}>?</span>
          </h1>
          <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "14px", color: "#666", marginTop: "6px", letterSpacing: "0.5px" }}>
            Clique sur une fiche pour voir les missions · Clique sur l'avatar pour ajouter une photo
          </p>
        </div>

        {/* Search */}
        <div style={{ margin: "20px 0 24px", position: "relative" }}>
          <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", color: "#555", pointerEvents: "none" }}>🔍</div>
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Chercher un nom, un rôle..."
            style={{ width: "100%", padding: "14px 16px 14px 44px", borderRadius: "14px", border: "2px solid #1e1e3a", background: "#0e0e22", color: "#eee", fontSize: "14px", fontFamily: "'Chakra Petch', sans-serif", outline: "none", boxSizing: "border-box", transition: "border-color 0.3s" }}
            onFocus={(e) => (e.target.style.borderColor = "#00ff8866")} onBlur={(e) => (e.target.style.borderColor = "#1e1e3a")}
          />
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
          {[
            { label: "MEMBRES", value: TEAM.length, color: "#00ff88" },
            { label: "AVATARS", value: `${avatarCount}/${TEAM.length}`, color: avatarCount === TEAM.length ? "#2ecc71" : "#f39c12" },
            { label: "AFFICHÉS", value: filtered.length, color: "#3498db" },
          ].map((s) => (
            <div key={s.label} style={{ flex: 1, minWidth: "80px", background: "#0e0e22", border: "1px solid #1e1e3a", borderRadius: "12px", padding: "12px 10px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: "24px", color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "10px", color: "#555", letterSpacing: "1.5px", marginTop: "4px", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.map((person, i) => (
            <Card key={person.id} person={person} index={i} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} avatar={avatars[person.id]} onUpload={handleUpload} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#555", fontFamily: "'Chakra Petch', sans-serif", fontSize: "14px" }}>
            Aucun résultat pour «&nbsp;{searchTerm}&nbsp;» 🔍
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: "32px", background: "#0e0e22", borderRadius: "14px", padding: "16px 20px", borderLeft: "4px solid #f1c40f", display: "flex", alignItems: "flex-start", gap: "14px" }}>
          <span style={{ fontSize: "24px", flexShrink: 0, marginTop: "2px" }}>📷</span>
          <div>
            <div style={{ fontFamily: "'Bangers', cursive", fontSize: "15px", color: "#f1c40f", letterSpacing: "1px", marginBottom: "4px" }}>COMMENT AJOUTER LES AVATARS</div>
            <p style={{ margin: 0, fontSize: "13px", color: "#999", lineHeight: 1.7, fontFamily: "'Chakra Petch', sans-serif" }}>
              Clique directement sur l'icône emoji à gauche de chaque carte pour uploader l'avatar cartoon généré par IA. L'image s'affiche en miniature sur la carte et en grand à l'ouverture. Les avatars sont sauvegardés automatiquement entre les sessions !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
