import {
  fetchContributionsCollection,
  fetchGithubUser,
} from "@/helper/githubUserAccess";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { username: string } }
) {
  const { username } = params;

  if (typeof username === "string") {
    try {
      const githubUser = await fetchGithubUser(username);

      const contributionCalendars = await Promise.all(
        githubUser.contributionYears.map((year: any) =>
          fetchContributionsCollection(username, year)
        )
      );

      const data = { githubUser, contributionCalendars };

      console.log("data", data);

      return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
      return NextResponse.json(error, { status: 400 });
    }
  }
}
