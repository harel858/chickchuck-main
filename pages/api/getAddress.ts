"use server";

import type { NextApiRequest, NextApiResponse } from "next";

const fetchSuggestions = async (query: string): Promise<string[]> => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  console.log("apiKey", apiKey);

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${apiKey}&components=country:IL|country:US`
  );
  const data = await response.json();
  const typedData = data as { predictions: { description: string }[] };
  return typedData.predictions.map((prediction) => prediction.description);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;

  if (typeof query !== "string") {
    res.status(400).json({ error: "Invalid query parameter" });
    return;
  }

  try {
    const suggestions = await fetchSuggestions(query);
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
}
