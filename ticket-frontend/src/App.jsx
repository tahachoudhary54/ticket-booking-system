import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/tickets";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;

/* ── SVG Icons ── */
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const icons = {
    ticket:     <><path d="M2 9a2 2 0 0 1 0-4V5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2v1a2 2 0 0 1 0 4v1a2 2 0 0 0 2-2v-1a2 2 0 0 0 0-4V9z" fill={color}/><rect x="7" y="3" width="13" height="18" rx="2" fill="none" stroke={color} strokeWidth="1.8"/><path d="M7 9h13M7 15h13" stroke={color} strokeWidth="1.5" strokeDasharray="3 2"/></>,
    plus:       <><path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2.2" strokeLinecap="round"/></>,
    search:     <><circle cx="11" cy="11" r="7" stroke={color} strokeWidth="1.8" fill="none"/><path d="M16.5 16.5L21 21" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    mappin:     <><path d="M12 2C8.686 2 6 4.686 6 8c0 5 6 12 6 12s6-7 6-12c0-3.314-2.686-6-6-6z" fill={color} opacity=".2" stroke={color} strokeWidth="1.5"/><circle cx="12" cy="8" r="2.5" fill={color}/></>,
    calendar:   <><rect x="3" y="4" width="18" height="17" rx="2.5" stroke={color} strokeWidth="1.8" fill="none"/><path d="M3 9h18M8 2v4M16 2v4" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    seat:       <><path d="M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/><path d="M3 10h18v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4z" fill={color} opacity=".2" stroke={color} strokeWidth="1.8"/><path d="M7 16v3M17 16v3" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    edit:       <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round"/></>,
    trash:      <><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/></>,
    arrowleft:  <><path d="M19 12H5M11 6l-6 6 6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>,
    check:      <><path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></>,
    x:          <><path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    star:       <><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={color} opacity=".85"/></>,
    rupee:      <><path d="M6 3h12M6 8h12M9.5 21L6 8" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><path d="M6 8c0 3 2 5 6 5s6-2 6-5" stroke={color} strokeWidth="1.8" fill="none"/></>,
    music:      <><path d="M9 18V5l12-2v13" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="6" cy="18" r="3" fill={color} opacity=".85"/><circle cx="18" cy="16" r="3" fill={color} opacity=".85"/></>,
    trophy:     <><path d="M6 2h12v10a6 6 0 0 1-12 0V2z" stroke={color} strokeWidth="1.8" fill="none"/><path d="M6 7H2a2 2 0 0 0 2 2h2M18 7h4a2 2 0 0 1-2 2h-2M12 18v3M8 21h8" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    mask:       <><path d="M4 8s2-3 8-3 8 3 8 3v6a8 8 0 0 1-16 0V8z" stroke={color} strokeWidth="1.8" fill="none"/><path d="M8 13s1 2 4 2 4-2 4-2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><circle cx="9" cy="11" r="1.2" fill={color}/><circle cx="15" cy="11" r="1.2" fill={color}/></>,
    mic:        <><rect x="9" y="2" width="6" height="12" rx="3" fill={color} opacity=".8" stroke={color} strokeWidth="1.5"/><path d="M5 10a7 7 0 0 0 14 0M12 19v3M8 22h8" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/></>,
    briefcase:  <><rect x="2" y="7" width="20" height="15" rx="2.5" stroke={color} strokeWidth="1.8" fill="none"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    confetti:   <><circle cx="5" cy="5" r="2" fill={color}/><circle cx="19" cy="5" r="2" fill={color} opacity=".6"/><circle cx="12" cy="3" r="1.5" fill={color} opacity=".8"/><path d="M3 20l5-8 4 5 3-4 5 7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display:"block", flexShrink:0 }}>
      {icons[name]}
    </svg>
  );
};

