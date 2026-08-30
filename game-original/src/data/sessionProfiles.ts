export type SessionProfile = 'guest' | 'admin';

export type LoginResolution =
  | { kind: 'login'; profile: SessionProfile }
  | { kind: 'intruder' };

export const resolveLocalLogin = (username: string, password: string): LoginResolution => {
  const user = username.trim().toLowerCase();
  const pass = password.trim().toLowerCase();

  if (user === 'admin' && pass === 'admin') return { kind: 'login', profile: 'admin' };
  if ((user === 'hacker' && pass === 'hacker') || (user === 'pentest' && pass === 'pentest')) {
    return { kind: 'intruder' };
  }
  return { kind: 'login', profile: 'guest' };
};
