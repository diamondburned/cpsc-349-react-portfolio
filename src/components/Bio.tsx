import "./Bio.scss";
import { type ObjectDocument } from "../lib/0xd14";
import { links } from "../lib/0xd14";
import { useState } from "react";

export default function Bio({ object }: { object: ObjectDocument }) {
  const [infoHovered, setInfoHovered] = useState(false);

  return (
    <div id="bio" className={infoHovered ? "info-hovered" : ""}>
      <div
        className="info-background"
        onMouseEnter={() => setInfoHovered(true)}
        onMouseLeave={() => setInfoHovered(false)}
      >
        <header id="info">
          <div className="avatar-box">
            <div className="avatar">
              <img src="https://libdb.so/_assets/avatar.webp" alt="Avatar" />
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

      <section id="links">
        <hgroup>
          <h2>Links</h2>
          <p>See my other pages!</p>
        </hgroup>
        <div className="content">
          {links.map((link) => (
            <a
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

      <section id="projects">
        <hgroup>
          <h2>Projects</h2>
          <p>Some of my projects that I've worked on!</p>
        </hgroup>
        <div className="content">
          {object.resume!.projects!.map((project) => (
            <article>
              <header>
                <a href={"https://" + project.website!} target="_blank" className="project-link">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-url">{project.website! as string}</p>
                </a>
              </header>
              <p className="project-description">{project.description}</p>
              <footer>
                <p className="keywords">{project.keywords!.join(", ")}</p>
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
            <article>
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
                  <li>{highlight}</li>
                ))}
              </ul>
            </article>
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
      </p>
      <p>Trans rights are human rights 🏳️‍⚧️</p>
    </footer>
  );
}

function host(url: string) {
  return new URL(url).host;
}
