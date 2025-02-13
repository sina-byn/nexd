import path from 'path';

// * config
import { nexdConfig } from '../../nexd.config';

// * utils
import { __rootdir } from '@/core/utils/path';

// * icons
import { IconExternalLink } from '@tabler/icons-react';

// * types
export type EditURLProps = { pagePath: string; visit?: boolean; baseURL?: string };

const EditURL = ({ visit, pagePath, baseURL }: EditURLProps) => {
  const pathChunks = pagePath.replace(__rootdir, '').split(path.sep).filter(Boolean);
  let resolvedBaseURL = baseURL?.trim() || nexdConfig.editURL?.trim();
  if (!resolvedBaseURL) return;

  const mode = visit ? 'blob' : 'edit';
  resolvedBaseURL = resolvedBaseURL.endsWith('/') ? resolvedBaseURL.slice(0, -1) : resolvedBaseURL;
  const editURL = [resolvedBaseURL, mode, 'main', ...pathChunks].join('/');

  return (
    <a
      href={editURL}
      target='_blank'
      rel='noopener nofollow noreferrer'
      className='flex text-sm text-neutral'
    >
      Edit this page on GitHub
      <IconExternalLink size={16} className='-mt-0.5 ml-1.5' />
    </a>
  );
};

export default EditURL;
