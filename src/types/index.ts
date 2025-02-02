export interface Token {
  rank: number;
  name: string;
  address: string;
  requestCount: number;
  links: {
    website: string;
    twitter: string;
    explorer: string;
  };
}
