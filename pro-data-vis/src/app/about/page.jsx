export default function InfoPage() {
  return (
    <div
      // style={{
      //   background: 'linear-gradient(135deg, #06101c 0%, #030712 25%, #010408 50%, #030712 75%, #06101c 100%)',
      // }}
      className="w-screen min-h-screen"
    >
      <div className="w-full text-center pt-4">
        <span className="text-3xl font-extrabold"> About </span>
      </div>

      <div className="h-full p-10 bg-transparent">
        <h1 className="text-2xl font-bold"> Info </h1>
        <p>
          This site is still under development. <br />
          All the data you see on this site is originally from OraclesElixir. I couldn't find a Riot/League API that
          allowed me to grab esports data, so the data will almost certainly not always be completely up to date. <br />
          The data also only encompasses the major regions (NA/LTA, LEC, LPL, LCK) and the major internationals (Worlds,
          MSI). I made this decision early into the development of the site and have been working with it ever since,
          but I kind of regret it and might include info about all regions if it doesn't take up too much space on the
          database side. <br /> <br />
        </p>
      </div>
    </div>
  );
}
