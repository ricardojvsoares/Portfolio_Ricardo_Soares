import { GITHUB, INSTAGRAM, LINKED_IN } from './constants';

export type SocialPlatform = 'github' | 'linkedin' | 'instagram';

export interface SocialLink {
  name: string;
  platform: SocialPlatform;
  url: string;
}

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', platform: 'github', url: GITHUB },
  { name: 'LinkedIn', platform: 'linkedin', url: LINKED_IN },
  { name: 'Instagram', platform: 'instagram', url: INSTAGRAM },
];
