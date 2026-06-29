import React, { useEffect, useMemo, useState } from 'react';
import {
  Layout, Menu, Card, Avatar, Badge, Progress, Table, List, Button, Row, Col, Input, Space,
  ConfigProvider, message, Tooltip, Tag, Typography, theme, Modal, Empty, Select
} from 'antd';
import {
  DashboardOutlined, CalendarOutlined, BookOutlined, ProjectOutlined, TrophyOutlined, SearchOutlined,
  LogoutOutlined, DeleteOutlined, DownloadOutlined, MenuUnfoldOutlined, MenuFoldOutlined,
  CrownOutlined, TeamOutlined, UserSwitchOutlined
} from '@ant-design/icons';

const { Header: AntHeader, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const googleTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#4285F4',
    colorSuccess: '#34A853',
    colorWarning: '#FBBC05',
    colorError: '#EA4335',
    fontFamily: '"Google Sans", "Poppins", sans-serif',
    borderRadius: 16,
    colorBgBase: '#0f1115',
    colorTextBase: '#ffffff'
  },
  components: {
    Layout: {
      bodyBg: '#0f1115',
      headerBg: '#14161d',
      headerHeight: 64,
      siderBg: '#14161d'
    },
    Menu: {
      itemActiveBg: 'rgba(66, 133, 244, 0.15)',
      itemSelectedBg: 'rgba(66, 133, 244, 0.15)',
      itemSelectedColor: '#4285F4'
    },
    Card: {
      colorBgContainer: '#14161d',
      boxShadowTertiary: '0 4px 20px rgba(0,0,0,0.3)'
    }
  }
};

const initialEvents = [
  {
    id: 1,
    title: 'Generative AI Study Jam - Session 2',
    date: 'July 2, 2026',
    time: '4:00 PM - 6:00 PM',
    rsvp: 'Going',
    meetLink: 'https://meet.google.com/abc-defg-hij',
    ticketId: 'GDG-AI-102',
    instructor: 'Dr. Arun Kumar',
    color: '#4285F4'
  },
  {
    id: 2,
    title: 'Flutter Boot Camp - State Management',
    date: 'July 8, 2026',
    time: '2:30 PM - 5:00 PM',
    rsvp: 'Going',
    meetLink: 'https://meet.google.com/xyz-uvwx-yza',
    ticketId: 'GDG-FL-204',
    instructor: 'Sneha Patel',
    color: '#34A853'
  },
  {
    id: 3,
    title: 'Web Dev Hackathon Preparation Jam',
    date: 'July 15, 2026',
    time: '6:00 PM - 8:30 PM',
    rsvp: 'Interested',
    meetLink: 'https://meet.google.com/mno-pqrs-tuv',
    ticketId: 'GDG-WD-301',
    instructor: 'Parth Jambukiya',
    color: '#EA4335'
  }
];

const learningTracks = [
  {
    id: 1,
    name: 'Generative AI Study Jam',
    percent: 85,
    status: 'active',
    color: '#4285F4',
    lessons: '17/20 lessons completed'
  },
  {
    id: 2,
    name: 'Flutter Development Boot Camp',
    percent: 60,
    status: 'active',
    color: '#34A853',
    lessons: '12/20 lessons completed'
  },
  {
    id: 3,
    name: 'Google Cloud Fundamentals',
    percent: 100,
    status: 'success',
    color: '#FBBC05',
    lessons: '10/10 lessons completed'
  },
  {
    id: 4,
    name: 'Web Development Basics (HTML/CSS/React)',
    percent: 40,
    status: 'active',
    color: '#EA4335',
    lessons: '6/15 lessons completed'
  }
];

const projectTeams = [
  {
    id: 1,
    title: 'Solution Challenge: Smart Trash Bin',
    track: 'IoT & Cloud',
    lookingFor: 'Frontend Developer (React)',
    members: 3,
    totalSeats: 4,
    tagColor: 'blue',
    description: 'Building an automated waste sorting system integrated with Google Cloud IoT.'
  },
  {
    id: 2,
    title: 'GDG Campus Hub Mobile App',
    track: 'Mobile (Flutter)',
    lookingFor: 'UI/UX Designer',
    members: 2,
    totalSeats: 4,
    tagColor: 'green',
    description: 'Designing a mobile portal for student RSVPs and leaderboard notifications.'
  },
  {
    id: 3,
    title: 'AI Mock Interviewer Platform',
    track: 'AI / Python',
    lookingFor: 'Backend Developer (FastAPI)',
    members: 1,
    totalSeats: 2,
    tagColor: 'purple',
    description: 'Deploying a conversational agent using Gemini Pro API for engineering mocks.'
  }
];

