//
import { MAvatar } from './@material-extend';
import { MAvatarProps } from './@material-extend/MAvatar';
import createAvatar from 'src/modules/share/utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar({
  displayName = 'Default',
  photoUrl = '',
  ...other
}: MAvatarProps & { displayName?: string; photoUrl?: string }) {
  return (
    <MAvatar
      src={photoUrl}
      alt={displayName}
      color={photoUrl ? 'default' : createAvatar(displayName).color}
      {...other}
    >
      {createAvatar(displayName).name}
    </MAvatar>
  );
}
