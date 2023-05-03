//
import { MAvatar } from './@material-extend';
import { MAvatarProps } from './@material-extend/MAvatar';
import createAvatar from 'src/modules/share/utils/createAvatar';
import { useMemo } from 'react';

// ----------------------------------------------------------------------

export default function MyAvatar({
  displayName = 'Default',
  photoUrl = '',
  size = 'medium',
  sx,
  ...other
}: MAvatarProps & {
  displayName?: string;
  photoUrl?: string;
  size?: 'small' | 'medium' | 'large' | number;
}) {
  const avatarSize = useMemo(() => {
    if (typeof size === 'number') {
      return size;
    }

    switch (size) {
      case 'small':
        return 32;
      case 'medium':
        return 48;
      case 'large':
        return 56;
      default:
        null;
    }
  }, []);

  return (
    <MAvatar
      src={photoUrl}
      alt={displayName}
      color={photoUrl ? 'default' : createAvatar(displayName).color}
      {...other}
      sx={{
        height: avatarSize,
        width: avatarSize,
        ...sx,
      }}
    >
      {createAvatar(displayName).name}
    </MAvatar>
  );
}
