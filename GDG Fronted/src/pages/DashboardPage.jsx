import React, { useState, useRef, useEffect } from 'react';
import { 
  Layout, Menu, Card, Avatar, Badge, Progress, Table, List, 
  Button, Row, Col, Input, Space, ConfigProvider, 
  message, Tooltip, Tag, Typography, theme, Modal, Empty, Divider, Tabs
} from 'antd';
import { 
  DashboardOutlined, CalendarOutlined, BookOutlined, 
  ProjectOutlined, TrophyOutlined, SearchOutlined, 
  BellOutlined, UserOutlined, LogoutOutlined, HomeOutlined, 
  CheckCircleOutlined, DeleteOutlined, DownloadOutlined, TeamOutlined, 
  RocketOutlined, StarOutlined, MenuUnfoldOutlined, MenuFoldOutlined,
  VideoCameraOutlined, CameraOutlined
} from '@ant-design/icons';

const { Header: AntHeader, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const googleTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#4285F4', // Google Blue
    colorSuccess: '#34A853', // Google Green
    colorWarning: '#FBBC05', // Google Yellow
    colorError: '#EA4335', // Google Red
    fontFamily: '"Google Sans", "Poppins", sans-serif',
    borderRadius: 16,
    colorBgBase: '#0f1115', // Matches website background
    colorTextBase: '#ffffff',
  },
  components: {
    Layout: {
      bodyBg: '#0f1115',
      headerBg: '#14161d',
      headerHeight: 64,
      siderBg: '#14161d',
    },
    Menu: {
      itemActiveBg: 'rgba(66, 133, 244, 0.15)',
      itemSelectedBg: 'rgba(66, 133, 244, 0.15)',
      itemSelectedColor: '#4285F4',
    },
    Card: {
      colorBgContainer: '#14161d',
      boxShadowTertiary: '0 4px 20px rgba(0,0,0,0.3)',
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
    color: '#4285F4', // Blue
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
    color: '#34A853', // Green
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
    color: '#EA4335', // Red
  }
];

