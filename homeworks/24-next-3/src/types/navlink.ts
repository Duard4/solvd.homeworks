/**
 * @fileoverview Navigation link interface file
 */

import { ComponentType } from 'react';

/**
 * Navigation link interface
 * @property href - link address
 * @property icon - respective icon of page, which link lead to
 * @property label - name of page, which link lead to
 */
export interface NavLink {
  href: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
}