const leaderboardData = [
  { key: '1', rank: 1, name: 'Aarav Sharma', role: 'AI Facilitator', points: 920, badge: 'Google Expert' },
  { key: '2', rank: 2, name: 'Sneha Patel', role: 'Flutter Lead', points: 850, badge: 'Super Contributor' },
  { key: '3', rank: 3, name: 'Parth Jambukiya', role: 'Cloud Architect', points: 810, badge: 'Cloud Explorer' },
  { key: '4', rank: 4, name: 'Rohan Das', role: 'Web Developer', points: 740, badge: 'Hackathon Hero' },
  { key: '5', rank: 5, name: 'Diya Sen', role: 'UI Designer', points: 680, badge: 'Creative Mind' }
];

const roleOptions = [
  { label: 'Coordinator', value: 'coordinator' },
  { label: 'Core Member', value: 'coremember' },
  { label: 'Mentor', value: 'mentor' },
  { label: 'Web Creator', value: 'web-creator' },
  { label: 'Member', value: 'member' },
  { label: 'User', value: 'user' }
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const getDisplayInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const CoordinatorDashboardPage = ({ user, onLogout, onUserUpdate, navigate }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for A-Z, 'desc' for Z-A
  const [events, setEvents] = useState(initialEvents);
  const [appliedProjects, setAppliedProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ events: [], tracks: [], projects: [], leaderboard: [] });

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/auth/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to load users');
      setUsers(data.users || []);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const stats = useMemo(() => ({
    total: users.length,
    coordinators: users.filter((entry) => entry.role === 'coordinator').length,
    mentors: users.filter((entry) => entry.role === 'mentor').length,
    core: users.filter((entry) => entry.role === 'coremember').length
  }), [users]);

  const filteredUsers = useMemo(() => {
    let filtered = roleFilter === 'all' ? users : users.filter((entry) => entry.role === roleFilter);
    
    // Sort by name (A-Z or Z-A)
    filtered.sort((a, b) => {
      const nameA = (a.fullName || a.name || a.username || '').toLowerCase();
      const nameB = (b.fullName || b.name || b.username || '').toLowerCase();
      return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    
    return filtered;
  }, [users, roleFilter, sortOrder]);

  const isCoordinator = user?.role === 'coordinator';
  const profileAvatarSrc = user?.avatarUrl || user?.profilePhotoUrl || undefined;
  const profileAvatarInitials = getDisplayInitials(user?.fullName || user?.name || 'Coordinator');

  const dynamicLeaderboardData = useMemo(() => leaderboardData.map((item) => (
    item.key === '3' ? { ...item, name: user?.name || user?.fullName || item.name } : item
  )), [user]);

  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults({ events: [], tracks: [], projects: [], leaderboard: [] });
      return;
    }

    const lowerQuery = query.toLowerCase();
    const eventResults = events.filter((event) =>
      event.title.toLowerCase().includes(lowerQuery) ||
      event.instructor.toLowerCase().includes(lowerQuery) ||
      event.date.toLowerCase().includes(lowerQuery) ||
      event.ticketId.toLowerCase().includes(lowerQuery)
    );
    const trackResults = learningTracks.filter((track) =>
      track.name.toLowerCase().includes(lowerQuery) ||
      track.lessons.toLowerCase().includes(lowerQuery)
    );
    const projectResults = projectTeams.filter((project) =>
      project.title.toLowerCase().includes(lowerQuery) ||
      project.description.toLowerCase().includes(lowerQuery) ||
      project.track.toLowerCase().includes(lowerQuery) ||
      project.lookingFor.toLowerCase().includes(lowerQuery)
    );
    const leaderboardResults = dynamicLeaderboardData.filter((member) =>
      member.name.toLowerCase().includes(lowerQuery) ||
      member.role.toLowerCase().includes(lowerQuery) ||
      member.badge.toLowerCase().includes(lowerQuery)
    );

    setSearchResults({ events: eventResults, tracks: trackResults, projects: projectResults, leaderboard: leaderboardResults });
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };

  const handleRsvpToggle = (eventId) => {
    setEvents((current) => current.map((event) => {
      if (event.id === eventId) {
        const nextRsvp = event.rsvp === 'Going' ? 'Not Going' : 'Going';
        message.info(`RSVP updated for ${event.title}: ${nextRsvp}`);
        return { ...event, rsvp: nextRsvp };
      }
      return event;
    }));
  };

  const handleDownloadTicket = (event) => {
    const ticketContent = `----------------------------------------------
GDG ON CAMPUS • IIT BHILAI
EVENT TICKET: ${event.title}
----------------------------------------------
Ticket ID:  ${event.ticketId}
Attendee:   ${user?.name || user?.fullName || 'Developer Enthusiast'}
Role:       Coordinator
Date:       ${event.date}
Time:       ${event.time}
Instructor: ${event.instructor}
Location:   Online (Google Meet)
Meet Link:  ${event.meetLink}
----------------------------------------------
Thank you for joining our community!
Show this ticket code at entry.
----------------------------------------------`;

    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ticket-${event.ticketId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    message.success(`Ticket downloaded: Ticket-${event.ticketId}.txt`);
  };

  const handleApplyProject = (project) => {
    setAppliedProjects((current) => [...current, project.id]);
    message.success(`Application sent for "${project.title}"!`);
  };

  const handleRoleChange = async (userId, nextRole) => {
    try {
      setUpdatingUserId(userId);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/auth/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role: nextRole })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to update role');
      message.success(`${data.user.fullName || data.user.username} is now ${nextRole}`);
      setUsers((current) => current.map((entry) => (entry._id === userId ? { ...entry, role: nextRole } : entry)));
      if (nextRole === 'coordinator' && userId === user?.id) {
        onUserUpdate?.({ ...user, role: 'coordinator' });
      }
      window.dispatchEvent(new Event('teamProfilesChanged'));
      // Trigger web creators refresh if web-creator role was assigned
      if (nextRole === 'web-creator') {
        window.dispatchEvent(new Event('webCreatorsChanged'));
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      onLogout?.();
    } else if (key === 'settings') {
      navigate('#/coordinator-settings');
    } else if (key === 'delete') {
      Modal.confirm({
        title: 'Delete your account? This cannot be undone.',
        content: 'This will remove your account permanently from the GDG portal.',
        okText: 'Delete Account',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: () => {
          message.info('Account deletion is handled from your main dashboard.');
        }
      });
    } else {
      const element = document.getElementById(key);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        message.info(`Feature "${key}" navigation simulated!`);
      }
    }
  };

  const leaderboardColumns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      render: (rank) => {
        let color = 'default';
        let prefix = '';
        if (rank === 1) { color = 'gold'; prefix = '🏆 '; }
        else if (rank === 2) { color = 'blue'; prefix = '🥈 '; }
        else if (rank === 3) { color = 'orange'; prefix = '🥉 '; }
        return <Tag color={color} style={{ fontWeight: 'bold', fontSize: 14 }}>{prefix}{rank}</Tag>;
      }
    },
    {
      title: 'Member',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        const isCurrentUser = record.key === '3';
        return (
          <Space>
            <Avatar
              src={isCurrentUser && user?.avatarUrl ? user.avatarUrl : undefined}
              style={{
                background: (isCurrentUser && user?.avatarUrl) ? 'transparent' : 'linear-gradient(135deg, #4285F4 0%, #EA4335 50%, #FBBC05 100%)',
                fontWeight: 'bold',
                border: 'none'
              }}
            >
              {!(isCurrentUser && user?.avatarUrl) ? text.charAt(0) : null}
            </Avatar>
            <Text style={{ fontWeight: 600 }}>{text}</Text>
          </Space>
        );
      }
    },
    {
      title: 'Track Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <Tag color="geekblue">{role}</Tag>
    },
    {
      title: 'Points (XP)',
      dataIndex: 'points',
      key: 'points',
      render: (points) => <Text style={{ color: '#34A853', fontWeight: 'bold' }}>{points} XP</Text>
    },
    {
      title: 'Badges',
      dataIndex: 'badge',
      key: 'badge',
      render: (badge) => <Tag color="purple">{badge}</Tag>
    }
  ];

  return (
    <ConfigProvider theme={googleTheme}>
      <Layout style={{ minHeight: '100vh', backgroundColor: '#0f1115' }}>
        <AntHeader
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 101,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            padding: '10px 18px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            background: '#14161d',
            height: 'auto',
            minHeight: 64
          }}
        >
          <Space size="middle">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 40, height: 40 }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src="/asset/GDGlogo.jpeg" alt="GDG Logo" className="h-8 w-8 object-contain rounded-full border border-white/5" />
              <div>
                <Text style={{ fontWeight: 700, fontSize: '1.05rem', color: '#ffffff', display: 'block', lineHeight: 1.2 }}>
                  GDG on Campus
                </Text>
                <Text type="secondary" style={{ fontSize: '0.72rem', display: 'block', lineHeight: 1.1, color: '#9aa0a6' }}>
                  Coordinator Dashboard
                </Text>
              </div>
            </div>
          </Space>

          <div className="hidden md:block" style={{ width: '100%', maxWidth: 460 }}>
            <Input
              size="large"
              prefix={<SearchOutlined style={{ color: '#7f8fa4', fontSize: 18 }} />}
              suffix={
                <Tag color="default" style={{ margin: 0, fontSize: '0.72rem', backgroundColor: 'rgba(255,255,255,0.08)', border: 'none', color: '#9aa0a6', padding: '4px 10px', borderRadius: 16 }}>
                  Ctrl K
                </Tag>
              }
              placeholder="Search members, events, projects..."
              value={searchQuery}
              onChange={handleSearch}
              allowClear
              style={{
                borderRadius: 28,
                background: '#10131a',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                boxShadow: '0 16px 50px rgba(0, 0, 0, 0.24)'
              }}
            />
          </div>

          <Space size="large" align="center">
            {/* Search Icon for Mobile */}
            <Button
              type="text"
              shape="circle"
              icon={<SearchOutlined style={{ fontSize: 19, color: '#9aa0a6' }} />}
              className="md:hidden"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            />

            <Tooltip title="Main Website">
              <Space onClick={() => navigate('#/')} style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: 20, transition: 'all 0.2s' }} className="hover:bg-white/5">
                <Avatar src={profileAvatarSrc} style={{ background: profileAvatarSrc ? 'transparent' : 'linear-gradient(135deg, #4285F4 0%, #EA4335 50%, #FBBC05 100%)', fontWeight: 'bold', border: 'none' }}>
                  {!profileAvatarSrc && profileAvatarInitials}
                </Avatar>
                <div style={{ display: 'flex', flexDirection: 'column' }} className="max-sm:hidden">
                  <Text style={{ fontWeight: 600, fontSize: '0.82rem', color: '#ffffff', lineHeight: 1.2 }}>
                    {user?.name || 'Developer'}
                  </Text>
                  <Text type="secondary" style={{ fontSize: '0.68rem', lineHeight: 1, color: '#9aa0a6' }}>
                    Coordinator
                  </Text>
                </div>
              </Space>
            </Tooltip>
          </Space>

          {showMobileSearch && (
            <div className="w-full pb-2 md:hidden">
              <Input
                size="large"
                prefix={<SearchOutlined style={{ color: '#7f8fa4', fontSize: 18 }} />}
                placeholder="Search members, events, projects..."
                value={searchQuery}
                onChange={handleSearch}
                allowClear
                style={{
                  borderRadius: 28,
                  background: '#10131a',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                }}
              />
            </div>
          )}
        </AntHeader>

        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            trigger={null}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            onBreakpoint={(broken) => setCollapsed(broken)}
            style={{ background: '#14161d', borderRight: '1px solid rgba(255,255,255,0.08)', boxShadow: '2px 0 8px rgba(0,0,0,0.15)', minHeight: '100vh' }}
            width={240}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['dashboard']}
              style={{ height: '100%', borderRight: 0, paddingTop: 16, background: '#14161d' }}
              items={[
                { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
                { key: 'events', icon: <CalendarOutlined />, label: 'Events Hub' },
                { key: 'tracks', icon: <BookOutlined />, label: 'Learning Tracks' },
                { key: 'projects', icon: <ProjectOutlined />, label: 'Project Finder' },
                { key: 'leaderboard', icon: <TrophyOutlined />, label: 'Leaderboard' },
                { key: 'roles', icon: <CrownOutlined />, label: 'Role Management' },
                { key: 'settings', icon: <DeleteOutlined />, label: 'Settings' },
                { key: 'logout', icon: <LogoutOutlined />, label: 'Sign Out', danger: true }
              ]}
              onClick={handleMenuClick}
            />
          </Sider>

          <Layout style={{ padding: '24px', minHeight: 'calc(100vh - 64px)', overflowY: 'auto' }} className="bg-[#0f1115] text-[#ffffff]">
            <Content style={{ margin: 0, maxWidth: 1200, width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              <div style={{ marginBottom: 24 }} className="text-left">
                <Title level={2} style={{ margin: 0, fontWeight: 700, color: '#ffffff' }}>
                  Welcome back, {user?.name?.split(' ')[0] || 'Coordinator'}! 👋
                </Title>
                <Text type="secondary" style={{ fontSize: '0.92rem', color: '#9aa0a6' }}>
                  Here is what is happening in the GDG IIT Bhilai chapter today.
                </Text>
              </div>

              {searchQuery && (
                <Card bordered={false} style={{ marginBottom: 24, background: '#14161d', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 16px 50px rgba(0,0,0,0.16)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                    <Text style={{ color: '#9aa0a6' }}>
                      Showing <Text strong style={{ color: '#4285F4' }}>{searchResults.events.length + searchResults.tracks.length + searchResults.projects.length + searchResults.leaderboard.length}</Text> results for "<Text strong>{searchQuery}</Text>"
                    </Text>
                    <Button type="text" onClick={() => { setSearchQuery(''); setSearchResults({ events: [], tracks: [], projects: [], leaderboard: [] }); }} style={{ color: '#9aa0a6' }}>
                      Clear
                    </Button>
                  </div>

                  {searchResults.events.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <Text strong style={{ display: 'block', marginBottom: 12, fontSize: 14, color: '#EA4335' }}>📅 Events ({searchResults.events.length})</Text>
                      <List dataSource={searchResults.events} renderItem={(item) => (
                        <List.Item style={{ paddingLeft: 0, borderBottom: '1px solid rgba(255,255,255,0.1)' }} key={item.id}>
                          <List.Item.Meta avatar={<Avatar style={{ backgroundColor: item.color }}>📅</Avatar>} title={<div><Text strong>{item.title}</Text><Tag color="blue" style={{ marginLeft: 8 }}>{item.ticketId}</Tag></div>} description={<Space direction="vertical" size={0} style={{ marginTop: 8 }}><Text type="secondary" style={{ fontSize: '0.85rem', color: '#9aa0a6' }}>📍 {item.date} • {item.time}</Text><Text type="secondary" style={{ fontSize: '0.85rem', color: '#9aa0a6' }}>👤 Instructor: {item.instructor}</Text></Space>} />
                        </List.Item>
                      )} />
                    </div>
                  )}

                  {searchResults.tracks.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <Text strong style={{ display: 'block', marginBottom: 12, fontSize: 14, color: '#4285F4' }}>📚 Learning Tracks ({searchResults.tracks.length})</Text>
                      <List dataSource={searchResults.tracks} renderItem={(item) => (
                        <List.Item style={{ paddingLeft: 0, borderBottom: '1px solid rgba(255,255,255,0.1)' }} key={item.id}>
                          <List.Item.Meta avatar={<Avatar style={{ backgroundColor: item.color }}>📚</Avatar>} title={<div><Text strong>{item.name}</Text><Tag color={item.status === 'success' ? 'success' : 'processing'} style={{ marginLeft: 8 }}>{item.status === 'success' ? 'Completed' : 'In Progress'}</Tag></div>} description={<div style={{ marginTop: 8 }}><Progress percent={item.percent} strokeColor={item.color} status={item.status === 'success' ? 'success' : 'active'} strokeWidth={6} size="small" /><Text type="secondary" style={{ fontSize: '0.85rem', color: '#9aa0a6', marginTop: 4, display: 'block' }}>{item.lessons}</Text></div>} />
                        </List.Item>
                      )} />
                    </div>
                  )}

                  {searchResults.projects.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <Text strong style={{ display: 'block', marginBottom: 12, fontSize: 14, color: '#FBBC05' }}>🚀 Projects ({searchResults.projects.length})</Text>
                      <List dataSource={searchResults.projects} renderItem={(item) => (
                        <List.Item style={{ paddingLeft: 0, borderBottom: '1px solid rgba(255,255,255,0.1)' }} key={item.id} actions={[<Button size="small" type="primary" onClick={() => handleApplyProject(item)} disabled={appliedProjects.includes(item.id)}>{appliedProjects.includes(item.id) ? 'Applied' : 'Apply'}</Button>]}> 
                          <List.Item.Meta avatar={<Avatar style={{ backgroundColor: '#FBBC05' }}>🚀</Avatar>} title={<div><Text strong>{item.title}</Text><Tag color={item.tagColor} style={{ marginLeft: 8 }}>{item.track}</Tag></div>} description={<Space direction="vertical" size={0} style={{ marginTop: 8 }}><Text type="secondary" style={{ fontSize: '0.85rem', color: '#9aa0a6' }}>{item.description}</Text><Text type="secondary" style={{ fontSize: '0.85rem', color: '#9aa0a6', marginTop: 4 }}>🔍 Looking for: <span style={{ color: '#34A853' }}>{item.lookingFor}</span></Text></Space>} />
                        </List.Item>
                      )} />
                    </div>
                  )}

                  {searchResults.leaderboard.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <Text strong style={{ display: 'block', marginBottom: 12, fontSize: 14, color: '#34A853' }}>🏆 Leaderboard ({searchResults.leaderboard.length})</Text>
                      <List dataSource={searchResults.leaderboard} renderItem={(item) => (
                        <List.Item style={{ paddingLeft: 0, borderBottom: '1px solid rgba(255,255,255,0.1)' }} key={item.key}>
                          <List.Item.Meta avatar={<Avatar style={{ backgroundColor: item.rank === 1 ? '#FFD700' : item.rank === 2 ? '#C0C0C0' : item.rank === 3 ? '#CD7F32' : '#4285F4' }}>{item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : `#${item.rank}`}</Avatar>} title={<div><Text strong>{item.name}</Text><Tag color="geekblue" style={{ marginLeft: 8 }}>{item.role}</Tag></div>} description={<Space direction="vertical" size={0} style={{ marginTop: 8 }}><Text type="secondary" style={{ fontSize: '0.85rem', color: '#34A853' }}>⭐ {item.points} XP</Text><Tag color="purple" style={{ marginTop: 4, width: 'fit-content' }}>{item.badge}</Tag></Space>} />
                        </List.Item>
                      )} />
                    </div>
                  )}

                  {searchResults.events.length === 0 && searchResults.tracks.length === 0 && searchResults.projects.length === 0 && searchResults.leaderboard.length === 0 && (
                    <Empty description={<Text style={{ color: '#9aa0a6' }}>No results found for "{searchQuery}"</Text>} style={{ marginTop: 40 }} />
                  )}
                </Card>
              )}

              <Row gutter={[24, 24]}>
                <Col xs={24} lg={14}>
                  <Card id="dashboard" bordered={false} style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', height: '100%' }}>
                    <div style={{ display: 'flex', gap: 20, alignItems: 'start' }} className="max-sm:flex-col text-left">
                      <Avatar size={80} src={profileAvatarSrc} style={{ background: profileAvatarSrc ? 'transparent' : 'linear-gradient(135deg, #4285F4 0%, #EA4335 50%, #FBBC05 100%)', fontSize: 32, fontWeight: 'bold', boxShadow: '0 4px 12px rgba(66,133,244,0.3)', border: 'none', flexShrink: 0 }}>
                        {!profileAvatarSrc && profileAvatarInitials}
                      </Avatar>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                          <div>
                            <Title level={3} style={{ margin: 0, fontWeight: 700 }}>{user?.name || 'Developer Enthusiast'}</Title>
                            <Text strong style={{ color: '#4285F4' }}>Coordinator • Community Lead</Text>
                          </div>
                          <Badge count="Coordinator" style={{ backgroundColor: 'rgba(66, 133, 244, 0.15)', color: '#4285F4', border: '1px solid rgba(66, 133, 244, 0.25)', fontWeight: 600, padding: '4px 10px', borderRadius: 12 }} />
                        </div>
                        <Paragraph style={{ marginTop: 12, color: '#9aa0a6', fontSize: '0.9rem' }}>You are currently overseeing the GDG chapter activity, assigning roles, and keeping the community moving forward.</Paragraph>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
                          <Button onClick={() => navigate('#/')}>Go to Home</Button>
                          <Button onClick={() => navigate('#/coordinator-settings')}>Settings</Button>
                          <Button danger onClick={onLogout}>Sign Out</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col xs={24} lg={10}>
                  <Card id="events" bordered={false} style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', height: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <Title level={4} style={{ margin: 0, color: '#ffffff' }}>Upcoming Events</Title>
                      <Tag color="blue">Live</Tag>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {events.map((event) => (
                        <div key={event.id} style={{ padding: '12px 14px', borderRadius: 14, background: '#10131a', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                            <Text strong style={{ color: '#ffffff' }}>{event.title}</Text>
                            <Tag color={event.color === '#4285F4' ? 'blue' : event.color === '#34A853' ? 'green' : 'red'}>{event.rsvp}</Tag>
                          </div>
                          <Text type="secondary" style={{ fontSize: '0.85rem', color: '#9aa0a6', display: 'block', marginTop: 4 }}>{event.date} • {event.time}</Text>
                          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
                            <Button size="small" onClick={() => handleRsvpToggle(event.id)}>Toggle RSVP</Button>
                            <Button size="small" icon={<DownloadOutlined />} onClick={() => handleDownloadTicket(event)}>Ticket</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </Col>
              </Row>

              <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
                <Col xs={24} lg={12}>
                  <Card id="tracks" bordered={false} style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', height: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <Title level={4} style={{ margin: 0, color: '#ffffff' }}>Learning Tracks</Title>
                      <Tag color="purple">Progress</Tag>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {learningTracks.map((track) => (
                        <div key={track.id} style={{ padding: '12px 14px', borderRadius: 14, background: '#10131a', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                            <Text strong style={{ color: '#ffffff' }}>{track.name}</Text>
                            <Tag color={track.status === 'success' ? 'green' : 'blue'}>{track.status === 'success' ? 'Completed' : 'In Progress'}</Tag>
                          </div>
                          <Progress percent={track.percent} strokeColor={track.color} status={track.status === 'success' ? 'success' : 'active'} style={{ marginTop: 10 }} />
                          <Text type="secondary" style={{ fontSize: '0.85rem', color: '#9aa0a6', display: 'block', marginTop: 6 }}>{track.lessons}</Text>
                        </div>
                      ))}
                    </div>
                  </Card>
                </Col>

                <Col xs={24} lg={12}>
                  <Card id="projects" bordered={false} style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', height: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <Title level={4} style={{ margin: 0, color: '#ffffff' }}>Project Finder</Title>
                      <Tag color="gold">Open Roles</Tag>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {projectTeams.map((project) => (
                        <div key={project.id} style={{ padding: '12px 14px', borderRadius: 14, background: '#10131a', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                            <Text strong style={{ color: '#ffffff' }}>{project.title}</Text>
                            <Tag color={project.tagColor}>{project.track}</Tag>
                          </div>
                          <Text type="secondary" style={{ fontSize: '0.85rem', color: '#9aa0a6', display: 'block', marginTop: 6 }}>{project.description}</Text>
                          <Text type="secondary" style={{ fontSize: '0.85rem', color: '#34A853', display: 'block', marginTop: 6 }}>🔍 Looking for: {project.lookingFor}</Text>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                            <Text style={{ color: '#9aa0a6' }}>{project.members}/{project.totalSeats} members</Text>
                            <Button size="small" type="primary" onClick={() => handleApplyProject(project)} disabled={appliedProjects.includes(project.id)}>{appliedProjects.includes(project.id) ? 'Applied' : 'Apply'}</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </Col>
              </Row>

              <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
                <Col xs={24}>
                  <Card id="leaderboard" bordered={false} style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <Title level={4} style={{ margin: 0, color: '#ffffff' }}>Leaderboard</Title>
                      <Tag color="green">XP</Tag>
                    </div>
                    <div style={{ overflowX: 'auto', width: '100%' }}>
                      <Table dataSource={dynamicLeaderboardData} columns={leaderboardColumns} pagination={false} rowKey="key" scroll={{ x: 'max-content' }} />
                    </div>
                  </Card>
                </Col>
              </Row>

              <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
                <Col xs={24}>
                  <Card id="roles" bordered={false} style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
                      <Title level={4} style={{ margin: 0, color: '#ffffff' }}>Role Management</Title>
                      <Space>
                        <Select value={roleFilter} onChange={setRoleFilter} style={{ minWidth: 180 }} options={[{ label: 'All Roles', value: 'all' }, ...roleOptions]} />
                        <Button 
                          type={sortOrder === 'asc' ? 'primary' : 'default'} 
                          onClick={() => setSortOrder('asc')}
                          title="Sort A-Z"
                          style={{ minWidth: 60 }}
                        >
                          A → Z
                        </Button>
                        <Button 
                          type={sortOrder === 'desc' ? 'primary' : 'default'} 
                          onClick={() => setSortOrder('desc')}
                          title="Sort Z-A"
                          style={{ minWidth: 60 }}
                        >
                          Z → A
                        </Button>
                      </Space>
                    </div>
                    <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
                      <Col xs={24} sm={8}>
                        <Card size="small" style={{ background: '#10131a', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <Text style={{ color: '#9aa0a6' }}>Total Users</Text>
                          <Title level={3} style={{ margin: '4px 0 0', color: '#ffffff' }}>{stats.total}</Title>
                        </Card>
                      </Col>
                      <Col xs={24} sm={8}>
                        <Card size="small" style={{ background: '#10131a', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <Text style={{ color: '#9aa0a6' }}>Coordinators</Text>
                          <Title level={3} style={{ margin: '4px 0 0', color: '#ffffff' }}>{stats.coordinators}</Title>
                        </Card>
                      </Col>
                      <Col xs={24} sm={8}>
                        <Card size="small" style={{ background: '#10131a', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <Text style={{ color: '#9aa0a6' }}>Core Members</Text>
                          <Title level={3} style={{ margin: '4px 0 0', color: '#ffffff' }}>{stats.core}</Title>
                        </Card>
                      </Col>
                    </Row>
                    <div style={{ overflowX: 'auto', width: '100%' }}>
                      <Table loading={loading} dataSource={filteredUsers} rowKey="_id" pagination={{ pageSize: 8 }} scroll={{ x: 'max-content' }} columns={[
                        {
                          title: 'User',
                          key: 'user',
                          render: (_, record) => (
                            <Space>
                              <Avatar src={record.profilePhotoUrl || record.avatarUrl || undefined} size={38}>{getDisplayInitials(record.fullName || record.name || record.username || 'User')}</Avatar>
                              <div>
                                <div className="font-semibold text-white">{record.fullName || record.name || record.username}</div>
                                <div className="text-sm text-[#9aa0a6]">{record.email}</div>
                              </div>
                            </Space>
                          )
                        },
                        {
                          title: 'Current Role',
                          key: 'role',
                          render: (_, record) => <Tag color={record.role === 'coordinator' ? 'gold' : 'blue'}>{record.role}</Tag>
                        },
                        {
                          title: 'Assign Role',
                          key: 'action',
                          render: (_, record) => (
                            <Select value={record.role} style={{ minWidth: 170 }} options={roleOptions} loading={updatingUserId === record._id} onChange={(nextRole) => handleRoleChange(record._id, nextRole)} />
                          )
                        }
                      ]} />
                    </div>
                  </Card>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default CoordinatorDashboardPage;