/* ── Inline SVG illustrations per category ── */
const CatIllustration = ({ cat }) => {
  const svgStyle = { position:"absolute", inset:0, width:"100%", height:"100%", display:"block" };
  const scenes = {
    Concert: (
      <svg viewBox="0 0 110 160" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
        <rect width="110" height="160" fill="#1A0A3A"/>
        <polygon points="20,0 0,160 50,160" fill="#7C6FF7" opacity="0.18"/>
        <polygon points="55,0 25,160 80,160" fill="#A89DF8" opacity="0.13"/>
        <polygon points="90,0 65,160 110,160" fill="#7C6FF7" opacity="0.18"/>
        <rect x="0" y="120" width="110" height="40" fill="#2D1060"/>
        <rect x="0" y="118" width="110" height="5" fill="#7C6FF7" opacity="0.6"/>
        <rect x="5" y="85" width="18" height="32" rx="3" fill="#2A1855"/>
        <rect x="87" y="85" width="18" height="32" rx="3" fill="#2A1855"/>
        <circle cx="14" cy="95" r="5" fill="#3D2A7A"/>
        <circle cx="96" cy="95" r="5" fill="#3D2A7A"/>
        <rect x="8" y="108" width="12" height="6" rx="1" fill="#3D2A7A"/>
        <rect x="90" y="108" width="12" height="6" rx="1" fill="#3D2A7A"/>
        <ellipse cx="55" cy="102" rx="7" ry="8" fill="#12082A"/>
        <rect x="50" y="110" width="10" height="14" rx="2" fill="#12082A"/>
        <line x1="50" y1="114" x2="40" y2="122" stroke="#12082A" strokeWidth="3" strokeLinecap="round"/>
        <line x1="60" y1="114" x2="70" y2="118" stroke="#12082A" strokeWidth="3" strokeLinecap="round"/>
        <line x1="55" y1="98" x2="55" y2="85" stroke="#A89DF8" strokeWidth="1.5" opacity="0.7"/>
        <circle cx="55" cy="84" r="3" fill="#A89DF8" opacity="0.7"/>
        {[12,22,32,42,52,62,72,82,97].map((x,i)=>(
          <g key={i}>
            <ellipse cx={x} cy="140" rx="5" ry="6" fill="#12082A" opacity="0.9"/>
            <rect x={x-4} y="146" width="8" height="10" rx="1" fill="#12082A" opacity="0.9"/>
          </g>
        ))}
        <circle cx="20" cy="8" r="6" fill="#FFE566" opacity="0.8"/>
        <circle cx="55" cy="6" r="6" fill="#fff" opacity="0.7"/>
        <circle cx="90" cy="8" r="6" fill="#FFE566" opacity="0.8"/>
        {[[15,30],[80,20],[95,50],[8,60],[100,75]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="1.2" fill="#fff" opacity="0.5"/>
        ))}
      </svg>
    ),
    Sports: (
      <svg viewBox="0 0 110 160" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
        <rect width="110" height="160" fill="#0D2B1A"/>
        <rect x="0" y="0" width="110" height="160" fill="#0D2B1A"/>
        <rect x="5" y="10" width="6" height="30" fill="#1A4A28"/>
        <rect x="2" y="8" width="12" height="5" rx="1" fill="#F4784A" opacity="0.9"/>
        <rect x="99" y="10" width="6" height="30" fill="#1A4A28"/>
        <rect x="96" y="8" width="12" height="5" rx="1" fill="#F4784A" opacity="0.9"/>
        <polygon points="8,13 0,80 30,80" fill="#F4784A" opacity="0.06"/>
        <polygon points="102,13 80,80 110,80" fill="#F4784A" opacity="0.06"/>
        <ellipse cx="55" cy="120" rx="50" ry="30" fill="#1A5C2A"/>
        <ellipse cx="55" cy="120" rx="40" ry="23" fill="#1E6B30" stroke="#2A8040" strokeWidth="1"/>
        <ellipse cx="55" cy="120" rx="15" ry="9" fill="none" stroke="#2A8040" strokeWidth="1"/>
        <line x1="55" y1="97" x2="55" y2="143" stroke="#2A8040" strokeWidth="1"/>
        <rect x="48" y="108" width="2" height="10" fill="#F5DEB3"/>
        <rect x="52" y="108" width="2" height="10" fill="#F5DEB3"/>
        <rect x="56" y="108" width="2" height="10" fill="#F5DEB3"/>
        <rect x="47" y="107" width="14" height="2" rx="1" fill="#F5DEB3"/>
        <path d="M45 55 h20 v15 a10 10 0 0 1-20 0 z" fill="none" stroke="#F5A623" strokeWidth="2"/>
        <path d="M45 62 h-8 a5 5 0 0 0 8 5" fill="none" stroke="#F5A623" strokeWidth="1.5"/>
        <path d="M65 62 h8 a5 5 0 0 1-8 5" fill="none" stroke="#F5A623" strokeWidth="1.5"/>
        <rect x="51" y="70" width="8" height="6" fill="#F5A623"/>
        <rect x="46" y="76" width="18" height="3" rx="1" fill="#F5A623"/>
        <circle cx="55" cy="63" r="4" fill="#F5A623" opacity="0.5"/>
        {[8,18,28,38,48,58,68,78,88,100].map((x,i)=>(
          <circle key={i} cx={x} cy={[155,150,153,156,151,154,152,155,150,153][i]} r="4" fill="#0A2215" opacity="0.8"/>
        ))}
        {[[20,25],[40,15],[70,20],[90,30],[15,45],[95,42]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="1" fill="#fff" opacity="0.6"/>
        ))}
      </svg>
    ),
    Theatre: (
      <svg viewBox="0 0 110 160" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
        <rect width="110" height="160" fill="#1A0A12"/>
        <path d="M0 0 Q20 40 10 160 L0 160 Z" fill="#8B0A3A"/>
        <path d="M0 0 Q30 50 15 160 L0 160 Z" fill="#C13370" opacity="0.5"/>
        <path d="M110 0 Q90 40 100 160 L110 160 Z" fill="#8B0A3A"/>
        <path d="M110 0 Q80 50 95 160 L110 160 Z" fill="#C13370" opacity="0.5"/>
        {[0,1,2,3,4].map(i=>(
          <path key={i} d={`M${i*4} ${i*10} Q${8+i*2} ${30+i*15} ${i*3} ${70+i*18}`} stroke="#6B0828" strokeWidth="1" fill="none" opacity="0.6"/>
        ))}
        <rect x="15" y="120" width="80" height="40" fill="#2A1020"/>
        <rect x="15" y="118" width="80" height="4" fill="#E8508A" opacity="0.5"/>
        <circle cx="38" cy="75" r="14" fill="none" stroke="#FFE566" strokeWidth="1.5"/>
        <path d="M31 80 Q38 88 45 80" stroke="#FFE566" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <circle cx="34" cy="72" r="2" fill="#FFE566"/>
        <circle cx="42" cy="72" r="2" fill="#FFE566"/>
        <circle cx="72" cy="75" r="14" fill="none" stroke="#A0A0FF" strokeWidth="1.5"/>
        <path d="M65 82 Q72 74 79 82" stroke="#A0A0FF" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <circle cx="68" cy="72" r="2" fill="#A0A0FF"/>
        <circle cx="76" cy="72" r="2" fill="#A0A0FF"/>
        <ellipse cx="55" cy="105" rx="5" ry="6" fill="#12082A"/>
        <rect x="51" y="111" width="8" height="10" rx="1" fill="#12082A"/>
        <polygon points="45,0 65,0 75,40 35,40" fill="#FFE566" opacity="0.06"/>
        <ellipse cx="55" cy="110" rx="18" ry="6" fill="#FFE566" opacity="0.08"/>
        <rect x="15" y="0" width="80" height="3" fill="#C13370" opacity="0.4"/>
      </svg>
    ),
    Comedy: (
      <svg viewBox="0 0 110 160" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
        <rect width="110" height="160" fill="#072A24"/>
        <line x1="55" y1="50" x2="55" y2="130" stroke="#2BBFA4" strokeWidth="2.5" opacity="0.6"/>
        <line x1="35" y1="130" x2="75" y2="130" stroke="#2BBFA4" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
        <line x1="55" y1="130" x2="45" y2="155" stroke="#2BBFA4" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
        <rect x="46" y="30" width="18" height="26" rx="9" fill="#1A8070" stroke="#2BBFA4" strokeWidth="1.5"/>
        <rect x="49" y="33" width="12" height="20" rx="6" fill="#0E5A50"/>
        {[38,43,48,53].map(y=>(
          <line key={y} x1="46" y1={y} x2="64" y2={y} stroke="#2BBFA4" strokeWidth="0.8" opacity="0.4"/>
        ))}
        <ellipse cx="55" cy="125" rx="30" ry="8" fill="#2BBFA4" opacity="0.08"/>
        <polygon points="30,0 80,0 85,30 25,30" fill="#2BBFA4" opacity="0.07"/>
        {[[15,140],[35,145],[55,142],[75,146],[95,141]].map(([x,y],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r="7" fill="#0D3D32"/>
            <path d={`M${x-3} ${y+2} Q${x} ${y+6} ${x+3} ${y+2}`} stroke="#2BBFA4" strokeWidth="1" fill="none"/>
            <circle cx={x-2} cy={y-1} r="1" fill="#2BBFA4" opacity="0.7"/>
            <circle cx={x+2} cy={y-1} r="1" fill="#2BBFA4" opacity="0.7"/>
          </g>
        ))}
        {[[10,20],[90,15],[20,60],[95,70],[5,90]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="1.5" fill="#2BBFA4" opacity="0.3"/>
        ))}
        <text x="15" y="35" fontSize="10" fill="#2BBFA4" opacity="0.25" fontWeight="bold">HA</text>
        <text x="78" y="55" fontSize="9" fill="#2BBFA4" opacity="0.2" fontWeight="bold">HA</text>
        <text x="8" y="75" fontSize="8" fill="#2BBFA4" opacity="0.15" fontWeight="bold">HA!</text>
      </svg>
    ),
    Festival: (
      <svg viewBox="0 0 110 160" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
        <rect width="110" height="160" fill="#1A0E00"/>
        <ellipse cx="55" cy="80" rx="60" ry="50" fill="#F5A623" opacity="0.06"/>
        {[[25,30],[85,25],[55,20],[15,50],[95,45]].map(([x,y],i)=>(
          <g key={i}>
            {[0,45,90,135,180,225,270,315].map((deg,j)=>(
              <line
                key={j}
                x1={x} y1={y}
                x2={x + Math.cos(deg*Math.PI/180)*12}
                y2={y + Math.sin(deg*Math.PI/180)*12}
                stroke={["#F5A623","#E8508A","#7C6FF7","#2BBFA4","#4A90D9"][i%5]}
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.8"
              />
            ))}
            <circle cx={x} cy={y} r="2.5" fill={["#F5A623","#E8508A","#7C6FF7","#2BBFA4","#4A90D9"][i%5]}/>
          </g>
        ))}
        <line x1="10" y1="60" x2="100" y2="50" stroke="#555" strokeWidth="1" opacity="0.5"/>
        {["#F5A623","#E8508A","#7C6FF7","#2BBFA4","#4A90D9","#F5A623","#E8508A"].map((c,i)=>(
          <polygon key={i} points={`${14+i*13},60 ${20+i*13},60 ${17+i*13},70`} fill={c} opacity="0.9"/>
        ))}
        <circle cx="75" cy="105" r="25" fill="none" stroke="#F5A623" strokeWidth="1.5" opacity="0.6"/>
        {[0,45,90,135,180,225,270,315].map((deg,i)=>(
          <g key={i}>
            <line x1="75" y1="105" x2={75+Math.cos(deg*Math.PI/180)*25} y2={105+Math.sin(deg*Math.PI/180)*25} stroke="#F5A623" strokeWidth="0.8" opacity="0.4"/>
            <rect x={75+Math.cos(deg*Math.PI/180)*22-4} y={105+Math.sin(deg*Math.PI/180)*22-4} width="8" height="8" rx="2" fill="#2A1800" stroke="#F5A623" strokeWidth="1" opacity="0.8"/>
          </g>
        ))}
        <circle cx="75" cy="105" r="5" fill="#F5A623" opacity="0.8"/>
        {[8,18,28,38,48,58,65,80,90,102].map((x,i)=>(
          <g key={i}>
            <circle cx={x} cy="148" r="5" fill="#0D0700" opacity="0.9"/>
            <rect x={x-3} y="153" width="6" height="8" rx="1" fill="#0D0700" opacity="0.9"/>
          </g>
        ))}
        {[[15,80],[30,90],[45,75],[60,85],[80,78],[20,95],[90,88]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="2" fill={["#F5A623","#E8508A","#7C6FF7"][i%3]} opacity="0.6"/>
        ))}
      </svg>
    ),
    Conference: (
      <svg viewBox="0 0 110 160" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
        <rect width="110" height="160" fill="#071428"/>
        <rect x="15" y="20" width="80" height="52" rx="3" fill="#0E2040" stroke="#4A90D9" strokeWidth="1.5"/>
        <rect x="18" y="23" width="74" height="46" rx="2" fill="#0A1A35"/>
        <rect x="28" y="52" width="8" height="12" fill="#4A90D9" opacity="0.8"/>
        <rect x="40" y="44" width="8" height="20" fill="#4A90D9" opacity="0.8"/>
        <rect x="52" y="38" width="8" height="26" fill="#7C6FF7" opacity="0.9"/>
        <rect x="64" y="46" width="8" height="18" fill="#4A90D9" opacity="0.8"/>
        <rect x="76" y="32" width="8" height="32" fill="#2BBFA4" opacity="0.9"/>
        <line x1="22" y1="64" x2="88" y2="64" stroke="#4A90D9" strokeWidth="0.8" opacity="0.4"/>
        <rect x="42" y="78" width="26" height="16" rx="2" fill="#0E2040" stroke="#4A90D9" strokeWidth="1"/>
        <rect x="47" y="81" width="16" height="2" rx="1" fill="#4A90D9" opacity="0.5"/>
        <rect x="47" y="85" width="12" height="2" rx="1" fill="#4A90D9" opacity="0.4"/>
        <ellipse cx="55" cy="75" rx="5" ry="6" fill="#12122A"/>
        <rect x="51" y="81" width="8" height="10" rx="1" fill="#12122A"/>
        {[[18,125],[30,120],[42,125],[58,120],[72,125],[84,120],[96,125]].map(([x,y],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r="6" fill="#0A1A30"/>
            <rect x={x-5} y={y+6} width="10" height="12" rx="2" fill="#0A1A30"/>
            <rect x={x-5} y={y+12} width="10" height="7" rx="1" fill="#0E2040" stroke="#4A90D9" strokeWidth="0.5"/>
            <rect x={x-4} y={y+13} width="8" height="5" rx="0.5" fill="#071428"/>
            <circle cx={x-1} cy={y+15} r="1" fill="#4A90D9" opacity="0.6"/>
            <circle cx={x+2} cy={y+15} r="1" fill="#7C6FF7" opacity="0.6"/>
          </g>
        ))}
        {[[18,138],[30,133],[42,138],[58,133],[72,138],[84,133],[96,138]].map(([x,y],i)=>(
          <rect key={i} x={x-7} y={y} width="14" height="5" rx="2" fill="#0D1E38" stroke="#4A90D9" strokeWidth="0.5" opacity="0.6"/>
        ))}
        <line x1="0" y1="145" x2="110" y2="145" stroke="#4A90D9" strokeWidth="0.5" opacity="0.15"/>
        <line x1="0" y1="155" x2="110" y2="155" stroke="#4A90D9" strokeWidth="0.5" opacity="0.15"/>
      </svg>
    ),
  };
  return <>{scenes[cat] || scenes["Concert"]}</>;
};

