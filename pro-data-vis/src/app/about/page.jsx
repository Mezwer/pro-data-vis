export default function InfoPage() {
  return (
    <div className="w-screen min-h-screen">
      <div className="w-full text-center pt-4">
        <span className="text-3xl font-extrabold"> About </span>
      </div>

      <div className="h-full p-10 bg-transparent">
        <h1 className="text-2xl font-bold"> Info </h1>
        <p>
          <br />
          This site is still <span className="underline"> under development. </span> <br /> <br />
          All the data you see on this site is originally from OraclesElixir and their{' '}
          <a className="link" href="https://oracleselixir.com/tools/downloads">
            downloads
          </a>
          , so massive credit to them. <br />
          However, this means that there are a few quirks of the website that generally stem from this fact, including:
        </p>

        <ul className="list-disc pl-5">
          <li> A few errors in the data, which might include: </li>
          <ul className="pl-5">
            <li>
              - When filtering by bans the data might not be completely accurate, as there are a couple inaccuracies
              I've found
            </li>
            <li>
              - I suspect team info on occassion not be completely accurate, but I don't have a great way to verify{' '}
            </li>
          </ul>
          <li>
            Team rebrandings are handled a bit arbitrarily in my experience. For example, all instances of Damwon Gaming
            were replaced with Dplus KIA, but SK Telecom T1 was not replaced with T1.
          </li>
        </ul>

        <br />
        <p>
          Despite all of that, I do largely trust the data, and I believe the inaccuracies will not lead anyone to
          significantly different conclusions. I do have scripts to check certain data fields, but there are many
          potentially erroneous data points, and so I would have to manually fix the data, which is not something I want
          to do, so for now I'm statisfied with the data being generally correct. This is all because I couldn't find a
          Riot/League API that allowed me to grab esports data for free. Additionally, the data will also almost
          certainly not be up to date; it's possible that I make something that can auto download OraclesElixir's data,
          but that's not something that I'm focused on right now. The data also only encompasses the major regions
          (NA/LTA, LEC, LPL, LCK + KeSPA, Demacia Cup) and the major internationals (Worlds, MSI). I made this decision
          early into the development of the site and have been working with it ever since, but I kind of regret it and
          might include info about all regions if it doesn't take up too much space on the database side.
          <br /> <br />
          There are certain bugs that I'm aware of, such as things like the KeSPA cups and Demacia Cups of separate
          years being right next to each other on the graphs. I know the reason (they spill over into the next year),
          but I don't know when I'll have a fix because it's not my first priority.
          <br /> <br />
        </p>

        <h1 className="text-2xl font-bold"> Background </h1>
        <p>
          {' '}
          <br /> This is just me yapping, all the important info is above.
        </p>
        <p>
          <br />
          This site was made because no other big League Esports site (as far as I'm aware) has a visualization of pro
          player data like this, so I decided to make it myself since many of the League Esports sites (gol.gg, dpm.lol,
          lolesports.com) don't really have what I'm looking for. It's currently an on and off project, because I'm in
          school and have other priorities most of the time, and my motivation to work on it fluctuates. <br />
          Some of my priorities for this website was to hone in on the UX of it (not the UI because I'm not great at
          coming up with my own), as I'm not a fan of the UX of sites such as gol.gg. <br />
          The other motivation for me making this site is just that I wanted to. I've always really liked data
          visualization stuff, and since I couldn't find another site that provides a service like this, I decided to
          make my own little project.
          <br /> <br />
          Also yes, there is only a dark mode. I don't like light mode and I am so not interested in making one.
          <br /> <br />
          For those interested, the tech stack is super simple. It's Next.js + Tailwind with a Neon (Postgres) backend.
          The reason I picked Next.js + Tailwind is mostly because I'm familiar with them and they have a lot of
          community resources. For Neon, it's because it was a simple serverless backend which kept the project really
          easy to work with. Not only that, it had a decent free tier (I am broke).
        </p>
      </div>
    </div>
  );
}
