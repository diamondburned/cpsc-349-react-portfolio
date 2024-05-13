import type { WithContext, Person } from "schema-dts";
import type { ResumeSchema } from "@kurone-kito/jsonresume-types";

import GitHubIcon from "super-tiny-icons/images/svg/github.svg";
import GitLabIcon from "super-tiny-icons/images/svg/gitlab.svg";
import MastodonIcon from "super-tiny-icons/images/svg/mastodon.svg";
import MatrixIcon from "super-tiny-icons/images/svg/matrix.svg";
import LinkedInIcon from "super-tiny-icons/images/svg/linkedin.svg";
import EmailIcon from "super-tiny-icons/images/svg/email.svg";

export const objectURL = "https://0xd14.id";
export const resumeURL = "https://raw.githubusercontent.com/diamondburned/resume/main/resume.json";

export type ObjectDocument = Extract<Person, { "@type": "Person" }> & {
  name?: string;
  resume?: ResumeSchema;
  pronouns?: string[];
};

export async function load(): Promise<WithContext<ObjectDocument>> {
  const [object, resume] = await Promise.all([
    mustFetch<WithContext<ObjectDocument>>(objectURL),
    mustFetch<ResumeSchema>(resumeURL),
    // don't load too fast!
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]);
  object.resume = resume;
  return object;
}

async function mustFetch<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return (await response.json()) as T;
}

export const links = [
  {
    url: "https://github.com/diamondburned",
    name: "GitHub",
    color: hexToTriplet("#984ffc"),
    iconURL: GitHubIcon,
    class: "icon-invert",
  },
  {
    url: "https://gitlab.com/diamondburned",
    name: "GitLab",
    color: hexToTriplet("#fca326"),
    iconURL: GitLabIcon,
  },
  {
    url: "https://tech.lgbt/@diamond",
    name: "Mastodon",
    color: hexToTriplet("#6263fc"),
    iconURL: MastodonIcon,
  },
  {
    url: "https://matrix.to/#/@diamondburned:matrix.org",
    name: "Matrix",
    color: hexToTriplet("#fcfcfc"),
    iconURL: MatrixIcon,
  },
  {
    url: "https://www.linkedin.com/in/diamondnotburned",
    name: "LinkedIn",
    color: hexToTriplet("#00a6fc"),
    iconURL: LinkedInIcon,
  },
  {
    url: "mailto:diamond@libdb.so",
    name: "Email",
    color: "var(--blue-rgb)",
    iconURL: EmailIcon,
  },
  {
    url: "https://github.com/diamondburned/resume/blob/main/resume.pdf",
    name: "Resume",
    color: "var(--blue-rgb)",
    iconURL: EmailIcon,
  },
] as {
  url: string;
  name: string;
  color?: string; // RGB triplet, make sure value=99 (HSV)!
  iconURL: string;
  class?: string;
}[];

function hexToTriplet(hex: string): string {
  hex = hex.slice(1);
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}
