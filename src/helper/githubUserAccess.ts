const githubToken = process.env.GITHUB_ACCESS_TOKEN;

export async function fetchGithubUser(username: string) {
  if (!githubToken) {
    throw new Error("Unauthorized , required token");
  }

  console.log("Hello bhai log");

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "post",
      body: JSON.stringify({
        query: `{
            user(login : "${username}"){
                name,
                login,
                avatarUrl,
                contributionsCollection{
                    years : contributionYears
                }
            }
          }`,
      }),
      headers: {
        Authorization: `Bearer ${githubToken}`,
        "content-type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("unable to fetch data");
    }



    const data = await res.json();

    

    console.log("data:", data);

    const { contributionsCollection, ...rest } = data.data.user;
    return { contributionYears: contributionsCollection.years, ...rest };
  } catch (error) {
    return new Error(`Error : ${error}`);
  }
}

export async function fetchContributionsCollection(
  username: string,
  year: number
) {
  if (!githubToken) {
    throw new Error("Unauthorized , required token");
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "post",
      body: JSON.stringify({
        query: `{
            user(login : "${username}"){
                contributionsCollection(from: "${new Date(
                  `${year}-01-01`
                ).toISOString()}", to: "${new Date(
          `${year}-12-31`
        ).toISOString()}"){
            contributionCalendar {
                        total : totalContributions
                        weeks {
                            days : contributionDays{
                                level : contributionLevel
                                weekday
                            }
                        }
                    }
                }
            }
        }`,
      }),
      headers: {
        Authorization: `Bearer ${githubToken}`,
        "content-type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`unable to fetch data`);
    }

    const data = await res.json();

    console.log("data2", data);

    const contributionCalendar =
      data.data.user.contributionsCollection.contributionCalendar;

    return { ...contributionCalendar, year };
  } catch (error) {}
}
