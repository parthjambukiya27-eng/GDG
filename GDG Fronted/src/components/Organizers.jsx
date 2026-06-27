import React, { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const defaultProfileCard = {
  name: 'Organization & Web Creator',
  role: 'Community Growth • Platform Engineering',
  initials: 'GD',
  image: 'https://ui-avatars.com/api/?name=GDG+Web+Team&background=1D2432&color=ffffff&rounded=true&size=256&bold=true',
  bio: 'A beautifully designed fallback card appears here until live leadership profiles are available.'
};

const Organizers = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTeam = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/featured-team`);
      const data = await response.json();
      if (response.ok && Array.isArray(data.users)) {
        setTeam(data.users);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();

    const handleTeamRefresh = () => {
      loadTeam();
    };

    window.addEventListener('teamProfilesChanged', handleTeamRefresh);
    return () => window.removeEventListener('teamProfilesChanged', handleTeamRefresh);
  }, []);

  const roleOrder = ['coordinator', 'mentor', 'coremember'];

  const formatRoleLabel = (role) => {
    if (!role) return 'Community Leader';
    const roleMap = {
      coordinator: 'Coordinator',
      mentor: 'Mentor',
      coremember: 'Core Member'
    };
    return roleMap[role] || role;
  };

  const visibleTeam = (team.length > 0 ? team : [defaultProfileCard]).map((member) => ({
    ...member,
    roleLabel: formatRoleLabel(member.role || member.title)
  })).sort((a, b) => {
    if (team.length === 0) return 0;
    const priorityA = roleOrder.indexOf(a.role) === -1 ? roleOrder.length : roleOrder.indexOf(a.role);
    const priorityB = roleOrder.indexOf(b.role) === -1 ? roleOrder.length : roleOrder.indexOf(b.role);
    return priorityA - priorityB;
  }).slice(0, team.length > 0 ? 3 : 1);

  const themes = [
    {
      color: 'goog-blue',
      borderHover: 'hover:border-goog-blue/40',
      shadowHover: 'hover:shadow-[0_20px_40px_rgba(66,133,244,0.14)]',
      textHover: 'group-hover:text-goog-blue',
      borderAvatar: 'group-hover:border-goog-blue',
      glow: 'bg-[radial-gradient(ellipse_at_top,rgba(66,133,244,0.06),transparent_50%)]',
      gradient: 'from-goog-blue/60 to-goog-blue/20'
    },
    {
      color: 'goog-red',
      borderHover: 'hover:border-goog-red/40',
      shadowHover: 'hover:shadow-[0_20px_40px_rgba(234,67,53,0.12)]',
      textHover: 'group-hover:text-goog-red',
      borderAvatar: 'group-hover:border-goog-red',
      glow: 'bg-[radial-gradient(ellipse_at_top,rgba(234,67,53,0.05),transparent_50%)]',
      gradient: 'from-goog-red/60 to-goog-red/20'
    },
    {
      color: 'goog-yellow',
      borderHover: 'hover:border-goog-yellow/40',
      shadowHover: 'hover:shadow-[0_20px_40px_rgba(251,188,5,0.12)]',
      textHover: 'group-hover:text-goog-yellow',
      borderAvatar: 'group-hover:border-goog-yellow',
      glow: 'bg-[radial-gradient(ellipse_at_top,rgba(251,188,5,0.05),transparent_50%)]',
      gradient: 'from-goog-yellow/60 to-goog-yellow/20'
    },
    {
      color: 'goog-green',
      borderHover: 'hover:border-goog-green/40',
      shadowHover: 'hover:shadow-[0_20px_40px_rgba(52,168,83,0.12)]',
      textHover: 'group-hover:text-goog-green',
      borderAvatar: 'group-hover:border-goog-green',
      glow: 'bg-[radial-gradient(ellipse_at_top,rgba(52,168,83,0.05),transparent_50%)]',
      gradient: 'from-goog-green/60 to-goog-green/20'
    }
  ];

  return (
    <section id="organizers" className="section py-16 max-sm:py-8">
      
      {/* Section Header */}
      <div className="text-left mb-12 border-b border-white/6 pb-8">
        <span className="text-goog-green uppercase tracking-widest text-[0.75rem] font-bold block mb-3">
          Leadership
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-text-light tracking-tight leading-none m-0 mb-4">
          Meet the Leadership Team
        </h2>
        <p className="text-text-muted text-base sm:text-[1.05rem] max-w-2xl m-0 leading-relaxed">
          The passionate student developers and mentors driving the Google Developer Groups community forward at IIT Bhilai.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-4 gap-6 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-2 max-[480px]:grid-cols-1 w-full text-center">
        {visibleTeam.map((member, idx) => {
          const theme = themes[idx % 4];
          return (
            <article 
              key={idx} 
              className={`organizer-card group bg-[#111319] border border-white/6 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 ${theme.borderHover} ${theme.shadowHover} relative overflow-hidden flex flex-col items-center justify-center min-h-[230px] max-sm:p-5 max-sm:min-h-[190px]`}
            >
              {/* Google Brand Color Top Bar */}
              <div className="absolute top-0 left-0 w-full h-[3px] flex">
                <div className="h-full w-1/4 bg-goog-blue"></div>
                <div className="h-full w-1/4 bg-goog-red"></div>
                <div className="h-full w-1/4 bg-goog-yellow"></div>
                <div className="h-full w-1/4 bg-goog-green"></div>
              </div>

              {/* Radial color glow inside card */}
              <div className={`absolute inset-0 ${theme.glow} -z-1`}></div>

              {/* Large Initials Watermark in Background */}
              <span className="absolute -right-2 -bottom-6 text-[8rem] font-black text-white/[0.015] group-hover:text-white/[0.045] select-none pointer-events-none transition-all duration-300 font-display z-0 uppercase">
                {member.initials}
              </span>

              {/* Access Pass Info */}
              <div className="absolute top-3.5 left-4 flex justify-between w-[calc(100%-32px)] items-center">
                <span className="text-[0.62rem] text-text-muted font-mono tracking-widest uppercase">
                  PASS // 0{idx+1}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-goog-green animate-pulse"></span>
              </div>

              {/* Avatar Frame */}
              <div className={`w-20 h-20 max-sm:w-16 max-sm:h-16 rounded-full overflow-hidden border-2 border-white/8 ${theme.borderAvatar} transition-all duration-300 shadow-md mb-4 flex-none z-10 mt-3`}>
                <img
                  src={member.profilePhotoUrl || member.avatarUrl || member.image}
                  alt={member.nameDisplay || member.fullName || member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Member Details */}
              <div className="z-10">
                <h3 className={`m-0 mb-1 text-text-light font-display text-[1.08rem] font-extrabold ${theme.textHover} transition-colors duration-200 max-sm:text-[0.95rem]`}>
                  {member.nameDisplay || member.fullName || member.name}
                </h3>
                <p className="text-text-muted text-[0.82rem] m-0 font-mono tracking-wide max-sm:text-[0.72rem]">
                  {member.roleLabel || member.role || member.title || 'Community Leader'}
                </p>
                {member.bio ? <p className="mt-2 text-[0.72rem] text-text-muted">{member.bio}</p> : null}
              </div>

              {/* Expanding Bottom Accent Line */}
              <div className={`absolute bottom-0 left-0 w-full h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center bg-gradient-to-r ${theme.gradient}`}></div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Organizers;