/* ── Hero banner SVG ── */
const HeroBanner = () => (
  <svg width="100%" height="160" viewBox="0 0 900 160" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={{display:"block",borderRadius:18}}>
    <rect width="900" height="160" fill="#0D0820"/>
    {[[50,20],[120,10],[200,35],[320,15],[450,25],[580,12],[700,30],[820,18],[880,40],[30,55],[170,48],[390,42],[620,50],[780,45],[900,20]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r={i%3===0?2:1.2} fill="#fff" opacity={0.3+Math.random()*0.4}/>
    ))}
    <polygon points="100,0 60,160 140,160" fill="#7C6FF7" opacity="0.08"/>
    <polygon points="300,0 240,160 360,160" fill="#F5A623" opacity="0.07"/>
    <polygon points="550,0 490,160 610,160" fill="#E8508A" opacity="0.07"/>
    <polygon points="780,0 720,160 840,160" fill="#2BBFA4" opacity="0.07"/>
    {[30,60,90,120,150,180,210,240,280,310,340,370,400,430,460,490,520,555,585,615,645,675,710,740,770,800,830,860,890].map((x,i)=>(
      <g key={i}>
        <ellipse cx={x} cy={148} rx={6} ry={7} fill="#060412" opacity="0.95"/>
        <rect x={x-5} y={154} width={10} height={8} rx="1" fill="#060412" opacity="0.95"/>
        {i%4===0&&<line x1={x} y1={140} x2={x+8} y2={132} stroke="#060412" strokeWidth="2.5" strokeLinecap="round"/>}
        {i%5===0&&<line x1={x} y1={140} x2={x-8} y2={133} stroke="#060412" strokeWidth="2.5" strokeLinecap="round"/>}
      </g>
    ))}
    <ellipse cx="450" cy="160" rx="200" ry="40" fill="#7C6FF7" opacity="0.12"/>
    {[150,300,450,600,750].map((x,i)=>(
      <circle key={i} cx={x} cy={8} r={7} fill="#FFE566" opacity={0.6+i*0.05}/>
    ))}
  </svg>
);

