import NextLink, { LinkProps } from 'next/link';

const Link = ({
  prefetch,
  children,
  ...props
}: LinkProps &
  Pick<
    React.HTMLProps<HTMLAnchorElement>,
    'children' | 'target' | 'style'
  >) => {
  const defaultPrefetch = process.env.NODE_ENV === 'production';

  return (
    <NextLink {...props} prefetch={prefetch ? prefetch : defaultPrefetch}>
      {children}
    </NextLink>
  );
};

export default Link;
