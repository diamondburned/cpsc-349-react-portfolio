import "./Bio.scss";
import { type ObjectDocument } from "lib/0xd14";
import { links } from "lib/0xd14";

export default function Bio({ object }: { object: ObjectDocument }) {
  // TODO: add Bubbles component
  return (
    <div id="bio">
      <div className="info-background">
        <header id="info">
          <div className="avatar-box">
            <div className="avatar">
              <img
                className="front"
                src="https://avatars.githubusercontent.com/u/8463786?v=4"
                alt="Avatar"
              />
              <img className="back" src="/self-drone.webp" alt="Avatar back-side" />
            </div>
          </div>
          <hgroup className="content">
            <p>Hi, I'm</p>
            <h1>{object.name}</h1>
          </hgroup>
        </header>
      </div>

      <div className="main-content-shadow">
        <div className="main-content">
          <BioContent object={object} />
          <BioFooter />
        </div>
      </div>
    </div>
  );
}

function BioContent({ object }: { object: ObjectDocument }) {
  return (
    <>
      <section id="introduction">
        <p>
          {(object.description as string)
            .replace("Hi, I'm Diamond! ", "")
            .replace(" and ", "\n and ")}
        </p>
      </section>

      <section id="information">
        <table>
          <tr id="pronouns">
            <th>Pronouns</th>
            <td>
              <StringList list={object.pronouns!} />
            </td>
          </tr>
          <tr id="birthday">
            <th>Birthday</th>
            <td>
              {new Date(Date.parse(object.birthDate as string)).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </td>
          </tr>
          <tr id="height">
            <th>Height</th>
            <td>{object.height! as string}</td>
          </tr>
          <tr id="languages">
            <th>Languages</th>
            <td>
              <StringList list={(object.knowsLanguage as string[]).map(expandLanguage)} />
            </td>
          </tr>
        </table>
      </section>

      <section id="projects">
        <hgroup>
          <h2>Projects</h2>
          <p>Some of my projects that I've worked on!</p>
        </hgroup>
        <div className="content">
          {object.resume!.projects!.map((project) => (
            <article key={JSON.stringify(project)}>
              <header>
                <a href={"https://" + project.website!} target="_blank" className="project-link">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-url">{project.website! as string}</p>
                </a>
              </header>
              <p className="project-description">{project.description}</p>
              <footer>
                <p className="keywords">
                  <StringList list={project.keywords!} />
                </p>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section id="work">
        <hgroup>
          <h2>Professional Experience</h2>
          <p>My past and present professional work experience.</p>
        </hgroup>
        <div className="content">
          {object.resume!.work!.map((work) => (
            <article key={JSON.stringify(work)}>
              <header>
                <h3>
                  <span className="position">{work.position}</span>
                  <span>at</span>
                  <span className="company">{work.company as string}</span>
                </h3>
                <p>
                  <span className="location">{work.location}</span>
                  <span className="dates">
                    {work.startDate} - {work.endDate}
                  </span>
                </p>
              </header>
              <ul>
                {work.highlights!.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="contact">
        <hgroup>
          <h2>Contact</h2>
          <p>Get in touch with me!</p>
        </hgroup>
        <div className="content">
          <section id="contact-email">
            <h3>Email</h3>
            <p>
              You may reach out to me at{" "}
              {(object.email! as string[]).map((email, i) => (
                <>
                  <a href={email}>{email.replace("mailto:", "").replace("@", " [at] ")}</a>
                  {i < (object.email! as string[]).length - 1 ? " or " : "."}
                </>
              ))}
            </p>
          </section>
          <section id="contact-pages">
            <h3>Pages</h3>
            <p>I also have other pages on the internet!</p>
            <ul>
              {(object.url as string[]).map((url) => (
                <li>
                  <a href={url} target="_blank">
                    {host(url)}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section id="links">
        <hgroup>
          <h2>Links</h2>
          <p>See my other pages!</p>
        </hgroup>
        <div className="content">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url!}
              role="button"
              style={{ "--color": link.color } as React.CSSProperties}
              target="_blank"
              className={"link " + (link.class || "")}
            >
              <img className="link-icon" src={link.iconURL} alt={link.name} />
              <span className="link-name">{link.name}</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

function BioFooter() {
  return (
    <footer>
      <p>
        Also see{" "}
        <b>
          <a href="https://libdb.so">libdb.so</a>
        </b>
        <br />
        Source code on{" "}
        <b>
          <a href="https://github.com/diamondburned/cpsc-349-react-portfolio">GitHub</a>
        </b>
      </p>
      <p>Trans rights are human rights 🏳️‍⚧️</p>
    </footer>
  );
}

function StringList({ list }: { list: string[] }) {
  const punct = (i: number) => {
    if (i < list.length - 2) {
      return ", ";
    }
    if (i < list.length - 1) {
      return " and ";
    }
    return "";
  };
  return list.map((item, i) => (
    <span key={item}>
      <span className="item">{item}</span>
      <span className="punct">{punct(i)}</span>
    </span>
  ));
}

function host(url: string) {
  return new URL(url).host;
}

function expandLanguage(language: string) {
  return (
    {
      en: "English",
      es: "Spanish",
      fr: "French",
      jp: "Japanese",
      vi: "Vietnamese",
    }[language] || `"${language}"`
  );
}