/* ── Category config ── */
const CATS = [
  { l:"Concert",    c:"#7C6FF7", bg:"#F0EFFE", dark:"#5B52D6", icon:"music"     },
  { l:"Sports",     c:"#F4784A", bg:"#FEF1EC", dark:"#D45C2C", icon:"trophy"    },
  { l:"Theatre",    c:"#E8508A", bg:"#FDE9F1", dark:"#C13370", icon:"mask"      },
  { l:"Comedy",     c:"#2BBFA4", bg:"#E5F8F5", dark:"#1A9A83", icon:"mic"       },
  { l:"Festival",   c:"#F5A623", bg:"#FEF5E7", dark:"#D4860A", icon:"confetti"  },
  { l:"Conference", c:"#4A90D9", bg:"#EBF4FD", dark:"#2E72B8", icon:"briefcase" },
];

const STATUS_MAP = {
  Confirmed: { c:"#2BBFA4", bg:"#E5F8F5", icon:"check" },
  Pending:   { c:"#F5A623", bg:"#FEF5E7", icon:"star"  },
  Cancelled: { c:"#E8508A", bg:"#FDE9F1", icon:"x"     },
};

const getCat    = l => CATS.find(c => c.l === l) || CATS[0];
const getStatus = s => STATUS_MAP[s] || STATUS_MAP.Pending;

