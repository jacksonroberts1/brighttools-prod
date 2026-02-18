import { ReactNode } from 'react';

interface LogoWithSpriteProps {
  children: ReactNode;
}

export default function LogoWithSprite({ children }: LogoWithSpriteProps) {
  return <>{children}</>;
}