const learningTracks = [
  {
    id: 1,
    name: 'Generative AI Study Jam',
    percent: 85,
    status: 'active',
    color: '#4285F4',
    lessons: '17/20 lessons completed',
  },
  {
    id: 2,
    name: 'Flutter Development Boot Camp',
    percent: 60,
    status: 'active',
    color: '#34A853',
    lessons: '12/20 lessons completed',
  },
  {
    id: 3,
    name: 'Google Cloud Fundamentals',
    percent: 100,
    status: 'success',
    color: '#FBBC05',
    lessons: '10/10 lessons Completed',
  },
  {
    id: 4,
    name: 'Web Development Basics (HTML/CSS/React)',
    percent: 40,
    status: 'active',
    color: '#EA4335',
    lessons: '6/15 lessons completed',
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
  {
    key: '1',
    rank: 1,
    name: 'Aarav Sharma',
    role: 'AI Facilitator',
    points: 920,
    badge: 'Google Expert',
  },
  {
    key: '2',
    rank: 2,
    name: 'Sneha Patel',
    role: 'Flutter Lead',
    points: 850,
    badge: 'Super Contributor',
  },
  {
    key: '3',
    rank: 3,
    name: 'Parth Jambukiya',
    role: 'Cloud Architect',
    points: 810,
    badge: 'Cloud Explorer',
  },
  {
    key: '4',
    rank: 4,
    name: 'Rohan Das',
    role: 'Web Developer',
    points: 740,
    badge: 'Hackathon Hero',
  },
  {
    key: '5',
    rank: 5,
    name: 'Diya Sen',
    role: 'UI Designer',
    points: 680,
    badge: 'Creative Mind',
  }
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const DashboardPage = ({ user, onLogout, onUpdateUser, navigate }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [events, setEvents] = useState(initialEvents);
  const [appliedProjects, setAppliedProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({
    events: [],
    tracks: [],
    projects: [],
    leaderboard: []
  });
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const fileInputRef = useRef(null);

  const dynamicLeaderboardData = leaderboardData.map(item => {
    if (item.key === '3') {
      return { ...item, name: user?.name || item.name };
    }
    return item;
  });

  // Search function to find items across all dashboard sections
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults({ events: [], tracks: [], projects: [], leaderboard: [] });
      return;
    }

    const lowerQuery = query.toLowerCase();

    // Search events
    const eventResults = events.filter(event =>
      event.title.toLowerCase().includes(lowerQuery) ||
      event.instructor.toLowerCase().includes(lowerQuery) ||
      event.date.toLowerCase().includes(lowerQuery) ||
      event.ticketId.toLowerCase().includes(lowerQuery)
    );

    // Search learning tracks
    const trackResults = learningTracks.filter(track =>
      track.name.toLowerCase().includes(lowerQuery) ||
      track.lessons.toLowerCase().includes(lowerQuery)
    );

    // Search projects
    const projectResults = projectTeams.filter(project =>
      project.title.toLowerCase().includes(lowerQuery) ||
      project.description.toLowerCase().includes(lowerQuery) ||
      project.track.toLowerCase().includes(lowerQuery) ||
      project.lookingFor.toLowerCase().includes(lowerQuery)
    );

    // Search leaderboard
    const leaderboardResults = dynamicLeaderboardData.filter(member =>
      member.name.toLowerCase().includes(lowerQuery) ||
      member.role.toLowerCase().includes(lowerQuery) ||
      member.badge.toLowerCase().includes(lowerQuery)
    );

    setSearchResults({
      events: eventResults,
      tracks: trackResults,
      projects: projectResults,
      leaderboard: leaderboardResults
    });
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };


  const handleRsvpToggle = (eventId) => {
    setEvents(events.map(ev => {
      if (ev.id === eventId) {
        const nextRsvp = ev.rsvp === 'Going' ? 'Not Going' : 'Going';
        message.info(`RSVP updated for ${ev.title}: ${nextRsvp}`);
        return { ...ev, rsvp: nextRsvp };
      }
      return ev;
    }));
  };

  const handleDownloadTicket = (event) => {
    const ticketContent = `----------------------------------------------
GDG ON CAMPUS • IIT BHILAI
EVENT TICKET: ${event.title}
----------------------------------------------
Ticket ID:  ${event.ticketId}
Attendee:   ${user?.name || 'Developer Enthusiast'}
Role:       Cloud Track Member
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
    setAppliedProjects([...appliedProjects, project.id]);
    message.success(`Application sent for "${project.title}"!`);
  };

  const handleDeleteAccount = async () => {
    Modal.confirm({
      title: 'Delete your account? This cannot be undone.',
      content: 'This will remove your account permanently from the GDG portal.',
      okText: 'Delete Account',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        setIsDeletingAccount(true);
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            message.error('Session expired. Please sign in again.');
            return;
          }

          const response = await fetch(`${API_BASE_URL}/api/auth/delete`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || 'Unable to delete your account.');
          }

          message.success('Account deleted permanently.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          if (onLogout) onLogout();
          navigate('#/');
        } catch (err) {
          message.error(err.message || 'Failed to delete account.');
        } finally {
          setIsDeletingAccount(false);
        }
      }
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        message.error("Image size must be smaller than 2MB!");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target.result;
        const updatedUser = { ...user, avatarUrl: base64Url };
        onUpdateUser && onUpdateUser(updatedUser);
        message.success("Profile picture updated successfully!");
      };
      reader.readAsDataURL(file);
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
              src={(isCurrentUser && user?.avatarUrl) ? user.avatarUrl : undefined}
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
        
        {/* Top Navbar */}
        <AntHeader style={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 101, 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '0 24px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: '#14161d'
        }}>
          
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
                  IIT Bhilai Dashboard
                </Text>
              </div>
            </div>
          </Space>

<div style={{ width: '100%', maxWidth: 460 }} className="max-sm:hidden">
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
              className="sm:hidden"
            />

            <Badge count={2} size="small">
              <Button 
                type="text" 
                shape="circle"
                icon={<BellOutlined style={{ fontSize: 19, color: '#9aa0a6' }} />} 
                onClick={() => {
                  message.info("Club Notifications: 1. SolsticeHack 1.0 finishes soon! 2. Flutter study jam session is scheduled.");
                }}
              />
            </Badge>

            {/* Profile icon clicks navigate directly to main site */}
            <Tooltip title="Main Website">
              <Space 
                onClick={() => navigate('#/')}
                style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: 20, transition: 'all 0.2s' }} 
                className="hover:bg-white/5"
              >
                <Avatar 
                  src={user?.avatarUrl || undefined} 
                  style={{ 
                    background: user?.avatarUrl ? 'transparent' : 'linear-gradient(135deg, #4285F4 0%, #EA4335 50%, #FBBC05 100%)', 
                    fontWeight: 'bold',
                    border: 'none'
                  }}
                >
                  {!user?.avatarUrl && (user?.name?.charAt(0).toUpperCase() || 'U')}
                </Avatar>
                <div style={{ display: 'flex', flexDirection: 'column' }} className="max-sm:hidden">
                  <Text style={{ fontWeight: 600, fontSize: '0.82rem', color: '#ffffff', lineHeight: 1.2 }}>
                    {user?.name || 'Developer'}
                  </Text>
                  <Text type="secondary" style={{ fontSize: '0.68rem', lineHeight: 1, color: '#9aa0a6' }}>
                    Member
                  </Text>
                </div>
              </Space>
            </Tooltip>
          </Space>
        </AntHeader>

        <Layout>
          
          {/* Responsive Sidebar */}
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            trigger={null}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{
              background: '#14161d',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '2px 0 8px rgba(0,0,0,0.15)'
            }}
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
                { key: 'delete', icon: <DeleteOutlined />, label: 'Delete Account', danger: true },
                { key: 'logout', icon: <LogoutOutlined />, label: 'Sign Out', danger: true }
              ]}
              onClick={({ key }) => {
                if (key === 'logout') {
                  onLogout();
                } else if (key === 'delete') {
                  handleDeleteAccount();
                } else {
                  const element = document.getElementById(key);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    message.info(`Feature "${key}" navigation simulated!`);
                  }
                }
              }}
            />
          </Sider>

          {/* Main Dashboard Area */}
          <Layout style={{ padding: '24px', minHeight: 'calc(100vh - 64px)', overflowY: 'auto' }} className="bg-[#0f1115] text-[#ffffff]">
            <Content style={{ margin: 0, maxWidth: 1200, width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              
              {/* Header Title Greeting */}
              <div style={{ marginBottom: 24 }} className="text-left">
                <Title level={2} style={{ margin: 0, fontWeight: 700, color: '#ffffff' }}>
                  Welcome back, {user?.name?.split(' ')[0] || 'Developer'}! 👋
                </Title>
                <Text type="secondary" style={{ fontSize: '0.92rem', color: '#9aa0a6' }}>
                  Here is what is happening in the GDG IIT Bhilai chapter today.
                </Text>
              </div>

              {searchQuery && (
                <Card 
                  bordered={false} 
                  style={{
                    marginBottom: 24,
                    background: '#14161d',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 16px 50px rgba(0,0,0,0.16)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                    <Text style={{ color: '#9aa0a6' }}>
                      Showing <Text strong style={{ color: '#4285F4' }}>
                        {searchResults.events.length + searchResults.tracks.length + searchResults.projects.length + searchResults.leaderboard.length}
                      </Text> results for "<Text strong>{searchQuery}</Text>"
                    </Text>
                    <Button type="text" onClick={() => {
                      setSearchQuery('');
                      setSearchResults({ events: [], tracks: [], projects: [], leaderboard: [] });
                    }} style={{ color: '#9aa0a6' }}>
                      Clear
                    </Button>
                  </div>

                  {searchResults.events.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <Text strong style={{ display: 'block', marginBottom: 12, fontSize: 14, color: '#EA4335' }}>
                        📅 Events ({searchResults.events.length})
                      </Text>
                      <List
                        dataSource={searchResults.events}
                        renderItem={item => (
                          <List.Item
                            style={{ paddingLeft: 0, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
                            key={item.id}
                          >
                            <List.Item.Meta
                              avatar={<Avatar style={{ backgroundColor: item.color }}>📅</Avatar>}
                              title={
                                <div>
                                  <Text strong>{item.title}</Text>
                                  <Tag color="blue" style={{ marginLeft: 8 }}>{item.ticketId}</Tag>
                                </div>
                              }
                              description={
                                <Space direction="vertical" size={0} style={{ marginTop: 8 }}>
                                  <Text type="secondary" style={{ fontSize: '0.85rem', color: '#9aa0a6' }}>
                                    📍 {item.date} • {item.time}
                                  </Text>
                                  <Text type="secondary" style={{ fontSize: '0.85rem', color: '#9aa0a6' }}>
                                    👤 Instructor: {item.instructor}
                                  </Text>
                                </Space>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  )}

                  {searchResults.tracks.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <Text strong style={{ display: 'block', marginBottom: 12, fontSize: 14, color: '#4285F4' }}>
                        📚 Learning Tracks ({searchResults.tracks.length})
                      </Text>
                      <List
                        dataSource={searchResults.tracks}
                        renderItem={item => (
                          <List.Item
                            style={{ paddingLeft: 0, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
                            key={item.id}
                          >
                            <List.Item.Meta
                              avatar={<Avatar style={{ backgroundColor: item.color }}>📚</Avatar>}
                              title={
                                <div>
                                  <Text strong>{item.name}</Text>
                                  <Tag color={item.status === 'success' ? 'success' : 'processing'} style={{ marginLeft: 8 }}>
                                    {item.status === 'success' ? 'Completed' : 'In Progress'}
                                  </Tag>
                                </div>
                              }
                              description={
                                <div style={{ marginTop: 8 }}>
                                  <Progress
                                    percent={item.percent}
                                    strokeColor={item.color}
                                    status={item.status === 'success' ? 'success' : 'active'}
                                    strokeWidth={6}
                                    size="small"
                                  />
                                  <Text type="secondary" style={{ fontSize: '0.85rem', color: '#9aa0a6', marginTop: 4, display: 'block' }}>
                                    {item.lessons}
                                  </Text>
                                </div>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  )}

                  {searchResults.projects.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <Text strong style={{ display: 'block', marginBottom: 12, fontSize: 14, color: '#FBBC05' }}>
                        🚀 Projects ({searchResults.projects.length})
                      </Text>
                      <List
                        dataSource={searchResults.projects}
                        renderItem={item => (
                          <List.Item
                            style={{ paddingLeft: 0, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
                            key={item.id}
                            actions={[
                              <Button
                                size="small"
                                type="primary"
                                onClick={() => {
                                  handleApplyProject(item);
                                }}
                                disabled={appliedProjects.includes(item.id)}
                              >
                                {appliedProjects.includes(item.id) ? 'Applied' : 'Apply'}
                              </Button>
                            ]}
                          >
                            <List.Item.Meta
                              avatar={<Avatar style={{ backgroundColor: '#FBBC05' }}>🚀</Avatar>}
                              title={
                                <div>
                                  <Text strong>{item.title}</Text>
                                  <Tag color={item.tagColor} style={{ marginLeft: 8 }}>{item.track}</Tag>
                                </div>
                              }
                              description={
                                <Space direction="vertical" size={0} style={{ marginTop: 8 }}>
                                  <Text type="secondary" style={{ fontSize: '0.85rem', color: '#9aa0a6' }}>
                                    {item.description}
                                  </Text>
                                  <Text type="secondary" style={{ fontSize: '0.85rem', color: '#9aa0a6', marginTop: 4 }}>
                                    🔍 Looking for: <span style={{ color: '#34A853' }}>{item.lookingFor}</span>
                                  </Text>
                                </Space>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  )}

                  {searchResults.leaderboard.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <Text strong style={{ display: 'block', marginBottom: 12, fontSize: 14, color: '#34A853' }}>
                        🏆 Leaderboard ({searchResults.leaderboard.length})
                      </Text>
                      <List
                        dataSource={searchResults.leaderboard}
                        renderItem={item => (
                          <List.Item
                            style={{ paddingLeft: 0, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
                            key={item.key}
                          >
                            <List.Item.Meta
                              avatar={
                                <Avatar
                                  style={{
                                    backgroundColor:
                                      item.rank === 1 ? '#FFD700' :
                                      item.rank === 2 ? '#C0C0C0' :
                                      item.rank === 3 ? '#CD7F32' : '#4285F4'
                                  }}
                                >
                                  {item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : `#${item.rank}`}
                                </Avatar>
                              }
                              title={
                                <div>
                                  <Text strong>{item.name}</Text>
                                  <Tag color="geekblue" style={{ marginLeft: 8 }}>{item.role}</Tag>
                                </div>
                              }
                              description={
                                <Space direction="vertical" size={0} style={{ marginTop: 8 }}>
                                  <Text type="secondary" style={{ fontSize: '0.85rem', color: '#34A853' }}>
                                    ⭐ {item.points} XP
                                  </Text>
                                  <Tag color="purple" style={{ marginTop: 4, width: 'fit-content' }}>{item.badge}</Tag>
                                </Space>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  )}

                  {searchResults.events.length === 0 &&
                    searchResults.tracks.length === 0 &&
                    searchResults.projects.length === 0 &&
                    searchResults.leaderboard.length === 0 && (
                    <Empty description={<Text style={{ color: '#9aa0a6' }}>No results found for "{searchQuery}"</Text>} style={{ marginTop: 40 }} />
                  )}
                </Card>
              )}

              {/* Grid Layout */}
              <Row gutter={[24, 24]}>
                
                {/* 1. Profile Summary Card */}
                <Col xs={24} lg={14}>
                  <Card 
                    id="dashboard"
                    bordered={false} 
                    style={{ 
                      borderRadius: 16, 
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                      height: '100%'
                    }}
                  >
                    <div style={{ display: 'flex', gap: 20, alignItems: 'start' }} className="max-sm:flex-col text-left">
                      {/* Interactive profile edit camera badge */}
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <Avatar 
                          size={80} 
                          src={user?.avatarUrl || undefined}
                          style={{ 
                            background: user?.avatarUrl ? 'transparent' : 'linear-gradient(135deg, #4285F4 0%, #EA4335 50%, #FBBC05 100%)', 
                            fontSize: 32, 
                            fontWeight: 'bold', 
                            boxShadow: '0 4px 12px rgba(66,133,244,0.3)',
                            border: 'none'
                          }}
                        >
                          {!user?.avatarUrl && (user?.name?.charAt(0).toUpperCase() || 'U')}
                        </Avatar>
                        <Tooltip title="Change Profile Picture">
                          <Button
                            type="primary"
                            shape="circle"
                            size="small"
                            icon={<CameraOutlined style={{ fontSize: 12 }} />}
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              right: 0,
                              border: '2px solid #14161d',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                              backgroundColor: '#4285F4',
                              width: 24,
                              height: 24,
                              minWidth: 24,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 0
                            }}
                            onClick={() => fileInputRef.current.click()}
                          />
                        </Tooltip>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleFileChange} 
                          accept="image/*" 
                          style={{ display: 'none' }} 
                        />
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                          <div>
                            <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
                              {user?.name || 'Developer Enthusiast'}
                            </Title>
                            <Text strong style={{ color: '#4285F4' }}>Cloud Track Facilitator</Text>
                          </div>
                          <div style={{ textAlign: 'right' }} className="max-sm:text-left">
                            <Badge 
                              count="Facilitator" 
                              style={{ 
                                backgroundColor: 'rgba(66, 133, 244, 0.15)', 
                                color: '#4285F4', 
                                border: '1px solid rgba(66, 133, 244, 0.25)', 
                                fontWeight: 600,
                                padding: '4px 10px',
                                borderRadius: 12
                              }} 
                            />
                          </div>
                        </div>

                        <Paragraph style={{ marginTop: 12, color: '#9aa0a6', fontSize: '0.9rem' }}>
                          Official Member of GDG on Campus Indian Institute of Technology Bhilai. Exploring Cloud Engineering, Devops, and Generative AI.
                        </Paragraph>

                        <div style={{ display: 'flex', gap: 32, marginTop: 16 }} className="max-sm:gap-6">
                          <div>
                            <Text type="secondary" style={{ fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Total Earned</Text>
                            <Text style={{ fontSize: '1.45rem', fontWeight: 800, color: '#34A853' }}>810 XP</Text>
                          </div>
                          <div>
                            <Text type="secondary" style={{ fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Completed Tracks</Text>
                            <Text style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff' }}>2 / 4</Text>
                          </div>
                          <div>
                            <Text type="secondary" style={{ fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Global Rank</Text>
                            <Text style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FBBC05' }}>#3</Text>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', marginTop: 24, paddingTop: 18 }} className="text-left">
                      <Text strong style={{ display: 'block', marginBottom: 12, fontSize: '0.85rem', color: '#9aa0a6', textTransform: 'uppercase', tracking: '0.5px' }}>
                        Earned Badges & Milestones
                      </Text>
                      <Space size="large" wrap>
                        <Tooltip title="Cloud Facilitator">
                          <Avatar size={44} style={{ backgroundColor: 'rgba(66, 133, 244, 0.15)', border: '2px solid #4285F4' }}>
                            <StarOutlined style={{ color: '#4285F4', fontSize: 20 }} />
                          </Avatar>
                        </Tooltip>
                        <Tooltip title="GenAI Facilitator">
                          <Avatar size={44} style={{ backgroundColor: 'rgba(234, 67, 53, 0.15)', border: '2px solid #EA4335' }}>
                            <RocketOutlined style={{ color: '#EA4335', fontSize: 20 }} />
                          </Avatar>
                        </Tooltip>
                        <Tooltip title="Study Jam Helper">
                          <Avatar size={44} style={{ backgroundColor: 'rgba(251, 188, 5, 0.15)', border: '2px solid #FBBC05' }}>
                            <TrophyOutlined style={{ color: '#FBBC05', fontSize: 20 }} />
                          </Avatar>
                        </Tooltip>
                        <Tooltip title="Git Master">
                          <Avatar size={44} style={{ backgroundColor: 'rgba(52, 168, 83, 0.15)', border: '2px solid #34A853' }}>
                            <CheckCircleOutlined style={{ color: '#34A853', fontSize: 20 }} />
                          </Avatar>
                        </Tooltip>
                      </Space>
                    </div>

                  </Card>
                </Col>

                {/* 2. Learning Progress Section */}
                <Col xs={24} lg={10}>
                  <Card 
                    id="tracks"
                    title={<Text strong style={{ fontSize: 16 }}><BookOutlined style={{ marginRight: 8, color: '#4285F4' }} /> My Tracks Progress</Text>}
                    bordered={false} 
                    style={{ 
                      borderRadius: 16, 
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                      height: '100%'
                    }}
                  >
                    <List
                      itemLayout="horizontal"
                      dataSource={learningTracks}
                      renderItem={item => (
                        <List.Item style={{ padding: '12px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }} className="text-left">
                          <div style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                              <Text strong style={{ fontSize: '0.88rem' }}>{item.name}</Text>
                              <Text type="secondary" style={{ fontSize: '0.78rem', color: '#9aa0a6' }}>{item.lessons}</Text>
                            </div>
                            <Progress 
                              percent={item.percent} 
                              strokeColor={item.color} 
                              status={item.status === 'success' ? 'success' : 'active'}
                              strokeWidth={8}
                            />
                          </div>
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>

                {/* 3. Upcoming Events Widget */}
                <Col xs={24} lg={15}>
                  <Card 
                    id="events"
                    title={<Text strong style={{ fontSize: 16 }}><CalendarOutlined style={{ marginRight: 8, color: '#EA4335' }} /> Upcoming Chapter Events</Text>}
                    bordered={false} 
                    style={{ 
                      borderRadius: 16, 
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                    }}
                  >
                    <List
                      itemLayout="vertical"
                      dataSource={events}
                      renderItem={item => (
                        <List.Item 
                          key={item.id}
                          style={{ padding: '16px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}
                          className="text-left"
                          actions={[
                            <Button 
                              type="primary" 
                              icon={<VideoCameraOutlined />} 
                              onClick={() => window.open(item.meetLink, '_blank')}
                              disabled={item.rsvp !== 'Going'}
                            >
                              Join Meet
                            </Button>,
                            <Button 
                              icon={<DownloadOutlined />} 
                              onClick={() => handleDownloadTicket(item)}
                              disabled={item.rsvp !== 'Going'}
                            >
                              Get Ticket
                            </Button>,
                            <Button 
                              type="text" 
                              onClick={() => handleRsvpToggle(item.id)}
                            >
                              {item.rsvp === 'Going' ? 'Cancel RSVP' : 'RSVP Going'}
                            </Button>
                          ]}
                        >
                          <List.Item.Meta
                            avatar={
                              <Avatar size={48} style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                                <RocketOutlined style={{ color: item.color, fontSize: 20 }} />
                              </Avatar>
                            }
                            title={
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                                <Text strong style={{ fontSize: '1rem' }}>{item.title}</Text>
                                <Tag color={item.rsvp === 'Going' ? 'success' : 'warning'}>
                                  RSVP: {item.rsvp}
                                </Tag>
                              </div>
                            }
                            description={
                              <Space size="large" style={{ marginTop: 4, flexWrap: 'wrap' }}>
                                <Text type="secondary" style={{ fontSize: '0.82rem', color: '#9aa0a6' }}>
                                  📅 {item.date} ({item.time})
                                </Text>
                                <Text type="secondary" style={{ fontSize: '0.82rem', color: '#9aa0a6' }}>
                                  👤 Instructor: <strong>{item.instructor}</strong>
                                </Text>
                              </Space>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>

                {/* 4. Interactive Project Team Finder */}
                <Col xs={24} lg={9}>
                  <Card 
                    id="projects"
                    title={<Text strong style={{ fontSize: 16 }}><ProjectOutlined style={{ marginRight: 8, color: '#FBBC05' }} /> Project Team Finder</Text>}
                    bordered={false} 
                    style={{ 
                      borderRadius: 16, 
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                      height: '100%'
                    }}
                  >
                    <List
                      itemLayout="horizontal"
                      dataSource={projectTeams}
                      renderItem={item => {
                        const isApplied = appliedProjects.includes(item.id);
                        return (
                          <List.Item 
                            style={{ padding: '16px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }} 
                            className="text-left"
                            actions={[
                              <Button 
                                size="small" 
                                type={isApplied ? 'default' : 'primary'}
                                disabled={isApplied}
                                onClick={() => handleApplyProject(item)}
                              >
                                {isApplied ? 'Applied' : 'Apply to Join'}
                              </Button>
                            ]}
                          >
                            <List.Item.Meta
                              title={
                                <div>
                                  <Text strong style={{ fontSize: '0.88rem', display: 'block' }}>{item.title}</Text>
                                  <Space style={{ marginTop: 4 }}>
                                    <Tag color={item.tagColor}>{item.track}</Tag>
                                    <Tag color="default"><TeamOutlined /> {item.members}/{item.totalSeats}</Tag>
                                  </Space>
                                </div>
                              }
                              description={
                                <div style={{ marginTop: 6 }}>
                                  <Paragraph style={{ fontSize: '0.78rem', color: '#9aa0a6', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                                    {item.description}
                                  </Paragraph>
                                  <Text type="secondary" style={{ fontSize: '0.75rem', display: 'block', color: '#9aa0a6' }}>
                                    🔍 Hiring: <strong className="text-gray-300">{item.lookingFor}</strong>
                                  </Text>
                                </div>
                              }
                            />
                          </List.Item>
                        );
                      }}
                    />
                  </Card>
                </Col>

                {/* 5. Gamified Leaderboard Widget */}
                <Col xs={24}>
                  <Card 
                    id="leaderboard"
                    title={<Text strong style={{ fontSize: 16 }}><TrophyOutlined style={{ marginRight: 8, color: '#34A853' }} /> Chapter Leaderboard Rankings</Text>}
                    bordered={false} 
                    style={{ 
                      borderRadius: 16, 
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                    }}
                  >
                    <Table 
                      columns={leaderboardColumns} 
                      dataSource={dynamicLeaderboardData} 
                      pagination={false} 
                      responsive={['md', 'lg']}
                      scroll={{ x: 'max-content' }}
                    />
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

export default DashboardPage;
