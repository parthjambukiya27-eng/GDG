export const getRoleLabel = (role) => {
  if (!role) return 'Member';

  const normalizedRole = String(role).toLowerCase();
  const roleMap = {
    coordinator: 'Coordinator',
    mentor: 'Mentor',
    coremember: 'Core Member',
    member: 'Member',
    user: 'User'
  };

  return roleMap[normalizedRole] || normalizedRole.charAt(0).toUpperCase() + normalizedRole.slice(1);
};

export const getDisplayInitials = (name) => {
  if (!name) return 'U';
  const parts = String(name).trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const getAvatarSource = (userOrProfile) => {
  if (!userOrProfile) return undefined;

  return userOrProfile.avatarUrl || userOrProfile.profilePhotoUrl || userOrProfile.image || userOrProfile.photo || userOrProfile.profileImage || undefined;
};
