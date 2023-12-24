export const LINKEDIN_OAUTH2_STATE = 'linkedin_oauth2_state';

export function parse(search: any): { [key: string]: string } {
  const query = search.substring(1);
  const vars = query.split('&');
  const parsed: { [key: string]: string } = {};
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair.length > 1) {
      parsed[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
  }
  return parsed;
}
