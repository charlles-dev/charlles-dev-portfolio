import { describe, expect, it } from 'vitest';
import { resolveLocalLogin } from '../sessionProfiles';

describe('resolveLocalLogin', () => {
  it('opens the fictional admin profile only for admin/admin', () => {
    expect(resolveLocalLogin('Admin', 'ADMIN')).toEqual({ kind: 'login', profile: 'admin' });
  });

  it('routes the hacking credentials to the harmless easter egg', () => {
    expect(resolveLocalLogin('hacker', 'hacker')).toEqual({ kind: 'intruder' });
    expect(resolveLocalLogin('pentest', 'pentest')).toEqual({ kind: 'intruder' });
  });

  it('keeps every other local login in the guest profile', () => {
    expect(resolveLocalLogin('Guest', '')).toEqual({ kind: 'login', profile: 'guest' });
    expect(resolveLocalLogin('admin', 'wrong')).toEqual({ kind: 'login', profile: 'guest' });
  });
});