/* ── Stat Card ── */
function Stat({ label, value, color, bg, iconName }) {
  return (
    <div style={{ background:bg, borderRadius:18, padding:"20px 24px" }}>
      <div style={{ marginBottom:10 }}><Icon name={iconName} size={20} color={color} /></div>
      <div style={{ fontSize:26, fontWeight:800, color, lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:11, color, opacity:.65, marginTop:5, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em" }}>{label}</div>
    </div>
  );
}

/* ── Ticket Card ── */
function Card({ t, onEdit, onDelete }) {
  const [hov, setHov] = useState(false);
  const cat = getCat(t.cat);
  const st  = getStatus(t.status);
  const dateStr = new Date(t.date).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" });

  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        background:"#fff",
        borderRadius:22,
        overflow:"hidden",
        border:`1.5px solid ${hov ? cat.c+"60" : "#EEEEF4"}`,
        boxShadow: hov ? `0 12px 40px ${cat.c}18` : "0 2px 10px rgba(0,0,0,0.05)",
        transition:"all 0.25s ease",
        display:"flex"
      }}
    >
      <div style={{ width:140, flexShrink:0, position:"relative", overflow:"hidden", borderRadius:"20px 0 0 20px", minHeight:140 }}>
        <CatIllustration cat={cat.l} />
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(to right, transparent 65%, #fff)` }} />
        <div style={{ position:"absolute", top:10, left:10, background:"rgba(0,0,0,0.6)", borderRadius:8, padding:"4px 9px", display:"flex", alignItems:"center", gap:5 }}>
          <Icon name={cat.icon} size={12} color="#fff" />
          <span style={{ fontSize:10, color:"#fff", fontWeight:600, letterSpacing:"0.05em" }}>{cat.l}</span>
        </div>
      </div>

      <div style={{ flex:1, padding:"18px 20px", display:"flex", flexDirection:"column", gap:10 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
          <div style={{ fontWeight:800, fontSize:16, color:"#12122A", lineHeight:1.25, flex:1 }}>{t.event}</div>
          <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 11px", borderRadius:99, background:st.bg, color:st.c, fontSize:11, fontWeight:700, whiteSpace:"nowrap", flexShrink:0 }}>
            <Icon name={st.icon} size={11} color={st.c} />
            {t.status}
          </span>
        </div>

        <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
          <span style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, color:"#7878A0" }}>
            <Icon name="mappin" size={13} color={cat.c} /> {t.venue}{t.city ? `, ${t.city}` : ""}
          </span>
          <span style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, color:"#7878A0" }}>
            <Icon name="calendar" size={13} color={cat.c} /> {dateStr}
          </span>
          <span style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, color:"#7878A0" }}>
            <Icon name="seat" size={13} color={cat.c} /> {t.seats} seat{t.seats>1?"s":""}
          </span>
        </div>

        <div style={{ borderTop:"1.5px dashed #EEEEF4" }} />

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:22, fontWeight:800, color:"#12122A", lineHeight:1 }}>₹{(t.price*t.seats).toLocaleString()}</div>
            <div style={{ fontSize:11, color:"#B0B0CC", marginTop:2 }}>₹{t.price.toLocaleString()} per seat</div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button
              onClick={()=>onEdit(t)}
              style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 14px", borderRadius:10, border:`1.5px solid ${cat.c}40`, background:cat.bg, color:cat.c, cursor:"pointer", fontSize:13, fontWeight:600, transition:"all 0.18s" }}
              onMouseEnter={e=>{e.currentTarget.style.background=cat.c; e.currentTarget.style.color="#fff";}}
              onMouseLeave={e=>{e.currentTarget.style.background=cat.bg; e.currentTarget.style.color=cat.c;}}
            >
              <Icon name="edit" size={13} color="currentColor" /> Edit
            </button>
            <button
              onClick={()=>onDelete(t.id)}
              style={{ display:"flex", alignItems:"center", gap:5, padding:"7px 12px", borderRadius:10, border:"1.5px solid #FFD6E0", background:"#FFF0F4", color:"#E8508A", cursor:"pointer", fontSize:13, fontWeight:600, transition:"all 0.18s" }}
              onMouseEnter={e=>{e.currentTarget.style.background="#E8508A"; e.currentTarget.style.color="#fff";}}
              onMouseLeave={e=>{e.currentTarget.style.background="#FFF0F4"; e.currentTarget.style.color="#E8508A"}}
            >
              <Icon name="trash" size={13} color="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Form Field ── */
function Field({ label, name, type="text", options, form, setForm, errors }) {
  const err = errors[name];
  const base = {
    width:"100%",
    padding:"11px 14px",
    borderRadius:12,
    border:`1.5px solid ${err?"#E8508A80":"#E8E8F0"}`,
    background:"#F8F8FC",
    color:"#12122A",
    fontSize:14,
    fontFamily:"'Plus Jakarta Sans',sans-serif",
    outline:"none",
    boxSizing:"border-box",
    transition:"border-color 0.18s, background 0.18s"
  };

  return (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#9898B8", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.1em" }}>{label}</label>
      {options ? (
        <select
          value={form[name]}
          onChange={e=>setForm(f=>({...f,[name]:e.target.value}))}
          style={{...base,cursor:"pointer"}}
          onFocus={e=>{e.target.style.borderColor="#7C6FF7";e.target.style.background="#fff";}}
          onBlur={e=>{e.target.style.borderColor=err?"#E8508A80":"#E8E8F0";e.target.style.background="#F8F8FC";}}
        >
          {options.map(o=><option key={o.l||o} value={o.l||o}>{o.l||o}</option>)}
        </select>
      ) : (
        <input
          type={type}
          value={form[name]}
          onChange={e=>setForm(f=>({...f,[name]:e.target.value}))}
          placeholder={`Enter ${label.toLowerCase()}`}
          style={base}
          onFocus={e=>{e.target.style.borderColor="#7C6FF7";e.target.style.background="#fff";}}
          onBlur={e=>{e.target.style.borderColor=err?"#E8508A80":"#E8E8F0";e.target.style.background="#F8F8FC";}}
        />
      )}
      {err && <p style={{ color:"#E8508A", fontSize:11, margin:"4px 0 0", fontWeight:500 }}>{err}</p>}
    </div>
  );
}

