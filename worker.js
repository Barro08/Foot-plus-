
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== "/matches") {
      return Response.json(
        { error: "Route inconnue" },
        { status: 404 }
      );
    }

    const competition = url.searchParams.get("competition") || "PL";

    const allowed = ["PL", "PD", "FL1", "CL", "SA"];

    if (!allowed.includes(competition)) {
      return Response.json(
        { error: "Compétition non autorisée" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.football-data.org/v4/competitions/${competition}/matches`,
      {
        headers: {
          "X-Auth-Token": env.FOOTBALL_API_TOKEN
        }
      }
    );

    return new Response(await response.text(), {
      status: response.status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
