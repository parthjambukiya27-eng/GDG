import React, { useEffect, useState } from 'react';
import {
  Layout, Card, Avatar, Button, Space, ConfigProvider, message, Tooltip, Tag, Typography, theme, Progress, Spin, Row, Col, Empty
} from 'antd';
import {
  ArrowLeftOutlined, MailOutlined, UserOutlined
} from '@ant-design/icons';

const { Header: AntHeader, Content } = Layout;
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
      headerHeight: 64
    },
    Card: {
      colorBgContainer: '#14161d',
      boxShadowTertiary: '0 4px 20px rgba(0,0,0,0.3)'
    }
  }
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const PublicProfilePage = ({ userId, navigate }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userId) {
          console.warn('No userId provided to PublicProfilePage');
          message.error('No user ID provided');
          setLoading(false);
          return;
        }

        setLoading(true);
        console.log(`Fetching profile for userId: ${userId}`);
        const response = await fetch(`${API_BASE_URL}/api/auth/users/${userId}`);
        const data = await response.json();
        
        console.log(`Response status: ${response.status}, Data:`, data);
        
        if (response.ok) {
          setProfile(data.user);
        } else {
          console.error('Error from API:', data.message);
          message.error(data.message || 'Profile not found');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        message.error('Failed to load profile: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  if (loading) {
    return (
      <ConfigProvider theme={googleTheme}>
        <Layout style={{ minHeight: '100vh', backgroundColor: '#0f1115' }}>
          <AntHeader style={{ background: '#14161d', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '10px 18px' }}>
            <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate('#/')} style={{ fontSize: '16px' }}>
              Back
            </Button>
          </AntHeader>
          <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Spin size="large" />
          </Content>
        </Layout>
      </ConfigProvider>
    );
  }

  if (!profile) {
    return (
      <ConfigProvider theme={googleTheme}>
        <Layout style={{ minHeight: '100vh', backgroundColor: '#0f1115' }}>
          <AntHeader style={{ background: '#14161d', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '10px 18px' }}>
            <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate('#/')} style={{ fontSize: '16px' }}>
              Back
            </Button>
          </AntHeader>
          <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Empty description="Profile not found" />
          </Content>
        </Layout>
      </ConfigProvider>
    );
  }

  const roleColor = {
    coordinator: 'gold',
    mentor: 'blue',
    coremember: 'green',
    member: 'default',
    user: 'default'
  };

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
            padding: '10px 24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            background: '#14161d'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate('#/')} style={{ fontSize: '16px' }} />
            <div>
              <Text style={{ fontWeight: 700, fontSize: '1.05rem', color: '#ffffff', display: 'block' }}>
                Profile
              </Text>
              <Text type="secondary" style={{ fontSize: '0.72rem', color: '#9aa0a6' }}>
                Member Profile
              </Text>
            </div>
          </div>
        </AntHeader>

        <Content style={{ padding: '32px 24px', maxWidth: 900, width: '100%', margin: '0 auto' }}>
          <Row gutter={[24, 24]}>
            {/* Profile Card */}
            <Col xs={24} sm={24} md={8}>
              <Card bordered={false} style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', height: '100%' }}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                  <Avatar
                    size={120}
                    src={profile?.profilePhotoUrl || profile?.avatarUrl}
                    style={{
                      background: (profile?.profilePhotoUrl || profile?.avatarUrl) ? 'transparent' : 'linear-gradient(135deg, #4285F4 0%, #EA4335 50%, #FBBC05 100%)',
                      fontSize: 48,
                      fontWeight: 'bold',
                      boxShadow: '0 4px 12px rgba(66,133,244,0.3)',
                      border: 'none'
                    }}
                  >
                    {!(profile?.profilePhotoUrl || profile?.avatarUrl) && (profile?.fullName || profile?.name || 'U').charAt(0).toUpperCase()}
                  </Avatar>

                  <div>
                    <Title level={3} style={{ margin: 0, color: '#ffffff' }}>
                      {profile?.fullName || profile?.name || 'Community Member'}
                    </Title>
                    <Tag color={roleColor[profile?.role] || 'default'} style={{ marginTop: 8, fontSize: '0.85rem' }}>
                      {profile?.role?.charAt(0).toUpperCase() + profile?.role?.slice(1) || 'Member'}
                    </Tag>
                  </div>

                  {profile?.email && (
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                        <MailOutlined style={{ color: '#9aa0a6' }} />
                        <Text type="secondary" style={{ fontSize: '0.9rem' }}>
                          {profile.email}
                        </Text>
                      </div>
                    </Space>
                  )}

                  {profile?.username && (
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                        <UserOutlined style={{ color: '#9aa0a6' }} />
                        <Text type="secondary" style={{ fontSize: '0.9rem' }}>
                          @{profile.username}
                        </Text>
                      </div>
                    </Space>
                  )}
                </div>
              </Card>
            </Col>

            {/* Profile Details */}
            <Col xs={24} sm={24} md={16}>
              <Card bordered={false} style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', marginBottom: 24 }}>
                <Title level={4} style={{ margin: '0 0 16px 0', color: '#ffffff' }}>About</Title>
                {profile?.bio ? (
                  <Paragraph style={{ color: '#9aa0a6', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {profile.bio}
                  </Paragraph>
                ) : (
                  <Text type="secondary" style={{ fontSize: '0.9rem', color: '#7f8fa4' }}>
                    No bio provided yet
                  </Text>
                )}
              </Card>

              {/* Account Info Card */}
              <Card bordered={false} style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                <Title level={4} style={{ margin: '0 0 16px 0', color: '#ffffff' }}>Member Details</Title>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <Text type="secondary" style={{ display: 'block', marginBottom: 8, color: '#9aa0a6', fontSize: '0.9rem' }}>
                      Full Name
                    </Text>
                    <Text style={{ fontSize: '1rem', color: '#ffffff' }}>
                      {profile?.fullName || profile?.name || 'Not set'}
                    </Text>
                  </div>

                  <div>
                    <Text type="secondary" style={{ display: 'block', marginBottom: 8, color: '#9aa0a6', fontSize: '0.9rem' }}>
                      Email
                    </Text>
                    <Text style={{ fontSize: '1rem', color: '#ffffff', wordBreak: 'break-all' }}>
                      {profile?.email || 'Not set'}
                    </Text>
                  </div>

                  <div>
                    <Text type="secondary" style={{ display: 'block', marginBottom: 8, color: '#9aa0a6', fontSize: '0.9rem' }}>
                      Username
                    </Text>
                    <Text style={{ fontSize: '1rem', color: '#ffffff' }}>
                      {profile?.username ? `@${profile.username}` : 'Not set'}
                    </Text>
                  </div>

                  <div>
                    <Text type="secondary" style={{ display: 'block', marginBottom: 8, color: '#9aa0a6', fontSize: '0.9rem' }}>
                      Role
                    </Text>
                    <Tag color={roleColor[profile?.role] || 'default'}>
                      {profile?.role?.charAt(0).toUpperCase() + profile?.role?.slice(1) || 'Member'}
                    </Tag>
                  </div>

                  {profile?.interests && profile.interests.length > 0 && (
                    <div>
                      <Text type="secondary" style={{ display: 'block', marginBottom: 8, color: '#9aa0a6', fontSize: '0.9rem' }}>
                        Interests
                      </Text>
                      <Space wrap>
                        {profile.interests.map((interest, idx) => (
                          <Tag key={idx} color="blue">{interest}</Tag>
                        ))}
                      </Space>
                    </div>
                  )}
                </div>
              </Card>
            </Col>
          </Row>

          {/* Member Join Info */}
          <Card bordered={false} style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', marginTop: 24 }}>
            <Title level={4} style={{ margin: '0 0 16px 0', color: '#ffffff' }}>Community Status</Title>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 20 }}>
              <div style={{ textAlign: 'center' }}>
                <Title level={5} style={{ margin: 0, color: '#4285F4' }}>
                  Member
                </Title>
                <Text type="secondary" style={{ fontSize: '0.9rem', color: '#9aa0a6' }}>
                  Active in community
                </Text>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Title level={5} style={{ margin: 0, color: '#34A853' }}>
                  Engaged
                </Title>
                <Text type="secondary" style={{ fontSize: '0.9rem', color: '#9aa0a6' }}>
                  Participating in events
                </Text>
              </div>
            </div>
          </Card>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default PublicProfilePage;
