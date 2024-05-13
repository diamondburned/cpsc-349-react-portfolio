import "lib/styles.scss";

export function Head() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:type" content="profile" />
      <meta property="og:title" content="Diamond [0xd14.id]" />
      <meta
        property="og:description"
        content="Diamond's information from 0xd14.id, now in React!"
      />
      <meta property="og:profile:first_name" content="Diamond" />
      <meta property="og:profile:username" content="diamondburned" />
      <meta property="og:profile:gender" content="female" />
    </>
  );
}
