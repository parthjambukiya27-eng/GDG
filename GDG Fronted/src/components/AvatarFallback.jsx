import React from 'react';

const gradient = 'linear-gradient(135deg, #4285F4 0%, #EA4335 50%, #FBBC05 100%)';

const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const AvatarFallback = ({ src, name, size = 64, className = '', alt }) => {
  const initials = getInitials(name || alt || 'User');
  const numericSize = typeof size === 'number' ? size : parseInt(size, 10) || 64;
  const fontSize = Math.max(12, Math.floor(numericSize * 0.36));

  if (src) {
    return (
      // eslint-disable-next-line jsx-a11y/img-redundant-alt
      <img src={src} alt={alt || name || 'Avatar'} className={`${className}`} style={{ width: numericSize, height: numericSize, objectFit: 'cover', borderRadius: '50%' }} />
    );
  }

  return (
    <div
      className={className}
      style={{
        width: numericSize,
        height: numericSize,
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: gradient,
        color: '#fff',
        fontWeight: 700,
        fontSize: fontSize,
        userSelect: 'none'
      }}
      aria-hidden
    >
      {initials}
    </div>
  );
};

export default AvatarFallback;