/* ── App ── */
export default function App() {
  const [tickets, setTickets] = useState([]);
  const [view,    setView]    = useState("list");
  const [editId,  setEditId]  = useState(null);
  const [search,  setSearch]  = useState("");
  const [fCat,    setFCat]    = useState("All");
  const [form,    setForm]    = useState({ event:"", venue:"", city:"", date:"", cat:"Concert", seats:1, price:"", status:"Pending" });
  const [errors,  setErrors]  = useState({});
  const [toast,   setToast]   = useState(null);
  const [delId,   setDelId]   = useState(null);

  const showToast = (msg, ok=true) => {
    setToast({msg,ok});
    setTimeout(()=>setToast(null),3200);
  };

  const validate = () => {
    const e = {};
    if (!form.event.trim()) e.event = "Event name required";
    if (!form.venue.trim()) e.venue = "Venue required";
    if (!form.date) e.date = "Date required";
    if (!form.price || +form.price <= 0) e.price = "Enter valid price";
    if (!form.seats || +form.seats < 1) e.seats = "Min 1 seat";
    return e;
  };

  const mapBackendToUI = (item) => ({
    id: item._id,
    event: item.title || "",
    venue: item.venue || "",
    city: item.city || "",
    date: item.date || "",
    cat: item.category || "Concert",
    seats: item.totalSeats || 1,
    price: item.price || 0,
    status: item.status || "Pending",
    description: item.description || "",
    time: item.time || "7:00 PM",
  });

  const fetchTickets = async () => {
    try {
      const res = await fetch(API_URL);
      const result = await res.json();

      console.log("GET response:", result);

      const ticketsArray = Array.isArray(result)
        ? result
        : Array.isArray(result.data)
        ? result.data
        : [];

      const mappedData = ticketsArray.map((item) => ({
        id: item._id || item.id,
        event: item.title || "",
        venue: item.venue || "",
        city: item.city || "",
        date: item.date || "",
        cat: item.category || "Concert",
        seats: item.totalSeats || 1,
        price: item.price || 0,
        status: item.status || "Pending",
        description: item.description || "",
        time: item.time || "7:00 PM",
      }));

      console.log("Mapped tickets:", mappedData);
      setTickets(mappedData);
    } catch (error) {
      console.log("Error fetching tickets:", error);
      setTickets([]);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const openCreate = () => {
    setForm({event:"",venue:"",city:"",date:"",cat:"Concert",seats:1,price:"",status:"Pending"});
    setErrors({});
    setEditId(null);
    setView("form");
  };

  const openEdit = (t) => {
    setForm({...t});
    setErrors({});
    setEditId(t.id);
    setView("form");
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    const payload = {
      title: form.event,
      description: form.event,
      category: form.cat,
      date: form.date,
      time: "7:00 PM",
      venue: form.venue,
      city: form.city,
      price: +form.price,
      totalSeats: 1,
      availableSeats: 1,
      status: "Confirmed"
    };

    try {
      if (editId) {
        const res = await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error("Failed to update ticket");
        showToast("Ticket updated!");
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error("Failed to create ticket");
        showToast("Ticket booked! 🎉");
      }

      await fetchTickets();
      setView("list");
      setEditId(null);
      setForm({
        event: "",
        venue: "",
        city: "",
        date: "",
        cat: "Concert",
        seats: 1,
        price: "",
        status: "Confirmed"
      });
    } catch (error) {
      console.log("Error saving ticket:", error);
      showToast("Something went wrong.", false);
    }
  };

  const doDelete = async (id) => {
    try {
      console.log("Deleting id:", id);

      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const data = await res.json();
      console.log("Delete response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      await fetchTickets();
      setDelId(null);
      showToast("Ticket removed.", false);
    } catch (error) {
      console.log("Delete error:", error);
      showToast("Delete failed.", false);
    }
  };

  const filtered = tickets.filter(t =>
    (fCat==="All"||t.cat===fCat) &&
    (
      t.event.toLowerCase().includes(search.toLowerCase()) ||
      t.venue?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const total = tickets.reduce((s,t)=>s+t.price*t.seats,0);

  return (
    <>
      <style>{`
        ${FONT}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{margin:0;padding:0;width:100%;overflow-x:hidden;background:#F2F2F8;}
        body{background:#F2F2F8;}
        input::placeholder{color:#C0C0D8;}
        input[type=date]::-webkit-calendar-picker-indicator{cursor:pointer;opacity:.5;filter:invert(.4);}
        select option{background:#fff;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#DDD;border-radius:99px;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
        @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
        @keyframes slideRight{from{opacity:0;transform:translateX(50px);}to{opacity:1;transform:translateX(0);}}
      `}</style>

      <div style={{ minHeight:"100vh", width:"100vw", marginLeft:"calc(-50vw + 50%)", background:"#F2F2F8", fontFamily:"'Plus Jakarta Sans',sans-serif", overflowX:"hidden" }}>
        {toast && (
          <div style={{ position:"fixed", top:24, right:24, zIndex:9999, display:"flex", alignItems:"center", gap:10, padding:"13px 18px", borderRadius:14, background:"#fff", border:`1.5px solid ${toast.ok?"#2BBFA430":"#E8508A30"}`, boxShadow:"0 8px 32px rgba(0,0,0,0.10)", animation:"slideRight 0.3s cubic-bezier(.22,1,.36,1)", color:toast.ok?"#2BBFA4":"#E8508A", fontSize:14, fontWeight:600 }}>
            <Icon name={toast.ok?"check":"x"} size={16} color={toast.ok?"#2BBFA4":"#E8508A"} />
            {toast.msg}
          </div>
        )}

        {delId && (
          <div style={{ position:"fixed", inset:0, background:"rgba(18,18,42,0.4)", zIndex:9998, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(5px)", animation:"fadeIn 0.2s" }}>
            <div style={{ background:"#fff", borderRadius:24, padding:"32px 28px", maxWidth:320, width:"90%", textAlign:"center", boxShadow:"0 24px 64px rgba(0,0,0,0.14)", animation:"fadeUp 0.25s cubic-bezier(.22,1,.36,1)" }}>
              <div style={{ width:56, height:56, borderRadius:16, background:"#FDE9F1", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                <Icon name="trash" size={24} color="#E8508A" />
              </div>
              <div style={{ fontSize:18, fontWeight:800, color:"#12122A", marginBottom:8 }}>Delete this ticket?</div>
              <p style={{ color:"#9898B8", fontSize:13, marginBottom:24 }}>This action cannot be undone.</p>
              <div style={{ display:"flex", gap:10 }}>
                <button onClick={()=>setDelId(null)} style={{ flex:1, padding:12, borderRadius:12, border:"1.5px solid #E8E8F0", background:"#fff", color:"#9898B8", cursor:"pointer", fontWeight:600, fontSize:14, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Cancel</button>
                <button onClick={()=>doDelete(delId)} style={{ flex:1, padding:12, borderRadius:12, border:"none", background:"#E8508A", color:"#fff", cursor:"pointer", fontWeight:700, fontSize:14, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Delete</button>
              </div>
            </div>
          </div>
        )}

        <div style={{ background:"#12122A", borderBottom:"1px solid #1E1E3A" }}>
          <div style={{ maxWidth:"100%", margin:"0 auto", padding:"18px 32px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:42, height:42, borderRadius:13, background:"#7C6FF7", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Icon name="ticket" size={22} color="#fff" />
                </div>
                <div>
                  <div style={{ fontWeight:800, fontSize:20, color:"#fff", letterSpacing:"-0.4px" }}>TicketFlow</div>
                  <div style={{ fontSize:10, color:"#6060A0", letterSpacing:"0.1em", textTransform:"uppercase" }}>Event Booking Platform</div>
                </div>
              </div>

              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <button
                  onClick={()=>setView("list")}
                  style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 16px", borderRadius:10, border:`1px solid ${view==="list"?"#7C6FF760":"#2A2A48"}`, background:view==="list"?"#7C6FF720":"transparent", color:view==="list"?"#A89DF8":"#6060A0", cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"'Plus Jakarta Sans',sans-serif", transition:"all 0.2s" }}
                >
                  <Icon name="ticket" size={15} color={view==="list"?"#A89DF8":"#6060A0"} /> My Tickets
                </button>
                <button
                  onClick={openCreate}
                  style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 18px", borderRadius:10, border:"none", background:"#7C6FF7", color:"#fff", cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"'Plus Jakarta Sans',sans-serif", boxShadow:"0 4px 18px #7C6FF740" }}
                >
                  <Icon name="plus" size={15} color="#fff" /> New Ticket
                </button>
              </div>
            </div>

            {view==="list" && (
              <div style={{ marginTop:20, borderRadius:18, overflow:"hidden", position:"relative" }}>
                <HeroBanner />
                <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 40px", gap:24 }}>
                  <div>
                    <div style={{ fontSize:24, fontWeight:800, color:"#fff", marginBottom:6, letterSpacing:"-0.4px" }}>Your Events, All in One Place</div>
                    <div style={{ fontSize:13, color:"rgba(255,255,255,0.55)", fontWeight:400 }}>Manage, track and book tickets for every experience</div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:0, background:"rgba(255,255,255,0.07)", borderRadius:14, border:"1px solid rgba(255,255,255,0.1)", padding:"16px 8px", flexShrink:0 }}>
                    {[{v:tickets.length,l:"Booked"},{v:tickets.filter(t=>t.status==="Confirmed").length,l:"Confirmed"},{v:`₹${total.toLocaleString()}`,l:"Spent"}].map((s,i)=>(
                      <div key={s.l} style={{ display:"flex", alignItems:"center" }}>
                        <div style={{ textAlign:"center", padding:"0 28px" }}>
                          <div style={{ fontSize:26, fontWeight:800, color:"#fff", lineHeight:1 }}>{s.v}</div>
                          <div style={{ fontSize:10, color:"rgba(255,255,255,0.45)", textTransform:"uppercase", letterSpacing:"0.1em", marginTop:5 }}>{s.l}</div>
                        </div>
                        {i < 2 && <div style={{ width:1, height:32, background:"rgba(255,255,255,0.12)" }} />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ maxWidth:"100%", margin:"0 auto", padding:"28px 32px" }}>
          {view==="list" && <>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:12, marginBottom:24 }}>
              <Stat label="Total" value={tickets.length} iconName="ticket" color="#7C6FF7" bg="#F0EFFE" />
              <Stat label="Confirmed" value={tickets.filter(t=>t.status==="Confirmed").length} iconName="check" color="#2BBFA4" bg="#E5F8F5" />
              <Stat label="Pending" value={tickets.filter(t=>t.status==="Pending").length} iconName="star" color="#F5A623" bg="#FEF5E7" />
              <Stat label="Spent" value={`₹${total.toLocaleString()}`} iconName="rupee" color="#E8508A" bg="#FDE9F1" />
            </div>

            <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap" }}>
              <div style={{ flex:1, minWidth:200, position:"relative" }}>
                <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)" }}><Icon name="search" size={16} color="#C0C0D8" /></span>
                <input
                  value={search}
                  onChange={e=>setSearch(e.target.value)}
                  placeholder="Search events or venues…"
                  style={{ width:"100%", padding:"10px 14px 10px 38px", borderRadius:12, border:"1.5px solid #E8E8F0", background:"#fff", color:"#12122A", fontSize:14, fontFamily:"'Plus Jakarta Sans',sans-serif", outline:"none" }}
                />
              </div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {["All",...CATS.map(c=>c.l)].map(cat=>{
                  const info = CATS.find(c=>c.l===cat);
                  const active = fCat===cat;
                  return (
                    <button
                      key={cat}
                      onClick={()=>setFCat(cat)}
                      style={{ display:"flex", alignItems:"center", gap:5, padding:"8px 13px", borderRadius:10, border:`1.5px solid ${active&&info?info.c+"50":"#E8E8F0"}`, background:active&&info?info.bg:"#fff", color:active&&info?info.c:"#9898B8", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"'Plus Jakarta Sans',sans-serif", transition:"all 0.18s" }}
                    >
                      {info && <Icon name={info.icon} size={13} color={active?info.c:"#C0C0D8"} />}
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {filtered.length===0 ? (
              <div style={{ textAlign:"center", padding:"64px 20px", animation:"fadeIn 0.4s" }}>
                <div style={{ width:72, height:72, borderRadius:20, background:"#F0EFFE", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                  <Icon name="ticket" size={32} color="#7C6FF7" />
                </div>
                <div style={{ fontSize:18, fontWeight:700, color:"#12122A", marginBottom:6 }}>No tickets yet</div>
                <p style={{ color:"#9898B8", fontSize:14, marginBottom:24 }}>Book your first event and it'll show up here</p>
                <button onClick={openCreate} style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"11px 24px", borderRadius:12, border:"none", background:"#7C6FF7", color:"#fff", cursor:"pointer", fontWeight:700, fontSize:14, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                  <Icon name="plus" size={15} color="#fff" /> Book Now
                </button>
              </div>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:14 }}>
                {filtered.map((t,i)=>(
                  <div key={t.id} style={{ animation:`fadeUp 0.35s cubic-bezier(.22,1,.36,1) ${i*0.07}s both` }}>
                    <Card t={t} onEdit={openEdit} onDelete={setDelId} />
                  </div>
                ))}
              </div>
            )}
          </>}

          {view==="form" && (
            <div style={{ maxWidth:560, margin:"0 auto", animation:"fadeUp 0.35s cubic-bezier(.22,1,.36,1)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:22 }}>
                <button onClick={()=>setView("list")} style={{ width:38, height:38, borderRadius:11, border:"1.5px solid #E8E8F0", background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Icon name="arrowleft" size={18} color="#9898B8" />
                </button>
                <div>
                  <div style={{ fontWeight:800, fontSize:20, color:"#12122A" }}>{editId?"Edit Ticket":"Book a Ticket"}</div>
                  <div style={{ fontSize:12, color:"#9898B8" }}>{editId?"Update your booking details":"Fill in the event details below"}</div>
                </div>
              </div>

              {form.cat && (
                <div style={{ borderRadius:16, overflow:"hidden", height:110, marginBottom:20, position:"relative" }}>
                  <CatIllustration cat={form.cat} />
                  <div style={{ position:"absolute", inset:0, background:"rgba(18,18,42,0.45)", display:"flex", alignItems:"center", padding:"0 20px", gap:10 }}>
                    <Icon name={getCat(form.cat).icon} size={28} color="#fff" />
                    <div style={{ fontSize:18, fontWeight:800, color:"#fff" }}>{form.cat}</div>
                  </div>
                </div>
              )}

              <div style={{ background:"#fff", borderRadius:22, padding:"26px", border:"1.5px solid #EEEEF4", boxShadow:"0 4px 20px rgba(0,0,0,0.05)" }}>
                <Field label="Event Name" name="event" form={form} setForm={setForm} errors={errors} />
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <Field label="Venue" name="venue" form={form} setForm={setForm} errors={errors} />
                  <Field label="City"  name="city"  form={form} setForm={setForm} errors={errors} />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <Field label="Date" name="date" type="date" form={form} setForm={setForm} errors={errors} />
                  <Field label="Category" name="cat" options={CATS} form={form} setForm={setForm} errors={errors} />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <Field label="Seats" name="seats" type="number" form={form} setForm={setForm} errors={errors} />
                  <Field label="Price / Seat (₹)" name="price" type="number" form={form} setForm={setForm} errors={errors} />
                </div>
                <Field label="Status" name="status" options={["Pending","Confirmed","Cancelled"]} form={form} setForm={setForm} errors={errors} />

                {form.price && +form.price>0 && (
                  <div style={{ borderRadius:14, padding:"14px 18px", marginBottom:20, background:"#F0EFFE", border:"1.5px solid #DDD8FC", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <Icon name="rupee" size={16} color="#7C6FF7" />
                      <div>
                        <div style={{ fontSize:10, fontWeight:700, color:"#9898B8", textTransform:"uppercase", letterSpacing:"0.1em" }}>Total Amount</div>
                        <div style={{ fontSize:12, color:"#A8A8D0" }}>₹{(+form.price).toLocaleString()} × {form.seats} seat{+form.seats>1?"s":""}</div>
                      </div>
                    </div>
                    <div style={{ fontSize:26, fontWeight:800, color:"#7C6FF7" }}>₹{(+form.price * +form.seats).toLocaleString()}</div>
                  </div>
                )}

                <div style={{ display:"flex", gap:10 }}>
                  <button onClick={()=>setView("list")} style={{ flex:1, padding:13, borderRadius:12, border:"1.5px solid #E8E8F0", background:"#fff", color:"#9898B8", cursor:"pointer", fontWeight:600, fontSize:14, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Cancel</button>
                  <button onClick={submit} style={{ flex:2, padding:13, borderRadius:12, border:"none", background:"#12122A", color:"#fff", cursor:"pointer", fontWeight:700, fontSize:15, fontFamily:"'Plus Jakarta Sans',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                    <Icon name="ticket" size={17} color="#fff" />
                    {editId?"Save Changes":"Book Ticket"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}