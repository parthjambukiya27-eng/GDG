import React, { useRef, useState } from 'react';
import {
  Layout, Menu, Card, Avatar, Button, Row, Col, Input, Space, Input as InputCom,
  ConfigProvider, message, Tooltip, Tag, Typography, theme, Modal, Divider
} from 'antd';
import {
  MenuUnfoldOutlined, MenuFoldOutlined, CameraOutlined, LogoutOutlined, DeleteOutlined, HomeOutlined
} from '@ant-design/icons';
import { getAvatarSource, getDisplayInitials, getRoleLabel } from '../utils/userDisplay';

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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const SettingsPage = ({ user, onLogout, onUserUpdate, navigate }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  const profileAvatarSrc = getAvatarSource(user);
  const profileAvatarInitials = getDisplayInitials(user?.fullName || user?.name || 'User');

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      message.error('Image size must be smaller than 2MB!');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Url = event.target?.result;
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            fullName: fullName || user?.fullName || user?.name,
            profilePhotoUrl: base64Url,
            bio: bio || user?.bio || ''
          })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Unable to update profile picture');

        const updatedUser = {
          ...user,
          name: data.user?.fullName || data.user?.name || user?.name,
          fullName: data.user?.fullName || data.user?.name || user?.fullName || user?.name,
          avatarUrl: data.user?.avatarUrl || data.user?.profilePhotoUrl || base64Url,
          profilePhotoUrl: data.user?.profilePhotoUrl || data.user?.avatarUrl || base64Url,
          bio: data.user?.bio || bio || user?.bio || ''
        };

        onUserUpdate?.(updatedUser);
        message.success('Profile picture updated successfully!');
      };

      reader.readAsDataURL(file);
    } catch (error) {
      message.error(error.message || 'Unable to update profile picture');
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          fullName: fullName,
          profilePhotoUrl: user?.profilePhotoUrl || user?.avatarUrl,
          bio: bio
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to update profile');

      const updatedUser = {
        ...user,
        name: data.user?.fullName || data.user?.name,
        fullName: data.user?.fullName || data.user?.name,
        bio: data.user?.bio
      };

      onUserUpdate?.(updatedUser);
      setEditingName(false);
      message.success('Profile updated successfully!');
    } catch (error) {
      message.error(error.message || 'Unable to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    Modal.confirm({
      title: 'Delete your account? This cannot be undone.',
      content: 'This will remove your account permanently from the GDG portal. All your data will be erased.',
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
              Authorization: `Bearer ${token}`
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

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      onLogout?.();
    } else if (key === 'home') {
      navigate('#/');
    } else if (key === 'dashboard') {
      navigate('#/dashboard');
    }
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
            padding: '10px 18px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            background: '#14161d',
            height: 'auto',
            minHeight: 'auto'
          }}
        >
          {/* Desktop Layout (md and above) - Original */}
          <div className="hidden md:flex" style={{ alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 12 }}>
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
                    Settings
                  </Text>
                  <Text type="secondary" style={{ fontSize: '0.72rem', display: 'block', lineHeight: 1.1, color: '#9aa0a6' }}>
                    Manage your profile
                  </Text>
                </div>
              </div>
            </Space>

            <Space size="large" align="center">
              <Tooltip title="Your Profile">
                <Space onClick={() => navigate('#/dashboard')} style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: 20, transition: 'all 0.2s' }} className="hover:bg-white/5">
                  <Avatar src={profileAvatarSrc} style={{ background: profileAvatarSrc ? 'transparent' : 'linear-gradient(135deg, #4285F4 0%, #EA4335 50%, #FBBC05 100%)', fontWeight: 'bold', border: 'none' }}>
                    {!profileAvatarSrc && profileAvatarInitials}
                  </Avatar>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text style={{ fontWeight: 600, fontSize: '0.82rem', color: '#ffffff', lineHeight: 1.2 }}>
                      {user?.name || 'Developer'}
                    </Text>
                    <Text type="secondary" style={{ fontSize: '0.68rem', lineHeight: 1, color: '#9aa0a6' }}>
                      {getRoleLabel(user?.role)}
                    </Text>
                  </div>
                </Space>
              </Tooltip>
            </Space>
          </div>

          {/* Phone Layout (below md) - 1 row */}
          <div className="md:hidden" style={{ alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 8 }}>
            <Space size="middle" style={{ marginRight: 'auto', minWidth: 0 }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ fontSize: '16px', width: 40, height: 40, flexShrink: 0 }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <img src="/asset/GDGlogo.jpeg" alt="GDG Logo" className="h-8 w-8 object-contain rounded-full border border-white/5 flex-none" />
                <div style={{ minWidth: 0 }}>
                  <Text style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ffffff', display: 'block', lineHeight: 1.2 }}>
                    Settings
                  </Text>
                  <Text type="secondary" style={{ fontSize: '0.6rem', display: 'block', lineHeight: 1.1, color: '#9aa0a6' }}>
                    Your profile
                  </Text>
                </div>
              </div>
            </Space>

            <Space size="small" align="center" style={{ flexShrink: 0 }}>
              <Button
                type="text"
                icon={<HomeOutlined style={{ fontSize: 18, color: '#9aa0a6' }} />}
                onClick={() => navigate('#/dashboard')}
              />
              <Avatar 
                src={profileAvatarSrc} 
                size={32}
                style={{ 
                  background: profileAvatarSrc ? 'transparent' : 'linear-gradient(135deg, #4285F4 0%, #EA4335 50%, #FBBC05 100%)', 
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('#/dashboard')}
              >
                {!profileAvatarSrc && profileAvatarInitials}
              </Avatar>
            </Space>
          </div>
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
              defaultSelectedKeys={['profile']}
              style={{ height: '100%', borderRight: 0, paddingTop: 16, background: '#14161d' }}
              items={[
                { key: 'dashboard', icon: <HomeOutlined />, label: 'Back to Dashboard' },
                { key: 'profile', label: 'Profile Settings', disabled: true },
                { key: 'logout', icon: <LogoutOutlined />, label: 'Sign Out', danger: true }
              ]}
              onClick={handleMenuClick}
            />
          </Sider>

          <Layout style={{ padding: '24px', minHeight: 'calc(100vh - 64px)', overflowY: 'auto' }} className="bg-[#0f1115] text-[#ffffff]">
            <Content style={{ margin: 0, maxWidth: 800, width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              <div style={{ marginBottom: 32 }} className="text-left">
                <Title level={2} style={{ margin: 0, fontWeight: 700, color: '#ffffff' }}>
                  Settings
                </Title>
                <Text type="secondary" style={{ fontSize: '0.92rem', color: '#9aa0a6' }}>
                  Manage your profile and account preferences
                </Text>
              </div>

              {/* Profile Picture Section */}
              <Card bordered={false} style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', marginBottom: 24 }}>
                <Title level={4} style={{ margin: '0 0 16px 0', color: '#ffffff' }}>Profile Picture</Title>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative' }}>
                    <Avatar size={120} src={profileAvatarSrc} style={{ background: profileAvatarSrc ? 'transparent' : 'linear-gradient(135deg, #4285F4 0%, #EA4335 50%, #FBBC05 100%)', fontSize: 48, fontWeight: 'bold', boxShadow: '0 4px 12px rgba(66,133,244,0.3)', border: 'none' }}>
                      {!profileAvatarSrc && profileAvatarInitials}
                    </Avatar>
                    <Tooltip title="Change Profile Picture">
                      <Button type="primary" shape="circle" size="large" icon={<CameraOutlined style={{ fontSize: 16 }} />} style={{ position: 'absolute', bottom: 0, right: 0, border: '2px solid #14161d', boxShadow: '0 2px 8px rgba(0,0,0,0.3)', backgroundColor: '#4285F4' }} onClick={() => fileInputRef.current.click()} />
                    </Tooltip>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
                  </div>
                  <div>
                    <Text style={{ display: 'block', marginBottom: 8, color: '#9aa0a6' }}>
                      JPG, PNG or GIF (Max. 2MB)
                    </Text>
                    <Text type="secondary" style={{ fontSize: '0.9rem', color: '#9aa0a6' }}>
                      Recommended size: 800x800 px
                    </Text>
                  </div>
                </div>
              </Card>

              {/* Profile Information Section */}
              <Card bordered={false} style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <Title level={4} style={{ margin: 0, color: '#ffffff' }}>Profile Information</Title>
                  {!editingName && <Button type="primary" size="small" onClick={() => setEditingName(true)}>Edit</Button>}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <Text type="secondary" style={{ display: 'block', marginBottom: 8, color: '#9aa0a6', fontSize: '0.9rem' }}>Full Name</Text>
                    {editingName ? (
                      <InputCom
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        style={{ borderRadius: 8 }}
                      />
                    ) : (
                      <Text style={{ fontSize: '1rem', color: '#ffffff' }}>{fullName || 'Not set'}</Text>
                    )}
                  </div>

                  <div>
                    <Text type="secondary" style={{ display: 'block', marginBottom: 8, color: '#9aa0a6', fontSize: '0.9rem' }}>Email</Text>
                    <Text style={{ fontSize: '1rem', color: '#ffffff' }}>{user?.email || 'Not set'}</Text>
                  </div>

                  <div>
                    <Text type="secondary" style={{ display: 'block', marginBottom: 8, color: '#9aa0a6', fontSize: '0.9rem' }}>Bio</Text>
                    {editingName ? (
                      <InputCom.TextArea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself"
                        rows={3}
                        style={{ borderRadius: 8 }}
                      />
                    ) : (
                      <Text style={{ fontSize: '0.95rem', color: '#9aa0a6' }}>{bio || 'No bio added yet'}</Text>
                    )}
                  </div>

                  <div>
                    <Text type="secondary" style={{ display: 'block', marginBottom: 8, color: '#9aa0a6', fontSize: '0.9rem' }}>Role</Text>
                    <Tag color={user?.role === 'coordinator' ? 'gold' : user?.role === 'mentor' ? 'blue' : user?.role === 'coremember' ? 'green' : 'default'}>
                      {getRoleLabel(user?.role)}
                    </Tag>
                  </div>

                  {editingName && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Button type="primary" onClick={handleSaveProfile} loading={saving}>Save Changes</Button>
                      <Button onClick={() => {
                        setEditingName(false);
                        setFullName(user?.fullName || user?.name || '');
                        setBio(user?.bio || '');
                      }}>Cancel</Button>
                    </div>
                  )}
                </div>
              </Card>

              {/* Danger Zone */}
              <Card bordered={false} style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', borderLeft: '4px solid #EA4335' }}>
                <Title level={4} style={{ margin: '0 0 16px 0', color: '#EA4335' }}>Danger Zone</Title>
                <Divider />
                <div>
                  <Text type="secondary" style={{ color: '#9aa0a6', marginBottom: 12, display: 'block' }}>
                    Deleting your account is permanent and cannot be undone. All your data will be erased from our servers.
                  </Text>
                  <Button danger onClick={handleDeleteAccount} loading={isDeletingAccount} icon={<DeleteOutlined />}>
                    Delete Account
                  </Button>
                </div>
              </Card>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default SettingsPage;
