import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

const config = defineConfig({
  projectId,
  dataset,
  title: "Luis Website",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  basePath: "/admin",
  plugins: [deskTool()],
  schema: { types: schemas },
});

export default config;
