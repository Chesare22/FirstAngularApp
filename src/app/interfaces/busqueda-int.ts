interface Owner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

interface Licence {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}

interface Item {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  licence: Licence;
  is_template: boolean;
  topics: string[];
}

export interface BusquedaInt {
  total_count: number;
  incomplete_results: boolean;
  items: Item[];
}
